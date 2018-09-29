
namespace game {
	export class SoundModel extends TsEngine.ModelStoreable {
		private mSoundOn: boolean;
		private mMusicOn: boolean;
		constructor() {
			super("soundconfig");
		}

		public load(data: any): void {
			super.load(data);
			this.soundOn = (data.hasOwnProperty("soundOn")) ? data.soundOn : true;
			this.musicOn = (data.hasOwnProperty("musicOn")) ? data.musicOn : true;
		}

		public save(data: any): void {
			super.save(data);
			data.soundOn = this.soundOn == undefined ? true : this.soundOn;
			data.musicOn = this.musicOn == undefined ? true : this.musicOn;
		}

		public buttonOpen(): void {
			this.playSound(SoundType.SOUND_PANEL_OPEN);
		}

		public buttonClose(): void {
			this.playSound(SoundType.SOUND_PANEL_CLOSE);
		}

		/** 播放背景音乐 */
		public playMusic(musicName: string): void {
			if (this.musicOn) {
				TsEngine.SoundManager.playSound(musicName);
			}
		}

		/** 播放音效 */
		public playSound(soundName: string): void {
			if (this.soundOn) {
				TsEngine.SoundManager.playSound(soundName);
			}
		}

		public get soundOn(): boolean {
			return this.mSoundOn;
		}

		public set soundOn(value: boolean) {
			this.mSoundOn = value;
			if (!value) {
				TsEngine.SoundManager.stopAllSounds(false, true);
			}
		}

		public get musicOn(): boolean {
			return this.mMusicOn;
		}

		public set musicOn(value: boolean) {
			this.mMusicOn = value;
			if (!value) {
				TsEngine.SoundManager.stopAllSounds(true, true);
			}
		}
	}
}

let soundModel: game.SoundModel;