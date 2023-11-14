// In your main script file
import userStories from './userStories.js';

document.addEventListener('DOMContentLoaded', function() {
    const searchBox = document.getElementById('searchBox');
    const results = document.getElementById('results');
    const clearFilterButton = document.getElementById('clearFilter');
    clearFilterButton.addEventListener('click', function() {
        // Reset the search box
        searchBox.value = '';

        // Reset the results to show all stories
        results.innerHTML = '';
        userStories.forEach(story => {
            const div = document.createElement('div');
            div.classList.add('result-item');
            div.textContent = story.story; // Remember to access the 'story' property
            // ... Rest of the code to append the story and add click event ...
        });
    });
    const updateResults = (stories) => {
        results.innerHTML = '';
        stories.forEach(storyObj => {
            const div = document.createElement('div');
            div.classList.add('result-item');
            div.textContent = storyObj.story;
            div.addEventListener('click', function() {
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(storyObj.story).then(() => {
                        alert('Story copied to clipboard!');
                    }, (err) => {
                        console.error('Could not copy text: ', err);
                    });
                } else {
                    // Fallback method for older browsers
                    const textarea = document.createElement('textarea');
                    textarea.value = storyObj.story;
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    textarea.remove();
                    alert('Story copied to clipboard (fallback method)!');
                }
            });
            results.appendChild(div);
        });
    };

    searchBox.addEventListener('input', function() {
    const searchTerm = searchBox.value.toLowerCase();
    if (searchTerm) {
        const filteredStories = userStories.filter(storyObj => storyObj.story.toLowerCase().includes(searchTerm));
        updateResults(filteredStories);
    } else {
        // If search box is empty, clear the results
        results.innerHTML = '';
    }
    });

    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            const filteredStories = userStories.filter(storyObj => storyObj.category === filter);
            updateResults(filteredStories);
        });
    });
});
