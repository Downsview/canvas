/**
 * Created by Administrator on 2017/9/29.
 */

/*params  x, y : 树的坐标*/
/*params  angle : 树枝的偏转角度*/
/*params  genNum : 树枝的代数*/
/*params  branchLength : 树枝的长度*/

//二叉树
function Tree(color, angle, genNum, branchLength) {
    this.x = 0;
    this.y = 0;
    this.xpos = 0;
    this.ypos = 0;
    this.zpos = 0;
    this.scaleX = 0.85;
    this.scaleY = 0.85;
    this.gen = 0;
    this.alpha = 1;
    this.color = utils.parseColor(color);
    this.angle = (angle === undefined) ? 0.3 : angle;
    this.genNum = (genNum === undefined) ? 6 : genNum;
    this.branchLength = (branchLength === undefined) ? 40 : branchLength;
}

Tree.prototype.draw = function(context) {
    context.save();
    context.translate(this.x, this.y);
    this.branch(context, 0);
    context.restore();
}

Tree.prototype.branch = function(context, initAngle) {
    this.gen++;
    context.save();
    context.strokeStyle = this.color;
    context.rotate(initAngle);
    context.scale(this.scaleX, this.scaleY);
    context.moveTo(0, 0);
    context.translate(0, -this.branchLength);
    context.lineTo(0, 0);
    context.stroke();
    if(this.gen <= this.genNum) {
        this.branch(context, this.angle);
        this.branch(context, -this.angle);
    }
    context.restore();
    this.gen--;
}