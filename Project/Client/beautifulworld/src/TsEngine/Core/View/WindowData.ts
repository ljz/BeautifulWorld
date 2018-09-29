
namespace TsEngine {
    export enum WindowState {
        CLOSE = -1,
        PREPARE,
        LOADING,
        OPEN
    }

    export class WindowData {
        public id: number = 0;
        public typeClass: any;
        public manualCloseOnly: boolean;
        public hasModal: boolean;
        public modalAlpha: number = 0.6;
        public modalClickHide: boolean;
        public data: any;
        public level: number;
        public parent: egret.DisplayObjectContainer;
        public state: WindowState;
        public resGroup: string;
        public skinUrl: string;
        public mFullList: number[];
        public openList: eui.ArrayCollection;
        public onOpen: Function;
        public groupCurrentOpen: number;
        public onClose: Function;
        public thisObj: any;
        private mInstance: IWindow;
        constructor(id: number, typeClass: any, hasModal: boolean = true, modalClickHide: boolean = true, manualCloseOnly: boolean = false, skinUrl: string = null, resGroup?: string, windowLevel: number = 1) {
            this.id = id;
            this.typeClass = typeClass;
            this.manualCloseOnly = manualCloseOnly;
            this.resGroup = resGroup;
            this.skinUrl = skinUrl;
            this.hasModal = hasModal;
            this.level = windowLevel;
            this.modalClickHide = modalClickHide;
            this.state = WindowState.CLOSE;
        }

        public get instance(): IWindow {
            if (this.mInstance == null) {
                this.mInstance = new this.typeClass();
            }
            if ("dataProvider" in this.mInstance && this.fullList) {
                (this.mInstance as IWindowGroup).dataProvider = this.openList;
            }
            return this.mInstance;
        }

        public get fullList(): number[] {
            return this.mFullList;
        }

        public set fullList(value: number[]) {
            this.mFullList = value;
            this.openList = new eui.ArrayCollection();
        }

        public get isOpen(): boolean {
            return this.state == WindowState.OPEN;
        }

        public get isLoading(): boolean {
            return this.state == WindowState.LOADING;
        }

        public get isActive(): boolean {
            return this.state > WindowState.CLOSE;
        }
    }
}    
