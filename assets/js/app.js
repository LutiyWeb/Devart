
$(function () {
    // accordion script

    const accordionButtons = document.querySelectorAll('.question__item-head');

    var i;
    for (i = 0; i < accordionButtons.length; i++) {
        accordionButtons[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }

    //return up btn

    $("#scroll-top").click(function () {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });

    //burger nav

    $(".burger-button").on("click", function () {
        $('.header').toggleClass("mobile-nav");
        $('.burger-button').toggleClass("burgermenu_active");
        $('body').toggleClass("block-scroll");
    });
});


// Sliders-----------------------------------------------------------

new Swiper('.succes__slider-inner', {
    slidesPerView: 3,
    spaceBetween: 30,

    navigation: {
        nextEl: '.swiper-button-prev',
        prevEl: '.swiper-button-next'
    },

    pagination: {
        el: '.swiper-pagination',
        type: 'fraction'
    },


    // centeredSlides: true,
    breakpoints: {

        768: {
            slidesPerView: 3,
            spaceBetween: 30,

        },

        560: {
            slidesPerView: 2,
            spaceBetween: 20,

        },

        320: {
            slidesPerView: 1,
            spaceBetween: 20,

        },

    },

});


// TABS/////////////////////////////////////////////////////////////////////////////////

let tabs = document.querySelector('.tabs');
const tabsBtn = document.querySelectorAll('.tabs__btn');
const tabsContent = document.querySelectorAll('.tabs__content');
if (tabs) {
    tabs.addEventListener('click', (e) => {
        if (e.target.classList.contains('tabs__btn')) {
            const tabsPath = e.target.dataset.tabsPath;
            tabsBtn.forEach(el => { el.classList.remove('tabs__btn--active') });
            document.querySelector(`[data-tabs-path="${tabsPath}"]`).classList.add('tabs__btn--active');
            tabsHandler(tabsPath);
        }
    });
    const tabsHandler = (path) => {
        tabsContent.forEach(el => { el.classList.remove('tabs__content--active') });
        document.querySelector(`[data-tabs-target="${path}"]`).classList.add('tabs__content--active');
    };
}

// editor section

const editorItem = document.querySelectorAll('.editor__item');

for (item of editorItem) {
    item.addEventListener('click', function () {
        if (this.classList.contains('active')) {
            this.classList.remove('active');
        } else {
            for (el of editorItem) {
                el.classList.remove('active');
            }
            this.classList.add('active');
        }
    })
}

// custom video player scrypt
const video = document.querySelector('.video'),
    playBtn = document.querySelector('.controls__play'),
    stopBtn = document.querySelector('.controls__stop'),
    playBtnImg = document.querySelector('.play__btn'),
    progress = document.querySelector('.progress'),
    time = document.querySelector('.controls__time'),
    videoBg = document.querySelector('.video__bg');


// Play & Pause video
function toggleVideoStatus() {
    if (video.paused) {
        video.play()
        playBtnImg.src = 'assets/img/pause.svg'
        videoBg.classList.add('hidden');
        videoBg.classList.remove('show');
    } else {
        video.pause()
        playBtnImg.src = 'assets/img/play.svg';
        videoBg.classList.add('show');
        videoBg.classList.remove('hidden');

    }
}
playBtn.addEventListener('click', toggleVideoStatus)
videoBg.addEventListener('click', toggleVideoStatus)
video.addEventListener('click', toggleVideoStatus)


// Stop video
function stopVideo() {
    video.currentTime = 0
    video.pause()
    playBtnImg.src = 'assets/img/play.svg'
    videoBg.classList.remove('hidden');
}
stopBtn.addEventListener('click', stopVideo)

// Timer
function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100

    // Minutes
    let minutes = Math.floor(video.currentTime / 60)
    if (minutes < 10) {
        minutes = '0' + String(minutes)
    }

    // Seconds
    let seconds = Math.floor(video.currentTime % 60)
    if (seconds < 10) {
        seconds = '0' + String(seconds)
    }

    time.innerHTML = `${minutes}:${seconds}`
}
video.addEventListener('timeupdate', updateProgress)

// Set progress
function setProgress() {
    video.currentTime = (progress.value * video.duration) / 100
}
progress.addEventListener('change', setProgress);