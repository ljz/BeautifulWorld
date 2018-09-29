var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var SoundType = (function () {
        function SoundType() {
        }
        /** 背景音乐 */
        SoundType.MUSIC_PLANE_BGM = "plane_bgm";
        /** 音效 */
        SoundType.SOUND_ANNUAL_LUCKYBOX = "annual_luckyBox";
        SoundType.SOUND_ATTACK_AIM_AT_TARGET = "attack_aim_at_target";
        SoundType.SOUND_BOMB_EXPLODE = "bomb_explode";
        SoundType.SOUND_BOMB_FLYING = "bomb_flying";
        SoundType.SOUND_CANNON_HIT_SHEILD = "cannon_hit_sheild";
        SoundType.SOUND_CANNON_SHOOT = "cannon_shoot";
        SoundType.SOUND_CASH_RECEIVED = "cash_received";
        SoundType.SOUND_DRAGONBOAT_BEATDRUMLOOP = "dragonBoat_beatDrumLoop";
        SoundType.SOUND_DRAGONBOAT_OPENLOOP = "dragonBoat_openLoop";
        SoundType.SOUND_DRAGONBOAT_REDPACKAGE = "dragonBoat_redPackage";
        SoundType.SOUND_DRAGONBOAT_REUSLT = "dragonBoat_reuslt";
        SoundType.SOUND_DRAGONBOAT_SMILE0 = "dragonBoat_smile0";
        SoundType.SOUND_DRAGONBOAT_SMILE1 = "dragonBoat_smile1";
        SoundType.SOUND_DRAGONBOAT_START = "dragonBoat_start";
        SoundType.SOUND_DRAGONBOAT_SUCCESS = "dragonBoat_success";
        SoundType.SOUND_FESTIVAL_1 = "festival_1";
        SoundType.SOUND_FESTIVAL_2 = "festival_2";
        SoundType.SOUND_FESTIVAL_3 = "festival_3";
        SoundType.SOUND_FIREWORKS_DISPLAY = "fireworks_display";
        SoundType.SOUND_GET10REWARDS = "Get10Rewards";
        SoundType.SOUND_ISLAND_PHOTO = "island_photo";
        SoundType.SOUND_ISLAND_SHOW_BOX = "island_show_box";
        SoundType.SOUND_ISLAND_SHOW_MAP = "island_show_map";
        SoundType.SOUND_KING_ADVANCE = "king_advance";
        SoundType.SOUND_KING_BACK = "king_back";
        SoundType.SOUND_KING_DICE = "king_dice";
        SoundType.SOUND_KING_EACH_EVENT = "king_each_event";
        SoundType.SOUND_KING_GET_DICE = "king_get_dice";
        SoundType.SOUND_KING_GET_SAILOR = "king_get_sailor";
        SoundType.SOUND_KING_OVER_CIRCLE = "king_over_circle";
        SoundType.SOUND_KING_PASSIVE_ADVANCE = "king_passive_advance";
        SoundType.SOUND_KING_START = "king_start";
        SoundType.SOUND_KING_STAY = "king_stay";
        SoundType.SOUND_KING_THROW_BAD = "king_throw_bad";
        SoundType.SOUND_KING_THROW_GOOD = "king_throw_good";
        SoundType.SOUND_LEVEL_SUCCESS = "level_success";
        SoundType.SOUND_MINER_COIN_COLLECT = "miner_coin_collect";
        SoundType.SOUND_MONOPOLY_DICE = "monopoly_dice";
        SoundType.SOUND_MONOPOLY_SHIP_MOVE = "monopoly_ship_move";
        SoundType.SOUND_MYSTICALSHOP = "mysticalShop";
        SoundType.SOUND_OCTOPUS_AWAPEN = "octopus_awapen";
        SoundType.SOUND_OCTOPUS_CLOUD = "octopus_cloud";
        SoundType.SOUND_OCTOPUS_HIT = "octopus_hit";
        SoundType.SOUND_OCTOPUS_PULL = "octopus_pull";
        SoundType.SOUND_OCTOPUS_REWARD = "octopus_reward";
        SoundType.SOUND_OCTOPUS_SHOOT = "octopus_shoot";
        SoundType.SOUND_OCTOPUS_SNORE = "octopus_snore";
        SoundType.SOUND_OCTOPUS_WATER = "octopus_water";
        SoundType.SOUND_OPEN_EGG = "open_egg";
        SoundType.SOUND_OPEN_EGG_WIN = "open_egg_win";
        SoundType.SOUND_PANEL_CLOSE = "panel_close";
        SoundType.SOUND_PANEL_OPEN = "panel_open";
        SoundType.SOUND_PET_BEAR_SKILL = "pet_bear_skill";
        SoundType.SOUND_PET_EAT = "pet_eat";
        SoundType.SOUND_PET_LVUP = "pet_lvUp";
        SoundType.SOUND_PET_SEAL_SKILL = "pet_seal_skill";
        SoundType.SOUND_PLANE_ATTACK = "plane_attack";
        SoundType.SOUND_PLANE_ATTACKED = "plane_attacked";
        SoundType.SOUND_PLANE_COMEON = "plane_comeon";
        SoundType.SOUND_PLANE_DENGER = "plane_denger";
        SoundType.SOUND_PLANE_FAIL = "plane_fail";
        SoundType.SOUND_PLANE_GRADEUP = "plane_gradeUp";
        SoundType.SOUND_PLANE_READY = "plane_ready";
        SoundType.SOUND_PLANE_READY2 = "plane_ready2";
        SoundType.SOUND_PLANE_SHIELD = "plane_shield";
        SoundType.SOUND_PLANE_SHIELD2 = "plane_shield2";
        SoundType.SOUND_PLANE_SPEEDUP = "plane_speedup";
        SoundType.SOUND_PLANE_STARDOWN = "plane_starDown";
        SoundType.SOUND_PLANE_START = "plane_start";
        SoundType.SOUND_PLANE_STARUP = "plane_starUp";
        SoundType.SOUND_PLANE_TOUCH1 = "plane_touch1";
        SoundType.SOUND_PLANE_TOUCH2 = "plane_touch2";
        SoundType.SOUND_PLANE_VICTORY = "plane_victory";
        SoundType.SOUND_SAILING_APPLY = "sailing_apply";
        SoundType.SOUND_SAILING_GETTASK = "sailing_getTask";
        SoundType.SOUND_SAILING_OVER = "sailing_over";
        SoundType.SOUND_SAILING_ROW = "sailing_row";
        SoundType.SOUND_SAILING_TEAR = "sailing_tear";
        SoundType.SOUND_STEAL_GOT_KING = "steal_got_king";
        SoundType.SOUND_STEAL_MISS_KING = "steal_miss_king";
        SoundType.SOUND_STEAL_RESULT = "steal_result";
        SoundType.SOUND_TAP_BOOM = "tap_boom";
        SoundType.SOUND_TAP_HURT = "tap_hurt";
        SoundType.SOUND_TAP_SLEEP = "tap_sleep";
        SoundType.SOUND_TAP_WAKE = "tap_wake";
        SoundType.SOUND_TM_BAOXIANG = "tm_baoxiang";
        SoundType.SOUND_TM_CHANZI = "tm_chanzi";
        SoundType.SOUND_UPGRADE_BUILD = "upgrade_build";
        SoundType.SOUND_UPGRADE_BUILD_DONE_3 = "upgrade_build_done_3";
        SoundType.SOUND_USERRECALL_1 = "userRecall_1";
        SoundType.SOUND_USERRECALL_2 = "userRecall_2";
        SoundType.SOUND_USERRECALL_3 = "userRecall_3";
        SoundType.SOUND_VIEW_SWITCH_IN = "view_switch_in";
        SoundType.SOUND_VIEW_SWITCH_OUT = "view_switch_out";
        SoundType.SOUND_WAWASTART = "wawaStart";
        SoundType.SOUND_WAWAWHEEL = "wawaWheel";
        SoundType.SOUND_WHEEL_ATTACK_PREPARE = "wheel_attack_prepare";
        SoundType.SOUND_WHEEL_BUTTON_DOWN = "wheel_button_down";
        SoundType.SOUND_WHEEL_BUTTON_UP = "wheel_button_up";
        SoundType.SOUND_WHEEL_ENERGY_CHANGE = "wheel_energy_change";
        SoundType.SOUND_WHEEL_ENERGY_START = "wheel_energy_start";
        SoundType.SOUND_WHEEL_ENERGY_TRANSFORM = "wheel_energy_transform";
        SoundType.SOUND_WHEEL_ENERGY_USE = "wheel_energy_use";
        SoundType.SOUND_WHEEL_GOLD_MED = "wheel_gold_med";
        SoundType.SOUND_WHEEL_GOT_ITEM = "wheel_got_item";
        SoundType.SOUND_WHEEL_ROT_END = "wheel_rot_end";
        SoundType.SOUND_WHEEL_ROT_START = "wheel_rot_start";
        SoundType.SOUND_WHEEL_SHIELD_FULL = "wheel_shield_full";
        SoundType.SOUND_WHEEL_SHIELD_GOT = "wheel_shield_got";
        SoundType.SOUND_WHEEL_SHIELD_START = "wheel_shield_start";
        SoundType.SOUND_WHEEL_STEAL = "wheel_steal";
        SoundType.SOUND_WHEEL_STEAL_GONE = "wheel_steal_gone";
        return SoundType;
    }());
    game.SoundType = SoundType;
    __reflect(SoundType.prototype, "game.SoundType");
})(game || (game = {}));
//# sourceMappingURL=SoundType.js.map