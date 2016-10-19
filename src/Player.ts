
interface State{
    OnEnter():void;
    OnExit():void;
}

class MoveState implements State{
    private MovePicture:egret.Texture[];
    private player:egret.Bitmap;
    private CurrentPicture:number;
    private count:number;
    constructor(player:egret.Bitmap){
        this.player=player;
        this.CurrentPicture=0;
        this.count=0;
        let a1:egret.Texture=RES.getRes("a1_png");
        let a2:egret.Texture=RES.getRes("a2_png");
        let a3:egret.Texture=RES.getRes("a3_png");
        let a4:egret.Texture=RES.getRes("a4_png");
        this.MovePicture=[a1,a2,a3,a4];
    }
    OnEnter():void{
        egret.startTick(this.enter,this);
    }
    private enter():boolean{
        this.count++;
        if(this.count%5==0){
            this.CurrentPicture++;
            this.CurrentPicture%=this.MovePicture.length;
            this.player.texture=this.MovePicture[this.CurrentPicture];
            this.count=0;
        }
        return true;
    }
    OnExit():void{
        egret.stopTick(this.enter,this);
        this.count=0;
    }
}



class IdleState implements State{
    private player:egret.Bitmap;
    private IdlePicture:egret.Texture[];
    private CurrentPicture:number;
    private count:number;
    constructor(player:egret.Bitmap){
        this.player=player;
        this.CurrentPicture=0;
        this.count=0;
        let b1:egret.Texture=RES.getRes("b1_png");
        let b2:egret.Texture=RES.getRes("b2_png");
        let b3:egret.Texture=RES.getRes("b3_png");
        let b4:egret.Texture=RES.getRes("b4_png");
        let b5:egret.Texture=RES.getRes("b5_png");
        this.IdlePicture=[b1,b2,b3,b4,b5];
    }
    OnEnter():void{
        egret.startTick(this.enter,this);
    }
    private enter():boolean{
        this.count++;
        if(this.count%30==0){
            this.CurrentPicture++;
            this.CurrentPicture%=this.IdlePicture.length;
            this.player.texture=this.IdlePicture[this.CurrentPicture];
            this.count=0;
        }
        return true;
    }
    OnExit():void{
        egret.stopTick(this.enter,this);
        this.count=0;
    }
}



class StateMacine{
    private CurrentState:State;
    private Myplayer:egret.Bitmap;
    public constructor(x:egret.Bitmap){
        this.Myplayer=x;
        this.CurrentState=new IdleState(x);
        this.CurrentState.OnEnter();
    }
    public ChangeState(e:State):void{
        if(this.CurrentState!=e){
            this.CurrentState.OnExit();
            e.OnEnter();
            this.CurrentState=e;
        }
    }

}




class Player extends egret.DisplayObjectContainer{
    constructor(){
        super();
        this.MyPlayer=this.createBitmapByName("b1_png");
        this.Macine=new StateMacine(this.MyPlayer);
        this.addChild(this.MyPlayer);
    }
    public Macine:StateMacine;
    public MyPlayer:egret.Bitmap;
    createBitmapByName(name:string):egret.Bitmap{
        let result =new egret.Bitmap();
        result.texture=RES.getRes("name");
        return result;
    }
}
