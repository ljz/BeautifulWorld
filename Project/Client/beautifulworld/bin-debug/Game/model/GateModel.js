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
//游戏入口数据模型
var game;
(function (game) {
    var GateModel = (function (_super) {
        __extends(GateModel, _super);
        function GateModel() {
            var _this = _super.call(this) || this;
            _this.openAllGate = true; //开启所有功能（测试用,活动除外,必须开启活动才能测试）
            _this.guide = null; //功能是否开启
            _this.clearedBadges = null; //是否打开过
            _this.oldBadgesMap = {};
            /**公众号相关 */
            _this.isWxgame = false; //是否wxgame
            /**屏蔽区域相关*/
            _this.checkFocus = false; //诱导关注
            _this.checkShare = false; //诱导分享
            _this.checkPay = false; //诱导充值
            _this.checkFreeEnergyDiffGroup = false; //免费能量分享不同群
            _this.iosPay = false; //是否可以苹果充值
            _this.payRed = false; //商城红点
            _this.GameClubInterFaceId = false; //是否显示游戏圈
            _this.ShareInterFaceId = false; //是否屏蔽
            _this.wxSharing = false;
            _this.wxCanShowAd = false;
            _this.timestamp = 0;
            _this.isWxgame = TsEngine.SystemManager.isWxGame;
            _this.iosPay = !(_this.isWxgame && !_this.checkPay && TsEngine.SystemManager.isIOS);
            _this.gateMap = {};
            return _this;
        }
        GateModel.prototype.update = function (data) {
            var _this = this;
            this.data = data;
            this.inject(data);
            /**屏蔽区域检测*/
            game.PlatformManager.checkIPAvailable(game.AreaCheckType.Check_Focus, function (avaiable) { _this.checkFocus = avaiable; });
            game.PlatformManager.checkIPAvailable(game.AreaCheckType.Check_Share, function (avaiable) { _this.checkShare = avaiable; });
            game.PlatformManager.checkIPAvailable(game.AreaCheckType.Check_Pay, function (avaiable) { _this.checkPay = avaiable; });
            game.PlatformManager.checkIPAvailable(game.AreaCheckType.Check_FreeEnergyDiffGroup, function (avaiable) { _this.checkFreeEnergyDiffGroup = avaiable; });
            game.PlatformManager.checkIPAvailable(game.AreaCheckType.Check_ShareBtn, function (avaiable) { _this.checkShareBtn = avaiable; });
            this.initGates();
            //更新Tab窗口开放列表
            TsEngine.WindowManager.setOpenList(gateModel.getGroupOpenList(game.WindowType.GROUP_DAILYREWARD));
            TsEngine.WindowManager.setOpenList(gateModel.getGroupOpenList(game.WindowType.GROUP_INVITEREWARD));
            TsEngine.WindowManager.setOpenList(gateModel.getGroupOpenList(game.WindowType.GROUP_FRIEND));
            TsEngine.WindowManager.setOpenList(gateModel.getGroupOpenList(game.WindowType.GROUP_LIMITSALE));
            TsEngine.WindowManager.setOpenList(gateModel.getGroupOpenList(game.WindowType.GROUP_NEWS));
            TsEngine.WindowManager.setOpenList(gateModel.getGroupOpenList(game.WindowType.GROUP_FRIEND_RECOMMEND));
        };
        Object.defineProperty(GateModel.prototype, "privilegeAvailable", {
            //公众号特权是否有效
            get: function () {
                console.log("this.checkFocus = ", this.checkFocus);
                console.log("playerModel.gotNewSubscribedReward = ", playerModel.gotNewSubscribedReward);
                console.log("playerModel.isSubscribed = ", playerModel.isSubscribed);
                return this.checkFocus && playerModel.gotNewSubscribedReward && playerModel.isSubscribed;
            },
            enumerable: true,
            configurable: true
        });
        //入口更新*
        GateModel.prototype.initGates = function () {
            var _this = this;
            //----------服务器红点入口------------
            //微信排行
            this.addGate(game.WindowType.WINDOW_WXRANK, true, true).updateMethod = function (gate) {
                gate.isUnlock = _this.isWxgame;
                if (_this.isWxgame)
                    gate.logicShow = platform.common.checkSetUserStorage();
            };
            //新手礼包
            this.addGate(game.WindowType.WINDOW_NEWBIE_GIFT, true, true).updateMethod = function (gate) {
                gate.logicRed = playerModel.gotNewbieGift;
                gate.logicShow = !playerModel.gotNewbieGift && !game.ComFunc.checkIOSPay();
            };
            //认证礼包
            this.addGate(game.WindowType.WINDOW_REALNAME_GIFT, true, true);
            //召回奖励
            this.addGate(game.WindowType.WINDOW_RECALL_REWARD, true, false, AcLockType.recall).updateMethod = function (gate) {
                gate.logicRed = playerModel.inviteMoneyCount > 0 && playerModel.showBoxType == 1;
            };
            //邀请奖励
            this.addGate(game.WindowType.WINDOW_INVITEREWARD, true, false, AcLockType.invite).updateMethod = function (gate) {
                gate.logicRed = (playerModel.friendsRewardCounts > 0 || playerModel.shareTime < 1 && playerModel.shareCount <= 4);
                if (_this.isWxgame) {
                    gate.logicRed = playerModel.friendsRewardCounts > 0;
                }
            };
            //万能碎片
            this.addGate(game.WindowType.WINDOW_WNSP, true, false, AcLockType.allInOne).updateMethod = function (gate) {
                var allInOneRed = (playerModel.inviteFriendCount > playerModel.inviteFriendRewardCount) && playerModel.showBoxType == 0;
                if (playerModel.inviteFirendToday && playerModel.inviteFriendCount == playerModel.inviteFriendRewardCount) {
                    allInOneRed = false;
                }
                gate.logicRed = allInOneRed;
            };
            //金币宝箱
            this.addGate(game.WindowType.WINDOW_INVITE_JBBX, true, false, AcLockType.moneyBox).updateMethod = function (gate) {
                gate.logicRed = guildModel[AcLockType.moneyBox] && (playerModel.inviteMoneyCount > 0 || gateModel.getGate(game.WindowType.WINDOW_INVITE_JBBX).red) && playerModel.showBoxType == 1;
            };
            //签到
            this.addGate(game.WindowType.WINDOW_DAILY_SIGN).updateMethod = function (gate) {
                gate.logicRed = initModel.signRedPoint;
            };
            //每日能量
            this.addGate(game.WindowType.WINDOW_DAILY_ENERGY, false, false, AcLockType.dailyEnergy).updateMethod = function (gate) {
                gate.logicRed = playerModel.loginRewardRemain == 0 && guildModel[AcLockType.dailyEnergy];
            };
            //能量红包
            this.addGate(game.WindowType.WINDOW_FREE_ENERGY, true, false, AcLockType.dailyRedBag).updateMethod = function (gate) {
                gate.logicRed = dailyModel.seniorDayShare_remainShareCount > 0 || dailyModel.seniorDayShare_boxEnergy > 0;
            };
            //----------常规入口------------
            //map
            this.addGate(game.WindowType.WINDOW_WORLDMAP, false, false, AcLockType.map).updateMethod = function (gate) {
            };
            //公众号特权
            this.addGate(game.WindowType.WINDOW_OFFICIALVIP).updateMethod = function (gate) {
                gate.logicShow = _this.checkFocus && playerModel.gotNewSubscribedReward && playerModel.isSubscribed;
                gate.leftTime = _this.data.privilegeOverplus;
            };
            //聊天界面推荐好友
            this.addGate(game.WindowType.WINDOW_RECOMMEND_NEARBY, true).updateMethod = function (gate) {
                gate.logicRed = playerModel.friends && playerModel.friends.length < 3;
            };
            //聊天入口
            this.addGate(game.WindowType.WINDOW_WORLD_CHAT).updateMethod = function (gate) {
                gate.logicRed = chatModel.ChatCache.chatBtnPoint || messageModel.requests.length > 0 || _this.isRed(game.WindowType.WINDOW_RECOMMEND_NEARBY);
            };
            //公众号关注
            this.addGate(game.WindowType.WINDOW_FOCUS_REWARD_TIP).updateMethod = function (gate) {
                gate.logicShow = gateModel.isWxgame && !playerModel.gotNewSubscribedReward && (playerModel.highestCrowns >= Const.FocusLimit); //并且未领取奖励gotSubscribedReward
            };
            //新手目标
            this.addGate(game.WindowType.WINDOW_ACHIEVE, false, false, AcLockType.achieve).updateMethod = function (gate) {
                gate.logicShow = playerModel.hasAchievement;
            };
            //海盗团
            this.addGate(game.ScreenType.GUILD_SCREEN, false, false, AcLockType.guild, false).updateMethod = function (gate) {
                gate.logicRed = guildModel.hasRedPoint;
                gate.logicShow = gate.isUnlock || playerModel.highestCrowns >= Const.guildOpenLimit;
            };
            //邀请送vip
            this.addGate(game.WindowType.WINDOW_INVITE_VIP, false, false, AcLockType.inviteVip).updateMethod = function (gate) {
                gate.logicRed = playerModel.inviteFriendVIPRemain == 0;
                // gate.logicShow = _.isNumber(playerModel.inviteFriendVIPRemain);
            };
            //月卡
            this.addGate(game.WindowType.WINDOW_MONTHCARD, false, false, AcLockType.monthCard).updateMethod = function (gate) {
                gate.logicRed = playerModel.monthCardExpired > 0 && !playerModel.gotMonthCardReward;
                gate.logicShow = !gate.red;
            };
            //神秘商人
            this.addGate(game.WindowType.WINDOW_MYSTICAL).updateMethod = function (gate) {
                gate.logicShow = playerModel.hasMystical && (!_this.isWxgame || !_this.iosPay);
            };
            //飞速礼包
            this.addGate(game.WindowType.WINDOW_RUNNINGGIFT).updateMethod = function (gate) {
                // gate.logicShow = playerModel.speedGiftRemain != null && _.isNumber(playerModel.speedGiftRemain) && playerModel.speedGiftRemain > 0 && !this.iosPay;
            };
            //海盗商人(原来的森林聚餐礼包)
            this.addGate(game.WindowType.WINDOW_PIRATEGIFT).updateMethod = function (gate) {
                var partyGift = activityModel.getActivityInfo(game.ActivityType.partyGift);
                gate.logicShow = partyGift && !game.ComFunc.checkIOSPay() && !partyGift.playerData.gotOccasionalGift && playerModel.island > 0 && (partyGift.beginRemain <= 0 && (partyGift.endRemain > 0 || partyGift.awardEndRemain > 0));
            };
            //商店入口
            this.addGate(game.WindowType.WINDOW_SHOP).updateMethod = function (gate) {
                gate.logicRed = (_this.isWxgame && _this.payRed && !TsEngine.SystemManager.isIOS) || (_this.payRed);
            };
            //信息编辑入口
            this.addGate(game.WindowType.WINDOW_PLAYER_EDIT).updateMethod = function (gate) {
                gate.logicRed = playerModel.constellation == 0 && playerModel.province == 0;
            };
        };
        //更新入口
        GateModel.prototype.updateGate = function (type) {
            var gate = this.getGate(type);
            if (gate) {
                gate.update();
            }
        };
        //添加入口(WindowType)
        GateModel.prototype.addGate = function (type, saveServer, saveForever, lockType, hideLock) {
            if (saveServer === void 0) { saveServer = false; }
            if (saveForever === void 0) { saveForever = true; }
            if (lockType === void 0) { lockType = null; }
            if (hideLock === void 0) { hideLock = true; }
            var gate = this.getGate(type);
            if (!gate) {
                gate = new Gate(type.toString(), saveServer, saveForever, lockType, hideLock);
                this.gateMap[type] = gate;
            }
            return gate;
        };
        //添加合集入口(WindowType/ActivityType)
        GateModel.prototype.addGroupGate = function (type, gates) {
            var gate = this.gateMap[type.toString()];
            if (!gate) {
                gate = new GroupGate(type.toString(), gates);
                this.gateMap[type] = gate;
            }
            return gate;
        };
        //获取窗口组开放的id集合
        GateModel.prototype.getGroupOpenList = function (type) {
            var winData = TsEngine.WindowManager.getWindowData(type);
            var openList = [];
            if (winData && winData.fullList) {
                for (var index = 0; index < winData.fullList.length; index++) {
                    var id = winData.fullList[index];
                    var gate = this.getGate(id);
                    if ((gate && gate.show) || !gate) {
                        openList.push(id);
                    }
                }
            }
            console.log("openList type:" + type + "|" + openList.join(","));
            return openList;
        };
        //获取入口(WindowType/ActivityType)
        GateModel.prototype.getGate = function (type) {
            if (!type)
                return null;
            var gate = this.gateMap[type.toString()];
            if (!gate && typeof type === 'number') {
                //如果是窗口组，自动创建入口集合
                var groupId = parseInt(type.toString());
                var winData = TsEngine.WindowManager.getWindowData(groupId);
                if (winData && winData.fullList) {
                    var gates = [];
                    for (var index = 0; index < winData.fullList.length; index++) {
                        var id = winData.fullList[index];
                        var gate_1 = this.gateMap[type.toString()];
                        if (gate_1) {
                            gates.push(gate_1);
                        }
                    }
                    gate = this.addGroupGate(type, gates);
                }
            }
            return gate;
        };
        //根据解锁类型获取入口
        GateModel.prototype.getGateByLockType = function (locktype) {
            for (var key in this.gateMap) {
                var element = this.gateMap[key];
                if (element.lockType == locktype) {
                    return element;
                }
            }
            return null;
        };
        //入口是否有红点(WindowType/ActivityType)
        GateModel.prototype.isRed = function (type) {
            var gate = this.getGate(type);
            if (gate == null) {
                return gateModel.clearedBadges.indexOf(type.toString()) != -1;
            }
            return gate.red;
        };
        //保存红点到服务器
        GateModel.prototype.saveRed = function (type, forever) {
            HttpService.post(game.ServerMsg.CLEARBADGE, "uid=" + playerModel.uid + "&key=" + type.toString() + "&forever=" + forever, function (data) {
                if (data) {
                    gateModel.clearedBadges = data;
                }
            });
        };
        GateModel.prototype.initOldGate = function () {
            this.oldBadgesMap[game.WindowType.WINDOW_NEWBIE_GIFT] = "newbieGift";
        };
        return GateModel;
    }(TsEngine.Model));
    game.GateModel = GateModel;
    __reflect(GateModel.prototype, "game.GateModel");
    //功能入口类
    var Gate = (function (_super) {
        __extends(Gate, _super);
        function Gate(id, serverGate, saveForever, lockType, hideLock) {
            if (serverGate === void 0) { serverGate = false; }
            if (saveForever === void 0) { saveForever = true; }
            if (lockType === void 0) { lockType = null; }
            if (hideLock === void 0) { hideLock = true; }
            var _this = _super.call(this) || this;
            //是否显示入口(控制是否显示))
            _this.show = true;
            _this.tempShow = false;
            _this.id = id;
            _this.hideLock = hideLock;
            _this.lockType = lockType;
            _this.mLogicRed = false;
            _this.mIsUnlock = true;
            _this.serverGate = serverGate;
            _this.saveForever = saveForever;
            _this.redPropertyMap = {};
            if (!serverGate) {
                _this.mIsOpened = false;
            }
            return _this;
        }
        Object.defineProperty(Gate.prototype, "updateMethod", {
            //入口更新函数
            set: function (value) {
                this.mUpdateMethod = value;
                this.update();
            },
            enumerable: true,
            configurable: true
        });
        //通过函数更新入口属性
        Gate.prototype.update = function () {
            if (this.mUpdateMethod) {
                this.mUpdateMethod(this);
            }
        };
        //添加红点辅助参数(相当于与原始值||运算符计算)
        Gate.prototype.addRedProperty = function (name, value) {
            this.redPropertyMap[name] = value;
            this.updateRed();
        };
        Object.defineProperty(Gate.prototype, "isUnlock", {
            get: function () {
                if (this.lockType) {
                    return gateModel.guide[this.lockType] == 1;
                }
                return this.mIsUnlock;
            },
            //是否解锁了
            set: function (value) {
                this.mIsUnlock = gateModel.openAllGate ? true : value;
                if (this.lockType) {
                    gateModel.guide[this.lockType] = value ? 1 : 0;
                }
                this.updateShow();
                this.updateRed();
                this.unlock = this.isUnlock;
                if (value && parseInt(this.id) > 0) {
                    TsEngine.WindowManager.setOpen(parseInt(this.id), true);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Gate.prototype, "logicShow", {
            get: function () {
                return this.hasOwnProperty("mLogicShow") ? this.mLogicShow : this.isUnlock;
            },
            //数据逻辑是否显示
            set: function (value) {
                this.mLogicShow = value;
                this.updateShow();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Gate.prototype, "logicRed", {
            get: function () {
                var result = false;
                if (this.mLogicRed) {
                    result = true;
                }
                else {
                    for (var key in this.redPropertyMap) {
                        if (this.redPropertyMap[key]) {
                            result = true;
                            break;
                        }
                    }
                }
                return this.isUnlock && (result || !this.isOpened);
            },
            //数据逻辑红点
            set: function (value) {
                this.mLogicRed = value;
                this.updateRed();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Gate.prototype, "userRed", {
            get: function () {
                return this.mUserRed;
            },
            //用户自定义红点（用户主动设置之后的红点返回将以设置的值为准，否则通过dataRed自动判断）
            set: function (value) {
                this.mUserRed = value;
                this.updateRed();
            },
            enumerable: true,
            configurable: true
        });
        Gate.prototype.updateRed = function () {
            this.red = this.hasOwnProperty("mUserRed") ? this.mUserRed : this.logicRed;
        };
        Gate.prototype.updateShow = function () {
            if (gateModel.openAllGate) {
                this.show = true;
            }
            else {
                this.show = this.hideLock ? (this.isUnlock && this.logicShow) : this.logicShow;
            }
        };
        Object.defineProperty(Gate.prototype, "isOpened", {
            get: function () {
                if (this.serverGate) {
                    return gateModel.clearedBadges.indexOf(this.id) != -1;
                }
                return this.mIsOpened;
            },
            set: function (value) {
                if (this.mIsOpened != value) {
                    this.mIsOpened = value;
                    if (this.serverGate) {
                        gateModel.saveRed(this.id, this.saveForever);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Gate.prototype, "leftTime", {
            get: function () {
                return 0;
                // return this.clock ? Math.floor(this.clock.leftTime / 1000) : 0;
            },
            set: function (value) {
                // this.clock = TsEngine.TimerManager.addClock(this.id + "_Timer", value);
                // this.clock.registCallBack(this, () => {
                //     TsEngine.TimerManager.removeClock(this.id + "_Timer");
                //     this.logicShow = false;
                // });
            },
            enumerable: true,
            configurable: true
        });
        return Gate;
    }(TsEngine.Model));
    game.Gate = Gate;
    __reflect(Gate.prototype, "game.Gate");
    //功能合集入口类
    var GroupGate = (function (_super) {
        __extends(GroupGate, _super);
        function GroupGate(id, gates) {
            var _this = _super.call(this, id) || this;
            //是否显示入口(控制是否显示))
            _this.logicShow = true;
            _this.gates = gates;
            return _this;
        }
        Object.defineProperty(GroupGate.prototype, "red", {
            get: function () {
                for (var _i = 0, _a = this.gates; _i < _a.length; _i++) {
                    var gate = _a[_i];
                    if (gate.red) {
                        return true;
                    }
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        return GroupGate;
    }(Gate));
    game.GroupGate = GroupGate;
    __reflect(GroupGate.prototype, "game.GroupGate");
    //需要功能开放的功能类型
    var AcLockType;
    (function (AcLockType) {
        AcLockType[AcLockType["bet"] = 15] = "bet";
        AcLockType[AcLockType["octopus"] = 16] = "octopus";
        AcLockType[AcLockType["taptitans"] = 17] = "taptitans";
        AcLockType[AcLockType["mine"] = 18] = "mine";
        AcLockType[AcLockType["recruit"] = 19] = "recruit";
        AcLockType[AcLockType["guild"] = 20] = "guild";
        AcLockType[AcLockType["pet"] = 21] = "pet";
        AcLockType[AcLockType["shield"] = 22] = "shield";
        AcLockType[AcLockType["map"] = 23] = "map";
        AcLockType[AcLockType["achieve"] = 24] = "achieve";
        AcLockType[AcLockType["jisgaw"] = 25] = "jisgaw";
        AcLockType[AcLockType["inviteVip"] = 26] = "inviteVip";
        AcLockType[AcLockType["moneyBox"] = 27] = "moneyBox";
        AcLockType[AcLockType["invite"] = 28] = "invite";
        AcLockType[AcLockType["dailyRedBag"] = 29] = "dailyRedBag";
        AcLockType[AcLockType["dailyEnergy"] = 30] = "dailyEnergy";
        AcLockType[AcLockType["recall"] = 31] = "recall";
        AcLockType[AcLockType["allInOne"] = 32] = "allInOne";
        AcLockType[AcLockType["monthCard"] = 33] = "monthCard";
        AcLockType[AcLockType["betGuideSave"] = 34] = "betGuideSave";
        AcLockType[AcLockType["bet3"] = 35] = "bet3";
        AcLockType[AcLockType["bet4"] = 36] = "bet4";
        AcLockType[AcLockType["bet5"] = 37] = "bet5";
    })(AcLockType = game.AcLockType || (game.AcLockType = {}));
})(game || (game = {}));
var gateModel;
//# sourceMappingURL=GateModel.js.map