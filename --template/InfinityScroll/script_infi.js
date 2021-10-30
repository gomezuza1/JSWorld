// console.log('check js');
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash API
// add ramdon to get ramdon photos form the serer 
// adn count to get 1 to 30 photos
const count = 10;
const apiKey = 't1Rftk8tzAWxjxbTDKREVKLPbcWeQVtwBJh37DvbKf0';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// // Helper Function to Set Attributes on DOM Elements
// function setAttributes(element, attributes) {
//     for (const key in attributes) {
//       element.setAttribute(key, attributes[key]);
//     }
//   }

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
      // Create <a> to link to Unsplash
      const item = document.createElement(`a`);
      item.setAttribute(`href`, photo.links.html);
      console.log(`item.href`);
      item.setAttribute(`target`, `_blank`);
      

      
      // Create <img> for photo
      const img = document.createElement(`img`);
      img.setAttribute(`src`, photo.urls.regular);
      img.setAttribute(`alt`, photo.location.name);
      img.setAttribute(`title`, photo.location.title);

      // Put <img> inside <a>, then put both inside imageContainer Element
      
      item.appendChild(img);
      imageContainer.appendChild(item);
    });
    
  }



async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray= await response.json();
        console.log(photosArray);
        displayPhotos();

    }catch (error){

    }
}

// On load 

window.addEventListener('scroll', ()=>{
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight -1000){
    getPhotos();
    console.log("load more");
  }
} );

getPhotos();