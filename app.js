var timeOut;

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAni() {
    var tl = gsap.timeline();
    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut

    })
        .to(".boundingElem", {
            y: '0',
            ease: Expo.easeInOut,
            duration: 2,
            delay: -1.2,
            stagger: .2
        })
        .from("#heroFooter", {
            y: '-10',
            opacity: 0,
            duration: 1.5,
            delay: -1.2,
            ease: Expo.easeInOut
        })
}

function circleFlat() {
    var xscale = 1;
    var yscale = 1;

    var xPrev = 0;
    var yPrev = 0;
    window.addEventListener("mousemove", function (dets) {
        clearTimeout(timeOut);
        xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xPrev);
        yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yPrev);
        xPrev = dets.clientX;
        yPrev = dets.clientY;

        circleMouseFollower(xscale, yscale);
        timeOut = setTimeout(function () {
            document.querySelector("#miniCircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px)scale(1,1)`;
        }, 100);
    })
}

function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
        document.querySelector("#miniCircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px)scale(${xscale},${yscale})`;
    })
}

circleMouseFollower();
firstPageAni();
circleFlat();

document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function (dets) {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: .5,
        })
    })

    elem.addEventListener("mousemove", function (details) {
        var diff = details.clientY - elem.getBoundingClientRect().top;
        diffrot = details.clientX - rotate;
        rotate = details.clientX;

        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: details.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot * .6)
        });
    });
});

function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');


    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    const timeString = `${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;

    document.getElementById('currentTime').textContent = timeString;
}

updateTime();
setInterval(updateTime, 1000);
