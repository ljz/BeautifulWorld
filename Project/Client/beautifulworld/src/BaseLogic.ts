

class BaseLogic{

    public constructor(){
        this.listenEvent();
    }

    public destroy(){
        this.removeEvent();
    }

    protected listenEvent(){
        console.trace("未实现这个接口");
    }

    protected  removeEvent(){
        RemoveAllEventByObj(this);
    }

    public close()
    {
        this.destroy();
    }


}