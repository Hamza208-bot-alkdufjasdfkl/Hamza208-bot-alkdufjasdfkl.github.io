const channelsData = [
    ['92 News HD', 'http://10.15.236.170:1935/live/92-NEWS.stream/playlist.m3u8'],
    ['Hum News HD', 'http://10.15.236.170:1935/live/HUM NEWS HD.stream/playlist.m3u8'],
    ['ARY News', 'http://10.15.236.170:1935/live/ARY NEWS.stream/playlist.m3u8'],
    ['24-NEWS', 'http://10.15.236.170:1935/live/CHANNEL 24 HD.stream/playlist.m3u8'],
    ['DUNYA-NEWS', 'http://10.15.236.170:1935/live/DUNYA NEWS HD.stream/playlist.m3u8'],
    ['GEO-NEWS', 'http://10.15.236.170:1935/live/GEO NEWS HD.stream/playlist.m3u8'],
    ['SAMAA NEWS', 'http://10.15.236.170:1935/live/SAMAA NEWS.stream/playlist.m3u8'],

    ['A Sports HD 01', 'http://10.15.236.170:1935/live/A-SPORTS.stream/playlist.m3u8'],
    ['Geo Super', 'http://10.15.236.170:1935/live/GEO SUPER.stream/playlist.m3u8'],
    ['Ten Sports HD', 'http://10.15.236.170:1935/live/TEN SPORTS HD.stream/playlist.m3u8'],
    ['PTV Sports', 'http://10.15.236.170:1935/live/PTV SPORTS HD.stream/playlist.m3u8'],

    ['Hum Sitaray', 'http://10.15.236.170:1935/live/HUM SITARAY.stream/playlist.m3u8'],
    ['ATV', 'http://10.15.236.170:1935/live/ATV.stream/playlist.m3u8'],
    ['PTV Home', 'http://10.15.236.170:1935/live/PTV HOME.stream/playlist.m3u8'],
    ['ARY Zindagi', 'http://10.15.236.170:1935/live/ARY ZINDAGI.stream/playlist.m3u8'],
    ['Geo Entertainment', 'http://10.15.236.170:1935/live/GEO ENT.stream/playlist.m3u8'],
    ['ARY Digital', 'http://10.15.236.170:1935/live/ARY DIGITAL.stream/playlist.m3u8'],
    ['Express Entertainment', 'http://10.15.236.170:1935/live/EXPRESS ENT.stream/playlist.m3u8'],
    ['Green Entertainment', 'http://10.15.236.170:1935/live/GREEN ENTERTAINMENT.stream/playlist.m3u8'],
    ['Hum TV HD', 'http://10.15.236.170:1935/live/HUM TV HD.stream/playlist.m3u8'],

    ['CARTOON-NETWORK', 'http://10.15.236.170:1935/live/CARTOON NETWORK.stream/playlist.m3u8'],
    ['Madani Channel', 'http://10.15.236.170:1935/live/MADANI CHANNEL.stream/playlist.m3u8'],
];
const popupBox = document.querySelector('body > div');
const channelNoLabel = document.querySelector('body > div h1');
const channelNameLabel = document.querySelector('body > div p')
const channelChangeTimerProgress = document.getElementsByClassName('progress-bar')[0];
// const logsLabel = document.getElementById('logs-label');
// const channelsStateHeading = document.querySelector('body > h1');
const videoElement = document.querySelector('video');
var currentChannel = 8;
var prevChannel = null;
var channelString = '';
var keyPresses = 0;
var hideChannelNoPopupTimerId = null;

// Constants
const KEY_0 = 48;
const KEY_1 = 49;
const KEY_2 = 50;
const KEY_3 = 51;
const KEY_4 = 52;
const KEY_5 = 53;
const KEY_6 = 54;
const KEY_7 = 55;
const KEY_8 = 56;
const KEY_9 = 57;
const KEY_JUMP = 0;
const BACKSPACE = 8;
const KEY_CHANNEL_FORWARD = 33;
const KEY_CHANNEL_BACKWARD = 34;
const KEY_PRESS_TIMEOUT = 2000;

function setLogs(text) {
    logsLabel.innerText = text;
}
function setChannel(channelIndex) {
    videoElement.src = channelsData[channelIndex][1];
}
function isNumKey(keyCode) {
    if (keyCode >= KEY_0 && keyCode <= KEY_9) return true;
    return false;
}
function showChannelNoPopup() {
    popupBox.classList.remove('hide');
}
function hideChannelNoPopup() {
    popupBox.classList.add('hide');
}
function makeTextColorRed() {
    channelNoLabel.classList.add('red-text');
    channelNameLabel.classList.add('red-text');
}
function makeTextColorNormal() {
    channelNoLabel.classList.remove('red-text');
    channelNameLabel.classList.remove('red-text');
}
function setChannelPopupInfo(channelNo) {
    makeTextColorNormal();
    channelNoLabel.innerText = channelNo;
    channelNameLabel.innerText = channelsData[channelNo - 1][0];
}
function setChannelPopupInfoInvalid(channelNo) {
    makeTextColorRed();
    channelNoLabel.innerText = channelNo;
    channelNameLabel.innerText = 'No Channel';
}
function startProgress() {
    channelChangeTimerProgress.style.animation = 'startProgress 2s linear';
}
function stopProgress() {
    channelChangeTimerProgress.style.animation = 'none';
}
function resetProgress() {
    channelChangeTimerProgress.style.animation = 'none';
    void channelChangeTimerProgress.offsetWidth;
    startProgress();
}

document.addEventListener('keyup', function (e) {
    if (e.key >= 0 && e.key <= 9) {
        if (channelString == '' && e.key == '0') {
            videoElement.webkitRequestFullscreen();
        } else {
            channelString += e.key;
            keyPresses += 1;
            if (parseInt(channelString) > channelsData.length) {
                if (channelString.length >= 6) {
                    setChannelPopupInfoInvalid('Ki hogaya ei parawa??');
                } else {
                    setChannelPopupInfoInvalid(channelString);
                }
                stopProgress();
            } else {
                setChannelPopupInfo(channelString);
                resetProgress();
            }
            setTimeout((prevKeyPresses) => {
                if (prevKeyPresses == keyPresses) {
                    if (!(parseInt(channelString) > channelsData.length)) {
                        if (parseInt(channelString) - 1 != currentChannel) {
                            prevChannel = currentChannel;
                            currentChannel = parseInt(channelString) - 1;
                            setChannel(currentChannel);
                        }
                    }
                    setChannelPopupInfo(currentChannel + 1);
                    channelString = '';
                    keyPresses = 0;
                }
            }, 2000, keyPresses);
        }
    } else {
        if (e.key == 'ChannelUp' || e.key == 'ChannelDown') {
            prevChannel = currentChannel;
            if (e.key == 'ChannelUp') {
                // channel forward
                if (currentChannel == channelsData.length - 1) {
                    currentChannel = 0;
                } else {
                    currentChannel += 1;
                }
            } else {
                // channel backward
                if (currentChannel == 0) {
                    currentChannel = channelsData.length - 1;
                } else {
                    currentChannel -= 1;
                }
            }
            setChannel(currentChannel);
        } else if (e.keyCode == 0) {
            // jump
            if (prevChannel != null) {
                var temp = prevChannel;
                prevChannel = currentChannel;
                currentChannel = temp;
                setChannel(currentChannel);
            }
        }
        setChannelPopupInfo(currentChannel + 1);
    }
    showChannelNoPopup();
    if (hideChannelNoPopupTimerId != null) {
        clearTimeout(hideChannelNoPopupTimerId);
    }
    hideChannelNoPopupTimerId = setTimeout(() => {
        hideChannelNoPopup();
    }, 2000);
});

function showCurrentChannelState() {
    channelsStateHeading.innerText = 'currentChannel = ' + currentChannel + ', prevChannel = ' + prevChannel;
}
// load first channel at startup
setChannelPopupInfo(currentChannel + 1);
setChannel(currentChannel);
