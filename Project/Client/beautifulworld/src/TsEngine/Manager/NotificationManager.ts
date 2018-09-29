

namespace TsEngine {
	export class NotificationManager {
		private static notificationMap: Object = new Object(); // 通知载体map

		/**
		 * 注册回调函数
		 * @param message 消息名字
		 * @param callback 回调函数
		 */
		public static add(message: string, callback: Function, thisObject: any): void {
			var callbacks: Array<any> = (this.notificationMap[message]) || (new Array<any>());
			//过滤
			if (this.getCallBackIndex(callbacks, callback, thisObject) == -1) {
				callbacks.push({ func: callback, thisObject: thisObject });
				this.notificationMap[message] = callbacks;
			}
		}

		/**
		 * 注册命令
		 * @param message 消息名字
		 * @param command 命令
		 */
		public static addCommand(message: string, command: ICommand): void {
			var commands: Array<any> = (this.notificationMap[message]) || (new Array<any>());
			if (commands.indexOf(command) == -1) {
				commands.push(command);
				this.notificationMap[message] = commands;
			}
		}

		/**
		 * 执行Notification
		 * @param message 消息名字
		 * @param contents 参数，可以无限多个
		 */
		public static dispatch(message: string, ...contents): void {
			this.dispatchByArray(message, contents);
		}

		/**
		 * 执行Notification， 参数以数组形式传递。
		 * @param message 消息名字
		 * @param contents 参数，可以无限多个
		 */
		public static dispatchByArray(message: string, contents?: Array<any>): void {
			var observers: Array<any> = this.notificationMap[message];
			if (!observers) { // 如果指定 message 没有注册
				return;
			}
			var length: number = observers.length;
			for (var i: number = 0; i < length; i++) {
				var obj: any = observers[i];
				if (obj) {
					if (obj["execute"]) {
						var command: ICommand = <ICommand><any>obj;
						command.execute();
					}
					else if (obj["func"]) {
						var func: Function = <Function><any>obj["func"];
						if (func.length == 0) {
							func.apply(obj["thisObject"]);
						} else {
							func.apply(obj["thisObject"], contents);
						}
					}
				}
			}
		}


		/**
		 * 移除 Callback，监听到message的时候不在处罚callback
		 * @param message 消息名字
		 * @param callback 回调
		 */
		public static remove(message: string, callback: Function, thisObject: any): void {
			if (!callback) {
				delete this.notificationMap[message];
			} else {
				var callbacks: Array<any> = this.notificationMap[message];

				if (callbacks) {
					var index: number = this.getCallBackIndex(callbacks, callback, thisObject);
					if (index >= 0) {
						callbacks.splice(index, 1);
						if (callbacks.length <= 0) {
							delete this.notificationMap[message];
						}
					}
				}
			}
		}

		/**
		 * 移除 Callback，监听到message的时候不在触发command
		 * @param message 消息名字
		 * @param command 回调命令
		 */
		public static removeCommand(message: string, command: ICommand): void {
			var commands: Array<any> = this.notificationMap[message];
			if (commands) {
				var index: number = commands.indexOf(command);
				if (index >= 0) {
					commands.splice(index, 1);
					if (commands.length <= 0) {
						delete this.notificationMap[message];
					}
				}
			}
		}

		public static clear(): void {
			this.notificationMap = new Object();
		}

		/**
		 *  调试 检查 Notification
		 * 	指定message时 检查指定message触发的callback数
		 *  否则 显示所有的 Notification
		 * @param message 信息名字
		 */
		public static debug(message: string = null): void {
			console.log('------------------NotificationObserver Dump---------------------');
			if (message) {
				if (this.notificationMap[message]) {
					console.log(message + ': has ' + this.notificationMap[message].length + ' callbacks.');
				}
			}
			else {
				for (var j in this.notificationMap) {
					console.log(j + ': has ' + this.notificationMap[j].length + ' callbacks.');
				}
			}
			console.log('--------------------------Dump End-----------------------------');
		}

		private static getCallBackIndex(callBacks: Array<any>, callback: Function, thisObject: any): number {
			var len: number = callBacks.length;
			for (var i = 0; i < len; i++) {
				var callObj: Object = callBacks[i];
				if ((callObj["func"] === callback) && (callObj["thisObject"] === thisObject)) {
					return i;
				}
			}
			return -1;
		}
	}
}