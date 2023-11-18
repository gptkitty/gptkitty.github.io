// Import user stories
import userStories from './userStories.js';

document.addEventListener('DOMContentLoaded', function() {
    const searchBox = document.getElementById('searchBox');
    const results = document.getElementById('results');
    const clearFilterButton = document.getElementById('clearFilter');

    // Clear filter button event
    clearFilterButton.addEventListener('click', function() {
        searchBox.value = ''; // Reset the search box
        updateResults(userStories); // Show all stories
    });

    // Function to update search results
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

            // Click event to copy story
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

    // Function to show toast notification
    function showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000); // Toast disappears after 3 seconds
    }

    // Event listener for search box input
    searchBox.addEventListener('input', function() {
    const searchTerm = searchBox.value.toLowerCase();

    // Updated filter to include title, story, and category
    const filteredStories = userStories.filter(storyObj => 
        storyObj.title.toLowerCase().includes(searchTerm) ||
        storyObj.story.toLowerCase().includes(searchTerm) ||
        storyObj.category.toLowerCase().includes(searchTerm)
    );

    updateResults(filteredStories);
});

    // Event listeners for filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            const filteredStories = userStories.filter(storyObj => storyObj.category === filter);
            updateResults(filteredStories);
        });
    });
});
