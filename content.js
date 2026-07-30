// Create floating panel
const panel = document.createElement("div");
panel.id = "trainerdb-panel";

panel.innerHTML = `
<h3>TrainerDB Assistant</h3>

<textarea id="trainer-note" placeholder="Write notes here..."></textarea>

<button id="save-note">💾 Save Note</button>
<button id="favorite-btn">⭐ Favorite</button>
<button id="copy-btn">📋 Copy Page Text</button>

<p id="status"></p>
`;

document.body.appendChild(panel);

// Load saved note
chrome.storage.local.get(["note"], (result) => {
    if(result.note){
        document.getElementById("trainer-note").value = result.note;
    }
});

// Save note
document.getElementById("save-note").addEventListener("click", () => {
    const note = document.getElementById("trainer-note").value;

    chrome.storage.local.set({note}, () => {
        document.getElementById("status").innerText = "✅ Note Saved";
    });
});

// Favorite
document.getElementById("favorite-btn").addEventListener("click", () => {

    chrome.storage.local.set({
        favorite: window.location.href
    }, () => {
        document.getElementById("status").innerText = "⭐ Added to Favorites";
    });

});

// Copy page text
document.getElementById("copy-btn").addEventListener("click", () => {

    navigator.clipboard.writeText(document.body.innerText);

    document.getElementById("status").innerText = "📋 Page Copied";

});