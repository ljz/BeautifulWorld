

namespace TsEngine {
	export
		class MoviePlayer extends egret.Sprite {
		public animations: any = {};
		public currentAnimation: string;
		public sheetResource: SheetData;
		private onLoadCallBacks: Array<any>;
		private sheetUrl: string;
		private defaultAnimation: string;
		private preParse: boolean;
		private isLoading: boolean = false;

		/**
		 * 动作集播放器
		 * @param sheetResource            sheet资源
		 * @param defaultAnimation        默认动作
		 */
		constructor(sheetUrl?: string, defaultAnimation?: string, preParse: boolean = true) {
			super();
			this.sheetUrl = sheetUrl;
			this.defaultAnimation = defaultAnimation;
			this.preParse = preParse;
			this.onLoadCallBacks = new Array<any>();
		}

		//资源加载完成
		public onResource(sheetResource: SheetData): void {
			this.sheetResource = sheetResource;
			if (this.preParse) {
				let mcData = sheetResource.sheetConfig.mc;
				if (mcData) {
					for (var mcName in mcData) {
						if (!this.defaultAnimation) {
							this.defaultAnimation = mcName;
						}
						this.addMovieClip(mcName);
					}
				}
			}
		}

		//加载
		public load(onComplete?: Function, thisObject?: any) {
			if (!this.sheetResource && this.sheetUrl) {
				if (onComplete != null) {
					this.onLoadCallBacks.push({ func: onComplete, obj: thisObject });
				}
				if (!this.isLoading) {
					this.isLoading = true;
					ResourceManager.loadSheet(this.sheetUrl, (sheet) => {
						this.onResource(sheet);
						while (this.onLoadCallBacks.length) {
							const element = this.onLoadCallBacks.shift();
							element.func.call(element.obj);
						}
					}, null, this);
				}
			} else {
				onComplete.call(thisObject);
			}
		}

		/**
		 * 播放动画
		 * @param	animationName      动画名称
		 * @param	loopTimes          播放次数
		 * @param	onComplete         播放完成
		 */
		public play(loopTimes: number = -1, onComplete: Function = null, thisObject: any = null): MovieClip {
			return this.playAnimation(this.defaultAnimation, loopTimes, true, onComplete, thisObject);
		}

		/**
		 * 播放动画
		 * @param	animationName      动画名称
		 * @param	loopTimes          播放次数
		 * @param	onComplete         播放完成
		 */
		public playAnimation(animationName: string, loopTimes: number = -1, reset: boolean = true, onComplete: Function = null, thisObject: any = null): MovieClip {
			if (this.sheetResource) {
				if (!(this.animations[animationName])) {
					if (!this.addMovieClip(animationName)) {
						throw new Error("找不到对应动作集合:" + animationName);
					}
				}

				var movie: MovieClip;
				if (this.currentAnimation != animationName) {
					if (this.currentAnimation) {
						this.removeChild(this.animations[this.currentAnimation]);
					}
					this.currentAnimation = animationName;
					movie = this.animations[animationName];
					this.addChild(movie);
				}
				else {
					movie = this.animations[animationName];
				}
				movie.play(loopTimes, reset, onComplete, thisObject);
				return movie;
			} else {
				this.load(() => {
					this.playAnimation(animationName || this.defaultAnimation, loopTimes, reset, onComplete, thisObject);
				}, this);
			}
			return null;
		}

		//暂停
		public pause(value: boolean): void {
			if (!this.currentAnimation || this.animations[this.currentAnimation] == null) return;

			var movie: MovieClip = this.animations[this.currentAnimation];
			value ? movie.stop() : movie.play();
		}

		//停止播放
		public stop(): void {
			if (!this.currentAnimation || this.animations[this.currentAnimation] == null) return;

			var movie: MovieClip = this.animations[this.currentAnimation];
			movie.stop();
		}

		public dispose(): void {
			if (this.currentAnimation != null) {
				this.removeChild(this.animations[this.currentAnimation]);
				this.currentAnimation = null;
			}
			if (this.animations != null) {
				for (var animationName in this.animations) {
					(<MovieClip>(this.animations[animationName])).dispose();
					delete this.animations[animationName];
				}
				this.animations = null;
			}
			this.sheetResource = null;
		}


		/**添加一个影片到动作集合*/
		private addMovieClip(movieName: string): MovieClip {
			var movie: MovieClip = this.sheetResource.createMovieClip(movieName);
			if (movie) {
				movie.name = movieName;
				this.animations[movieName] = movie;
			}
			return movie;
		}
	}
}