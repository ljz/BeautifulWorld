
namespace TsEngine {
    export class WindowManager {
        private static navigator: WindowNavigator;

        public static initialize(navigator: WindowNavigator): void {
            this.navigator = navigator;
        }

        public static registWindow<T extends IWindow>(windowId: number, typeClass: new () => T, skinUrl: string = null, resGroup?: string, hasModal: boolean = true, modalClickHide: boolean = true, manualCloseOnly: boolean = false, windowLevel: number = 1): WindowData {
            if (this.navigator == null) {
                this.navigator = new WindowNavigator(StageManager.getLayer(Layer.WINDOW));
            }
            return WindowManager.navigator.registWindow(windowId, typeClass, skinUrl, resGroup, hasModal, modalClickHide, manualCloseOnly, windowLevel);
        }

        public static unRegisterWindow(windowId: number = 0): void {
            WindowManager.navigator.unRegisterWindow(windowId);
        }

        public static hasWindow(windowId: number = 0): boolean {
            return WindowManager.navigator.hasWindow(windowId);
        }

        public static getWindow(windowId: number = 0): IWindow {
            return WindowManager.navigator.getWindow(windowId);
        }

        //获取窗口数据
        public static getWindowData(windowId: number): WindowData {
            return WindowManager.navigator.getWindowData(windowId);
        }

        public static get currentWindow(): number {
            return WindowManager.navigator.currentWindow;
        }

        public static set currentWindow(value: number) {
            WindowManager.navigator.currentWindow = value;
        }

        //参数传递可考虑设计成...args或数组，便于与配置数据适应
        public static showWindow(windowId: number, data: any = null, parent: egret.DisplayObjectContainer = null, onOpen?: Function, onClose?: Function, thisObj?: any, windowLevel: number = -1): void {
            WindowManager.navigator.showWindow(windowId, data, parent, onOpen, onClose, thisObj, windowLevel);
        }

        //隐藏窗口
        public static hideWindow(windowId: number = 0, onClose?: Function, thisObj?: any, destroy: boolean = false): void {
            WindowManager.navigator.hideWindow(windowId, onClose, thisObj, destroy);
        }

        //隐藏所有活动窗口
        public static hideAllWindow(): void {
            WindowManager.navigator.hideAllWindow();
        }

        //切换窗口
        public static toggleWindow(windowId: number = 0): void {
            WindowManager.navigator.toggleWindow(windowId);
        }

        //是否打开
        public static isOpen(windowId: number = 0): boolean {
            return WindowManager.navigator.isOpen(windowId);
        }

        //是否处于活动状态
        public static isActive(windowId: number = 0): boolean {
            return WindowManager.navigator.isActive(windowId);
        }

        public static setOpenList(funcTypeList: Array<any>, update: boolean = false): void {
            WindowManager.navigator.setOpenList(funcTypeList, update);
        }

        public static setOpen(windowId: number, open: boolean): void {
            WindowManager.navigator.setOpen(windowId, open);
        }
    }
}