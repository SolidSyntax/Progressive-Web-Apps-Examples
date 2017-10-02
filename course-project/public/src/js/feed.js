const shareImageButton = document.querySelector('#share-image-button');
const createPostArea = document.querySelector('#create-post');
const closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn');

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
