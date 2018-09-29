
namespace TsEngine {
	export class QueueCommand extends Command {

		//命令序列
		public queues: HashMap;
		//总步骤数
		public stepCount: number = 0;
		//已完成到步骤索引
		public doneStep: number = -1;
		//是否正在运行
		public isRunning: boolean;

		private queueName: string = "QueueCommand";

		constructor(name: string = null) {
			super();
			this.queueName = name || this.queueName;
			this.queues = new HashMap();

			//注册回调
			NotificationManager.add(this.queueName, this.execute, this);
		}

		/**
		 * 添加命令
		 * @param	command   命令
		 * @param	step      指定步骤索引,一般省略
		 */
		public addCommand(command: Command, step: number = -1): void {
			var index: number = (step == -1) ? this.queues.length : step;
			this.queues.put(index, command);
			//记录总步骤数
			this.stepCount = this.queues.length;
			//分配命令一个步骤索引
			command.step = index;
		}

		/**
		 * 获取执行进度
		 */
		public get progress(): number {
			return (this.stepCount - this.queues.length) / this.stepCount;
		}

		public onProgress(value: number): void {

		}

		//执行
		public execute(): void {
			this.onProgress(this.progress);
			//已完成返回
			if (this.queues.length < 1) {
				NotificationManager.remove(this.queueName, this.execute, this);
				this.isRunning = false;
				this.done();
				return;
			}
			//繼續
			this.isRunning = true;
			this.doNextCommand();
		}

		//暂停
		public pause(): void {
			this.isRunning = false;
		}

		//恢复运行
		public resume(run: boolean = true): void {
			this.isRunning = true;
			if (run) this.execute();
		}

		//取消
		public cancel(): void {
			this.queues.clear();
			NotificationManager.remove(this.queueName, null, this);
			this.done();
		}

		//执行下一个
		private doNextCommand(): void {
			//继续执行
			if (this.queues.length > 0) {
				var command: Command = this.getNextCommand(this.doneStep);
				if (command) {
					command.execute();
					//记录当前正在执行的步骤索引
					this.doneStep = Math.max(command.step, this.doneStep);
					this.queues.remove(this.doneStep);
				} else {
					console.log("doNextCommand: step超出索引范围!");
				}
			}
		}

		/**
		 * 获取下一个命令
		 * @param	curStep
		 * @return
		 */
		public getNextCommand(curStep: number = 0): Command {
			var step: number = -1;
			for (var i in this.queues.content) {
				var index: number = parseInt(i);
				if ((index > curStep) && ((index < step) || (step == -1))) {
					step = index;
				}
			}

			return this.queues.getValue(step);
		}

		/**
		 * 执行结束
		 */
		public done(): void {
		}
	}
}