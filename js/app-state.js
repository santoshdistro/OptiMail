// Register Scope Windows Objects Arrays
window.currentActiveTab = 'design-tab';
window.currentSelectedTemplateType = 'grid';
window.isDarkModeActive = true; 

window.rawUploadedEmailsArray = [];
window.scrubbedFilteredEmailsArray = [];
window.globalSystemBlacklistSet = new Set();

// Enriched array schema maps for total custom layout block size controls
window.globalProductCardsDatabaseArray = [
    { id: 1, title: "Men's Classic Aviators", category: "men", img: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=600&q=80", url: "https://yourstore.com/mens-aviators", ctaText: "Shop Glasses ➜", layoutScale: "medium", shapeType: "rectangle" },
    { id: 2, title: "Men's Luxury Wayfarer", category: "men", img: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=600&q=80", url: "https://yourstore.com/mens-wayfarer", ctaText: "Shop Glasses ➜", layoutScale: "medium", shapeType: "rectangle" },
    { id: 3, title: "Women's Cat-Eye Luxury", category: "women", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80", url: "https://yourstore.com/womens-cateye", ctaText: "Shop Luxury ➜", layoutScale: "medium", shapeType: "rectangle" },
    { id: 4, title: "Women's Summer Oversized", category: "women", img: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=600&q=80", url: "https://yourstore.com/womens-oversized", ctaText: "Shop Looks ➜", layoutScale: "medium", shapeType: "rectangle" }
];

function initAppEngine() {
    const savedOptOutsData = localStorage.getItem('optimail_blacklist_v4');
    if(savedOptOutsData) {
        const parsedCollection = JSON.parse(savedOptOutsData);
        window.globalSystemBlacklistSet = new Set(parsedCollection);
        const inputField = document.getElementById('blacklistInput');
        if (inputField) inputField.value = parsedCollection.join('\n');
    }
    
    // Safety verification check loops
    if (typeof refreshBlacklistUIBoards === "function") refreshBlacklistUIBoards();
    if (typeof renderControlPanelProductCardsFormFields === "function") renderControlPanelProductCardsFormFields();
    if (typeof updatePreview === "function") updatePreview();
}

window.addEventListener('DOMContentLoaded', initAppEngine);