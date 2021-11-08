const menuBars = document.getElementById('menu-bars');
const overlay = document.getElementById('overlay');
const nav1 = document.getElementById('nav-1');
const nav2 = document.getElementById('nav-2');
const nav3 = document.getElementById('nav-3');
const nav4 = document.getElementById('nav-4');
const nav5 = document.getElementById('nav-5');
const navItems = [nav1, nav2, nav3, nav4, nav5];
const sliderGet = document.getElementById('slider');



// const dinamic url
const GetUrl = document.getElementById('home').outerHTML;
const dinaUrls = document.querySelectorAll('section');
let = urlStart = dinaUrls[0].style.backgroundImage;
console.log('dinaurls',dinaUrls);

console.log("result",urlStart);
// UnsplashAPI
const count = 10;
const ApiKey= 'YdhrjlUrYGEb1fbU3FZzTJh2W9EWs1d5X5wB7LMq87Y';
const apiUrl= `https://api.unsplash.com/photos/random/?client_id=${ApiKey}&count=${count}`;
const urlDefault ="https://images.unsplash.com/photo-1612698093158-e07ac200d44e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80";



let PhotosArray = new Array(
  "background-image:url(https://images.unsplash.com/photo-1635800151660-9dcf3b034365?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzM2MjN8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzYxNjE0Nzc&ixlib=rb-1.2.1&q=80&w=1080)",
   "background-image:url(https://images.unsplash.com/photo-1612698093158-e07ac200d44e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80)",
   "background-image:url(https://images.unsplash.com/photo-1633944348847-b3b4ff52b19c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzM2MjN8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzYxNjAxNTI&ixlib=rb-1.2.1&q=80&w=1080)",
   "background-image:url(https://images.unsplash.com/photo-1596753365498-2d23bbfcbc24?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80)",
   "background-image:url(https://images.unsplash.com/photo-1600256698889-61ff2cd73cd8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1471&q=80)"

);

console.log("slider", sliderGet);
temp= PhotosArray[0];

//  sliderGet.setAttribute("style","background-image:url(http://placekitten.com/300);");
 sliderGet.setAttribute("style",PhotosArray[2]);
var current=0;

 function nextBackground(){
    // current = current+1
    current++;
    // % Modulus (Division Remainder)
    current = current % PhotosArray.length;
    sliderGet.setAttribute("style",PhotosArray[current]);
     console.log("current",current)

 }
//setInterval(nextBackground, 10000);

//  dinaUrls[0].style.backgroundImage='';

// create element for photos
   function displayPhotos(){
     PhotosArray.forEach((photo) =>{
       const item = document.createElement('a');
       let url = [];
       url = photo.urls.regular;
      
       console.log('fun_diplay',url);
     

     });

   }

async function getPhoto() {
  try{
    const response = await fetch(apiUrl);
    PhotosArray = await response.json();
    // console.log('Function_getphoto',PhotosArray);
    displayPhotos();


  }catch (error){

  }
}

//getPhoto();

// Control Navigation Animation
function navAnimation(direction1, direction2) {
  navItems.forEach((nav, i) => {
    nav.classList.replace(`slide-${direction1}-${i + 1}`, `slide-${direction2}-${i + 1}`);
  });
}

function toggleNav() {
  // Toggle: Menu Bars Open/Closed
  menuBars.classList.toggle('change');
  // Toggle: Menu Active
  overlay.classList.toggle('overlay-active');
  if (overlay.classList.contains('overlay-active')) {
    // Animate In - Overlay
    overlay.classList.replace('overlay-slide-left', 'overlay-slide-right');
    // Animate In - Nav Items
    navAnimation('out', 'in');
  } else {
    // Animate Out - Overlay
    overlay.classList.replace('overlay-slide-right', 'overlay-slide-left');
    // Animate Out - Nav Items
    navAnimation('in', 'out');
  }
}

// Event Listeners
menuBars.addEventListener('click', toggleNav);
navItems.forEach((nav) => {
  nav.addEventListener('click', toggleNav);
});
