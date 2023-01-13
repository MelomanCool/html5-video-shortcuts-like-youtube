// ==UserScript==
// @name         HTML5 Video controls like YouTube
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       MelomanCool
// @match        *://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.onkeydown = vidCtrl;

    function seek(vid, pos) {
        pos = Math.max(0, pos);
        pos = Math.min(pos, vid.duration);
        vid.currentTime = pos;
    }

    function seekRel(vid, diff) {
        const pos = vid.currentTime + diff;
        seek(vid, pos);
    }

    function seekPercent(vid, percent) {
        const pos = vid.duration * (percent / 100);
        seek(vid, pos);
    }

    // https://gist.github.com/demonixis/5188326
    function toggleFullscreen(element) {

        var isFullscreen = document.webkitIsFullScreen || document.mozFullScreen || false;

        element.requestFullScreen = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || function () { return false; };
        document.cancelFullScreen = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || function () { return false; };

        isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();
    }

    function vidCtrl(e) {
        if (e.target.tagName !== "VIDEO"){
            return;
        }

        if (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) {
            return;
        }

        const key = e.code;
        const vid = e.target;

        if (key === 'ArrowLeft' || key === 'KeyA') {
            e.preventDefault();
            seekRel(vid, -5);
        } else if (key === 'ArrowRight' || key === 'KeyD') {
            e.preventDefault();
            seekRel(vid, 5);
        } else if (key === 'KeyJ') {
            e.preventDefault();
            seekRel(vid, -10);
        } else if (key === 'KeyL') {
            e.preventDefault();
            seekRel(vid, 10);
        } else if (key === "KeyK") {
            e.preventDefault();
            if (vid.paused) {
                vid.play();
            } else{
                vid.pause();
            }
        } else if (key === 'Digit0') {
            e.preventDefault();
            seekPercent(vid, 0);
        } else if (key === 'Digit1') {
            e.preventDefault();
            seekPercent(vid, 10);
        } else if (key === 'Digit2') {
            e.preventDefault();
            seekPercent(vid, 20);
        } else if (key === 'Digit3') {
            e.preventDefault();
            seekPercent(vid, 30);
        } else if (key === 'Digit4') {
            e.preventDefault();
            seekPercent(vid, 40);
        } else if (key === 'Digit5') {
            e.preventDefault();
            seekPercent(vid, 50);
        } else if (key === 'Digit6') {
            e.preventDefault();
            seekPercent(vid, 60);
        } else if (key === 'Digit7') {
            e.preventDefault();
            seekPercent(vid, 70);
        } else if (key === 'Digit8') {
            e.preventDefault();
            seekPercent(vid, 80);
        } else if (key === 'Digit9') {
            e.preventDefault();
            seekPercent(vid, 90);
        } else if (key === 'KeyF') {
            e.preventDefault();
            toggleFullscreen(vid);
        }
    }
})();
