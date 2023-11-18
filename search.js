// Import user stories
import userStories from './userStories.js';

document.addEventListener('DOMContentLoaded', function() {
    const searchBox = document.getElementById('searchBox');
    const results = document.getElementById('results');
    const clearFilterButton = document.getElementById('clearFilter');

    // Helper function to format the story in three lines
    function formatStory(story) {
        let parts = story.match(/As a (.+), I want (.+) so that (.+)/);
        if (parts && parts.length === 4) {
            return `I want ${parts[2]}\nso that ${parts[3]}`;
        } else {
            return story;
        }
    }

    // Function to show toast notification
    function showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }

    // Function to update search results
    const updateResults = (stories) => {
        results.innerHTML = '';
        stories.forEach(storyObj => {
            const card = document.createElement('div');
            card.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow-md', 'hover:bg-blue-50', 'cursor-pointer', 'mb-4', 'relative');

            const title = document.createElement('h3');
            title.classList.add('text-lg', 'font-bold');
            title.textContent = storyObj.title;
            card.appendChild(title);

            const content = document.createElement('p');
            content.classList.add('text-gray-600', 'mt-2', 'mb-3');
            content.textContent = storyObj.story;
            card.appendChild(content);

            const categoryBadge = document.createElement('span');
            categoryBadge.classList.add('inline-block', 'text-gray-600', 'border-solid', 'border-2', 'border-blue-400', 'px-3', 'py-1', 'text-xs', 'rounded');
            categoryBadge.textContent = storyObj.category;
            card.appendChild(categoryBadge);

            const copyIcon = document.createElement('span');
            copyIcon.classList.add('copy-btn');
            copyIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path fill-rule="evenodd" d="M15.988 3.012A2.25 2.25 0 0118 5.25v6.5A2.25 2.25 0 0115.75 14H13.5V7A2.5 2.5 0 0011 4.5H8.128a2.252 2.252 0 011.884-1.488A2.25 2.25 0 0112.25 1h1.5a2.25 2.25 0 012.238 2.012zM11.5 3.25a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v.25h-3v-.25z" clip-rule="evenodd" />
                <path fill-rule="evenodd" d="M2 7a1 1 0 011-1h8a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V7zm2 3.25a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zm0 3.5a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
            </svg>`;
            card.appendChild(copyIcon);

            card.addEventListener('click', function() {
                // Format the copied text including the title, formatted story, and placeholders for acceptance criteria
                const markdownText = `${storyObj.title}\n\n${formatStory(storyObj.story)}\n\n---\n\n**Acceptance Criteria:**\n\nScenario: \n\`\`\`\nGiven\nWhen\nThen\n\`\`\`\n\nNotes:`;

                if (navigator.clipboard) {
                    navigator.clipboard.writeText(markdownText).then(() => {
                        showToast('Story copied to clipboard!');
                    }, (err) => {
                        console.error('Could not copy text: ', err);
                    });
                } else {
                    // Fallback method for older browsers
                    const textarea = document.createElement('textarea');
                    textarea.value = markdownText;
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

    // Event listeners for search box and filter buttons
    clearFilterButton.addEventListener('click', function() {
        searchBox.value = '';
        updateResults(userStories);
    });

    searchBox.addEventListener('input', function() {
        const searchTerm = searchBox.value.toLowerCase();
        if (!searchTerm) {
            results.innerHTML = '';
            return;
        }
        const filteredStories = userStories.filter(storyObj =>
            storyObj.title.toLowerCase().includes(searchTerm) ||
            storyObj.story.toLowerCase().includes(searchTerm) ||
            storyObj.category.toLowerCase().includes(searchTerm)
        );
        updateResults(filteredStories);
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
