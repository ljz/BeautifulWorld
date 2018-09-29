var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var game;
(function (game) {
    var SoundModel = (function (_super) {
        __extends(SoundModel, _super);
        function SoundModel() {
            return _super.call(this, "soundconfig") || this;
        }
        SoundModel.prototype.load = function (data) {
            _super.prototype.load.call(this, data);
            this.soundOn = (data.hasOwnProperty("soundOn")) ? data.soundOn : true;
            this.musicOn = (data.hasOwnProperty("musicOn")) ? data.musicOn : true;
        };
        SoundModel.prototype.save = function (data) {
            _super.prototype.save.call(this, data);
            data.soundOn = this.soundOn == undefined ? true : this.soundOn;
            data.musicOn = this.musicOn == undefined ? true : this.musicOn;
        };
        SoundModel.prototype.buttonOpen = function () {
            this.playSound(game.SoundType.SOUND_PANEL_OPEN);
        };
        SoundModel.prototype.buttonClose = function () {
            this.playSound(game.SoundType.SOUND_PANEL_CLOSE);
        };
        /** 播放背景音乐 */
        SoundModel.prototype.playMusic = function (musicName) {
            if (this.musicOn) {
                TsEngine.SoundManager.playSound(musicName);
            }
        };
        /** 播放音效 */
        SoundModel.prototype.playSound = function (soundName) {
            if (this.soundOn) {
                TsEngine.SoundManager.playSound(soundName);
            }
        };
        Object.defineProperty(SoundModel.prototype, "soundOn", {
            get: function () {
                return this.mSoundOn;
            },
            set: function (value) {
                this.mSoundOn = value;
                if (!value) {
                    TsEngine.SoundManager.stopAllSounds(false, true);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundModel.prototype, "musicOn", {
            get: function () {
                return this.mMusicOn;
            },
            set: function (value) {
                this.mMusicOn = value;
                if (!value) {
                    TsEngine.SoundManager.stopAllSounds(true, true);
                }
            },
            enumerable: true,
            configurable: true
        });
        return SoundModel;
    }(TsEngine.ModelStoreable));
    game.SoundModel = SoundModel;
    __reflect(SoundModel.prototype, "game.SoundModel");
})(game || (game = {}));
var soundModel;
//# sourceMappingURL=SoundModel.js.map