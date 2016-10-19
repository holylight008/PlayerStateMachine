var MoveState = (function () {
    function MoveState(player) {
        this.player = player;
        this.CurrentPicture = 0;
        this.count = 0;
        var a1 = RES.getRes("a1_png");
        var a2 = RES.getRes("a2_png");
        var a3 = RES.getRes("a3_png");
        var a4 = RES.getRes("a4_png");
        this.MovePicture = [a1, a2, a3, a4];
    }
    var d = __define,c=MoveState,p=c.prototype;
    p.OnEnter = function () {
        egret.startTick(this.enter, this);
    };
    p.enter = function () {
        this.count++;
        if (this.count % 5 == 0) {
            this.CurrentPicture++;
            this.CurrentPicture %= this.MovePicture.length;
            this.player.texture = this.MovePicture[this.CurrentPicture];
            this.count = 0;
        }
        return true;
    };
    p.OnExit = function () {
        egret.stopTick(this.enter, this);
        this.count = 0;
    };
    return MoveState;
}());
egret.registerClass(MoveState,'MoveState',["State"]);
var IdleState = (function () {
    function IdleState(player) {
        this.player = player;
        this.CurrentPicture = 0;
        this.count = 0;
        var b1 = RES.getRes("b1_png");
        var b2 = RES.getRes("b2_png");
        var b3 = RES.getRes("b3_png");
        var b4 = RES.getRes("b4_png");
        var b5 = RES.getRes("b5_png");
        this.IdlePicture = [b1, b2, b3, b4, b5];
    }
    var d = __define,c=IdleState,p=c.prototype;
    p.OnEnter = function () {
        egret.startTick(this.enter, this);
    };
    p.enter = function () {
        this.count++;
        if (this.count % 30 == 0) {
            this.CurrentPicture++;
            this.CurrentPicture %= this.IdlePicture.length;
            this.player.texture = this.IdlePicture[this.CurrentPicture];
            this.count = 0;
        }
        return true;
    };
    p.OnExit = function () {
        egret.stopTick(this.enter, this);
        this.count = 0;
    };
    return IdleState;
}());
egret.registerClass(IdleState,'IdleState',["State"]);
var StateMacine = (function () {
    function StateMacine(x) {
        this.Myplayer = x;
        this.CurrentState = new IdleState(x);
        this.CurrentState.OnEnter();
    }
    var d = __define,c=StateMacine,p=c.prototype;
    p.ChangeState = function (e) {
        if (this.CurrentState != e) {
            this.CurrentState.OnExit();
            e.OnEnter();
            this.CurrentState = e;
        }
    };
    return StateMacine;
}());
egret.registerClass(StateMacine,'StateMacine');
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        _super.call(this);
        this.MyPlayer = this.createBitmapByName("b1_png");
        this.Macine = new StateMacine(this.MyPlayer);
        this.addChild(this.MyPlayer);
    }
    var d = __define,c=Player,p=c.prototype;
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        result.texture = RES.getRes("name");
        return result;
    };
    return Player;
}(egret.DisplayObjectContainer));
egret.registerClass(Player,'Player');
//# sourceMappingURL=Player.js.map