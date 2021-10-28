
// // synchronous
// let a =1;
// let b =2;

// // asynchronous
// setTimeout(()=>{
//     console.log("time out " + a)
// },100)

// a=10;
// // asynchronous
// fetch('/').then(function(){
//     console.log('fetch')

// })
// // synchronous
// console.log('synchronous');

// console.log(a);
// console.log(b);

// // fetch API asyn function 

// fetch('https://jsonplaceholder.typicode.com/todos')


const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


function showLoadingSpinner(){
    loader.hidden =false;
    quoteContainer.hidden = true;

}


function removeLoadingSpinner() {
    if(!loader.hidden){
        quoteContainer.hidden =false;
        loader.hidden = true;
    }
}

// Get Quote From API
async function getQuote () {
    showLoadingSpinner();
    const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        if (data.quoteAuthor=== ''){
            authorText.innerText = 'unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        // reduce font size for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }

        quoteText.innerText = data.quoteText;
        //console.log(data);
        removeLoadingSpinner();
        //throw new Error('opps I did again')

    } catch (error){
        console.log(error);
        getQuote();
        //console.log('whoops', error);
    }

}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuote();
//loading();


