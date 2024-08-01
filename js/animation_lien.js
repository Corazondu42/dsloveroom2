// Fonction qui calcule l'évolution de la longueur en fonction du temps

function addition (time) {

    if (time >= 0 && time <= 0.5) {
        return Math.log(time + 0.02) + 4;
    } else if (time >= 0.5 && time <= 1) {
        return Math.log(-1 * time + 1.02) + 4;
    } else {
        console.log("MINCE...");
    }

}

let bigloop = setInterval( function () {

    let divs = document.querySelectorAll("a:hover div.survolement");

    divs.forEach(element => {

        if (element.dataset.done === "True") return;
        element.dataset.done = "True";

        let width = element.parentNode.offsetWidth;

        let startvalue = 0;
        let endvalue = width;

        let duration = element.dataset.duration;

        let delay = Math.floor(duration / width * 2.47); // 2.47 : Valeur moyenne des deux fonctions logarithmiques utilisées ci-dessus

        // Gestion de la boucle d'animation

        let start = performance.now();
        let lattest = 0;
        let time = 0;

        let carry = 0;

        let loop = setInterval(

            function () {
                
                lattest = performance.now();
                time = (lattest - start) / 1000;

                addvalue = addition(time);

                startvalue += Math.ceil(addvalue);

                // Gestion des approximations des arrondis

                carry += addvalue - Math.floor(addvalue);
                if (carry >= 1) {
                    carry -= Math.floor(carry);
                    startvalue += Math.floor(carry);
                }

                newwidth = startvalue;
                element.style.width = newwidth.toString() + "px";
            
                if (newwidth >= endvalue || element.dataset.done === "Doing") { /* Doing est bien exclusivement utilisé par la fonction ci-dessous */
                    clearInterval(loop);
                }

            }
        , delay);

    });

    divs = document.querySelectorAll("a:not(:hover) div.survolement");

    divs.forEach(element => {

        if (element.dataset.done !== "True") return;
        element.dataset.done = "Doing";

        let width = element.offsetWidth;

        let startvalue = width;
        let endvalue = 0;

        let duration = element.dataset.duration;

        let delay = Math.floor(duration / width * 2.47); // 2.47 : Valeur moyenne des deux fonctions logarithmiques utilisées ci-dessus

        // Gestion de la boucle d'animation

        let start = performance.now();
        let lattest = 0;
        let time = 0;

        let carry = 0;

        let loop = setInterval(

            function () {

                lattest = performance.now();
                time = (lattest - start) / 1000;

                addvalue = addition(time);

                startvalue -= Math.ceil(addvalue);

                // Gestion des approximations des arrondis

                carry += Math.ceil(addvalue) - addvalue;
                if (carry >= 1) {
                    carry -= Math.floor(carry);
                    startvalue -= Math.floor(carry);
                }

                if (startvalue < 0)
                    newwidth = 0;
                else 
                    newwidth = startvalue;
                
                element.style.width = newwidth.toString() + "px";
                if (newwidth <= endvalue || element.dataset.done === "True") {
                    clearInterval(loop);
                
                    element.dataset.done = "false";
                }

            }
        , delay);

    });

}, 0.01);
