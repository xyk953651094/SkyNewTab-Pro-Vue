import {Message} from "@arco-design/web-vue";
import {lightThemeArray, darkThemeArray, device} from "@/javascripts/publicConstants";
import "jquery-color"
const $ = require("jquery");

// 获取日期与时间
export function getTimeDetails() {
    let param = new Date();
    let year = param.getFullYear();
    let month = param.getMonth() + 1;
    let day = param.getDate();
    let hour = param.getHours();
    let minute = param.getMinutes();
    let second = param.getSeconds();
    let week = param.getDay();
    let localeDate = param.toLocaleString("zh-Hans-u-ca-chinese");

    year = year.toString();
    month = month < 10? ("0" + month) : month.toString();
    day = day < 10? ("0" + day) : day.toString();
    hour = hour < 10? ("0" + hour) : hour.toString();
    minute = minute < 10? ("0" + minute) : minute.toString();
    second = second < 10? ("0" + second) : second.toString();
    switch (week) {
        case 0: week = "周日"; break;
        case 1: week = "周一"; break;
        case 2: week = "周二"; break;
        case 3: week = "周三"; break;
        case 4: week = "周四"; break;
        case 5: week = "周五"; break;
        case 6: week = "周六"; break;
        default: week = "";
    }

    return {
        year: year,
        month: month,
        day: day,
        hour: hour,
        minute: minute,
        second: second,
        showWeek: week,
        showDate: year + "-" + month + "-" + day,
        showDate2: year + "." + month + "." + day,
        showDate3: year + month + day,
        showDate4: year + "年" + month + "月" + day + "日",
        showTime: hour + ":" + minute,
        showLocaleDate: "农历" + localeDate.split(" ")[0] + "日"
    };
}

// 判断字符串是否合规
export function isEmptyString(param) {
    if(typeof param === "string") {
        return (param.length === 0);
    }
    else {
        return false;
    }
}

// 根据当前时间段返回问候语
export function getGreet() {
    let hour = new Date().getHours();

    const greets = {
        morning: "朝霞满",
        noon: "正当午",
        afternoon: "斜阳下",
        evening: "日暮里",
        night: "见星辰",
        daybreak: "又一宿"
    };

    if (hour >=0 && hour < 6) {          // 凌晨
        return greets.daybreak;
    }
    else if (hour >= 6 && hour < 11) {   // 上午
        return greets.morning;
    }
    else if (hour >= 11 && hour < 14) {  // 中午
        return greets.noon;
    }
    else if (hour >= 14 && hour < 17) {  // 下午
        return greets.afternoon;
    }
    else if (hour >=17 && hour < 20) {   //傍晚
        return greets.evening;
    }
    else if (hour >=19 && hour < 24) {   //夜晚
        return greets.night;
    }
}

// 请求unsplash图片前随机显示多彩颜色主题
export function setColorTheme() {
    let hour = new Date().getHours();
    let theme = lightThemeArray;
    if( 18 < hour || hour < 6) {
        theme = darkThemeArray;
    }
    let randomNum = Math.floor(Math.random() * theme.length);
    let body = document.getElementsByTagName("body")[0];
    body.style.backgroundColor = theme[randomNum].bodyBackgroundColor;  // 设置body背景颜色

    let returnValue = {
        "componentBackgroundColor": theme[randomNum].componentBackgroundColor,
        "componentFontColor": getFontColor(theme[randomNum].componentBackgroundColor),
    }
    return returnValue;  // 返回各组件背景颜色
}

// 根据图片背景颜色获取反色主题
export function getComponentBackgroundColor(color) {
    color = "0x" + color.replace("#", '');
    let newColor = "000000" + (0xFFFFFF - parseInt(color)).toString(16);
    return '#' + newColor.substring(newColor.length-6, newColor.length);
}

// 根据元素背景颜色获取字体颜色
export function getFontColor(color) {
    let rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    if (rgb) {
        let r = parseInt(rgb[1], 16);
        let g = parseInt(rgb[2], 16);
        let b = parseInt(rgb[3], 16);
        let gray = Math.round(r * 0.299 + g * 0.587 + b * 0.114);
        if (gray > 128) {
            return '#000000';
        } else {
            return '#ffffff';
        }
    }
    else {
        return '#ffffff';
    }
}

// Android端与桌面端壁纸动态效果
export function imageDynamicEffect(element, effectType) {
    if (device === "Android") {
        deviceOrientationEvent();
    } else {  // 桌面端
        window.addEventListener("mousemove",function(e){
            let mouseX = e.screenX;
            let mouseY = e.screenY;
            let screenWidth = document.body.clientWidth;
            let screenHeight = document.body.clientHeight;
            let screenMidWidth = screenWidth / 2;
            let screenMidHeight = screenHeight / 2;
            let relatedX = mouseX - screenMidWidth;   // 大于0则在屏幕右边，小于0则在屏幕左边
            let relatedY = mouseY - screenMidHeight;  // 大于0则在屏幕下边，小于0则在屏幕上边
            let relatedXRatio = relatedX / screenMidWidth;
            let relatedYRatio = relatedY / screenMidHeight;

            if (element instanceof HTMLElement) {
                element.style.transition = "0.3s";

                switch (effectType) {
                    case "translate": {
                        let translateX = (-relatedXRatio / 4).toFixed(2);  // 调整精度
                        let translateY = (-relatedYRatio / 4).toFixed(2);  // 调整精度
                        element.style.transform = "scale(1.05, 1.05) translate(" + translateX + "%, " + translateY + "%)";
                        break;
                    }
                    case "rotate": {
                        let rotateX = (relatedXRatio / 4).toFixed(2);      // 调整精度
                        let rotateY = (-relatedYRatio / 4).toFixed(2);     // 调整精度
                        element.style.transform = "scale(1.05, 1.05) rotateX(" + rotateY + "deg) rotateY(" + rotateX + "deg)";
                        break;
                    }
                    case "all": {
                        let skewX = (relatedXRatio / 10).toFixed(2);       // 调整精度
                        let rotateX = (relatedXRatio / 3).toFixed(2);      // 调整精度
                        let rotateY = (-relatedYRatio / 3).toFixed(2);     // 调整精度
                        let translateX = (-relatedXRatio / 3).toFixed(2);  // 调整精度
                        let translateY = (-relatedYRatio / 3).toFixed(2);  // 调整精度
                        element.style.transform = "scale(1.05, 1.05) " +
                            "skew(" + skewX + "deg)" +
                            "rotateX(" + rotateY + "deg) rotateY(" + rotateX + "deg) " +
                            "translate(" + translateX + "%, " + translateY + "%)";
                        break;
                    }
                    case "close": {
                        element.style.transform = "scale(1.05)";
                        break;
                    }
                }
            }
        });
    }
}

// iOS端壁纸动态效果
export function iOSImageDynamicEffect(element) {
    let deviceOrientationPermission = localStorage.getItem('deviceOrientationPermission');
    if (deviceOrientationPermission === "granted") {
        DeviceOrientationEvent.requestPermission().then(function (status) {
            if (status === "granted") {
                deviceOrientationEvent(element);
            }
        }).catch(function () {
            Message.error("权限错误");
        });
    }
    else {
        // TODO：弹窗
    }
}

// 移动端陀螺仪
function deviceOrientationEvent(element) {
    window.addEventListener("deviceorientation", function (event) {
        // console.log(event.alpha, event.beta, event.gamma);
        // let rotateX = (event.beta / 10).toFixed(2);       // 调整精度
        // let rotateY = (-event.gamma / 10).toFixed(2);     // 调整精度
        let translateX = (-event.gamma / 10).toFixed(2);  // 调整精度
        let translateY = (event.beta / 10).toFixed(2);    // 调整精度

        element.style.transition = "0.3s";
        element.style.transform = "scale(1.05, 1.05) " +
            // "rotateX(" + rotateY + "deg) rotateY(" + rotateX + "deg) " +
            "translate(" + translateX + "%, " + translateY + "%)";
    });
}

// 判断设备型号
export function getDevice() {
    let ua = navigator.userAgent;
    if(ua.indexOf('iPhone') > -1) { return 'iPhone' }
    else if(ua.indexOf('iPad') > -1) { return 'iPad' }
    else if(ua.indexOf('Android') > -1) { return 'Android' }
    else { return '' }
}

// 过渡动画
export function changeThemeColor(element, backgroundColor, fontColor, time = 300) {
    $(element).animate({
        backgroundColor: backgroundColor,
        color: fontColor,
    }, time);
}

export function fadeIn(element, time = 300) {
    $(element).fadeIn(time);
}

export function fadeOut(element, time = 300) {
    $(element).fadeOut(time);
}