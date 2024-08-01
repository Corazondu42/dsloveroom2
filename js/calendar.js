// Functions

const GetFormattedDate = (i) => {
    let iDate = new Date(currYear, currMonth, i+1);
    let formattedDate = iDate.toISOString();

    formattedDate = (formattedDate.split("T"))[0];
    
    return formattedDate;
}

const RenderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDateofPrevMonth = new Date(currYear, currMonth, 0).getDate(),
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth + 1, 0).getDay();

    // Array containing days that are already booked

    let bookedDatesHTML = document.querySelectorAll("#booked_dates li");
    let bookedDates = []
    for (let i=0; i<bookedDatesHTML.length; i++) {
        bookedDates.push(bookedDatesHTML[i].innerText);
    }

    // Conversion to french calendar order
    firstDayofMonth = frenchOrder[firstDayofMonth]; 
    lastDayofMonth = frenchOrder[lastDayofMonth];
    
    let li = "";

    // Days of previous month

    for (let i = firstDayofMonth; i > 0; i--) {
        
        li += "<li class='inactive'>" + (lastDateofPrevMonth - i + 1) + "</li>";
        
    }

    // Days of current month

    for (let i = 1; i <= lastDateofMonth; i++) {

        // We highlight today's date

        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
                        && currYear === new Date().getFullYear() ? "active" : "";
    
        // We identify the date corresponding to i

        if (bookedDates.includes(GetFormattedDate(i))) {
            li += "<li class=" + "booked" + ">" + i + "</li>";
        } else {
            li += "<li class=" + isToday + ">" + i + "</li>";
        }
        
    }

    // Days of next month

    for (let i = lastDayofMonth; i < 6; i++) {

        li += "<li class='inactive'>" + (i - lastDayofMonth + 1) + "</li>";
        
    }
    
    currentDate.innerText = months[currMonth] + " " + currYear.toString();
    days.innerHTML = li;
};

// General values

const currentDate = document.querySelector(".current-date");
const days = document.querySelector(".calendar .days");

const prevNextIcon = document.querySelectorAll(".icons i");

let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const frenchOrder = [6, 0, 1, 2, 3, 4, 5];

// We initialize the rendering system

RenderCalendar();

prevNextIcon.forEach(icon => {

    icon.addEventListener("click", () => {

        // We actualize the month

        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        // We actualize the year

        if (currMonth < 0 || currMonth > 11) {
            
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear(),
            currMonth = date.getMonth();
            
        }

        RenderCalendar();

    });

});