var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TsEngine;
(function (TsEngine) {
    var SoundManager = (function () {
        function SoundManager() {
        }
        SoundManager.addSound = function (name, path, isMusic, buffer, checkPolicyFile) {
            if (isMusic === void 0) { isMusic = false; }
            if (buffer === void 0) { buffer = 1000; }
            if (checkPolicyFile === void 0) { checkPolicyFile = false; }
            for (var i = 0; i < this.sounds.length; i++) {
                if (this.sounds[i].name == name)
                    return false;
            }
            var sndObj = {};
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
        };
        SoundManager.removeSound = function (name) {
            for (var i = 0; i < this.sounds.length; i++) {
                if (this.sounds[i].name == name) {
                    this.sounds[i] = null;
                    this.sounds.splice(i, 1);
                }
            }
            this.soundsDict.remove(name);
        };
        SoundManager.removeAllSounds = function () {
            for (var i = 0; i < this.sounds.length; i++) {
                this.sounds[i] = null;
            }
            this.sounds = new Array();
            this.soundsDict = new TsEngine.HashMap();
        };
        SoundManager.playSound = function (name, volume, startTime, loops) {
            if (volume === void 0) { volume = 1; }
            if (startTime === void 0) { startTime = 0; }
            if (loops === void 0) { loops = 0; }
            var snd = this.soundsDict.getValue(name);
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
                var loader = new egret.Sound();
                loader.addEventListener(egret.Event.COMPLETE, onLoadFinish, this);
                loader.load(snd.source.path);
            }
            else {
                startPlay();
            }
            function onLoadFinish(event) {
                var currentLoader = (event.target);
                currentLoader.removeEventListener(egret.Event.COMPLETE, onLoadFinish, this);
                snd.sound = currentLoader;
                startPlay();
            }
            function startPlay() {
                var channel = (snd.sound).play(0, snd.loops);
                snd.channel = channel;
                snd.paused = false;
            }
        };
        SoundManager.stopSound = function (name) {
            var snd = this.soundsDict.getValue(name);
            if (snd) {
                snd.paused = true;
                if (snd.channel) {
                    (snd.channel).stop();
                }
            }
        };
        SoundManager.playAllSounds = function (music, sound) {
            if (music === void 0) { music = true; }
            if (sound === void 0) { sound = true; }
            for (var i = 0; i < this.sounds.length; i++) {
                var id = this.sounds[i].name;
                if ((music && this.isMusic(id)) || (sound && !this.isMusic(id))) {
                    this.playSound(id);
                }
            }
        };
        SoundManager.stopAllSounds = function (music, sound) {
            if (music === void 0) { music = true; }
            if (sound === void 0) { sound = true; }
            for (var i = 0; i < this.sounds.length; i++) {
                var id = this.sounds[i].name;
                if ((music && this.isMusic(id)) || (sound && !this.isMusic(id))) {
                    this.stopSound(id);
                }
            }
        };
        SoundManager.muteAllSounds = function (music, sound) {
            if (music === void 0) { music = true; }
            if (sound === void 0) { sound = true; }
            for (var i = 0; i < this.sounds.length; i++) {
                var id = this.sounds[i].name;
                if ((music && this.isMusic(id)) || (sound && !this.isMusic(id))) {
                    this.setVolume(id, 0);
                }
            }
        };
        SoundManager.unmuteAllSounds = function (music, sound) {
            if (music === void 0) { music = true; }
            if (sound === void 0) { sound = true; }
            for (var i = 0; i < this.sounds.length; i++) {
                var id = this.sounds[i].name;
                if ((music && this.isMusic(id)) || (sound && !this.isMusic(id))) {
                    this.setVolume(id, 1);
                }
            }
        };
        SoundManager.setVolume = function (name, volume) {
            var snd = this.soundsDict.getValue(name);
            snd.mute = (volume == 0);
            if (snd.channel) {
                (snd.channel).volume = volume;
            }
        };
        SoundManager.getVolume = function (name) {
            var snd = this.soundsDict.getValue(name);
            if (snd.channel) {
                return (snd.channel).volume;
            }
            return 0;
        };
        SoundManager.getSoundPosition = function (name) {
            var snd = this.soundsDict.getValue(name);
            if (snd.channel) {
                return (snd.channel).position;
            }
            return 0;
        };
        SoundManager.isPaused = function (name) {
            return this.soundsDict.getValue(name).paused;
        };
        SoundManager.isMusic = function (name) {
            return this.soundsDict.getValue(name).isMusic;
        };
        SoundManager.soundsDict = new TsEngine.HashMap();
        SoundManager.sounds = [];
        return SoundManager;
    }());
    TsEngine.SoundManager = SoundManager;
    __reflect(SoundManager.prototype, "TsEngine.SoundManager");
})(TsEngine || (TsEngine = {}));
//# sourceMappingURL=SoundManager.js.map