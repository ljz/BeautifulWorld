



namespace TsEngine {
	export class SoundManager {
		private static soundsDict: HashMap = new HashMap();
		private static sounds: Array<any> = [];
		private static currentMusic: string;
		public static addSound(name: string, path: string, isMusic: boolean = false, buffer: number = 1000, checkPolicyFile: boolean = false): boolean {
			for (var i: number = 0; i < this.sounds.length; i++) {
				if (this.sounds[i].name == name) return false;
			}

			var sndObj: any = {};
			sndObj.name = name;
			sndObj.source = { path: path, checkPolicyFile: checkPolicyFile };
			sndObj.channel = null;
			sndObj.position = 0;
			sndObj.sound = null;
			sndObj.paused = true;
			sndObj.volume = 1;
			sndObj.startTime = 0;
			sndObj.loops = 0;
			sndObj.isMusic = isMusic;

			this.soundsDict.put(name, sndObj);
			this.sounds.push(sndObj);

			return true;
		}

		public static removeSound(name: string): void {
			for (var i: number = 0; i < this.sounds.length; i++) {
				if (this.sounds[i].name == name) {
					this.sounds[i] = null;
					this.sounds.splice(i, 1);
				}
			}
			this.soundsDict.remove(name);
		}


		public static removeAllSounds(): void {
			for (var i: number = 0; i < this.sounds.length; i++) {
				this.sounds[i] = null;
			}

			this.sounds = new Array();
			this.soundsDict = new HashMap();
		}


		public static playSound(name: string, volume: number = 1, startTime: number = 0, loops: number = 0): void {
			var snd: any = this.soundsDict.getValue(name);
			if (!snd || snd.mute)
				return;
			snd.volume = volume;
			snd.startTime = startTime;
			snd.loops = snd.isMusic ? 9999 : loops;
			if (snd.isMusic && (this.currentMusic != name)) {
				this.currentMusic && this.stopSound(this.currentMusic);
				this.currentMusic = name;
			}
			if (snd.sound == null) {
				var loader: egret.Sound = new egret.Sound();
				loader.addEventListener(egret.Event.COMPLETE, onLoadFinish, this);
				loader.load(snd.source.path);
			} else {
				startPlay();
			}

			function onLoadFinish(event: egret.Event): void {
				var currentLoader: egret.Sound = <egret.Sound>(event.target);
				currentLoader.removeEventListener(egret.Event.COMPLETE, onLoadFinish, this);
				snd.sound = currentLoader;
				startPlay();
			}

			function startPlay(): void {
				var channel: egret.SoundChannel = (<egret.Sound>(snd.sound)).play(0, snd.loops);
				snd.channel = channel;
				snd.paused = false;
			}
		}

		public static stopSound(name: string): void {
			var snd: any = this.soundsDict.getValue(name);
			if (snd) {
				snd.paused = true;
				if (snd.channel) {
					(<egret.SoundChannel>(snd.channel)).stop();
				}
			}
		}

		public static playAllSounds(music: boolean = true, sound: boolean = true): void {
			for (var i: number = 0; i < this.sounds.length; i++) {
				var id: string = this.sounds[i].name;
				if ((music && this.isMusic(id)) || (sound && !this.isMusic(id))) {
					this.playSound(id);
				}
			}
		}

		public static stopAllSounds(music: boolean = true, sound: boolean = true): void {
			for (var i: number = 0; i < this.sounds.length; i++) {
				var id: string = this.sounds[i].name;
				if ((music && this.isMusic(id)) || (sound && !this.isMusic(id))) {
					this.stopSound(id);
				}
			}
		}

		public static muteAllSounds(music: boolean = true, sound: boolean = true): void {
			for (var i: number = 0; i < this.sounds.length; i++) {
				var id: string = this.sounds[i].name;
				if ((music && this.isMusic(id)) || (sound && !this.isMusic(id))) {
					this.setVolume(id, 0);
				}
			}
		}

		public static unmuteAllSounds(music: boolean = true, sound: boolean = true): void {
			for (var i: number = 0; i < this.sounds.length; i++) {
				var id: string = this.sounds[i].name;
				if ((music && this.isMusic(id)) || (sound && !this.isMusic(id))) {
					this.setVolume(id, 1);
				}
			}
		}

		public static setVolume(name: string, volume: number): void {
			var snd: any = this.soundsDict.getValue(name);
			snd.mute = (volume == 0);
			if (snd.channel) {
				(<egret.SoundChannel>(snd.channel)).volume = volume;
			}
		}


		public static getVolume(name: string): number {
			var snd: any = this.soundsDict.getValue(name);
			if (snd.channel) {
				return (<egret.SoundChannel>(snd.channel)).volume;
			}
			return 0;
		}


		public static getSoundPosition(name: string): number {
			var snd: any = this.soundsDict.getValue(name);
			if (snd.channel) {
				return (<egret.SoundChannel>(snd.channel)).position;
			}
			return 0;
		}

		public static isPaused(name: string): boolean {
			return this.soundsDict.getValue(name).paused;
		}


		public static isMusic(name: string): boolean {
			return this.soundsDict.getValue(name).isMusic;
		}
	}
}