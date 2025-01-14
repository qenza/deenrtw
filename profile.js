

document.addEventListener('DOMContentLoaded', () => {
    // Attach event listeners to all clickable items
    document.querySelectorAll('.details_item, .helpcenter_item').forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault(); // Prevent default anchor behavior
            const popupId = `popup_${item.id}`; // Dynamically create popup ID
            openPopup(popupId); // Open the correct popup
        });
    });

    // Attach event listeners to all popup close buttons
    document.querySelectorAll('.popup button').forEach(button => {
        button.addEventListener('click', () => {
            const popup = button.closest('.popup');
            closePopup(popup.id); // Close the specific popup
        });
    });
});

// Open the popup with the given ID
function openPopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.classList.add("open_popup"); // Add class to show popup
    }else{
        console.error("not found");
    }
}

// Close the popup with the given ID
function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.classList.remove("open_popup"); // Remove class to hide popup
    }
}

document.querySelector('.back-button').addEventListener('click', function (e) {
    e.preventDefault();
    alert('Going back to the previous page!');
    window.location.href = 'homepage.html';
  });