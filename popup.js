document.addEventListener('DOMContentLoaded', (event) => {
    console.log("Popup DOM fully loaded and parsed");
    loadHighlights()
    setInterval(() => {
        loadHighlights()
    }, 5000);
});

const showHighlights = (highlightslist) => {
    const highlights = document.getElementById('highlighted-text-container');
    if (!highlightslist || highlightslist.length === 0) {        
        highlights.innerHTML = '<p>No text saved yet</p>';
        return
    }
    highlights.innerHTML = '';
    highlightslist.forEach((highlight) => {
        const item = document.createElement('div');
        item.style.display = 'flex';
        item.style.justifyContent = 'space-between';
        item.style.alignItems = 'center';
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            navigator.clipboard.writeText(highlight.text).then(() => {
                alert('Copied to clipboard');
            });
        });
        const text = document.createElement('p');
        text.textContent = highlight.text;
        item.appendChild(text);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.style.marginLeft = '10px';
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            chrome.storage.local.get(['highlights'], (result) => {
                const updatedHighlights = (result.highlights || []).filter(h => h.id !== highlight.id);
                chrome.storage.local.set({ highlights: updatedHighlights }, () => {
                    showHighlights(updatedHighlights)
                });
            });
        });
        item.appendChild(deleteButton);
        highlights.appendChild(item);
    });

}

const loadHighlights = () => {
    chrome.storage.local.get(['highlights'], (result) => {
        const highlights = result.highlights || [];
        showHighlights(highlights);
    });
}