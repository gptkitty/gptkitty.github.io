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
            const card = document.createElement('div');
            card.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow-md', 'hover:bg-gray-100', 'cursor-pointer', 'mb-4');

            const title = document.createElement('h3');
            title.classList.add('text-lg', 'font-bold');
            title.textContent = storyObj.title;
            card.appendChild(title);

            const content = document.createElement('p');
            content.classList.add('text-gray-600');
            content.textContent = storyObj.story;
            card.appendChild(content);

            const categoryBadge = document.createElement('span');
            categoryBadge.classList.add('inline-block', 'bg-blue-500', 'text-white', 'px-3', 'py-1', 'text-xs', 'font-semibold', 'rounded-full');
            categoryBadge.textContent = storyObj.category;
            card.appendChild(categoryBadge);

            card.addEventListener('click', function() {
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(storyObj.story).then(() => {
                        showToast('Story copied to clipboard!');
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
                    showToast('Story copied to clipboard! (fallback method)');
                }
            });

            results.appendChild(card);
        });
    };

    function showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.remove('hidden');

        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000); // Toast disappears after 3 seconds
    }




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
            console.log(`Filter selected: ${filter}`); // Debugging line

            const filteredStories = userStories.filter(storyObj => storyObj.category === filter);
            console.log(`Filtered stories:`, filteredStories); // Debugging line

            updateResults(filteredStories);
        });
    });
});