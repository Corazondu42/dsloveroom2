let elements = document.querySelectorAll(".animation-intersection");

elements.forEach((element) => {

    thresholdValue = element.dataset.threshold;

    let elementObserver = new IntersectionObserver((entries, observer) => {
        let [entry] = entries;

        if (!entry.isIntersecting) return;

        element.classList.remove("animation-intersection");

        // animation = element.dataset.animation;
        element.classList.add("toanimate");

    }, {
        root: null,
        threshold: thresholdValue,
    });

    target = document.querySelector(element.dataset.animrefersto);
    elementObserver.observe(target);

});

