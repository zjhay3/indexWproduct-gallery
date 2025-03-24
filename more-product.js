document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const toggleSidebar = document.getElementById('toggleSidebar');
    const mainContent = document.getElementById('main-content');

    // Check if the toggle button and sidebar exist before adding listeners
    if (toggleSidebar && sidebar && mainContent) {
        // Sidebar Toggle Button Click
        toggleSidebar.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            adjustMainContent(sidebar, mainContent);
        });

        // Sidebar Hover to Uncollapse
        sidebar.addEventListener('mouseenter', function() {
            if (sidebar.classList.contains('collapsed')) {
                sidebar.classList.remove('collapsed');
                adjustMainContent(sidebar, mainContent);
            }
        });

        // Sidebar Collapse on Mouse Leave
        sidebar.addEventListener('mouseleave', function() {
            if (!sidebar.classList.contains('clicked')) {
                sidebar.classList.add('collapsed');
                adjustMainContent(sidebar, mainContent);
            }
        });

        // Set initial margin for main content based on sidebar state
        adjustMainContent(sidebar, mainContent);
    }

    // Function to adjust main content based on sidebar state
    function adjustMainContent(sidebar, mainContent) {
        if (sidebar.classList.contains('collapsed')) {
            mainContent.style.marginLeft = '75px'; // Collapsed sidebar width
        } else {
            mainContent.style.marginLeft = '250px'; // Expanded sidebar width
        }
    }

    // Product carousel scroll buttons
    const scrollLeftButtons = document.querySelectorAll('.scroll-left');
    const scrollRightButtons = document.querySelectorAll('.scroll-right');
    const carousels = document.querySelectorAll('.product-carousel');

    // Function to check scroll limits
    function checkScrollButtons(carousel, leftBtn, rightBtn) {
        if (carousel.scrollLeft <= 0) {
            leftBtn.disabled = true;
        } else {
            leftBtn.disabled = false;
        }

        if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
            rightBtn.disabled = true;
        } else {
            rightBtn.disabled = false;
        }
    }

    carousels.forEach(carousel => {
        const container = carousel.closest('.product-carousel-container');
        if (!container) return;

        const leftBtn = container.querySelector('.scroll-left');
        const rightBtn = container.querySelector('.scroll-right');

        if (!leftBtn || !rightBtn) return;

        // Initial check when the page loads
        checkScrollButtons(carousel, leftBtn, rightBtn);

        // Left scroll button
        leftBtn.addEventListener('click', function() {
            console.log("Left button clicked!");
            carousel.scrollBy({ left: -300, behavior: 'smooth' });
            setTimeout(() => checkScrollButtons(carousel, leftBtn, rightBtn), 300);
        });

        // Right scroll button
        rightBtn.addEventListener('click', function() {
            console.log("Right button clicked!");
            carousel.scrollBy({ left: 300, behavior: 'smooth' });
            setTimeout(() => checkScrollButtons(carousel, leftBtn, rightBtn), 300);
        });

        // Check scroll position after scroll
        carousel.addEventListener('scroll', function() {
            checkScrollButtons(carousel, leftBtn, rightBtn);
        });

        // Resize listener to recheck on window resize
        window.addEventListener('resize', function() {
            checkScrollButtons(carousel, leftBtn, rightBtn);
        });
    });

    // Add submenu functionality if needed
    const menuItemsWithSubmenu = document.querySelectorAll('.has-submenu > a');
    
    menuItemsWithSubmenu.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.parentElement;
            const submenu = parent.querySelector('.submenu');
            
            // Toggle submenu visibility
            if (submenu) {
                if (submenu.style.maxHeight) {
                    submenu.style.maxHeight = null;
                    parent.classList.remove('open');
                } else {
                    submenu.style.maxHeight = submenu.scrollHeight + 'px';
                    parent.classList.add('open');
                }
            }
        });
    });
});
