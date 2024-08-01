let counters = document.querySelectorAll(".counter");

let speed = 200;
counters.forEach((counter) => {

    let counterObserver = new IntersectionObserver((entries, observer) => {

    let [entry] = entries;
    if (!entry.isIntersecting) return;

    if (counter.dataset.done === "True" || counter.dataset.done === "Doing") return;
    counter.dataset.done = "Doing";

    let startValue = 0;
    let endValue = counter.dataset.target;

    let interval = counter.dataset.duration;
    let duration = Math.floor(interval / endValue);
    let loop = setInterval(

        function () {
            startValue += 1;
            counter.innerText = startValue;
                
            if (startValue == endValue) {
                clearInterval(loop);

                counter.dataset.done = "True";
            }
        }

    , duration);

    }, {
    root: null,
    threshold: 0.45,
    });

    intersection = document.querySelector(counter.dataset.refersto);
    counterObserver.observe(intersection);

});