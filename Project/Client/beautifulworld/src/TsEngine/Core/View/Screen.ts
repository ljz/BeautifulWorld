
namespace TsEngine {
    export class Screen extends Window implements IScreen {
        public viewNavigator: WindowNavigator;

        constructor() {
            super();
        }

        public registView(viewId: number, view: any): void {
            if (this.viewNavigator == null) {
                this.viewNavigator = new WindowNavigator(this);
            }
            this.viewNavigator.registWindow(viewId, view, null, null, false, false);
        }

        public unRegisterView(viewId: number): void {
            this.viewNavigator.unRegisterWindow(viewId);
        }

        public hasView(viewId: number): boolean {
            return this.viewNavigator.hasWindow(viewId);
        }

        public getView(viewId: number): IWindow {
            return this.viewNavigator.getWindow(viewId);
        }

        public get currentView(): number {
            return this.viewNavigator.currentWindow;
        }

        public set currentView(value: number) {
            this.viewNavigator.currentWindow = value;
        }

        public showView(viewId: number, data: any = null): void {
            this.viewNavigator.showWindow(viewId, data);
        }

        public onClose(): void {
            super.onClose();
            if (this.viewNavigator) {
                this.viewNavigator.currentWindow = -1;
            }
        }
    }
}