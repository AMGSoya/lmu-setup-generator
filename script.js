document.addEventListener('DOMContentLoaded', () => {
    const carComboboxInput = document.getElementById('carComboboxInput');
    const carComboboxList = document.getElementById('carComboboxList');
    const trackComboboxInput = document.getElementById('trackComboboxInput');
    const trackComboboxList = document.getElementById('trackComboboxList');
    
    // NOTE: The 'carCategorySelect' HTML element is NOT directly used here because the
    // car's category is now directly derived from the 'allCars' data based on car selection
    // via the combobox. This is the correct way for your current setup.
    
    const setupTypeGroup = document.getElementById('setupTypeGroup');
    const sessionTypeGroup = document.getElementById('sessionTypeGroup');
    const trackTempInput = document.getElementById('trackTemp');
    const sessionDurationInput = document.getElementById('sessionDuration');
    const weatherSelect = document.getElementById('weatherSelect');
    const specificRequestInput = document.getElementById('specificRequest');
    const generateBtn = document.getElementById('generateBtn');
    const setupOutput = document.getElementById('setupOutput');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const copyBtn = document.getElementById('copyBtn');
    const messageBox = document.getElementById('messageBox');

    // --- Data for Cars and Tracks ---
    const allCars = [
        { value: "Alpine_A424 Hypercar WEC2024", display: "Alpine A424", category: "Hypercar" },
        { value: "Ferrari_499P Hypercar WEC2024", display: "Ferrari 499P", category: "Hypercar" },
        { value: "BMW_M_Hybrid_V8 Hypercar WEC2024", display: "BMW M Hybrid V8", category: "Hypercar" },
        { value: "Cadillac_V_Series.R Hypercar WEC2024", display: "Cadillac V-Series.R", category: "Hypercar" },
        { value: "Glickenhaus_SCG_007 LMH WEC2024", display: "Glickenhaus SCG 007 LMH", category: "Hypercar" },
        { value: "Peugeot_9X8 Hypercar WEC2024", display: "Peugeot 9X8", category: "Hypercar" },
        { value: "Porsche_963 Hypercar WEC2024", display: "Porsche 963", category: "Hypercar" },
        { value: "Toyota_GR010_Hybrid Hypercar WEC2024", display: "Toyota GR010 Hybrid", category: "Hypercar" },
        { value: "Vanwall_Vandervell_680 Hypercar WEC2024", display: "Vanwall Vandervell 680", category: "Hypercar" },
        { value: "Lamborghini_SC63 Hypercar WEC2024", display: "Lamborghini SC63", category: "Hypercar" },
        { value: "Oreca_07 LMP2 WEC2024", display: "Oreca 07 Gibson", category: "LMP2" },
        { value: "Aston_Martin_Vantage_GTE WEC2024", display: "Aston Martin Vantage GTE", category: "GTE" },
        { value: "Chevrolet_Corvette_C8.R_GTE WEC2024", display: "Chevrolet Corvette C8.R GTE", category: "GTE" },
        { value: "Ferrari_488_GTE_Evo WEC2024", display: "Ferrari 488 GTE Evo", category: "GTE" },
        { value: "Porsche_911_RSR-19 GTE WEC2024", display: "Porsche 911 RSR-19 GTE", category: "GTE" },
        { value: "GT3 Aston_Martin_Vantage_AMR_LMGT3 WEC2024", display: "Aston Martin Vantage AMR LMGT3", category: "LMGT3" },
        { value: "GT3 BMW_M4_GT3 WEC2024", display: "BMW M4 GT3", category: "LMGT3" },
        { value: "GT3 Chevrolet_Corvette_Z06_GT3.R WEC2024", display: "Chevrolet Corvette Z06 GT3.R", category: "LMGT3" },
        { value: "GT3 Ferrari_296_GT3 WEC2024", display: "Ferrari 296 GT3", category: "LMGT3" },
        { value: "GT3 Ford_Mustang_LMGT3 WEC2024", display: "Ford Mustang LMGT3", category: "LMGT3" },
        { value: "GT3 Lamborghini_Huracan_GT3_Evo2 WEC2024", display: "Lamborghini Huracan GT3 Evo2", category: "LMGT3" },
        { value: "GT3 McLaren_720S_LMGT3_Evo WEC2024", display: "McLaren 720S LMGT3 Evo", category: "LMGT3" },
        { value: "GT3 Porsche_911_GT3_R WEC2024", display: "Porsche 992 GT3 R", category: "LMGT3" }
    ];

    const allTracks = [
        { value: "Circuit de la Sarthe (Le Mans)", display: "Circuit de la Sarthe (Le Mans)", category: "Main Tracks" },
        { value: "Sebring International Raceway", display: "Sebring International Raceway", category: "Main Tracks" },
        { value: "Autódromo Internacional do Algarve (Portimão)", display: "Autódromo Internacional do Algarve (Portimão)", category: "Main Tracks" },
        { value: "Circuit de Spa-Francorchamps", display: "Circuit de Spa-Francorchamps", category: "Main Tracks" },
        { value: "Monza", display: "Monza", category: "Main Tracks" },
        { value: "Fuji Speedway", display: "Fuji Speedway", category: "Main Tracks" },
        { value: "Bahrain International Circuit", display: "Bahrain International Circuit", category: "Main Tracks" },
        { value: "Autodromo Internazionale Enzo e Dino Ferrari (Imola)", display: "Autodromo Internazionale Enzo e Dino Ferrari (Imola)", category: "Main Tracks" },
        { value: "Circuit of the Americas (COTA)", display: "Circuit of the Americas (COTA)", category: "Main Tracks" },
        { value: "Lusail International Circuit", display: "Lusail International Circuit", category: "Main Tracks" },
        { value: "Circuit de la Sarthe (Le Mans) No Chicane", display: "Le Mans - No Chicane", category: "Layout Variants" },
        { value: "Monza Curva Grande", display: "Monza - Curva Grande", category: "Layout Variants" },
        { value: "Spa-Francorchamps Endurance", display: "Spa - Endurance", category: "Layout Variants" },
        { value: "Sebring International Raceway School Circuit", display: "Sebring - School Circuit", category: "Layout Variants" },
        { value: "Bahrain International Circuit Endurance", display: "Bahrain - Endurance", category: "Layout Variants" },
        { value: "Bahrain International Circuit Outer", display: "Bahrain - Outer", category: "Layout Variants" },
        { value: "Bahrain International Circuit Paddock", display: "Bahrain - Paddock", category: "Layout Variants" },
        { value: "Fuji Speedway Classic", display: "Fuji - Classic", category: "Layout Variants" },
        { value: "Circuit of the Americas (COTA) National", display: "COTA - National", category: "Layout Variants" }
    ];

    // --- Custom Combobox / Searchable Select Logic ---
    function setupCombobox(inputElement, listElement, allItems, defaultValue) {
        let selectedValueId = null; // Stores the actual LMU ID value, not just display text
        let selectedItemCategory = null; // Stores the category of the selected item

        function renderList(filterTerm = '', showAll = false) {
            listElement.innerHTML = '';
            const filteredItems = allItems.filter(item => 
                showAll || item.display.toLowerCase().includes(filterTerm.toLowerCase()) ||
                item.category.toLowerCase().includes(filterTerm.toLowerCase())
            );

            const categories = {};
            filteredItems.forEach(item => {
                if (!categories[item.category]) {
                    categories[item.category] = [];
                }
                categories[item.category].push(item);
            });

            for (const categoryName in categories) {
                const categoryHeader = document.createElement('div');
                categoryHeader.classList.add('combobox-category-header');
                categoryHeader.textContent = categoryName;
                listElement.appendChild(categoryHeader);

                categories[categoryName].forEach(item => {
                    const listItem = document.createElement('div');
                    listItem.classList.add('combobox-list-item');
                    listItem.textContent = item.display;
                    listItem.setAttribute('data-value', item.value); // Store LMU ID
                    listItem.setAttribute('data-display', item.display); // Store display text
                    listItem.setAttribute('data-category', item.category); // Store category
                    listElement.appendChild(listItem);

                    listItem.addEventListener('click', () => {
                        inputElement.value = item.display;
                        selectedValueId = item.value; // Set the actual LMU ID
                        selectedItemCategory = item.category; // Set the category
                        listElement.classList.remove('active');
                    });
                });
            }
            if (filteredItems.length === 0 && filterTerm !== '') {
                const noResults = document.createElement('div');
                noResults.classList.add('combobox-no-results');
                noResults.textContent = 'No results found.';
                listElement.appendChild(noResults);
            }
        }

        // Initial render and default value setting
        renderList(); 
        if (defaultValue) {
            const defaultItem = allItems.find(item => item.value === defaultValue);
            if (defaultItem) {
                inputElement.value = defaultItem.display;
                selectedValueId = defaultItem.value; // Set the default selected ID
                selectedItemCategory = defaultItem.category; // Set the default category
            }
        }

        // Event listeners
        inputElement.addEventListener('focus', () => {
            renderList('', true);
            listElement.classList.add('active');
        });
        inputElement.addEventListener('keyup', () => {
            renderList(inputElement.value);
            listElement.classList.add('active');
        });
        inputElement.addEventListener('blur', (event) => {
            setTimeout(() => {
                if (!listElement.contains(event.relatedTarget)) {
                    listElement.classList.remove('active');
                    const typedItem = allItems.find(item => item.display.toLowerCase() === inputElement.value.toLowerCase());
                    if (inputElement.value && !typedItem) {
                        selectedValueId = null;
                        selectedItemCategory = null;
                        inputElement.value = '';
                    } else if (typedItem) {
                        selectedValueId = typedItem.value;
                        selectedItemCategory = typedItem.category;
                    } else {
                        selectedValueId = null;
                        selectedItemCategory = null;
                    }
                }
            }, 100);
        });

        const iconElement = inputElement.nextElementSibling;
        if (iconElement && iconElement.classList.contains('combobox-icon')) {
            iconElement.addEventListener('click', (event) => {
                event.stopPropagation();
                if (listElement.classList.contains('active')) {
                    listElement.classList.remove('active');
                } else {
                    renderList('', true);
                    listElement.classList.add('active');
                    inputElement.focus();
                }
            });
        }
        
        document.addEventListener('click', (event) => {
            const comboboxContainer = inputElement.closest('.combobox-container');
            if (comboboxContainer && !comboboxContainer.contains(event.target) && !listElement.contains(event.target)) {
                listElement.classList.remove('active');
            }
        });

        // Return a getter for the actual value (LMU ID) AND the category
        return {
            getLmuId: () => selectedValueId,
            getDisplayName: () => inputElement.value,
            getCategory: () => selectedItemCategory // This is key for the server-side validation
        };
    }

    const carCombobox = setupCombobox(carComboboxInput, carComboboxList, allCars, "Ferrari_499P Hypercar WEC2024");
    const trackCombobox = setupCombobox(trackComboboxInput, trackComboboxList, allTracks, "Circuit de la Sarthe (Le Mans)");

    // --- Button Group Logic ---
    function setupButtonGroup(groupElement) {
        groupElement.querySelectorAll('.type-btn').forEach(button => {
            button.addEventListener('click', () => {
                groupElement.querySelectorAll('.type-btn').forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
                if (groupElement.id === 'sessionTypeGroup') {
                    if (button.dataset.type === 'qualifying') {
                        sessionDurationInput.placeholder = 'e.g., flying lap, 10 min';
                    } else {
                        sessionDurationInput.placeholder = 'e.g., 60 min';
                    }
                }
            });
        });
    }

    setupButtonGroup(setupTypeGroup);
    setupButtonGroup(sessionTypeGroup);

    // --- Message Box Function ---
    function showMessage(message, type = 'info') {
        messageBox.textContent = message;
        messageBox.className = type + ' visible';
        setTimeout(() => {
            messageBox.classList.remove('visible');
        }, 5000); 
    }

    // --- Generate Setup Button Logic ---
    generateBtn.addEventListener('click', async () => {
        const selectedCarValue = carCombobox.getLmuId(); 
        const selectedCarDisplay = carCombobox.getDisplayName(); 
        const selectedCarCategory = carCombobox.getCategory(); // CORRECT: Get category from combobox

        const selectedTrackValue = trackCombobox.getLmuId(); 
        const selectedTrackDisplay = trackCombobox.getDisplayName(); 

        const selectedSetupType = setupTypeGroup.querySelector('.type-btn.selected').dataset.type;
        const selectedSessionType = sessionTypeGroup.querySelector('.type-btn.selected').dataset.type;
        const trackTemp = trackTempInput.value;
        const sessionDuration = sessionDurationInput.value.trim(); 
        const selectedWeather = weatherSelect.value; 

        const specificRequest = specificRequestInput.value.trim();

        // UPDATED VALIDATION TO INCLUDE selectedCarCategory
        if (!selectedCarValue || !selectedTrackValue || !selectedSetupType || !selectedSessionType || !trackTemp || !sessionDuration || !selectedCarCategory) {
            showMessage('Please ensure all main fields (including Car Category, implicitly from Car selection) are selected/filled.', 'error');
            return;
        }
        
        // Validation for sessionDuration
        if (selectedSessionType === 'race') {
            const durationNum = parseInt(sessionDuration);
            if (isNaN(durationNum) || durationNum <= 0) {
                showMessage('For Race sessions, please enter a valid duration in minutes (e.g., 60).', 'error');
                return;
            }
        } else { // qualifying
            if (sessionDuration.toLowerCase() !== 'flying lap') {
                const durationNum = parseInt(sessionDuration);
                if (isNaN(durationNum) || durationNum <= 0) {
                    showMessage('For Qualifying, enter "flying lap" or a duration in minutes (e.g., 10).', 'error');
                    return;
                }
            }
        }

        setupOutput.textContent = '';
        copyBtn.classList.add('hidden');
        messageBox.classList.remove('visible'); 
        loadingSpinner.style.display = 'block';

        try {
           const response = await fetch('https://test-hrwc.onrender.com/generate-setup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    car: selectedCarValue, // LMU ID
                    selectedCarDisplay: selectedCarDisplay, // Display Name
                    selectedCarCategory: selectedCarCategory, // CORRECT: Car Category (derived from car selection)
                    track: selectedTrackValue, // LMU ID
                    selectedTrackDisplay: selectedTrackDisplay, // Display Name
                    request: selectedSetupType, // maps to setupGoal on server
                    setupGoal: selectedSetupType, // explicit for clarity on server side
                    sessionGoal: selectedSessionType,
                    selectedWeather: selectedWeather,
                    // weatherGuidance will be generated on server from selectedWeather
                    trackTemp: parseInt(trackTemp),
                    specificRequest: specificRequest,
                    fuelEstimateRequest: selectedSessionType === 'race' ? `Estimate fuel for a ${sessionDuration} minute race.` : '', // conditionally include fuel request
                    // tireCompoundGuidance can be added if you have a specific input for it
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setupOutput.textContent = data.setup;
                copyBtn.classList.remove('hidden');
                showMessage('Setup generated successfully!', 'info');
            } else {
                setupOutput.textContent = `Error: ${data.error || 'Unknown error'}`;
                showMessage(`Error: ${data.error || 'Unknown error'}`, 'error');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setupOutput.textContent = 'Failed to connect to the server. Please check your console.';
            showMessage('Failed to connect to the server. Please check your console.', 'error');
        } finally {
            loadingSpinner.style.display = 'none';
        }
    });

    // --- Copy to Clipboard Logic ---
    copyBtn.addEventListener('click', () => {
        const textToCopy = setupOutput.textContent;
        if (textToCopy) {
            const textArea = document.createElement('textarea');
            textArea.value = textToCopy;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                showMessage('Setup copied to clipboard!', 'info');
            } catch (err) {
                console.error('Failed to copy text: ', err);
                showMessage('Failed to copy text. Please copy manually.', 'error');
            }
            document.body.removeChild(textArea);
        }
    });

    // --- Initial setup for buttons and inputs ---
    setupTypeGroup.querySelector('.type-btn[data-type="balanced"]').click();
    sessionTypeGroup.querySelector('.type-btn[data-type="qualifying"]').click();
    trackTempInput.value = 23; 
});
