require=function e(t,c,i){function s(o,a){if(!c[o]){if(!t[o]){var r="function"==typeof require&&require;if(!a&&r)return r(o,!0);if(n)return n(o,!0);var h=new Error("Cannot find module '"+o+"'");throw h.code="MODULE_NOT_FOUND",h}var p=c[o]={exports:{}};t[o][0].call(p.exports,function(e){var c=t[o][1][e];return s(c?c:e)},p,p.exports,e,t,c,i)}return c[o].exports}for(var n="function"==typeof require&&require,o=0;o<i.length;o++)s(i[o]);return s}({Game:[function(e,t,c){"use strict";cc._RFpush(t,"4e12fLSQu1L+KV6QmxDiavU","Game"),cc.Class({"extends":cc.Component,properties:{letterPrefab:{"default":null,type:cc.Prefab},maxStarDuration:0,minStarDuration:0,ground:{"default":null,type:cc.Node},player:{"default":null,type:cc.Node},scoreDisplay:{"default":null,type:cc.Label},scoreAudio:{"default":null,url:cc.AudioClip}},onLoad:function(){this.groundY=this.ground.y+this.ground.height/2,this.timer=0,this.starDuration=0,this.score=0,this.keyCode=0,this.letterTimer=0,this.addKeyListener(),this.keyMap={},this.keyMap[cc.KEY.a]="A",this.keyMap[cc.KEY.b]="B",this.keyMap[cc.KEY.c]="C",this.keyMap[cc.KEY.d]="D",this.keyMap[cc.KEY.e]="E",this.keyMap[cc.KEY.f]="F",this.keyMap[cc.KEY.g]="G",this.keyMap[cc.KEY.h]="H",this.keyMap[cc.KEY.i]="I",this.keyMap[cc.KEY.j]="J",this.keyMap[cc.KEY.k]="K",this.keyMap[cc.KEY.l]="L",this.keyMap[cc.KEY.m]="M",this.keyMap[cc.KEY.n]="N",this.keyMap[cc.KEY.o]="O",this.keyMap[cc.KEY.p]="P",this.keyMap[cc.KEY.q]="Q",this.keyMap[cc.KEY.r]="R",this.keyMap[cc.KEY.s]="S",this.keyMap[cc.KEY.t]="T",this.keyMap[cc.KEY.u]="U",this.keyMap[cc.KEY.v]="V",this.keyMap[cc.KEY.w]="W",this.keyMap[cc.KEY.x]="X",this.keyMap[cc.KEY.y]="Y",this.keyMap[cc.KEY.z]="Z",this.keyCodes=new Array(cc.KEY.a,cc.KEY.b,cc.KEY.c,cc.KEY.d,cc.KEY.e,cc.KEY.f,cc.KEY.g,cc.KEY.h,cc.KEY.i,cc.KEY.j,cc.KEY.k,cc.KEY.l,cc.KEY.m,cc.KEY.n,cc.KEY.o,cc.KEY.p,cc.KEY.q,cc.KEY.r,cc.KEY.s,cc.KEY.t,cc.KEY.u,cc.KEY.v,cc.KEY.w,cc.KEY.x,cc.KEY.y,cc.KEY.z)},randomKeyCode:function(){var e=Math.floor(cc.rand())%this.keyCodes.length;return console.log("random:"+e),this.keyCodes[e]},update:function(e){this.timer+=e,this.letterTimer+=e,this.letterTimer>2&&(this.createLetter(),console.log("this.letterTimer:"+this.letterTimer),this.letterTimer=0)},getScore:function(e){switch(e){case 1:return 1;case 2:return 2;case 3:return 3;case 4:return 4}return 1},addScore:function(e){this.score+=this.getScore(e),this.scoreDisplay.string="Score: "+this.score.toString(),cc.audioEngine.playEffect(this.scoreAudio,!1)},gameOver:function(){this.player.stopAllActions(),cc.director.loadScene("game")},createLetter:function(){var e=cc.instantiate(this.letterPrefab);this.node.addChild(e),e.setPosition(this.randomLetterPosition());var t=e.getComponent("Letter");t.init(this.randomKeyCode(),1,this)},randomLetterPosition:function(){var e=cc.randomMinus1To1()*(this.node.width/2);return cc.p(e,this.node.height/2)},addKeyListener:function(){var e=this;cc.eventManager.addListener({event:cc.EventListener.KEYBOARD,onKeyPressed:function(t,c){e.keyCode=t,console.log("do keyCode:"+t)},onKeyReleased:function(e,t){}},this.node)}}),cc._RFpop()},{}],Letter:[function(e,t,c){"use strict";cc._RFpush(t,"807f83fi4lA4b1g4V7huAQE","Letter"),cc.Class({"extends":cc.Component,properties:{letterLabel:{"default":null,type:cc.Label}},onLoad:function(){this.letKeyCode=-1,this.level=1,this.enable=!0,this.keyMap={},this.keyMap[cc.KEY.a]="A",this.keyMap[cc.KEY.b]="B",this.keyMap[cc.KEY.c]="C",this.keyMap[cc.KEY.d]="D",this.keyMap[cc.KEY.e]="E",this.keyMap[cc.KEY.f]="F",this.keyMap[cc.KEY.g]="G",this.keyMap[cc.KEY.h]="H",this.keyMap[cc.KEY.i]="I",this.keyMap[cc.KEY.j]="J",this.keyMap[cc.KEY.k]="K",this.keyMap[cc.KEY.l]="L",this.keyMap[cc.KEY.m]="M",this.keyMap[cc.KEY.n]="N",this.keyMap[cc.KEY.o]="O",this.keyMap[cc.KEY.p]="P",this.keyMap[cc.KEY.q]="Q",this.keyMap[cc.KEY.r]="R",this.keyMap[cc.KEY.s]="S",this.keyMap[cc.KEY.t]="T",this.keyMap[cc.KEY.u]="U",this.keyMap[cc.KEY.v]="V",this.keyMap[cc.KEY.w]="W",this.keyMap[cc.KEY.x]="X",this.keyMap[cc.KEY.y]="Y",this.keyMap[cc.KEY.z]="Z"},getLetter:function(e){return this.keyMap[e]},init:function(e,t,c){this.game=c,this.letKeyCode=e,this.level=t,this.enable=!0,this.letterLabel.string=this.getLetter(this.letKeyCode)},destroy:function(){this.game.addScore(this.level),this.node.destroy()},doPickAction:function(){var e=cc.scaleTo(.05,2),t=cc.callFunc(this.destroy,this);this.node.runAction(cc.sequence(e,t)),this.enable=!1},doLoseAction:function(){var e=cc.scaleTo(.05,.1),t=cc.callFunc(this.destroy,this);this.node.runAction(cc.sequence(e,t)),this.enable=!1},update:function(e){if(this.enable===!0){if(console.log("this letKeyCode:"+this.letKeyCode+"  keyCode:"+this.game.keyCode),this.game.keyCode===this.letKeyCode)return this.doPickAction(),void(this.game.keyCode=0);this.node.y=this.node.y-2,this.node.y<-320&&this.doLoseAction()}}}),cc._RFpop()},{}],Player:[function(e,t,c){"use strict";cc._RFpush(t,"6c688v72QdOKamCGCT+xaAd","Player"),cc.Class({"extends":cc.Component,properties:{jumpHeight:0,jumpDuration:0,maxMoveSpeed:0,accel:0,jumpAudio:{"default":null,url:cc.AudioClip}},setJumpAction:function(){var e=cc.moveBy(this.jumpDuration,cc.p(0,this.jumpHeight)).easing(cc.easeCubicActionOut()),t=cc.moveBy(this.jumpDuration,cc.p(0,-this.jumpHeight)).easing(cc.easeCubicActionIn()),c=cc.callFunc(this.playJumpSound,this);return cc.repeatForever(cc.sequence(e,t,c))},playJumpSound:function(){cc.audioEngine.playEffect(this.jumpAudio,!1)},setInputControl:function(){var e=this;cc.eventManager.addListener({event:cc.EventListener.KEYBOARD,onKeyPressed:function(t,c){switch(t){case cc.KEY.a:e.accLeft=!0,e.accRight=!1;break;case cc.KEY.d:e.accLeft=!1,e.accRight=!0}},onKeyReleased:function(t,c){switch(t){case cc.KEY.a:e.accLeft=!1;break;case cc.KEY.d:e.accRight=!1}}},e.node)},onLoad:function(){this.jumpAction=this.setJumpAction(),this.node.runAction(this.jumpAction),this.accLeft=!1,this.accRight=!1,this.xSpeed=0,this.setInputControl()},update:function(e){this.accLeft?this.xSpeed-=this.accel*e:this.accRight&&(this.xSpeed+=this.accel*e),Math.abs(this.xSpeed)>this.maxMoveSpeed&&(this.xSpeed=this.maxMoveSpeed*this.xSpeed/Math.abs(this.xSpeed)),this.node.x+=this.xSpeed*e,this.node.x<-480?(this.node.x=480,this.xSpeed=0):this.node.x>480&&(this.node.x=-480,this.xSpeed=0)}}),cc._RFpop()},{}],Star:[function(e,t,c){"use strict";cc._RFpush(t,"4644f0m2WtABYRy+pn6dOaG","Star"),cc.Class({"extends":cc.Component,properties:{pickRadius:0},onLoad:function(){},getPlayerDistance:function(){var e=this.game.player.getPosition(),t=cc.pDistance(this.node.position,e);return t},onPicked:function(){this.game.spawnNewStar(),this.game.gainScore(),this.node.destroy()},update:function(e){if(this.getPlayerDistance()<this.pickRadius)return void this.onPicked();var t=1-this.game.timer/this.game.starDuration,c=50;this.node.opacity=c+Math.floor(t*(255-c))}}),cc._RFpop()},{}]},{},["Star","Game","Player","Letter"]);