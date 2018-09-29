

namespace TsEngine {
    export interface IWindow extends IView {
        //准备数据
        prepare(onComplete: Function): void;
        //窗口背景
        backGround: any;
    }
}