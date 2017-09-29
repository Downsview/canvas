/**
 * Created by Administrator on 2017/8/29.
 */

//将utils定义为window对象下的一个属性，属性值为对象
window.utils = {};

//在utils对象上定义鼠标捕获坐标的方法
window.utils.captureMouse = function (element) {
    //定义一个名为mouse的对象
    var mouse = {x: 0, y: 0};

    //为元素绑定mousemove事件
    element.addEventListener('mousemove', function (event) {
        var x, y;

        //获取鼠标位于当前屏幕的位置，并做兼容处理
        if (event.pageX || event.pageY) {
            x = event.pageX;
            y = event.pageY;
        } else {
            x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }

        //将当前的坐标值减去元素的偏移位置，即为鼠标位于当前canvas的位置
        x -= element.offsetLeft;
        y -= element.offsetTop;

        mouse.x = x;
        mouse.y = y;
    }, false);

    //返回mouse对象
    return mouse;
}

//在utils对象上定义手指触摸捕获坐标的方法
window.utils.captureTouch = function (element) {
    //定义一个名为touch的对象
    var touch = {
        x: null,
        y: null,
        isPressed: false,
        event: null
    };
    var body_scrollLeft = document.body.scrollLeft,
        body_scrollTop = document.body.scrollTop,
        element_scrollLeft = document.documentElement.scrollLeft,
        element_scrollTop = document.documentElement.scrollTop,
        offsetLeft = element.offsetLeft,
        offsetTop = element.offsetTop;

    //绑定touchstart事件
    element.addEventListener('touchstart', function (event) {
        touch.isPressed = true;
        touch.event = event;
    }, false);

    //绑定touchend事件
    element.addEventListener('touchend', function (event) {
        touch.isPressed = false;
        touch.x = null
        touch.y = null
        touch.event = event;
    }, false);

    //绑定touchmove事件
    element.addEventListener('touchmove', function (event) {
        var x, y, touch_event = event.touches[0];

        if (touch_event.pageX || touch_event.pageY) {
            x = touch_event.pageX;
            y = touch_event.pageY;
        } else {
            x = touch_event.clientX + body_scrollLeft + element_scrollLeft;
            y = touch_event.clientY + body_scrollTop + element_scrollTop;
        }

        //减去偏移量
        x -= offsetLeft;
        y -= offsetTop;

        touch.x = x;
        touch.y = y;
        touch.event = event;
    }, false);

    //返回touch对象
    return touch;

}

//转换颜色
window.utils.parseColor = function (color, toNumber) {
    if (toNumber === true) {
        if (typeof color === 'number') {
            return (color | 0);
        }
        if (typeof color === 'string' && color[0] === '#') {
            color = color.slice(1);
        }
        return window.parseInt(color, 16);
    } else {
        if (typeof color === 'number') {
            color = '#' + ('00000' + (color | 0).toString(16)).substr(-6);
        }
        return color;
    }
}

//将16进制颜色转换成rgb
window.utils.colorToRGB = function (color, alpha) {
    if (typeof color === 'string' && color[0] === '#') {
        color = window.parseInt(color.slice(1), 16);
    }
    alpha = (alpha === undefined) ? 1 : alpha;

    var r = color >> 16 & 0xff;
    var g = color >> 8 & 0xff;
    var b = color & 0xff;
    var a = (alpha < 0) ? 0 : ((alpha > 1) ? 1 : alpha);

    if (a === 1) {
        return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    } else {
        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
    }
}

//处理动画函数兼容性
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function (callback) {
            return window.setTimeout(callback, 1000 / 60);
        }
}

if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.msCancelAnimationFrame ||
        window.oCancelAnimationFrame ||
        window.clearTimeout
}

//判定当前鼠标位置与物体位置的相对关系，如果在物体内部，则返回true，否则返回false
window.utils.containsPoint = function (rect, x, y) {
    return !(x < rect.x || x > rect.x + rect.width || y < rect.y || y > rect.y + rect.height);
}

//判定两个物体是否碰撞
window.utils.intersects = function (rectA, rectB) {
    return !(rectA.x + rectA.width < rectB.x || rectB.x + rectB.width < rectA.x || rectA.y + rectA.height < rectB.y || rectB.y + rectB.height < rectA.y);
}

