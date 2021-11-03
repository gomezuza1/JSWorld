// option 1 without for each

// const menuBars = document.getElementById('menu-bars');
// const overlay = document.getElementById('overlay');
// const nav1 = document.getElementById('nav-1');
// const nav2 = document.getElementById('nav-2');
// const nav3 = document.getElementById('nav-3');
// const nav4 = document.getElementById('nav-4');
// const nav5 = document.getElementById('nav-5');
// const navItems = [nav1, nav2, nav3, nav4, nav5];

// function toggleNav() {
//     // Toggle: Menu Bars Open/Closed
//     menuBars.classList.toggle('change');
  
//     // Toggle: Menu Active
//     overlay.classList.toggle('overlay-active');
//     // console.log("menubars", menuBars);
//     // console.log("overlay", overlay.classList.contains('overlay-active'));
//     if (overlay.classList.contains('overlay-active')) {
//         // Animate In - Overlay
//         overlay.classList.add('overlay-slide-right');
//         overlay.classList.remove( 'overlay-slide-left');
//      } else {
//         // Animate Out - Overlay
//         overlay.classList.remove('overlay-slide-right');
//         overlay.classList.add( 'overlay-slide-left');
//       }


// }


// // Event Listeners
// menuBars.addEventListener('click', toggleNav);

// // old way
// // nav1.addEventListener('click', toggleNav);
// // nav2.addEventListener('click', toggleNav);
// // nav3.addEventListener('click', toggleNav);
// // nav4.addEventListener('click', toggleNav);
// // nav5.addEventListener('click', toggleNav);

// // // for way 
// navItems.forEach((nav) => {
//   nav.addEventListener('click', toggleNav);
// });

// option 2

const menuBars = document.getElementById('menu-bars');
const overlay = document.getElementById('overlay');
const nav1 = document.getElementById('nav-1');
const nav2 = document.getElementById('nav-2');
const nav3 = document.getElementById('nav-3');
const nav4 = document.getElementById('nav-4');
const nav5 = document.getElementById('nav-5');
const navItems = [nav1, nav2, nav3, nav4, nav5];

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