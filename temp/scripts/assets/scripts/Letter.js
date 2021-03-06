"use strict";
cc._RFpush(module, '807f83fi4lA4b1g4V7huAQE', 'Letter');
// scripts\Letter.js


var Const = require("Const");
//
var STATE = { NORMAR: 1, DANGER: 2 };
cc.Class({
    "extends": cc.Component,

    properties: {
        letterLabel: {
            "default": null,
            type: cc.Label
        }
    },
    onLoad: function onLoad() {
        this.letKeyCode = -1;
        this.level = 1;
        this.speed = 1;
        this.enable = true;
        this.bullet = null;
    },
    getLetter: function getLetter(keyCode) {
        return Const.keyMap[keyCode];
    },
    init: function init(keyCode, level, game) {
        //console.log("keyCode=======:",keyCode);
        this.game = game;
        this.letKeyCode = keyCode;
        this.level = level;
        this.enable = true;
        this.letterLabel.string = this.getLetter(this.letKeyCode);
        this.speed = Const.letSpeeds[this.level - 1];
        this.state = STATE.NORMAR;
    },
    destroyPick: function destroyPick() {
        this.game.addScore(this.level);
        this.node.destroy();
    },
    destroyLose: function destroyLose() {
        this.node.destroy();
    },

    doPickAction: function doPickAction() {
        var scale = cc.scaleTo(0.05, 2);
        var callback = cc.callFunc(this.destroyPick, this);
        this.node.runAction(cc.sequence(scale, callback));
        this.enable = false;
        this.game.removeLetter(this);
        this.destoryBullet();
    },
    doLoseAction: function doLoseAction() {
        var scale = cc.scaleTo(0.05, 0.1);
        var callback = cc.callFunc(this.destroyLose, this);
        this.node.runAction(cc.sequence(scale, callback));
        this.enable = false;
        this.game.removeLetter(this);
        this.destoryBullet();
    },
    isPick: function isPick(keyCode) {
        if (this.bullet !== null) {
            return false;
        }
        return this.letKeyCode == keyCode;
    },
    setLock: function setLock(bullet) //被子弹锁定
    {
        this.bullet = bullet;
    },
    destoryBullet: function destoryBullet() {
        if (this.bullet !== null) {
            this.bullet.destory();
            this.bullet = null;
        }
    },
    setState: function setState(state) {
        if (this.state !== state) {
            switch (state) {
                case STATE.NORMAR:
                    break;
                case STATE.DANGER:
                    this.node.runAction(cc.blink(2, 10));
                    break;
            }
            this.state = state;
        }
    },
    checkDangerous: function checkDangerous() {
        if (this.state === STATE.NORMAR) {
            if (this.node.y < -200) {
                this.setState(STATE.DANGER);
            }
        }
    },
    hitTest: function hitTest(position) {
        if (this.bullet !== null) {
            return false;
        }
        var dis = cc.pDistance(position, this.node.getPosition());
        return dis <= 40.0;
    },

    update: function update(dt) {
        if (this.enable === true) {
            // console.log("this letKeyCode:" + this.letKeyCode +"  keyCode:"+this.game.keyCode);
            this.node.y = this.node.y - this.speed;
            if (this.node.y < -320) {
                this.doLoseAction();
                return;
            }
            this.checkDangerous();
            if (this.bullet !== null) {
                if (this.bullet.follow(this.node)) {
                    this.doPickAction();
                }
            }
        }
    }
});

cc._RFpop();