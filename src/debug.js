// Simple debug script to test button functionality
console.log('Debug script loaded');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded - setting up simple event listener');
    
    const acceptBtn = document.getElementById('accept-disclaimer');
    console.log('Button found:', acceptBtn);
    
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            console.log('Button clicked - this should work!');
            
            // Hide disclaimer and show game
            const disclaimerModal = document.getElementById('disclaimer-modal');
            const gameContainer = document.getElementById('game-container');
            
            if (disclaimerModal) {
                disclaimerModal.classList.remove('active');
                setTimeout(() => {
                    disclaimerModal.style.display = 'none';
                }, 300);
            }
            
            if (gameContainer) {
                gameContainer.classList.remove('hidden');
            }
            
            console.log('Modal should be hidden, game should be visible');
        });
    } else {
        console.error('Accept button not found!');
    }
}); 