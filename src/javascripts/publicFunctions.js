import {darkThemeArray, defaultPreferenceData, lightThemeArray} from "../javascripts/publicConstants";
import "jquery-color"

const $ = require("jquery");

// 网络请求
export function httpRequest(headers, url, data, method) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            headers: headers,
            url: url,
            type: method,
            data: data,
            timeout: 5000,
            success: (resultData) => {
                resolve(resultData);
            },
            error: function () {
                reject();
            }
        });
    })
}

// 获取日期与时间
export function getTimeDetails(param) {
    let year = param.getFullYear();
    let month = param.getMonth() + 1;
    let day = param.getDate();
    let hour = param.getHours();
    let minute = param.getMinutes();
    let second = param.getSeconds();
    let week = param.getDay();
    let localeDate = param.toLocaleString("zh-Hans-u-ca-chinese");

    year = year.toString();
    month = month < 10 ? ("0" + month) : month.toString();
    day = day < 10 ? ("0" + day) : day.toString();
    hour = hour < 10 ? ("0" + hour) : hour.toString();
    minute = minute < 10 ? ("0" + minute) : minute.toString();
    second = second < 10 ? ("0" + second) : second.toString();
    switch (week) {
        case 0:
            week = "周日";
            break;
        case 1:
            week = "周一";
            break;
        case 2:
            week = "周二";
            break;
        case 3:
            week = "周三";
            break;
        case 4:
            week = "周四";
            break;
        case 5:
            week = "周五";
            break;
        case 6:
            week = "周六";
            break;
        default:
            week = "";
    }

    return {
        year: year,
        month: month,
        day: day,
        hour: hour,
        minute: minute,
        second: second,
        showWeek: week,
        showDate: year + "/" + month + "/" + day,
        showDate2: year + "." + month + "." + day,
        showDate3: year + month + day,
        showDate4: year + "年" + month + "月" + day + "日",
        showDate5: year + "-" + month + "-" + day,
        showTime: hour + ":" + minute,
        showDetail: year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second,
        showLocaleDate: "农历" + localeDate.split(" ")[0] + "日"
    };
}

// 判断字符串是否合规
export function isEmpty(param) {
    return (param === null || param === undefined || param.length === 0);
}

// 根据当前时间段返回问候语
export function getGreetContent() {
    let hour = new Date().getHours();

    const greets = {
        morning: "朝霞满",
        noon: "正当午",
        afternoon: "斜阳下",
        evening: "日暮里",
        night: "见星辰",
        daybreak: "又一宿"
    };

    if (hour >= 0 && hour < 6) {          // 凌晨
        return greets.daybreak;
    } else if (hour >= 6 && hour < 11) {   // 上午
        return greets.morning;
    } else if (hour >= 11 && hour < 14) {  // 中午
        return greets.noon;
    } else if (hour >= 14 && hour < 17) {  // 下午
        return greets.afternoon;
    } else if (hour >= 17 && hour < 20) {   //傍晚
        return greets.evening;
    } else if (hour >= 19 && hour < 24) {   //夜晚
        return greets.night;
    }
}

// 获取问候语图标 className
export function getGreetIcon() {
    let hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {   // 上午
        return "bi bi-sunrise";
    } else if (hour >= 12 && hour < 18) {  // 下午
        return "bi bi-sunset";
    } else {                               // 夜晚
        return "bi bi-moon-stars";
    }
}

// 获取天气图标className
export function getWeatherIcon(weatherInfo) {
    if (weatherInfo.indexOf("晴") !== -1) {
        return "bi bi-sun"
    } else if (weatherInfo.indexOf("阴") !== -1) {
        return "bi bi-cloud"
    } else if (weatherInfo.indexOf("云") !== -1) {
        return "bi bi-clouds"
    } else if (weatherInfo.indexOf("雨") !== -1) {
        return "bi bi-cloud-rain"
    } else if (weatherInfo.indexOf("雾") !== -1) {
        return "bi bi-cloud-fog"
    } else if (weatherInfo.indexOf("霾") !== -1) {
        return "bi bi-cloud-haze"
    } else if (weatherInfo.indexOf("雪") !== -1) {
        return "bi bi-cloud-snow"
    } else if (weatherInfo.indexOf("雹") !== -1) {
        return "bi bi-cloud-hail"
    } else {
        return ""
    }
}

// 请求unsplash图片前随机显示多彩颜色主题
export function setColorTheme() {
    let currentHour = parseInt(getTimeDetails(new Date()).hour);
    let themeArray = lightThemeArray;
    if(currentHour > 18 || currentHour < 6) {  // 夜间显示深色背景
        themeArray = darkThemeArray;
    }

    let randomNum = Math.floor(Math.random() * themeArray.length);
    let body = document.getElementsByTagName("body")[0];
    body.style.backgroundColor = themeArray[randomNum].bodyBackgroundColor;  // 设置body背景颜色

    return {
        "themeColor": themeArray[randomNum].bodyBackgroundColor,
        "componentBackgroundColor": themeArray[randomNum].componentBackgroundColor,
        "componentFontColor": getFontColor(themeArray[randomNum].componentBackgroundColor),
    };  // 返回各组件背景颜色
}

// 根据图片背景颜色获取反色主题
export function getReverseColor(color) {
    color = "0x" + color.replace("#", "");
    let newColor = "000000" + (0xFFFFFF - parseInt(color)).toString(16);
    return "#" + newColor.substring(newColor.length - 6, newColor.length);
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
            return "#000000";
        } else {
            return "#ffffff";
        }
    } else {
        return "#ffffff";
    }
}

// 桌面端壁纸动态效果
export function imageDynamicEffect(element, effectType) {
    window.addEventListener("mousemove", function (e) {
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

// 判断设备型号
export function getDevice() {
    let ua = navigator.userAgent;
    if (ua.indexOf("iPhone") > -1) {
        return "iPhone"
    } else if (ua.indexOf("iPad") > -1) {
        return "iPad"
    } else if (ua.indexOf("Android") > -1) {
        return "Android"
    } else {
        return ""
    }
}

export function getSearchEngineDetail(searchEngine) {
    let searchEngineName;
    let searchEngineUrl;
    let searchEngineIconUrl;
    switch (searchEngine) {
        case "baidu":
            searchEngineName = "Baidu";
            searchEngineUrl = "https://www.baidu.com/s?wd=";
            searchEngineIconUrl = "https://www.baidu.com/favicon.ico";
            break;
        case "bing":
            searchEngineName = "Bing";
            searchEngineUrl = "https://www.bing.com/search?q=";
            searchEngineIconUrl = "https://www.bing.com/favicon.ico";
            break;
        case "google":
            searchEngineName = "Google";
            searchEngineUrl = "https://www.google.com/search?q=";
            searchEngineIconUrl = "https://www.google.com/favicon.ico";
            break;
        case "yandex":
            searchEngineName = "Yandex";
            searchEngineUrl = "https://yandex.com/search/?text=";
            searchEngineIconUrl = "https://yastatic.net/s3/home-static/_/92/929b10d17990e806734f68758ec917ec.png";
            break;
        default:
            searchEngineName = "Bing";
            searchEngineUrl = "https://www.bing.com/search?q=";
            searchEngineIconUrl = "https://www.bing.com/favicon.ico";
            break;
    }
    return {"searchEngineName": searchEngineName, "searchEngineUrl": searchEngineUrl, "searchEngineIconUrl": searchEngineIconUrl};
}

// 补全设置数据
// 补全设置数据
export function fixPreferenceData(preferenceData) {
    let isFixed = false;
    if(!preferenceData.dynamicEffect) {
        preferenceData.dynamicEffect = defaultPreferenceData.dynamicEffect;
        isFixed = true;
    }
    if(!preferenceData.imageQuality) {
        preferenceData.imageQuality = defaultPreferenceData.imageQuality;
        isFixed = true;
    }
    if(!preferenceData.imageTopics) {
        preferenceData.imageTopics = defaultPreferenceData.imageTopics;
        isFixed = true;
    }
    if(preferenceData.customTopic === undefined || preferenceData.customTopic === null) {  // customTopic 可以为""
        preferenceData.customTopic = defaultPreferenceData.customTopic;
        isFixed = true;
    }
    if(!preferenceData.changeImageTime) {
        preferenceData.changeImageTime = defaultPreferenceData.changeImageTime;
        isFixed = true;
    }
    if(preferenceData.nightMode === undefined || preferenceData.nightMode === null) {
        preferenceData.nightMode = defaultPreferenceData.nightMode;
        isFixed = true;
    }
    if(preferenceData.autoDarkMode === undefined || preferenceData.autoDarkMode === null) {
        preferenceData.autoDarkMode = defaultPreferenceData.autoDarkMode;
        isFixed = true;
    }
    if(preferenceData.noImageMode === undefined || preferenceData.noImageMode === null) {
        preferenceData.noImageMode = defaultPreferenceData.noImageMode;
        isFixed = true;
    }

    if(!preferenceData.searchEngine) {
        preferenceData.searchEngine = defaultPreferenceData.searchEngine;
        isFixed = true;
    }
    if(!preferenceData.buttonShape) {
        preferenceData.buttonShape = defaultPreferenceData.buttonShape;
        isFixed = true;
    }
    if(preferenceData.simpleMode === undefined || preferenceData.simpleMode === null) {
        preferenceData.simpleMode = defaultPreferenceData.simpleMode;
        isFixed = true;
    }
    if(preferenceData.displayAlert === undefined || preferenceData.displayAlert === null) {
        preferenceData.displayAlert = defaultPreferenceData.displayAlert;
        isFixed = true;
    }

    if (isFixed) {
        localStorage.setItem("preferenceData", JSON.stringify(preferenceData));  // 重新保存设置
    }
    return preferenceData;
}

export function getPreferenceDataStorage() {
    let tempPreferenceData = localStorage.getItem("preferenceData");
    if (tempPreferenceData === null) {
        localStorage.setItem("preferenceData", JSON.stringify(defaultPreferenceData));
        return defaultPreferenceData;
    } else {
        return fixPreferenceData(JSON.parse(tempPreferenceData));  // 检查是否缺少数据
    }
}

// 过渡动画
export function changeThemeColor(element, backgroundColor, fontColor, time = 300) {
    $(element).animate({
        backgroundColor: backgroundColor,
        color: fontColor,
    }, {queue: false, duration: time});
}

export function changeBackgroundColor(element, backgroundColor, time = 300) {
    $(element).animate({
        backgroundColor: backgroundColor,
    }, {queue: false, duration: time});
}

export function changeFontColor(element, fontColor, time = 300) {
    $(element).animate({
        color: fontColor,
    }, {queue: false, duration: time});
}

export function fadeIn(element, time = 300) {
    $(element).fadeIn(time);
}

export function fadeOut(element, time = 300) {
    $(element).fadeOut(time);
}