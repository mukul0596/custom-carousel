const eventsContainer = document.getElementsByClassName("events-container")[0];

const numberOfEvents = parseInt(prompt("Enter the total number of events: "));
let setNumber = 1;
let numberOfEventsinOneSet = parseInt(prompt("Enter the number of events to be shown at a time: "));
let numberOfSet = parseInt(numberOfEvents / numberOfEventsinOneSet);
let numberOfEventsinLastSet = numberOfEvents % numberOfEventsinOneSet;
let cardWidth = 80 / numberOfEventsinOneSet; 
if ( cardWidth > 20) {
    cardWidth = 20;
}
const cardHeight = cardWidth * 1.4;
const fontSize = cardWidth * 0.6;

const createEvent = () => {
    for (i = 0; i < numberOfSet; i++) {
        let eventsSet = document.createElement('div');
        eventsSet.className = "events-set";
        for (j = 0; j < numberOfEventsinOneSet; j++) {
            let eventsCard = document.createElement('div');
            eventsCard.style.width = cardWidth + 'vw';
            eventsCard.style.height = cardHeight + 'vw';
            eventsCard.style.fontSize = fontSize + 'rem';
            eventsCard.className = "events-card";
            eventsCard.innerHTML = i*numberOfEventsinOneSet + j + 1;

            eventsSet.appendChild(eventsCard);
        }
        eventsContainer.appendChild(eventsSet);
    }
    if (numberOfEventsinLastSet != 0) {
        let eventsSet = document.createElement('div');
        eventsSet.className = "events-set";
        for (j = 0; j < numberOfEventsinLastSet; j++) {
            let eventsCard = document.createElement('div');
            eventsCard.style.width = cardWidth + 'vw';
            eventsCard.style.height = cardHeight + 'vw';
            eventsCard.style.fontSize = fontSize + 'rem';
            eventsCard.className = "events-card";
            eventsCard.innerHTML = i*numberOfEventsinOneSet + j + 1;
            
            eventsSet.appendChild(eventsCard);
        }
        eventsContainer.appendChild(eventsSet);
    }
}

const createEventDots = () => {
    const dotsContainer = document.getElementsByClassName('events-nav-dots')[0];
    for (i = 0; i < numberOfSet; i++) {
        let dot = document.createElement('div');
        dot.className = "event-nav-dot";
        dot.id = (i + 1);
        dot.setAttribute('onclick', 'navigateEvent(this.id)');
        dotsContainer.appendChild(dot);
    }
    if (numberOfEventsinLastSet != 0) {
        let dot = document.createElement('div');
        dot.className = "event-nav-dot";
        dot.id = (i + 1);
        dot.setAttribute('onclick', 'navigateEvent(this.id)');
        dotsContainer.appendChild(dot);
    }
}


const changeEventSet = () => {
    const limit = (numberOfEventsinLastSet == 0) ? numberOfSet : (numberOfSet + 1);
    if (setNumber < limit) {
        setNumber++;
        eventsContainer.style.transform = "translate(" + (-100 * (setNumber - 1)) + "%)";
        for (dot of document.getElementsByClassName('event-nav-dot')) {
            dot.style.background = 'none';
        }
        setTimeout(() => {
            document.querySelectorAll('.events-nav-dots > .event-nav-dot')[setNumber - 1].style.background = "#ffffff";
        }, 1100);
    } else {
        setNumber = 0;
        changeEventSet();
    }
}

const navigateEvent = (dotIndex) => {
    if (setNumber != dotIndex) {
        setNumber = dotIndex - 1;
        changeEventSet();
        clearInterval(eventSetChangeInterval);
        eventSetChangeInterval = setInterval(changeEventSet, 5000);
    }
}

eventSetChangeInterval = setInterval(changeEventSet, 5000);
createEventDots();
createEvent();