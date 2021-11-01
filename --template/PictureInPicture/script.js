console.log('check js');

const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// prompt to select media stream , pass to vodeo element , then play 
// The srcObject property of the HTMLMediaElement interface sets or returns the object which serves as the source of the media associated with the HTMLMediaElement.

// The onloadedmetadata event occurs when meta data for the specified audio/video has been loaded.

// Meta data for audio/video consists of: duration, dimensions (video only) and text tracks.

// During the loading process of an audio/video, the following events occur, in this order:

// onloadstart
// ondurationchange
// onloadedmetadata
// onloadeddata
// onprogress
// oncanplay
// oncanplaythrough


async function selectMediaStream(){
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        //console.log(mediaStream);
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        }
        

    }catch(error){

        console.log("error from SelectMediaStream", error);

    }
}

button.addEventListener('click', async() => {
    // disable button 
    button.disable=true;
    //start picture in picture
    await videoElement.requestPictureInPicture();
    // reset Button
    button.disable = false;

});

// On load
selectMediaStream();