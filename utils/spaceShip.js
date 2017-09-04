/**
 * Created by Downsview on 2017/9/3.
 */

//太空船类
function SpaceShip() {
    this.x = 0;
    this.y = 0;
    this.width = 25;
    this.height = 25;
    this.rotation = 0;
    this.showFlame = false;     //喷火状态为false
}

SpaceShip.prototype.draw = function(context) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotation);
    context.strokeStyle = "#fff";
    context.beginPath();
    context.moveTo(10, 0);
    context.lineTo(-10, 10);
    context.lineTo(-5, 0);
    context.lineTo(-10, -10);
    context.lineTo(10, 0);
    context.closePath();
    context.stroke();
    if(this.showFlame) {
        context.save();
        context.strokeStyle = "#f69";
        context.beginPath();
        context.moveTo(-7.5, -5);
        context.lineTo(-15, 0);
        context.lineTo(-7.5, 5);
        context.stroke();
        context.closePath();
        context.restore();
    }
    context.restore();
}
