const shareImageButton = document.querySelector('#share-image-button');
const createPostArea = document.querySelector('#create-post');
const closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn');
const sharedMomentsArea = document.querySelector('#shared-moments');

function openCreatePostModal() {
    createPostArea.style.display = 'block';
    if (deferedPrompt) {
        deferedPrompt.prompt();

        deferedPrompt.userChoice
            .then(choiceResult => {
                console.log(choiceResult.outcome);

                if (choiceResult.outcome === 'dismissed') {
                    console.log('User canceled installation');
                } else {
                    console.log('User accepted installation');
                }

            });
        deferedPrompt = null;
    }
}

function closeCreatePostModal() {
    createPostArea.style.display = 'none';
}

shareImageButton.addEventListener('click', openCreatePostModal);

closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);

// Not used, example to show how to cache one user demand
const onSaveButtonClicked = (event) => {
    console.log('Clicked');
    if('caches' in window){
    caches.open('user-requested')
        .then(cache => {
            cache.add('https://httpbin.org/get');
            cache.add('/src/images/sf-boat.jpg');
        });
    }
};

function createCard() {
    const cardWrapper = document.createElement('div');
    cardWrapper.className = 'shared-moment-card mdl-card mdl-shadow--2dp';
    const cardTitle = document.createElement('div');
    cardTitle.className = 'mdl-card__title';
    cardTitle.style.backgroundImage = 'url("/src/images/sf-boat.jpg")';
    cardTitle.style.backgroundSize = 'cover';
    cardTitle.style.height = '180px';
    cardWrapper.appendChild(cardTitle);
    const cardTitleTextElement = document.createElement('h2');
    cardTitleTextElement.className = 'mdl-card__title-text';
    cardTitleTextElement.textContent = 'San Francisco Trip';
    cardTitle.appendChild(cardTitleTextElement);
    const cardSupportingText = document.createElement('div');
    cardSupportingText.className = 'mdl-card__supporting-text';
    cardSupportingText.textContent = 'In San Francisco';
    cardSupportingText.style.textAlign = 'center';

    // const cardSaveButton = document.createElement('button');
    // cardSaveButton.textContent = 'Save';
    // cardSaveButton.addEventListener('click', onSaveButtonClicked);
    // cardSupportingText.appendChild(cardSaveButton);

    cardWrapper.appendChild(cardSupportingText);
    componentHandler.upgradeElement(cardWrapper);
    sharedMomentsArea.appendChild(cardWrapper);
}

fetch('https://httpbin.org/get')
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        createCard();
    });
