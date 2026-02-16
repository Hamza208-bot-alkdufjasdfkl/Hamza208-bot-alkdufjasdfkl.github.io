var channelsCategories = ['news', 'sports', 'entertainment', 'cartoon'];
var channelsData = {
    'news': [
        ['92 News HD', 'http://10.15.236.170:1935/live/92-NEWS.stream/playlist.m3u8'],
        ['Hum News HD', 'http://10.15.236.170:1935/live/HUM NEWS HD.stream/playlist.m3u8'],
        ['ARY News', 'http://10.15.236.170:1935/live/ARY NEWS.stream/playlist.m3u8'],
        ['24-NEWS', 'http://10.15.236.170:1935/live/CHANNEL 24 HD.stream/playlist.m3u8'],
        ['DUNYA-NEWS', 'http://10.15.236.170:1935/live/DUNYA NEWS HD.stream/playlist.m3u8'],
        ['GEO-NEWS', 'http://10.15.236.170:1935/live/GEO NEWS HD.stream/playlist.m3u8'],
        ['SAMAA NEWS', 'http://10.15.236.170:1935/live/SAMAA NEWS.stream/playlist.m3u8']
    ],
    'sports': [
        ['A Sports HD 01', 'http://10.15.236.170:1935/live/A-SPORTS.stream/playlist.m3u8'],
        ['Geo Super', 'http://10.15.236.170:1935/live/GEO SUPER.stream/playlist.m3u8'],
        ['Ten Sports HD', 'http://10.15.236.170:1935/live/TEN SPORTS HD.stream/playlist.m3u8'],
        ['PTV Sports', 'http://10.15.236.170:1935/live/PTV SPORTS HD.stream/playlist.m3u8']
    ],
    'entertainment': [
        ['Hum Sitaray', 'http://10.15.236.170:1935/live/HUM SITARAY.stream/playlist.m3u8'],
        ['ATV', 'http://10.15.236.170:1935/live/ATV.stream/playlist.m3u8'],
        ['PTV Home', 'http://10.15.236.170:1935/live/PTV HOME.stream/playlist.m3u8'],
        ['ARY Zindagi', 'http://10.15.236.170:1935/live/ARY ZINDAGI.stream/playlist.m3u8'],
        ['Geo Entertainment', 'http://10.15.236.170:1935/live/GEO ENT.stream/playlist.m3u8'],
        ['ARY Digital', 'http://10.15.236.170:1935/live/ARY DIGITAL.stream/playlist.m3u8'],
        ['Express Entertainment', 'http://10.15.236.170:1935/live/EXPRESS ENT.stream/playlist.m3u8'],
        ['Green Entertainment', 'http://10.15.236.170:1935/live/GREEN ENTERTAINMENT.stream/playlist.m3u8'],
        ['Hum TV HD', 'http://10.15.236.170:1935/live/HUM TV HD.stream/playlist.m3u8']
    ],
    'cartoon': [
        ['CARTOON-NETWORK', 'http://10.15.236.170:1935/live/CARTOON NETWORK.stream/playlist.m3u8']
    ]
};

// Constants
const KEY_0 = 48;
const KEY_1 = KEY_0 + 1;
const KEY_2 = KEY_0 + 2;
const KEY_3 = KEY_0 + 3;
const KEY_4 = KEY_0 + 4;
const KEY_5 = KEY_0 + 5;
const KEY_6 = KEY_0 + 6;
const KEY_7 = KEY_0 + 7;
const KEY_8 = KEY_0 + 8;
const KEY_9 = KEY_0 + 9;
const KEY_JUMP = 0
const DELAY = 1000;  // ms

var sideNav = document.getElementById('side-nav');
var streamVideo = document.getElementById('stream-video');

function createCategoryHeadingPara(category, isFirst) {
    var categoryHeadingPara = document.createElement('p');
    categoryHeadingPara.innerText = category;
    categoryHeadingPara.className = 'category-heading';

    if (!isFirst) {
        categoryHeadingPara.classList.add('margin-top');
    }

    return categoryHeadingPara;
}

function createChannelButton(channelTitle, category, channelIndex) {
    var button = document.createElement('button');
    button.className = 'channel-click-button';
    button.onclick = function () {
        onChannelButtonClick(category, channelIndex); 
    }
    var innerSpan = document.createElement('span');
    innerSpan.innerText = channelTitle;
    button.appendChild(innerSpan);
    return button;
}

function showChannelsList() {
    channelsCategories.forEach(function (category, index) {
        var categoryHeading = createCategoryHeadingPara(category.toUpperCase(), !index);
        sideNav.appendChild(categoryHeading);

        channelsData[category].forEach(function (channelInfo, channelIndex) {
            var channelButton = createChannelButton(channelInfo[0], category, channelIndex);
            sideNav.appendChild(channelButton);
        })
    })
}

function setVideoSrc(url) {
    streamVideo.setAttribute('src', url);
}

function onChannelButtonClick(category, channelIndex) {
    setVideoSrc(channelsData[category][channelIndex][1]);
}

var body = document.getElementsByTagName('body')[0];

body.onkeyup = function (e) {
    if (e.keyCode == 48) {
        streamVideo.webkitEnterFullscreen();
    }
}

showChannelsList();
setVideoSrc(channelsData['news'][0][1]);
