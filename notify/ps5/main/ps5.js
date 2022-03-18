const { ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');
const config = JSON.parse(fs.readFileSync(path.join(process.env.LOCALAPPDATA,"Steam Achievement Notifier (V1.8)","store","config.json")));

ipcRenderer.on('notifymain', function(event, notifyachievement, notifytitle, notifydesc, notifyicon, screenshot, percent) {

var colour1 = config.colour1;
var colour2 = config.colour2;
var textcolour = config.textcolour;
var img;

if (config.img == "default") {
    img = "../../../img/santextlogobg.png";
} else {
    img = config.img;
}

var icon;

if (notifyicon == "test") {
    icon = "../../../img/sanlogosquare.svg";
} else {
    icon = notifyicon;
}

var borderradius;
var ssborderradius;
var ssimgborderradius;

if (config.notifypos == "topleft") {
    borderradius = config.roundness + "px";
    ssborderradius = config.roundness + "px " + config.roundness + "px 0px 0px";
    ssimgborderradius = "0px 0px " + config.roundness + "px " + config.roundness + "px";
  } else if (config.notifypos == "bottomleft") {
    borderradius = config.roundness + "px";
    ssborderradius = "0px 0px " + config.roundness + "px " + config.roundness + "px";
    ssimgborderradius = config.roundness + "px " + config.roundness + "px 0px 0px";
  
    document.getElementById("screenshotcont").style.order = "-1";
  } else if (config.notifypos == "topcenter") {
    borderradius = config.roundness + "px";
    ssborderradius = config.roundness + "px " + config.roundness + "px 0px 0px";
    ssimgborderradius = "0px 0px " + config.roundness + "px " + config.roundness + "px";
} else if (config.notifypos == "topright") {
    borderradius = config.roundness + "px";
    ssborderradius = config.roundness + "px " + config.roundness + "px 0px 0px";
    ssimgborderradius = "0px 0px " + config.roundness + "px " + config.roundness + "px";
} else if (config.notifypos == "bottomright") {
    borderradius = config.roundness + "px";
    ssborderradius = "0px 0px " + config.roundness + "px " + config.roundness + "px";
    ssimgborderradius = config.roundness + "px " + config.roundness + "px 0px 0px";

    document.getElementById("screenshotcont").style.order = "-1";
  } else if (config.notifypos == "bottomcenter") {
    borderradius = config.roundness + "px";
    ssborderradius = "0px 0px " + config.roundness + "px " + config.roundness + "px";
    ssimgborderradius = config.roundness + "px " + config.roundness + "px 0px 0px";

    document.getElementById("screenshotcont").style.order = "-1";
}

var solid = "background: " + colour1;
var background = "background: radial-gradient(circle, " + colour1 + " 0%, " + colour2 + " 100%)";
var imgbackground = "url('" + img + "')";

var scale = config.scale;
document.getElementById("cont").style.transform = "translate(-50%, -50%) scale(" + scale + "%, " + scale + "%)";

var bgtype = config.bgtype;

if (bgtype == "bgsolid") {
    document.getElementById("cont").style.color = textcolour;
    document.getElementById("notifycont").style = solid;
    if (screenshot == "true") {
        document.getElementById("notifycont").style.borderRadius = ssborderradius;
        document.getElementById("screenshot").style.borderRadius = ssimgborderradius;
    } else {
        document.getElementById("notifycont").style.borderRadius = borderradius;
    }
    document.getElementById("icon").src = icon;
    document.getElementById("icon").style.borderRadius = "" + config.iconroundness + "px";
} else if (bgtype == "bg") {
    document.getElementById("cont").style.color = textcolour;
    document.getElementById("notifycont").style = background;
    if (screenshot == "true") {
        document.getElementById("notifycont").style.borderRadius = ssborderradius;
        document.getElementById("screenshot").style.borderRadius = ssimgborderradius;
    } else {
        document.getElementById("notifycont").style.borderRadius = borderradius;
    }
    document.getElementById("icon").src = icon;
    document.getElementById("icon").style.borderRadius = "" + config.iconroundness + "px";
} else if (bgtype == "img") {
    document.getElementById("cont").style.color = textcolour;
    document.getElementById("notifycont").style.backgroundImage = imgbackground;
    document.getElementById("notifycont").style.backgroundPosition = "center";
    document.getElementById("notifycont").style.backgroundRepeat = "no-repeat";
    document.getElementById("notifycont").style.backgroundSize = "300px";
    if (screenshot == "true") {
        document.getElementById("notifycont").style.borderRadius = ssborderradius;
        document.getElementById("screenshot").style.borderRadius = ssimgborderradius;
    } else {
        document.getElementById("notifycont").style.borderRadius = borderradius;
    }
    document.getElementById("icon").src = icon;
    document.getElementById("icon").style.borderRadius = "" + config.iconroundness + "px";
}

if (screenshot == "true") {
    if (notifyicon == "test") {
        document.getElementById("screenshot").src = "../../../img/santextlogobg.png";
    } else {
        document.getElementById("screenshot").src = "../../../img/ss.png";
    }
    document.getElementById("cont").style.height = "219px";
    document.getElementById("screenshotcont").style.display = "flex";
} else {
    document.getElementById("cont").style.height = "50px";
    document.getElementById("screenshotcont").style.display = "none";
}

var title = notifytitle;
var desc = notifyachievement;

if (title.length > 35) {
    var shorttitle = title.substring(0, 35)
    title = shorttitle + "...";
}

document.getElementById("textinner").innerHTML = title;
document.getElementById("desc").innerHTML = desc;

if (percent > 25) {
    document.getElementById("trophyicon").src = "../../../img/psbronze.png";
} else if (percent < 25 && percent > 10) {
    document.getElementById("trophyicon").src = "../../../img/pssilver.png";
} else if (percent < 10) {
    document.getElementById("trophyicon").src = "../../../img/psgold.png";
} else if (percent == undefined) {
    document.getElementById("trophyicon").src = "../../../img/pssilver.png";
}

document.getElementById("notifycont").style.animation = "none";

var pause = 0;

var direction = "left";

if (config.notifypos == "topright" || config.notifypos == "topcenter" || config.notifypos == "bottomcenter" || config.notifypos == "bottomright") {
    direction = "left";
} else {
    direction = "right";
}

function PlayNotification(add) {
    if (config.notifypos == "topcenter" || config.notifypos == "topleft" || config.notifypos == "topright") {
        document.getElementById("screenshot").style.animation = "revealdown 0.3s 0.3s forwards";
    } else {
        document.getElementById("screenshot").style.animation = "revealup 0.3s 0.3s forwards";
    }

    document.getElementById("notifycont").style.animation = "fadein" + direction + " 0.2s linear forwards";
    document.getElementById("notifycont").style.borderRadius = borderradius;

    document.getElementById("screenshot").addEventListener('animationstart', function(event) {
        if (event.animationName == "revealdown" || event.animationName == "revealup") {
            document.getElementById("notifycont").style.transition = "0.2s";
            document.getElementById("notifycont").style.borderRadius = ssborderradius;
        }
    });

    document.getElementById("notifycont").addEventListener('animationend', function(event) {
        if (event.animationName == "fadein" + direction) {
            document.getElementById("notifycont").style.animation = "animpause " + ((pause * 0.001) + add) + "s linear forwards";
        } else if (event.animationName == "animpause") {
            document.getElementById("screenshot").style.animation = "fadeinrev" + direction + " 0.2s linear forwards";
            document.getElementById("notifycont").style.animation = "fadeinrev" + direction + " 0.2s linear forwards";
        }
    });
}

var displaytime = config.displaytime;

if (displaytime == 15) {
    PlayNotification(14);
} else if (displaytime == 14) {
    PlayNotification(13);
} else if (displaytime == 13) {
    PlayNotification(12);
} else if (displaytime == 12) {
    PlayNotification(11);
} else if (displaytime == 11) {
    PlayNotification(10);
} else if (displaytime == 10) {
    PlayNotification(9);
} else if (displaytime == 9) {
    PlayNotification(8);
} else if (displaytime == 8) {
    PlayNotification(7);
} else if (displaytime == 7) {
    PlayNotification(6);
} else if (displaytime == 6) {
    PlayNotification(5);
} else if (displaytime == 5) {
    PlayNotification(4);
} else if (displaytime == 4) {
    PlayNotification(3);
} else if (displaytime == 3) {
    PlayNotification(2);
} else if (displaytime == 2) {
    PlayNotification(1);
}

});