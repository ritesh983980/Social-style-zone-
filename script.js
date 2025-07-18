document.addEventListener('DOMContentLoaded', function() {
    // Navigation between sections
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).classList.add('active');
        });
    });
    
    // Load data from JSON file
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Initialize all sections with loaded data
            initCaptionsSection(data.captions);
            initBiosSection(data.bios);
            initFontsSection(data.fonts);
            initHashtagsSection(data.hashtags);
            initWishesSection(data.wishes);
        })
        .catch(error => {
            console.error('Error loading JSON data:', error);
            // Fallback to empty data if JSON fails to load
            initCaptionsSection([]);
            initBiosSection([]);
            initFontsSection([]);
            initHashtagsSection([]);
            initWishesSection([]);
        });
    
    // Initialize Captions Section
    function initCaptionsSection(captionsData) {
        const captionsGrid = document.getElementById('captions-grid');
        const searchInput = document.getElementById('caption-search');
        const categoryButtons = document.querySelectorAll('#captions .category-buttons button');
        
        // Display all captions initially
        displayCaptions(captionsData);
        
        // Search functionality
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const filteredCaptions = captionsData.filter(caption => 
                caption.text.toLowerCase().includes(searchTerm)
            );
            displayCaptions(filteredCaptions);
        });
        
        // Category filter
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const category = this.textContent;
                if (category === 'All') {
                    displayCaptions(captionsData);
                } else {
                    const filteredCaptions = captionsData.filter(caption => 
                        caption.category === category
                    );
                    displayCaptions(filteredCaptions);
                }
            });
        });
        
        function displayCaptions(captions) {
            captionsGrid.innerHTML = '';
            if (captions.length === 0) {
                captionsGrid.innerHTML = '<p class="no-results">No captions found</p>';
                return;
            }
            
            captions.forEach(caption => {
                const card = document.createElement('div');
                card.className = 'item-card';
                card.innerHTML = `
                    <p>${caption.text}</p>
                    <div class="actions">
                        <button title="Copy" onclick="copyToClipboard('${caption.text.replace(/'/g, "\\'")}')"><i class="fas fa-copy"></i></button>
                    </div>
                `;
                captionsGrid.appendChild(card);
            });
        }
    }
    
    // Initialize Bios Section
    function initBiosSection(biosData) {
        const biosGrid = document.getElementById('bios-grid');
        const searchInput = document.getElementById('bio-search');
        const categoryButtons = document.querySelectorAll('#bios .category-buttons button');
        
        // Display all bios initially
        displayBios(biosData);
        
        // Search functionality
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const filteredBios = biosData.filter(bio => 
                bio.text.toLowerCase().includes(searchTerm)
            );
            displayBios(filteredBios);
        });
        
        // Category filter
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const category = this.textContent;
                if (category === 'All') {
                    displayBios(biosData);
                } else {
                    const filteredBios = biosData.filter(bio => 
                        bio.category === category
                    );
                    displayBios(filteredBios);
                }
            });
        });
        
        function displayBios(bios) {
            biosGrid.innerHTML = '';
            if (bios.length === 0) {
                biosGrid.innerHTML = '<p class="no-results">No bios found</p>';
                return;
            }
            
            bios.forEach(bio => {
                const card = document.createElement('div');
                card.className = 'item-card';
                card.innerHTML = `
                    <p>${bio.text}</p>
                    <div class="actions">
                        <button title="Copy" onclick="copyToClipboard('${bio.text.replace(/'/g, "\\'")}')"><i class="fas fa-copy"></i></button>
                    </div>
                `;
                biosGrid.appendChild(card);
            });
        }
    }
    
    // Initialize Fonts Section
    function initFontsSection(fontsData) {
        const fontStylesContainer = document.getElementById('font-styles');
        const fontTestArea = document.getElementById('font-test-area');
        const searchInput = document.getElementById('font-search');
        
        // Display all font styles initially
        displayFontStyles(fontsData);
        
        // Search functionality
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const filteredFonts = fontsData.filter(font => 
                font.name.toLowerCase().includes(searchTerm)
            );
            displayFontStyles(filteredFonts);
        });
        
        function displayFontStyles(fonts) {
            fontStylesContainer.innerHTML = '';
            if (fonts.length === 0) {
                fontStylesContainer.innerHTML = '<p class="no-results">No fonts found</p>';
                return;
            }
            
            fonts.forEach(font => {
                const fontStyle = document.createElement('div');
                fontStyle.className = 'font-style';
                fontStyle.style = font.style;
                fontStyle.textContent = font.name;
                fontStyle.addEventListener('click', function() {
                    fontTestArea.style = font.style;
                });
                fontStylesContainer.appendChild(fontStyle);
            });
        }
    }
    
    // Initialize Hashtags Section
    function initHashtagsSection(hashtagsData) {
        const hashtagCloud = document.getElementById('hashtag-cloud');
        const searchInput = document.getElementById('hashtag-search');
        const categoryButtons = document.querySelectorAll('#hashtags .category-buttons button');
        
        // Display all hashtags initially
        displayHashtags(hashtagsData);
        
        // Search functionality
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const filteredHashtags = hashtagsData.filter(hashtag => 
                hashtag.text.toLowerCase().includes(searchTerm)
            );
            displayHashtags(filteredHashtags);
        });
        
        // Category filter
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const category = this.textContent;
                if (category === 'All') {
                    displayHashtags(hashtagsData);
                } else {
                    const filteredHashtags = hashtagsData.filter(hashtag => 
                        hashtag.category === category
                    );
                    displayHashtags(filteredHashtags);
                }
            });
        });
        
        function displayHashtags(hashtags) {
            hashtagCloud.innerHTML = '';
            if (hashtags.length === 0) {
                hashtagCloud.innerHTML = '<p class="no-results">No hashtags found</p>';
                return;
            }
            
            hashtags.forEach(hashtag => {
                const tag = document.createElement('div');
                tag.className = 'hashtag';
                tag.textContent = hashtag.text;
                tag.addEventListener('click', function() {
                    copyToClipboard(hashtag.text);
                });
                hashtagCloud.appendChild(tag);
            });
        }
    }
    
    // Initialize Wishes Section
    function initWishesSection(wishesData) {
        const wishesGrid = document.getElementById('wishes-grid');
        const searchInput = document.getElementById('wish-search');
        const categoryButtons = document.querySelectorAll('#wishes .category-buttons button');
        
        // Display all wishes initially
        displayWishes(wishesData);
        
        // Search functionality
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const filteredWishes = wishesData.filter(wish => 
                wish.text.toLowerCase().includes(searchTerm)
            );
            displayWishes(filteredWishes);
        });
        
        // Category filter
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const category = this.textContent;
                if (category === 'All') {
                    displayWishes(wishesData);
                } else {
                    const filteredWishes = wishesData.filter(wish => 
                        wish.category === category
                    );
                    displayWishes(filteredWishes);
                }
            });
        });
        
        function displayWishes(wishes) {
            wishesGrid.innerHTML = '';
            if (wishes.length === 0) {
                wishesGrid.innerHTML = '<p class="no-results">No wishes found</p>';
                return;
            }
            
            wishes.forEach(wish => {
                const card = document.createElement('div');
                card.className = 'item-card';
                card.innerHTML = `
                    <p>${wish.text}</p>
                    <div class="actions">
                        <button title="Copy" onclick="copyToClipboard('${wish.text.replace(/'/g, "\\'")}')"><i class="fas fa-copy"></i></button>
                    </div>
                `;
                wishesGrid.appendChild(card);
            });
        }
    }
    
    // Copy to clipboard function (added to window for global access)
    window.copyToClipboard = function(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert('Copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };
});
