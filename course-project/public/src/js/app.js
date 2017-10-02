// Add polyfills if needed
if(!window.Promise){
    window.Promise = Promise;
}

// Register a service worker
if('serviceWorker' in navigator){
    navigator.serviceWorker
        .register('/sw.js')
        .then(()=> console.log("Service worker registered"))
        .catch((error) => console.log(error));
}

// Prevent the default install prompt
let deferedPrompt;
window.addEventListener('beforeinstallprompt', event => {
    console.log('beforeinstallprompt fired');
    deferedPrompt = event.preventDefault();
});