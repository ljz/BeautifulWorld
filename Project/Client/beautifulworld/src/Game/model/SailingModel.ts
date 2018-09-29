/**
 * Created by zhouchuang on 17/4/24.
 */
namespace game {
    export class SailingModel {
        //自定义全局标记属性
        public selectGuildIndex: number = 0;
        //更新信息
        public update(data: any) {

        }
    }

    export class SailingProxy {
        static arrowOffSize = 35; //比赛箭头偏移量
        static boatSize = 81; //比赛小船图片大小
        static boatBgSize = 2560; //比赛赛道背景图片大小
        static boatOffSize = 52; //小船偏移量
        //static matchBgSize = 559; //比赛赛道背景图片大小
        //static matchGuildTitleSize = 71; //比赛工会排名部分ui width
        static maxLength = 2; //积分比例
    }

    export let SailingCache = {
        isoWeek: 0,
        rankText: ["青铜", "白银", "黄金", "铂金", "钻石", "王者"],
        rankMaxScore: [100, 150, 200, 250, 300, 400],
        guildScore: 0,
    }

    export let SailingShowData = {
        "guilds": [
            {
                "gid": 2754,
                "name": "大宝剑",
                "lastExp": 0,
                "icon": 5,
                "score": 0,
                "updateTime": 0
            }
        ],
        "scores": {
            "2889": 699,
            "2897": 855
        },
        "objects": [
            22,
            70,
            124,
            184,
            250
        ],
        "isoWeek": 201737,
        "openRemain": 0,
        "closeRemain": 423145,
        "hasQualified": true,
        "grade": 3,
        "RankMaxScore": 360,
        "firstEnd": false,
        "lastRank": 0,
        "lastGrade": 2
    }

    export let SailingRankData = {
        "guilds": [
            {
                "gid": 2775,
                "name": "hello6548",
                "icon": 2,
                "score": 10007,
                "rank": 1
            }
        ],
        "ownerGuild": {
            "gid": 2897,
            "name": "13214",
            "icon": 10,
            "score": 9181,
            "rank": 13
        }
    }

    export let SailingDepotData = {
        "taskConfs": [
            {
                "id": 1,
                "taskIcon": "1",
                "taskDescribe": "每次偷取可以获得2个银币",
                "taskType": 1,
                "taskGroup": 1,
                "value": 1,
                "reward": 2
            }
        ],
        "shopConfs": [
            {
                "id": 1,
                "itmeDescribe": "",
                "name": "恢复卷轴",
                "price": 1200,
                "limit": 10
            }
        ],
        "supplyCoin": 0,
        "taskFailedCount": 0,
        "taskRecoverCount": 0,
        "tearupRecoverCount": 0
    }
}
let sailingModel: game.SailingModel;