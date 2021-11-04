const countdownForm = document.getElementById('countdownForm');
const inputContainer = document.getElementById('input-container');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
//copy date value in a variable
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;


//console.log('countdown value GLOBAL', countdownValue);
//console.log('date GLOBAL', Date);

// Set Date Input Min & Value with Today's Date
const today = new Date().toISOString().split('T')[0];
//console.log(today);
dateEl.setAttribute('min', today);

// Populate Countdown / Complete UI
function updateDOM() {
    // this function set interval run each second
    countdownActive = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownValue - now;
    //   console.log('now', now);
    //   console.log('countdown value insideU-P-DOM', countdownValue);
    //   console.log('distance', distance);

    // math floor return the largers whole number 1.5 return 1
       const days = Math.floor(distance / day);
       const hours = Math.floor((distance % day) / hour);
       const minutes = Math.floor((distance % hour) / minute);
       const seconds = Math.floor((distance % minute) / second);
       //console.log(days,hours,minutes,seconds);
       // Hide Input
       inputContainer.hidden = true;
       // If the countdown has ended, show final state
       if (distance < 0) {
         countdownEl.hidden = true;
         clearInterval(countdownActive);
         completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
         completeEl.hidden = false;
       } else {
         // else, show the countdown in progress
         countdownElTitle.textContent = `${countdownTitle}`;
         // check the number of span created in the html 
         timeElements[2].textContent = `${days}`;
         timeElements[3].textContent = `${hours}`;
         timeElements[4].textContent = `${minutes}`;
         timeElements[5].textContent = `${seconds}`;
         completeEl.hidden = true;
         countdownEl.hidden = false;
       }
     }, second);
  }





// submit return SubmitEvent

function updateCountdown(e) {
    // prevent the refrech of all page
    e.preventDefault();
    //console.log(e);
    //console.log(countdownTitle);
    // Set title and date, save to localStorage
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
     savedCountdown = {
       title: countdownTitle,
       date: countdownDate,
     };
     console.log(savedCountdown);
     // local storage of value object like JSON string
     // I cant see the value in inspect application local storage
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));
    // // Check if no date entered
      if (countdownDate === '') {
       alert('Please select a date for the countdown.');
     } else {

        // Get number version of current Date, updateDOM
       countdownValue = new Date(countdownDate).getTime();
       //console.log('countdown value insideU-C', countdownValue);
       updateDOM();
     }
  }

  function reset() {
    // Hide countdowns, show input form
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    // Stop the countdown
    clearInterval(countdownActive);
    // Reset values, remove localStorage item
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
  }

  function restorePreviousCountdown() {
    // Get countdown from localStorage if available
    if (localStorage.getItem('countdown')) {
      inputContainer.hidden = true;
      // convert json string to obj 
      savedCountdown = JSON.parse(localStorage.getItem('countdown'));
      countdownTitle = savedCountdown.title;
      countdownDate = savedCountdown.date;
      countdownValue = new Date(countdownDate).getTime();
      updateDOM();
    }
  }



// Event Listener
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// On Load, check localStorage
restorePreviousCountdown();