document.addEventListener('DOMContentLoaded', () => {
    imageMapResize();
    const areas = document.querySelectorAll('map area');
    const popups = document.querySelectorAll('.popup-window');
    const closeButtons = document.querySelectorAll('.close-btn');

    areas.forEach(area => {
        area.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            const targetId = area.dataset.target; // Get the ID from data-target attribute
            const targetPopup = document.getElementById(targetId);

            if (targetPopup) {
                // Hide all other popups first (optional, but good for single-popup display)
                popups.forEach(popup => popup.style.display = 'none');
                
                targetPopup.style.display = 'flex'; // Show the specific popup
                // Optional: Stop body scrolling when popup is open
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const popupWindow = button.closest('.popup-window');
            if (popupWindow) {
                popupWindow.style.display = 'none'; // Hide the popup
                // Optional: Re-enable body scrolling
                document.body.style.overflow = ''; 
                
                // Pause any playing Soundcloud widgets in this popup
                const iframe = popupWindow.querySelector('iframe');
                if (iframe) {
                    // This is a simple way to "reset" or stop the player.
                    // A more robust solution might involve the Soundcloud Player API.
                    iframe.src = iframe.src; 
                }
            }
        });
    });

    // Close pop-up when clicking outside the content
    popups.forEach(popup => {
        popup.addEventListener('click', (event) => {
            if (event.target === popup) { // Check if click was directly on the background
                popup.style.display = 'none';
                document.body.style.overflow = '';
                const iframe = popup.querySelector('iframe');
                if (iframe) {
                    iframe.src = iframe.src;
                }
            }
        });
    });

    // Close pop-up with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            popups.forEach(popup => {
                if (popup.style.display === 'flex') {
                    popup.style.display = 'none';
                    document.body.style.overflow = '';
                    const iframe = popup.querySelector('iframe');
                    if (iframe) {
                        iframe.src = iframe.src;
                    }
                }
            });
        }
    });
});