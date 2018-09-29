var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by liyang on 16/9/21.
 */
var game;
(function (game) {
    var ServerMsg = (function () {
        function ServerMsg() {
        }
        ServerMsg.LOGIN = "/game/basic/login"; //登录params:{uid:number}
        ServerMsg.ROLLER = "/game/roller/roll"; //转盘params:{uid:number}
        ServerMsg.ISLAND_SHARE = "/game/island/share"; //过岛分享params: {uid:number}
        ServerMsg.BUILD = "/game/island/build"; //建造params: {uid:number,island:number,building:number,level:number}
        ServerMsg.REPAIR = "/game/island/repair"; //建造params: {uid:number,island:number,building:number}
        ServerMsg.SHOW_ISLAND = "/game/island/show"; //查询岛的信息params: {uid:number,fid:number}
        ServerMsg.ATTACK = "/game/pvp/attack"; //攻击params: {uid:number,puid:number,building:number}
        ServerMsg.STEAL = "/game/pvp/steal"; //偷取params: {uid:number,idx:number}
        ServerMsg.SHARE = "/game/friend/share-reward"; //分享params: {uid:number}
        ServerMsg.SHARE_COIN_REWARD = "/game/friend/share-coin-reward"; //分享params: {uid:number}
        ServerMsg.SHARE_WX_COIN_REWARD = "/game/sharecoinbox/open"; //微信小游戏点击别人金币分享领取奖励params: {owner:number,uid:number,boxId:string}
        ServerMsg.SHOW_DONATE = "/game/friend/show-donate"; //好友列表params: {uid:number}
        ServerMsg.DONATE = "/game/friend/donate"; //互送领取params: {uid:number,fid:number}
        ServerMsg.FRIEND_RANK = "/game/rank/friend"; //好友排行榜params: {uid:number}
        ServerMsg.WORLD_RANK = "/game/rank/world"; //世界排行榜params: {uid:number}
        ServerMsg.ENEMY_RANK = "/game/rank/enemy"; //仇人排行榜params: {uid:number}
        ServerMsg.VENGEANCE_RANK = "/game/rank/vengeance"; //复仇表params: {uid:number}
        ServerMsg.MESSAGE = "/game/basic/message"; //消息列表params: {uid:number, onlyNew:boolean}
        ServerMsg.FRIEND_REWARD = "/game/friend/friend-reward"; //领取好友分享奖励 params: {uid:number,fid:number}
        ServerMsg.RECALL_REWARD = "/game/friend/recall-reward"; //领取好友召回奖励 params: {uid:number,fid:number}
        ServerMsg.TUTORIAL = "/game/basic/tutorial"; //完成新手引导 params: {uid:number,step:number}
        ServerMsg.ROBOT = "/game/basic/robot"; //随机机器人 params: {uid:number}
        ServerMsg.SHOP_ORDER = "/game/shop/order"; //生成订单 params: {uid:number,goodsId:number}
        ServerMsg.SHOP_LIST = "/game/shop/list"; //请求商品列表 params: {uid:number}
        ServerMsg.WANTED = "/game/pvp/wanted"; //通缉 params: {uid:number,eid:number}
        ServerMsg.SETTING = "/game/basic/setting"; //请求商品列表 params: {uid:number,forbiddenPush:boolean}
        ServerMsg.MAP = "/game/island/map"; //地图 params: {uid:number}
        ServerMsg.WORLD_MAP = "/game/island/world-map"; //世界地图 params: {uid:number}
        ServerMsg.MINER = "/game/island/miner"; //购买矿工 params: {uid:number， island:number, miner:number}
        ServerMsg.COLLECT = "/game/island/collect"; //后去岛屿钱箱 params: {uid:number}
        ServerMsg.SUBSCRIBE_REWARD = "/game/friend/subscribe-reward"; //领取关注奖励 params: {uid:number}
        ServerMsg.SUBSCRIBE_SET = "/game/friend/set-subscribed"; //设置关注 params: {uid:number}
        ServerMsg.SHOW_FRIEND_REWARD = "/game/friend/show-friend-reward"; //邀请奖励show params: {uid:number} get
        ServerMsg.MONTHCARD_REWARD = "/game/friend/monthcard-reward"; //领取关注奖励 params: {uid:number}
        ServerMsg.COUPONS = "/game/basic/coupons"; //兑换码 params: {uid:number, code:string}
        ServerMsg.LOGIN_REWARD = "/game/friend/login-reward"; //登录奖励 params: {uid:number}
        ServerMsg.TARGET_REWARD = "/game/friend/target-reward"; //登录奖励 params: {uid:number}
        ServerMsg.DAILY_ENTER = "/game/friend/daily-reward-enter"; //每日登录入口
        ServerMsg.DAILY_REWARD = "/game/friend/daily-reward"; //签到奖励 params: {uid:number}
        ServerMsg.JIGSAW_UPDATE = "/game/jigsaw/update"; //拼图 params: {uid:number,idx:number,isLoad:boolean}
        ServerMsg.JIGSAW_COMPOSE = "/game/jigsaw/compose"; //拼图 params: {uid:number}
        ServerMsg.JIGSAW_DONATE = "/game/jigsaw/donate"; //赠送好友 params: {uid:number, fid:number, idx:number}
        ServerMsg.JIGSAW_LOG = "/game/jigsaw/log"; //消息 params: {uid:number}
        ServerMsg.JIGSAW_REPORT = "/game/jigsaw/report"; //举报 params: {uid:number，logId:number} {code:"string"}
        ServerMsg.JIGSAW_RECEIVE = "/game/jigsaw/receive"; //领取好友赠送的碎片 params: {uid:number，logId:number,password:number}
        ServerMsg.FRIEND_DEL = "/game/friend/del"; //删除好友 params: {uid:number,fid:number}
        ServerMsg.FRIEND_VERIFY = "/game/friend/verify"; //审核好友 params: {uid:number,fid:number,isAgree:boolean}
        ServerMsg.OPEN_MAIL = "/game/basic/open-mail"; //打开邮件 params: {uid:number,mid:number,getGoods:boolean}
        ServerMsg.SEND_MAIL = "/game/basic/send-mail"; //发送邮件 params: {uid:number,fid:number,title:string,content:string}
        ServerMsg.GET_ACTIVITIES = "/game/activity/getactivities"; //活动
        ServerMsg.CONNONCONTEST_RANK = "/game/rank/connoncontestrank"; //炮王排行榜 params:{uid:number}
        ServerMsg.GET_CONNONCONTEST_RANK_AWARD_CONF = "/game/activity/getcannonrankawardconf"; //炮王排行奖励配置
        ServerMsg.GET_CONNON_SCORE_AWARD_INFO = "/game/activity/getcannonscoreawardinfo"; //炮王奖励配置 params:{uid:number}
        ServerMsg.GET_CONNON_SCORE_AWARD = "/game/activity/gaincannonscoreaward"; //炮王领奖 params:{uid:number, index:number}
        ServerMsg.ISLAND_PROTECT = "/game/island/protect"; //迷你盾 params:{uid:number, building:number}
        ServerMsg.BLACKLISTS = "/game/basic/blacklists"; //设置邮件黑名单 params:{uid:number, mid:number, isBan:boolean}
        ServerMsg.SET_POSITION = "/game/basic/set-position"; //设置个人信息 params:{uid:number, province:number, city:number, constellation:number}
        // static SHOW_MONOPOLY =  "/game/activity/show-monopoly";//大富翁活动
        // static GO_MONOPOLY =  "/game/activity/go-monopoly";//大富翁活动
        // static REWARD_MONOPOLY =  "/game/activity/reward-monopoly";//大富翁活动领取奖励
        ServerMsg.DISPLAY_FRIEND = "/game/island/display-friend"; //世界地图好友展示
        ServerMsg.SHOW_XMAS = "/game/activity/show-xmas"; //世界地图好友展示
        ServerMsg.XMAS_REWARD = "/game/activity/xmas-reward"; //世界地图好友展示
        ServerMsg.TREASURE_SHOW = "/game/treasure/show"; //海盗宝箱showparams:{uid:number}
        ServerMsg.TREASURE_LOG = "/game/treasure/log"; //海盗宝箱log接口params:{uid:number, tid:number}
        ServerMsg.TREASURE_REWARD = "/game/treasure/reward"; //海盗宝箱领奖接口params:{uid:number, tid:number}
        ServerMsg.TREASURE_SHARE_REWARD = "/game/treasure/share-reward"; //海盗宝箱分享接口params:{uid:number}
        //扭蛋
        // static GASHAPON_SHOW =  "/game/pokegoo/show";//扭蛋show接口 get
        // static GASHAPON_DRAW =  "/game/pokegoo/draw";//扭蛋draw接口 post
        // static GASHAPON_DONATE =  "/game/pokegoo/donate";//扭蛋draw接口 post {uid:number, fid:number, idx:number, password:number}
        // static GASHAPON_LOG =  "/game/pokegoo/log";//扭蛋draw接口 post {uid:number}
        // static GASHAPON_RECEIVE =  "/game/pokegoo/receive";//扭蛋领取接口 post {uid:number, logId:number, password:number}
        // static GASHAPON_REWARD =  "/game/pokegoo/reward";//扭蛋领取接口 post {uid:number, logId:number, password:number}
        // static GASHAPON_REPORT =  "/game/pokegoo/report";//扭蛋举报接口 post {uid:number, logId:number}
        //宠物信息
        ServerMsg.PET_COOKIE = "/game/pet/cookie"; //吃个饼干 params: {uid:number,petName:string}
        ServerMsg.PET_POTION = "/game/pet/potion"; //吃个经验药水 params: {uid:number,petName:string}
        ServerMsg.PET_HATCH = "/game/pet/hatch"; //孵化一个宠物蛋 params: {uid:number,petName:string,useFinishHatch:boolean}
        ServerMsg.PET_SHOW = "/game/pet/show"; //显示所有宠物信息 params: {uid:number}
        ServerMsg.PET_SWITCH = "/game/pet/switch"; //上阵一个宠物 params: {uid:number,petName:string}
        ServerMsg.PET_UPGRADE = "/game/pet/upgrade"; //升级一个宠物 params: {uid:number,petName:string}
        ServerMsg.ISLAND_REWARD = "/game/island/reward"; //领取岛屿奖励 params: {uid:number}
        ServerMsg.FRIEND_JOIN = "/game/friend/join"; //加好友 params: {uid:number,code:string,message:string}
        //副本打怪兽
        ServerMsg.KILLTITAN_ENTER_TITAN = "/game/killtitan/enter-titan"; //进入打怪兽界面 params: {uid:number}
        ServerMsg.KILLTITAN_OPEN_TITAN = "/game/killtitan/open-titan"; //唤醒一个怪物 params: {uid:number}
        ServerMsg.KILLTITAN_ATTACK_TITAN = "/game/killtitan/attack-titan"; //攻击一个怪物 params: {uid:number,tid:number(怪ID),damage:number}
        //static KILLTITAN_AWARD_LIST =  "/game/killtitan/reward-list";          //奖励列表 params: {uid:number}
        ServerMsg.KILLTITAN_GAIN_TITAN_AWARD = "/game/killtitan/gain-award"; //领取一个奖励 params: {uid:number,tid:number(怪ID)}
        ServerMsg.KILLTITAN_LIST = "/game/killtitan/list"; //怪兽列表的好友列表 params: {uid:number}
        ServerMsg.KILLTITAN_INVITE = "/game/killtitan/invite"; //邀请好友过来打怪兽 params: {uid:number,friendIds:number[]}
        //static KILLTITAN_EXIT =  "/game/killtitan/exittitan";                     //退出打怪兽 params: {uid:number}
        ServerMsg.KILLTITAN_GAIN_ALL_AWARD = "/game/killtitan/gainalltitanaward"; //领取所有奖励 params: {uid:number}
        ServerMsg.KILLTITAN_SHARE_REWARD = "/game/killtitan/share-reward"; //打怪兽分享 params: {uid:number}
        ServerMsg.KILLTITAN_GET_PLAYER_SIMLE_INFO = "/game/basic/simple-player"; //查人 params: {uid:number,ids:number[]}
        //宝箱
        ServerMsg.OPEN_TREASURE = "/game/treasure/open"; //开启宝箱 {uid,tid.code,version}
        //飞升礼包
        ServerMsg.SPEED_GIFT = "/game/shop/speed-gift"; //飞升礼包 {uid:number}
        //月饼
        // static MOONCAKE_SHOW =  "/game/mooncake/show"; //show {uid:number}
        // static MOONCAKE_SHARE =  "/game/mooncake/share"; //share {uid:number}
        // static MOONCAKE_ENTER =  "/game/mooncake/enter";//share {uid:number,cakeId:number}
        // static MOONCAKE_OPEN =  "/game/mooncake/open"; //开月饼礼盒 {uid:number,fid:number,idx:number,cakeId:number}    post
        // static MOONCAKE_REWARD =  "/game/mooncake/reward"; //开月饼礼盒 {uid:number,rid:number}    post
        // static MOONCAKE_LOGS =  "/game/mooncake/logs"; //log {uid:number}
        // static MOONCAKE_DONATE =  "/game/mooncake/donate"; //赠送 {uid:number,fix:number,idx:number,password:number}
        // static MOONCAKE_RECEIVE =  "/game/mooncake/receive"; //{uid:number,logId:number,password:number}
        // static MOONCAKE_REPORT =  "/game/mooncake/report"; //{uid:number,logId:number}
        //大章鱼
        ServerMsg.OCTOPUS_SHOW = "/game/octopus/show"; //查询章鱼的数据 {uid:number}
        ServerMsg.OCTOPUS_ENTER = "/game/octopus/enter"; //enter {uid:number，fid:number}
        ServerMsg.OCTOPUS_OPEN = "/game/octopus/open"; //{uid:number,fid:number,idx:number}
        ServerMsg.OCTOPUS_LOG = "/game/octopus/log"; //log {uid:number}
        ServerMsg.OCTOPUS_RECEIVE = "/game/octopus/receive"; //{uid:number,logId:number,password:number}
        ServerMsg.OCTOPUS_REPORT = "/game/octopus/report"; //{uid:number,logId:number}
        ServerMsg.OCTOPUS_REWARD = "/game/octopus/reward"; // {uid:number,rid:number}
        ServerMsg.OCTOPUS_DONATE = "/game/octupos/donate"; //赠送 {uid:number,fix:number,idx:number,password:number}
        ServerMsg.OCTOPUS_LIST = "/game/octopus/list"; //赠送 {uid:number,fix:number,idx:number,password:number}
        ServerMsg.OCTOPUS_REFRESH = "/game/octopus/refresh"; //赠送 {uid:number,fix:number,idx:number,password:number}
        ServerMsg.OCTOPUS_LOOK_REWARD = "/game/octopus/look-treasure-reward"; //看视频礼物 {uid:number}
        ServerMsg.OCTOPUS_TREASURE_ENTER = "/game/octopus/treasure-enter"; //进入河豚弹宝箱 {uid:number,fid:number,token:string}    get
        ServerMsg.OCTOPUS_TREASURE_OPEN = "/game/octopus/treasure-open"; //开启河豚弹宝箱 {uid:number,fid:number,idx:number}    post
        ServerMsg.OCTOPUS_TREASURE_REWARD = "/game/octopus/treasure-reward"; //领取河豚弹宝箱奖励 {uid:number}    post
        //公会
        ServerMsg.GUILD_CREATE = "/game/guild/create"; //创建公会 {uid:number,name:string,icon:number,mode:number,crown:number}
        ServerMsg.GUILD_LIST = "/game/guild/list"; //公会列表 {uid:number}
        ServerMsg.GUILD_JOIN = "/game/guild/join"; //公会申请 {uid:number, gid:number}
        ServerMsg.GUILD_SEND_MESSAGE = "/game/guild/send-message"; //公会聊天发送 {uid:number, content:string}
        ServerMsg.GUILD_SEARCH = "/game/guild/search"; //搜索公会 {uid:number, gid:number}
        ServerMsg.GUILD_SHOW = "/game/guild/show"; //进入公会 {uid:number, gid:number}
        ServerMsg.GUILD_SHOW_DONATE = "/game/guild/show-donate"; //进入公会 {uid:number}
        ServerMsg.GUILD_REQUEST_DONATE = "/game/guild/request-donate"; //进入公会 {uid:number, type:string,slot:number,num:number}
        ServerMsg.GUILD_CANCEL_DONATE = "/game/guild/cancel-donate"; //进入公会 {uid:number, slot:number}
        ServerMsg.GUILD_RESPONSE_DONATE = "/game/guild/response-donate"; //进入公会 {uid:number, fid:number, slot:number}
        ServerMsg.GUILD_RECEIVE_DONATE = "/game/guild/receive-donate"; //进入公会 {uid:number, slot:number}
        ServerMsg.GUILD_SETTING = "/game/guild/setting"; //修改公会公告信息 {uid:number, notice:string, icon:number, mode:number, crown:number}
        ServerMsg.GUILD_AUTHORIZE = "/game/guild/authorize"; //公会职务授权 {uid:number, fid:string, authority:number}
        ServerMsg.GUILD_QUIT = "/game/guild/quit"; //退出公会 {uid:number, fid:string}
        ServerMsg.GUILD_JOIN_REQUEST = "/game/guild/join-request"; //公会申请列表 {uid:number}
        ServerMsg.GUILD_VERIFY = "/game/guild/verify"; //公会申请审核 {uid:number, fid:number, isAccept:boolean}
        ServerMsg.GUILD_DAILY_SIGN = "/game/guild/daily-sign"; //领取公会每日签到 {uid:number}
        ServerMsg.GUILD_TASK_LIST = "/game/guild/task-list"; //公会任务列表{uid:number}
        ServerMsg.GUILD_TASK_REWARD = "/game/guild/task-reward"; //领取公会任务奖励{uid:number, tid:number}
        ServerMsg.GUILD_SHOP_LIST = "/game/guild/shop-list"; //公会商店{uid:number}
        ServerMsg.GUILD_SHOP_AWARD = "/game/guild/shop-award"; //公会商店兑换{uid:number,goodsId:string}
        ServerMsg.GUILD_SHOW_DAILY_WELFARE = "/game/guild/show-daily-welfare"; //公会每日福利{uid:number}
        ServerMsg.GUILD_GOT_ATTENDANCE_REWARD = "/game/guild/got-attendance-reward"; //领取每日福利{uid:number,idx:number}
        ServerMsg.GUILD_GOT_FEEDBACK_REWARD = "/game/guild/got-feedback-reward"; //领取每日福利{uid:number,orderId:number,idx:number}
        ServerMsg.GUILD_RENAME = "/game/guild/rename"; //领取每日福利{uid:number,name:string}
        ServerMsg.GUILD_RECRUIT = "/game/guild/recruit"; //海盗团招募{uid:number,content:string}
        ServerMsg.GUILD_ACTIVITY_RECRUIT_SHOW = "/game/guildActivity/recruit-show"; //海盗团活动招募{uid:number} get
        ServerMsg.GUILD_ACTIVITY_RECRUIT_REWARD = "/game/guildActivity/recruit-reward"; //海盗团活动招募{uid:number,idx:number} get
        //红包
        ServerMsg.CASH_COUNTER = "/game/cash/cash-counter"; //红包剩余数量{source:string}
        ServerMsg.CASH_SHOW = "/game/cash/show"; //红包活动show{uid:number}
        ServerMsg.CASH_ROLL = "/game/cash/roll"; //红包转盘{uid:number, isTen:boolean}
        ServerMsg.CASH_WITHDRAW = "/game/cash/withdraw"; //红包提现{uid:number}
        ServerMsg.OPEN_LETTER = "/game/cash/open-letter"; //开启一个红包 {uid:number}
        ServerMsg.CASH_RANK = "/game/cash/rank"; //红包排行榜 {uid:number}
        ServerMsg.CASH_SHARE = "/game/cash/share-cash"; //红包分享 {uid:number}
        ServerMsg.CASH_LIST_INVITE = "/game/cash/list-invite"; //红包-邀请列表 {uid:number}
        ServerMsg.CASH_OPEN_INVITE = "/game/cash/open-invite"; //假期邀请红包 {uid:number， rewardKey:number}
        ServerMsg.CASH_SHARE_INVITE = "/game/cash/share-invite"; //假期邀请红包 {uid:number， rewardKey:number}
        ServerMsg.CASH_INVITE_SHOP = "/game/cash/invite-shop"; //邀请红包商店 {uid:number} get
        ServerMsg.CASH_INVITE_ORDER = "/game/cash/invite-order"; //邀请红包购买 {uid:number, goodsId:string} post
        ServerMsg.CASH_INVITE_WITHDRAW = "/game/cash/invite-withdraw"; //邀请红包提现 {uid:number} post
        //帆船赛race
        ServerMsg.RACE_ARENA_DETAIL = "/game/race/arena-detail"; // 展示工会帆船赛比分详情{uid:number}  get
        ServerMsg.RACE_CLOSE_TASK = "/game/race/close-task"; // 关闭工会帆船赛任务{uid:number}    post
        ServerMsg.RACE_ENROLL = "/game/race/enroll"; // 工会帆船赛报名{uid:number}  post
        ServerMsg.RACE_EXECUTE_TASK = "/game/race/execute-task"; // 认领工会帆船赛任务{uid:number, tid:Lnumber}   post
        ServerMsg.RACE_MEMBER_DETAIL = "/game/race/member-detail"; // 展示工会帆船赛积分详情{uid:number}    get
        ServerMsg.RACE_SHOW = "/game/race/show"; // 查询工会帆船赛{uid:number}  get
        ServerMsg.RACE_TASK_DETAIL = "/game/race/task-detail"; // 展示工会帆船赛任务详情{uid:number}  get
        ServerMsg.RACE_TEARUP_TASK = "/game/race/tearup-task"; // 撕毁工会帆船赛任务{uid:number, tid:number}  post
        ServerMsg.RACE_TROPHY_DETAIL = "/game/race/trophy-detail"; // 展示工会帆船赛奖杯详情{uid:number, gid:number,type:string}  type : [gold|silver|copper] get
        ServerMsg.RACE_RANK = "/game/race/rank"; // 显示工会帆船赛排行榜{uid:number}  get
        ServerMsg.RACE_RANK_REWARD = "/game/race/rank-reward"; // 领取工会帆船赛排名奖励{uid:number}  post
        ServerMsg.RACE_SCORE_REWARD = "/game/race/score-reward"; // 领取工会帆船赛排名奖励{uid:number,idx:number}  post
        ServerMsg.RACE_REWARD_DETAIL = "/game/race/reward-detail"; // 展示工会帆船赛奖励详情{uid:number}  get
        ServerMsg.RACE_CONTRIBUTIONS = "/game/race/contributions"; // 查询积分{uid:number}  get
        ServerMsg.RACE_SUPPLY_DETAIL = "/game/race/supply-detail"; // 查询积分{uid:number}  get
        ServerMsg.RACE_SUPPLY_BUY = "/game/race/supply-buy"; // 查询积分{uid:number, id:number}  post
        ServerMsg.RACE_SUPPLY_CONTRIBUTIONS = "/game/race/supply-contributions"; // 查询积分{uid:number}  get
        //聊天
        ServerMsg.CHAT_PRIVATE_DETAIL = "/game/chat/private-detail"; // 查询个人聊天详情{uid:number,fid:number, readTime:number}  get
        ServerMsg.CHAT_PRIVATE_LIST = "/game/chat/private-list"; // 查询个人聊天列表{uid:number}  get
        ServerMsg.CHAT_SEND_PRIVATE_MSG = "/game/chat/send-private-msg"; // 发送一条个人消息{uid:number,fid:number, content:string}  post
        ServerMsg.CHAT_SEND_WORLD_MSG = "/game/chat/send-world-msg"; // 发送一条世界消息{uid:number, content:string}  post
        ServerMsg.CHAT_SHOW_WORLD = "/game/chat/show-world"; // 查询世界聊天消息{uid:number}  get
        ServerMsg.CHAT_PRIVATE_DELETE = "/game/chat/delete-private-msg"; // 删除个人聊天记录{uid:number, fid:number}  get
        ServerMsg.CHAT_BLACKLIST = "/game/chat/blacklist"; // 设置黑名单{uid:number, fid:number,isBan:number}  post
        ServerMsg.CHAT_READ_PRIVATE_MSG = "/game/chat/read-private-msg"; // 设置读取一个人消息时间{uid:number, fid:number}  post
        ServerMsg.CHAT_REPORT = "/game/chat/report"; // 设置读取一个人消息时间{uid:number, fid:number}  post
        //显示玩家详细信息
        ServerMsg.MORE_PLAYER = "/game/basic/more-player"; // 查询个人信息{uid:number, fid:number,checksum:number-判断是否能获取信息,algorithm:string,showDetails:boolean}  get
        ServerMsg.SETTING_SHOW = "/game/basic/setting-show"; // 查询setting信息{uid:number}  get
        ServerMsg.FRIEND_CLEAR = "/game/friend/clear"; // 清空好友申请列表{uid:number}  post
        ServerMsg.REWARD_INVITE_FRIEND = "/game/activity/reward-invite-friend"; // 领取邀请好友活动奖励{uid:number,day:string}  post
        ServerMsg.REWARD_INVITE_GIFT = "/game/activity/reward-invite-gift"; // 获取邀请奖励礼包{uid:number}  post
        ServerMsg.REWARD_INVITE_MONEY = "/game/activity/reward-invite-money"; // 获取邀请金币宝箱{uid:number}  post
        //邀请送VIP
        ServerMsg.INVITE_FRIEND_VIP = "/game/activity/invite-friend-vip"; // 查看邀请好友{uid:number}  get
        ServerMsg.INVITE_FRIEND_VIP_REWARD = "/game/activity/invite-friend-vip-reward"; // 领取邀请好友VIP奖励{uid:number}  post
        //暮光海岸
        ServerMsg.BEACH_ENTER = "/game/beach/enter"; // 查看邀请好友{uid:number, fid:number}  post
        ServerMsg.BEACH_SHOW_COLLECTION = "/game/beach/show-collection"; // 收藏家界面显示{uid:number}  get
        ServerMsg.BEACH_REPORT = "/game/beach/report"; // 举报赠送collection{uid:number, logId:number}  post
        ServerMsg.BEACH_DONATE = "/game/beach/donate"; // 收藏家界面赠送{uid:number, fid:number,cid:number,password:number}  post
        ServerMsg.BEACH_RECIEVE = "/game/beach/recieve"; // 收藏家界面领取{uid:number, logId:number,password:number}  post
        ServerMsg.BEACH_REWARD = "/game/beach/reward"; // 收藏家界面领取奖励{uid:number, rid:number}  post
        ServerMsg.BEACH_REFRESH_RECIPE = "/game/beach/refresh-recipe"; // 收藏家界面刷新订单{uid:number, rid:number}  post
        ServerMsg.BEACH_LOGS = "/game/beach/logs"; // 收藏家界面查看消息{uid:number, fid:number}  get
        ServerMsg.BEACH_COLLECT = "/game/beach/collect"; // 收集一个收藏品 {uid:number, fid:number, idx:number, sailor:number}  post
        ServerMsg.BEACH_UPGRADE_SAILOR = "/game/beach/upgrade-sailor"; // 领取临时水手 {uid:number, idx:number}  post
        ServerMsg.BEACH_SPEEDUP = "/game/beach/speed-up"; // 加速寻宝 {uid:number}  post
        ServerMsg.BEACH_SAILOR = "/game/beach/sailor"; // 水手管理 {uid:number}  get
        ServerMsg.BEACH_REFRESH = "/game/beach/refresh"; // 刷新一个玩家的海岸 {uid:number}  post
        ServerMsg.BEACH_MESSAGE = "/game/beach/message"; // 查看收藏品消息 {uid:number}  get
        ServerMsg.BEACH_FRIEND = "/game/beach/friend"; // 拜访好友列表 {uid:number}  get
        ServerMsg.BEACH_UPGRADE_RECIPE_SAILOR = "/game/beach/upgrade-recipe-sailor"; // 领取订单页临时水手 {uid:number}  post
        ServerMsg.BEACH_CHEER = "/game/beach/cheer"; // 助威 {uid:number, fid:number, tid:number}  post
        ServerMsg.BEACH_CHECK_NEW_ARRIVAL = "/game/beach/check-new-arrival"; // 助威 {uid:number, fid:number, idx:number}  post
        ServerMsg.BEACH_SHARE_REWARD = "/game/beach/share-reward"; // 沙滩分享接口 {uid:number}  post
        ServerMsg.BEACH_ENEMY = "/game/beach/enemy"; // 仇人列表 {uid:number}  get
        ServerMsg.BEACH_EXCHANGE = "/game/beach/exchange"; // 收藏家界面兑换金块奖励{uid:number}  post
        ServerMsg.BEACH_POTION = "/game/beach/potion"; // 使用经验药水{uid:number, ownerId:number}  post
        ServerMsg.BEACH_COLLECT_SHIPWRECK = "/game/beach/collect-shipwreck"; // {uid:number, ownerId:number,sailor:number,collectOwner:false}  post
        ServerMsg.BEACH_SHOW_GIFT = "/game/beach/show-gift"; // {uid:number, ownerId:number}  get
        ServerMsg.BEACH_INVITE_REWARD = "/game/beach/invite-reward"; // {uid:number}  post
        ServerMsg.BEACH_POTION_SHIPWRECK = "/game/beach/potion-shipwreck"; // 使用经验药水{uid:number, ownerId:number}  post
        ServerMsg.BEACH_CHEER_SHIPWRECK = "/game/beach/cheer-shipwreck"; // 使用经验药水{uid:number, ownerId:number}  post
        //领取每日公众号奖励
        ServerMsg.MENU_REWARD = "/game/friend/menu-reward"; // {uid:number}  post
        //交换物品
        ServerMsg.SWAP_REQUEST = "/game/swap/request"; // {uid:number, fid:number, usedType:string, usedNum:number, needType:string, needNum:number}  post
        ServerMsg.SWAP_SHOW = "/game/swap/show"; // {uid:number, fid:number}  get
        ServerMsg.SWAP_CANCEL = "/game/swap/cancel"; // {uid:number, fid:number}  post
        ServerMsg.SWAP_RESPONSE = "/game/swap/response"; // {uid:number, fid:number, isAgree:number}  post
        ServerMsg.SWAP_RECEIVE = "/game/swap/receive"; // {uid:number, fid:number}  post
        ServerMsg.BASIC_CHECK_BAG = "/game/basic/check-bag"; // {uid:number}  post
        //新手成就
        ServerMsg.ACHIEVEMENT_SHOW = "/game/achievement/show"; // {uid:number}  GET
        ServerMsg.ACHIEVEMENT_REWARD = "/game/achievement/reward"; // {uid:number, idx:number}  POST
        ServerMsg.ACHIEVEMENT_NEXT = "/game/achievement/next"; // {uid:number}  POST
        //国庆起球活动
        // static BALLOON_AWARD =  "/game/activity/balloon-award"; // {uid:number, level:string}  post
        // static FESTIVAL_TASK_AWARD =  "/game/activity/festival-task-award"; // {uid:number, idx:number}  post idx :1,2,3
        //获取用户头像 for webgl
        ServerMsg.USER_ICON = "https://wx.TsEngine.net/gc/user-icon"; //获取头像 params: {openId:string}
        //神秘商人
        ServerMsg.SHOP_MYSTICAL_LIST = "/game/shop/mystical-list"; //请求商品列表 params: {uid:number} GET
        ServerMsg.SHOP_MYSTICAL_ORDER = "/game/shop/mystical-order"; //请求商品列表 params: {uid:number, goodsId:string} POST
        ServerMsg.SHOP_MYSTICAL_ORDER_FREE = "/game/shop/mystical-order-free"; //请求商品列表 params: {uid:number, goodsId:string} POST
        ServerMsg.SHOP_MYSTICAL_ROLL = "/game/shop/mystical-roll"; //请求商品列表 params: {uid:number, goodsId:string} POST
        //前期引导过程中，各个活动入口按钮的出现
        ServerMsg.BASIC_GUIDE = "/game/guide/update"; // {uid:number, index:number}  POST
        ServerMsg.GUIDE_ACTIVITY = "/game/guide/activity"; // {uid:number}  get
        //周年庆
        // static ANNUAL_COLLECT_SYNC =  "/game/annualcollect/sync";//周年庆字卡赠送 params: {uid:number} GET
        // static ANNUAL_COLLECT_DONATE =  "/game/annualcollect/donate";//周年庆字卡赠送 params: {uid:number, fid:number, idx:number, passwork:number} POST
        // static ANNUAL_COLLECT_LOGS =  "/game/annualcollect/logs";//周年庆字卡logs params: {uid:number} GET
        // static ANNUAL_COLLECT_RECEIVE =  "/game/annualcollect/receive";//周年庆字卡领取 params: {uid:number, logId:number, passwork:number} POST
        // static ANNUAL_COLLECT_REPORT =  "/game/annualcollect/report";//周年庆字举报 params: {uid:number, logId:number} POST
        // static ANNUAL_COLLECT_REWARD =  "/game/annualcollect/reward";//周年庆字卡兑换奖励 params: {uid:number, rid:number} POST
        // static ANNUAL_COLLECT_SHOW =  "/game/annualcollect/show";//周年庆分享字卡show params: {uid:number, ownerId:number, boxId:number} POST
        // static ANNUAL_COLLECT_OPEN =  "/game/annualcollect/open";//周年庆分享字卡show params: {uid:number, fid:number, idx:number, boxId:number} POST
        ServerMsg.ANNUAL_BALLOON_REWARD = "/game/annual/reward-balloon"; //周年庆气球奖励 params: {uid:number, share:boolean} POST
        // static ANNUAL_REBATE_REWARD =  "/game/annual/reward-rebate";//周年庆超值返利 params: {uid:number, type:string, level:number} POST
        // static ANNUAL_GIFT_ORDER =  "/game/activity/annual-gift-order";//周年庆超值返利 params: {uid:number, idx:number} POST
        // static ANNUAL_SYNC =  "/game/annual/sync";//周年庆数据同步 params: {uid:number} GET
        // static ANNUAL_OPEN_LUCKY_BOX =  "/game/annual/open-lucky-box";//周年庆许愿瓶许愿 params: {uid:number, useFree:booleab} POST
        // static ANNUAL_OPEN_LUCKY_BOX2 =  "/game/annual/open-lucky-box2";//周年庆许愿瓶宝箱 params: {uid:number, dix:number} POST
        // static ANNUAL_BALLOON_TREASURE_REWARD =  "/game/annual/reward-treasure-balloon";//小游戏点击气球分享获得奖励 params: {uid:number, fid:number, tid:number} POST
        //树
        ServerMsg.TREE_ENTER = "/game/tree/enter"; //圣诞树进入某个家 {uid:number,fid:number}  POST
        ServerMsg.TREE_FILL = "/game/tree/fill"; //圣诞树装饰 {uid:number,fid:number,slot:number(1~7)}  POST 
        ServerMsg.TREE_REWARD = "/game/tree/reward"; //圣诞树礼包奖励 {uid:number}  POST 
        ServerMsg.TREE_HELP_ME = "/game/tree/help-me"; //圣诞树求助 {uid:number}  POST 
        ServerMsg.TREE_FRIEND = "/game/tree/friend"; //圣诞树援助接口 {uid:number}  get 
        ServerMsg.TREE_LOGS = "/game/tree/logs"; //圣诞树消息接口 {uid:number}  get 
        ServerMsg.TREE_HELPOTHERS = "/game/tree/helpOthers"; //帮助别人 {uid:number,fid:number}  POST 
        ServerMsg.TREE_READSHAREHELPLOG = "/game/tree/readShareHelpLog"; //已读消息 {uid:number,logId}  POST 
        // 风筝
        ServerMsg.KITE_ENTER = "/game/kite/enter"; //放风筝进入某个家 {uid:number,fid:number}  POST
        ServerMsg.KITE_MAKE = "/game/kite/make"; //制作风筝 {uid:number, id:number}  POST
        ServerMsg.KITE_GIFT_OPEN = "/game/kite/open"; //风筝礼包奖励 {uid:number}  POST 
        ServerMsg.KITE_HELP_ME = "/game/tree/help-me"; //风筝求助求助 {uid:number}  POST 
        ServerMsg.KITE_LOGS = "/game/kite/help-logs"; // 风筝消息接口 {uid:number}  POST 
        ServerMsg.KITE_MATERIAL_LOGS = "/game/kite/material-logs"; // 风筝消息接口 {uid:number}  POST 
        ServerMsg.KITE_DONATE = "/game/kite/donate"; //赠送好友 params: {uid:number, fid:number, idx:number, password:number} POST
        ServerMsg.KITE_RECV = "/game/kite/receive"; //接收好友赠送 params: {uid:number, logId:number, password:number} POST
        ServerMsg.KITE_REPORT = "/game/kite/report"; // 举报赠送collection{uid:number, logId:number}  post
        // 老船长召回
        ServerMsg.RECALL_ENTER = "/game/recall/enter"; //进入召回界面-通过他人分享/自己点击 {uid:number,fid:number}  POST
        ServerMsg.RECALL_SHARE_AWARD = "/game/recall/shareAward"; //分享成功奖励 {uid:number}  POST
        ServerMsg.RECALL_SUC_LOG = "/game/recall/successLog"; //成功召回总用户列表 {uid:number}  POST
        ServerMsg.RECALL_ALL_LOG = "/game/recall/allLog"; // 邀请的总列表（包含失败的） {uid:number}  POST 
        ServerMsg.RECALL_TAKE_GUIDER_REWARD = "/game/recall/guiderGetAward"; // 领取奖励{uid:number, fid:number, type:number 1-邀请奖励 2-别人完成任务奖励}  POST 
        ServerMsg.RECALL_TAKE_TASK_REWARD = "/game/recall/getTaskAward"; // 被邀请者领取任务奖励{uid:number, fid:number}  POST 
        //新年活动
        ServerMsg.NEWYEAR_SYNC = "/game/newYear/sync"; //新年活动入口接口 {uid:number}  get 
        ServerMsg.NEWYEAR_SHOW_BLESSINGS = "/game/newYear/show-blessings"; //新年活动入口接口 {uid:number}  get 
        ServerMsg.NEWYEAR_FRIEND_BLESSING = "/game/newYear/friend-blessing"; //新年活动入口接口 {uid:number}  get 
        ServerMsg.NEWYEAR_ROCKING = "/game/newYear/rocking"; //摇一摇 {uid:number}  post 
        ServerMsg.NEWYEAR_ENERGY_REWARD = "/game/newYear/energy-reward"; //领取能量瓶奖励 {uid:number}  post 
        ServerMsg.NEWYEAR_BLESSING = "/game/newYear/blessing"; //送祝福 {uid:number, fid:number}  post 
        ServerMsg.NEWYEAR_OPEN_HIT_EGG_BOX = "/game/newYear/open-hit-egg-box"; // {uid:number, level:number}  post 
        ServerMsg.NEWYEAR_HIT_EGG = "/game/newYear/hit-egg"; // {uid:number, useFree:boolean}  post 
        ServerMsg.NEWYEAR_BLESSING_REWARD = "/game/newYear/blessing-reward"; // {uid:number, level:number}  post 
        //玩家比赛
        ServerMsg.NIGHT_READY = "/game/plane/ready"; // {uid:number}  post 开始匹配
        ServerMsg.NIGHT_READY_ENTER = "/game/plane/ready-enter"; // {uid:number}  post 匹配成功后的进入
        ServerMsg.NIGHT_ENTER = "/game/plane/enter"; // {uid:number}  get 进入比赛
        ServerMsg.NIGHT_SYNC = "/game/plane/sync"; // {uid:number}  get 进入比赛
        ServerMsg.NIGHT_CHECK = "/game/plane/check"; // {uid:number}  get check
        ServerMsg.NIGHT_ROLL = "/game/plane/roll"; // {uid:number}  get check
        ServerMsg.NIGHT_CANCEL = "/game/plane/cancel"; // {uid:number}  post check
        ServerMsg.NIGHT_REWARD = "/game/plane/reward"; // {uid:number, level:number}  post 领取奖励
        ServerMsg.NIGHT_SHOW_REWARD = "/game/plane/show-reward"; // {uid:number}  get 查询奖励
        ServerMsg.NIGHT_SCORE_REWARD = "/game/plane/score-reward"; // {uid:number, id:number}  post 查询奖励
        ServerMsg.NIGHT_SHARE = "/game/plane/share"; // {uid:number}  post 领取分享奖励
        ServerMsg.NIGHT_RANK = "/game/plane/rank"; // {uid:number}  get 查询排行
        ServerMsg.NIGHT_HISTORY = "/game/plane/history"; // {uid:number}  get 查询排行
        //同城交友相关
        ServerMsg.FRIEND_GETSIGN = "/game/friend/get-friendsign"; // {uid:number}  get 获取我的同城交友信息
        ServerMsg.FRIEND_POSTSIGN = "/game/friend/post-friendsign"; // {uid:number,province:number,city:number,friendSign:string}  post 发布同城交友信息
        ServerMsg.FRIEND_DELSIGN = "/game/friend/del-friendsign"; // {uid:number}  post 删除同城交友信息
        ServerMsg.FRIEND_TOWNSMEN = "/game/friend/townsmen"; // {uid:number,gender:number,province:number,city:number}  get 获取同城交友推荐列表
        //微信小游戏
        ServerMsg.WX_LOGIN = "/game/entry/wxgame"; //{encryptedCode:string, friendCode:string}  post 
        ServerMsg.WX_PLAYER = "/game/basic/player"; //{uid:number}  post 
        ServerMsg.WX_SUBSCRIBE_REWARD = "/game/friend/wxgame-subscribe-reward"; //领取wx关注奖励 params: {uid:number}
        ServerMsg.WX_VERIFY = "/game/basic/verify"; //检测的验证码 params: {uid:number}
        ServerMsg.WX_CHECK_VERIFY = "/game/basic/check-verify"; //合并双端账号 params: {uid:number,code:string}
        ServerMsg.WX_CHECK_ACCOUNT = "/game/basic/check-account"; //查询多个账号 params: {uid:number}   get
        ServerMsg.WX_BIND_ACCOUNT = "/game/basic/bind-account"; //绑定账号 params: {uid:number, platformId:string}   post
        //每日分享 
        ServerMsg.WX_DAYSHARE_ENTER = "/game/dayShare/enter"; //每日分享show params: {uid:number}
        ServerMsg.WX_DAYSHARE_PLAYER_ENTER = "/game/dayShare/playerEnter"; //每日分享点击进入 params: {uid:number,fid:number}
        ServerMsg.WX_DAYSHARE_REWARD = "/game/dayShare/dayShareAward"; //每日分享领奖 params: {uid:number,fid:number}
        ServerMsg.WX_DAYSHARE_REWARD_BIG = "/game/dayShare/dayShareBigAward"; //每日分享领大奖 params: {uid:number}
        ServerMsg.WX_DAYREDBAGSHARE_ENTER = "/game/dayShare/new-day-redpackage-info"; //每日红包分享show params: {uid:number}
        ServerMsg.WX_DAYREDBAGSHARE_REWARD = "/game/dayShare/new-day-redpackage-award"; //每日红包 params: {uid:number}
        //实名认证奖励
        ServerMsg.CERTIFY_REWARDS = "/game/basic/certify-rewards"; //认证奖励 params: {uid:number}
        //第四个护盾
        ServerMsg.SHIELD_OPEN = "/game/shield/open"; //分享护盾 params: {uid:number}
        ServerMsg.SHIELD_CHARGE = "/game/shield/charge"; //分享护盾 params: {uid:number, tid:number}
        ServerMsg.SHIELD_LIST = "/game/shield/list"; //分享护盾 params: {uid:number} get
        //广告奖励
        ServerMsg.AD_REWARDS = "/game/basic/ad-rewards"; //分享护盾 params: {uid:number, type:number}
        //情人节 ---folwer
        // /game/flower/enter
        // static FLOWER_ENTER =  "/game/flower/enter"; //情人节进入某个家 {uid:number,fid:number}  POST
        // static FLOWER_GIVE =  "/game/flower/give-flower"; //送花 {uid:number,fid:number,flower:number}  POST
        // static FLOWER_REWARD =  "/game/flower/reward"; //领取礼盒奖励 {uid:number}  POST
        // static FLOWER_GIFT =  "/game/flower/gift"; //领取520礼盒奖励 {uid:number,openKey:string}  POST
        // static FLOWER_FRIEND =  "/game/flower/friend"; //查询好友接口 {uid:number}  GET
        // static FLOWER_LOGS =  "/game/flower/logs"; //查询消息接口 {uid:number}  GET
        // static FLOWER_WORLDRANK =  "/game/flower/world-rank"; //世界排行榜接口 {uid:number}  GET
        // static FLOWER_FRIENDRANK =  "/game/flower/friend-rank"; //世界排行榜接口 {uid:number}  GET
        // static FLOWER_GAIN_FLOWER_REBATE_REWARD =  "/game/flower/gain-flower-rebate-reward"; //世界排行榜接口 {uid:number}  GET
        //用户协议
        ServerMsg.USER_AGREEMENT = "/game/basic/user-agreement"; //用户协议 {uid:number}  GET
        //端午活动
        ServerMsg.DRAGONBOAT_ENTER = "/game/dragonBoat/enter"; //获取活动数据
        ServerMsg.DRAGONBOAT_FRIENDS = "/game/dragonBoat/friends"; //好友列表信息
        ServerMsg.DRAGONBOAT_SPIN = "/game/dragonBoat/spin"; //翻牌子
        ServerMsg.DRAGONBOAT_REWARDBINGO = "/game/dragonBoat/rewardBingo"; //领取binggo奖励
        ServerMsg.DRAGONBOAT_EATERINFO = "/game/dragonBoat/eaterInfo"; //领取吃货基金
        ServerMsg.DRAGONBOAT_REWARDEATER = "/game/dragonBoat/rewardEater"; //领取吃货基金
        ServerMsg.DRAGONBOAT_HELPORDER = "/game/dragonBoat/helpOrder"; //助力订单
        ServerMsg.DRAGONBOAT_FINISHORDER = "/game/dragonBoat/finishOrder"; //兑换订单
        ServerMsg.DRAGONBOAT_HELPTILE = "/game/dragonBoat/helpTile"; //助力好友被怼格子加速
        ServerMsg.DRAGONBOAT_NEWS = "/game/dragonBoat/news"; //消息列表
        ServerMsg.DRAGONBOAT_GAININVITE = "/game/dragonBoat/rewardInvite"; //领取邀请信息
        ServerMsg.DRAGONBOAT_INVITEINFO = "/game/dragonBoat/inviteInfo"; //领取邀请奖励
        ServerMsg.DRAGONBOAT_FIXTILE = "/game/dragonBoat/fixTile"; //被怼过的格子翻回
        ServerMsg.DRAGONBOAT_LOGS = "/game/dragonBoat/donateLog"; // 赠送记录GET
        ServerMsg.DRAGONBOAT_DONATE = "/game/dragonBoat/donate"; // 赠送POST
        ServerMsg.DRAGONBOAT_RECEIVE = "/game/dragonBoat/receive"; //领取POST
        //海盗王 | PirateKing
        ServerMsg.PIRATEKING_ENTER = "/game/luffy/show"; //获取活动数据GET
        ServerMsg.PIRATEKING_ROLL = "/game/luffy/roll"; //掷骰子POST
        ServerMsg.PIRATEKING_FRIENDS = "/game/luffy/friends"; //好友列表GET
        ServerMsg.PIRATEKING_ENEMIES = "/game/luffy/enemies"; //仇人列表POST
        ServerMsg.PIRATEKING_HELP = "/game/luffy/help"; //帮助他人POST
        ServerMsg.PIRATEKING_ATTACK = "/game/luffy/attack"; //攻击他人POST
        ServerMsg.PIRATEKING_RANK = "/game/luffy/rank"; //排行榜GET
        ServerMsg.PIRATEKING_REWARD = "/game/luffy/reward-box"; //领取宝箱POST
        ServerMsg.PIRATEKING_EXCHANGE = "/game/luffy/reward-money"; //兑换POST
        ServerMsg.PIRATEKING_GETDICE = "/game/luffy/got-dice"; //领取赠送的骰子
        ServerMsg.PIRATEKING_ACTION = "/game/luffy/action"; //对目标玩家使用道具
        ServerMsg.PIRATEKING_SHOWFRIEND = "/game/luffy/show-friend"; //好友数据GET
        ServerMsg.PIRATEKING_LOG = "/game/luffy/logs"; //消息日志
        ServerMsg.PIRATEKING_SHARE_NOTIFY = "/game/luffy/share-enter"; //分享成功通知
        ServerMsg.PIRATEKING_TUTORIAL = "/game/luffy/set-tutorial"; //上报tutorial步骤
        //世界杯竞猜
        ServerMsg.WORLDCUP_ENTER = "/game/worldCup/enter"; //打开活动界面 {uid:number,fid:number} POST
        ServerMsg.WORLDCUP_BETON = "/game/worldCup/beton"; //下注 {uid:number,matchId:number,teamId:number,num:number} POST
        ServerMsg.WORLDCUP_BETLOG = "/game/worldCup/bet-log"; //下注记录 {uid:number} POST
        ServerMsg.WORLDCUP_TAKEAWARD = "/game/worldCup/take-award"; //领取奖励 {uid:number,matchId:number} POST
        ServerMsg.WORLDCUP_SLOT = "/game/worldCup/slot"; //老虎机 {uid:number} POST
        ServerMsg.WORLDCUP_SLOTREWARD = "/game/worldCup/slot-times-award"; //老虎机累积次数领奖 {uid:number,id:number} POST
        ServerMsg.WORLDCUP_LUCKYDETAIL = "/game/worldCup/lucky-detail"; //幸运玩家列表 {uid:number,matchId} POST
        ServerMsg.WORLDCUP_SHARE = "/game/worldCup/share"; //分享前请求获取boxId {uid:number} POST
        ServerMsg.WORLDCUP_SHAREENTER = "/game/worldCup/share-enter"; //点击别人分享链接助力对方得竞猜币 {uid:number,fid:number,boxId:nunber} POST
        ServerMsg.WORLDCUP_TAKESHAREJETTON = "/game/worldCup/take-share-jetton"; //领取分享奖励{uid:number} POST
        ServerMsg.WORLDCUP_READSHAREHELPLOG = "/game/worldCup/read-share-log"; //已读消息 {uid:number,logId}  POST
        ServerMsg.WORLDCUP_MATCHHOT = "/game/worldCup/matchhot"; //更新热度 {uid:number,logId}  POST  
        ServerMsg.WORLDCUP_GUIDELINE = "/game/worldCup/guide-line"; //更新新手引导步数 {uid:number,logId}  POST  
        //宝藏地图
        ServerMsg.TREASUREMAP_ENTER = "/game/treasureMap/enter"; //进入宝藏地图 {uid:number,fid:number}  POST
        ServerMsg.TREASUREMAP_DIG_OTHER = "/game/treasureMap/digOther"; //宝藏地图挖他人宝藏 {uid:number, dotID:number, fid:number}  POST
        ServerMsg.TREASUREMAP_DIG = "/game/treasureMap/dig"; //宝藏地图挖自己宝藏 {uid:number, dotID:number}  POST
        ServerMsg.TREASUREMAP_OPENBOX = "/game/treasureMap/openBox"; //宝藏地图挖自己宝藏 {uid:number, boxID:number}  POST
        ServerMsg.TREASUREMAP_HELP = "/game/treasureMap/help"; //宝藏地图挖自己宝藏 {uid:number, fid:number, bid:number}  POST
        ServerMsg.TREASUREMAP_LIST = "/game/treasureMap/list"; //宝藏地图好友请求 {uid:number}  POST
        ServerMsg.TREASUREMAP_MESSAGE = "/game/treasureMap/message"; //宝藏地图消息请求 {uid:number}  POST
        ServerMsg.TREASUREMAP_EXCHANGE = "/game/treasureMap/exchange"; //宝藏地图兑换金币请求 {uid:number, exchangeID:number }  POST
        // static TREASUREMAP_TUTORIAL =  "/game/treasureMap/tutorial"; //宝藏地图设置引导请求 {uid:number, step:number }  POST
        //助力邀请礼包
        ServerMsg.HELP_GIFT_SHOW = "/game/helpGift/show"; //助力礼包show {uid:number}  GET
        ServerMsg.HELP_GIFT_REWARD = "/game/helpGift/reward"; //助力礼包reward {uid:number}  POST
        ServerMsg.HELP_GIFT_HELP = "/game/helpGift/help"; //助力礼包reward {uid:number, token:string}  POST
        ServerMsg.PIN_REWARD = "/game/basic/pin-reward"; //助力礼包show {uid:number}  GET
        // 错误统计打点
        ServerMsg.ERROR_REPORT = "/game/basic/err-report"; // {uid:number, message:string,version:string,line:string,stack:string,detail:string }  POST
        //瓜分活动
        ServerMsg.CARVE_INFO = "/game/monday/info"; //获取活动数据
        ServerMsg.CARVE_HELP = "/game/monday/help"; //帮助玩家
        ServerMsg.CARVE_MARQUEUE = "/game/monday/marqueue"; //走马灯
        ServerMsg.CARVE_GETREWARD = "/game/monday/gainReward"; //领取奖励
        //船员活动
        ServerMsg.BOATER_INFO = "/game/crew/info"; //获取活动数据
        ServerMsg.BOATER_ACCEPT = "/game/crew/accept"; //加入船员
        ServerMsg.BOATER_HIRE = "/game/crew/hire"; //雇佣
        ServerMsg.BOATER_FIRE = "/game/crew/fire"; //解雇
        ServerMsg.BOATER_RECALL = "/game/crew/recall"; //召回
        ServerMsg.BOATER_GUIDELINE = "/game/crew/crew-guideline"; //更新新手引导步数
        //好友回归体验
        ServerMsg.REGRESS_SEND_BACK_MSG = "/game/back/send-back-msg"; //发送回归世界聊天
        ServerMsg.REGRESS_TAKE_NUM = "/game/back/take-num"; //获取今日已领取回归礼包次数
        ServerMsg.REGRESS_TAKE_ATTACH_GIFT = "/game/chat/take-attach-Gift"; //领取回归礼包
        //通知服务器已经弹窗展示
        ServerMsg.REFRESH_SHOW_BOX = "/game/basic/refresh-show-box"; //领取奖励
        //公众号诱导关注奖励领取
        ServerMsg.FOCUS_GETREWARD = "/game/basic/subscribe-reward"; //领取奖励
        ServerMsg.CLEARBADGE = "/game/basic/ClearBadge"; //保存红点 {uid:number, key:stirng, forever:boolean} POST
        //推荐好友
        ServerMsg.FRIEND_NEARBY = "/game/friend/nearby-friend"; //推荐好友
        ServerMsg.FRIEND_ONLINE = "/game/friend/online-friend"; //推荐好友
        ServerMsg.WX_SENOIRDAYREDBAGSHARE_ENTER = "/game/dayShare/new2-day-redpackage-info"; //高级每日红包分享show params: {uid:number}
        ServerMsg.WX_SENOIRDAYREDBAGSHARE_LINK = "/game/dayShare/new2-day-redpackage-click-link"; //高级每日红包分享链接进入show params: {uid:number}
        ServerMsg.WX_SENIORDAYREDBAGSHARE = "/game/dayShare/new2-day-redpackage-share"; //高级夏日能量告诉服务端已经分享 params: {uid:number}
        ServerMsg.WX_SENIORDAYREDBAGSHARE_REWARD = "/game/dayShare/new2-take-day-redpackage-box"; //高级夏日能量领奖 params: {uid:number}
        ServerMsg.RECALL_INFO = "/game/friendNew/recall-list"; //召回奖励界面数据请求
        ServerMsg.RECALL_REWARD_NEW = "/game/friendNew/recall-reward"; //召回奖励界面领奖
        //Couple CP系统
        ServerMsg.COUPLE_ENTRY = "/game/couple/enter"; //CP系统入口GET
        ServerMsg.COUPLE_ANSWER = "/game/couple/answer"; //CP系统答题POST
        ServerMsg.COUPLE_MATCH = "/game/couple/match-strangers"; //CP系统匹配GET
        ServerMsg.COUPLE_APPLY = "/game/couple/apply"; //申请cp
        ServerMsg.COUPLE_ABANDON = "/game/couple/match-dislike"; //不喜欢一个玩家
        ServerMsg.COUPLE_FRIEND = "/game/couple/friends"; //cp好友列表
        ServerMsg.COUPLE_MESSAGE = "/game/couple/messages"; //消息列表GET
        ServerMsg.COUPLE_MARQUEE = "/game/couple/marquee"; //跑马灯GET
        ServerMsg.COUPLE_REPLY = "/game/couple/reply"; //CP回应POST
        ServerMsg.COUPLE_RANK = "/game/couple/world-rank"; //CP世界排行榜
        ServerMsg.COUPLE_GETCP_BY_ID = "/game/couple/info"; // 通过uid获取某个用户的cp信息
        ServerMsg.COUPLE_DIVORCE = "/game/couple/divorce"; // 离婚
        ServerMsg.COUPLE_SEND_SHIELD = "/game/couple/couple-send-shield"; // 赠送CP!盾
        ServerMsg.COUPLE_ANIMATION = "/game/couple/animation-played"; // 动画记录播放POST
        ServerMsg.COUPLE_TUTORIAL = "/game/couple/finish-tutorial"; // 教程记录POST
        ServerMsg.COUPLE_SHARE_SUCCESS = "/game/couple/reward-share"; // 分享成功
        //关注公众号之后领奖请求。
        ServerMsg.GZH_SUBSCRIBE_REWARD = "/game/basic/subscribe-reward";
        return ServerMsg;
    }());
    game.ServerMsg = ServerMsg;
    __reflect(ServerMsg.prototype, "game.ServerMsg");
})(game || (game = {}));
//# sourceMappingURL=ServerMsg.js.map