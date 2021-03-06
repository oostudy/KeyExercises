cc.Class({
    extends: cc.Component,

    properties: {
        speed:10
    },
    onLoad: function () {
        this.speed = 30;
    },
    destory:function()
    {
        //console.log("this.node:"+this.node);
        this.node.destroy();
    }
    ,
    follow: function (letterNode) {
        var srcPos    = this.node.getPosition();
        var targetPos = letterNode.getPosition();
        var dis   = cc.pDistance(targetPos,srcPos)
        if (dis > this.speed/2 )
        {
            var time  = Math.abs(dis/this.speed);
            var x_dis = targetPos.x - srcPos.x;
            var y_dis = targetPos.y - srcPos.y;
            var x_speed = x_dis/ time;
            var y_speed = y_dis/ time;
            this.node.x = this.node.x + x_speed;
            this.node.y = this.node.y + y_speed;
        }else
        {
            return true;
        }
        return false
    }
});
