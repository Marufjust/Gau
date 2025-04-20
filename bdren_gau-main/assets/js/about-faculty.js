document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('facultyCarousel');
    const items = document.querySelectorAll('.faculty-item');
    const itemCount = items.length;
    
   
    const duplicationsNeeded = Math.ceil(window.innerWidth / (items[0].offsetWidth * itemCount)) + 2;
    
    for (let i = 0; i < itemCount * duplicationsNeeded; i++) {
        const clone = items[i % itemCount].cloneNode(true);
        carousel.appendChild(clone);
    }
    
    // Create a continuous animation with CSS animation
    
    
    // Calculate the total width for one complete set
    function getItemWidth() {
        const item = items[0];
        const style = window.getComputedStyle(item);
        return item.offsetWidth + 
               parseFloat(style.marginLeft) + 
               parseFloat(style.marginRight);
    }
    
    const itemWidth = getItemWidth();
    const totalWidth = itemWidth * itemCount;
    
    // Create and add the CSS animation
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes slideLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-${totalWidth}px); }
        }
        
        #facultyCarousel {
            animation: slideLeft ${totalWidth / 50}s linear infinite;
        }
        
        /* Pause on hover (optional) */
        .carousel-container:hover #facultyCarousel {
            animation-play-state: paused;
        }
    `;
    document.head.appendChild(styleSheet);
    
    // Remove any previous inline styles that might interfere
    carousel.style.transition = '';
    carousel.style.transform = '';
    
    // Function to restart animation when window is resized
    function handleResize() {
        const newItemWidth = getItemWidth();
        const newTotalWidth = newItemWidth * itemCount;
        
        // Update the animation
        styleSheet.textContent = `
            @keyframes slideLeft {
                0% { transform: translateX(0); }
                100% { transform: translateX(-${newTotalWidth}px); }
            }
            
            #facultyCarousel {
                animation: slideLeft ${newTotalWidth / 50}s linear infinite;
            }
            
            /* Pause on hover (optional) */
            .carousel-container:hover #facultyCarousel {
                animation-play-state: paused;
            }
        `;
    }
    
    // Handle resize events
    window.addEventListener('resize', handleResize);
});