document.addEventListener('DOMContentLoaded', () => {
    const carComboboxInput = document.getElementById('carComboboxInput');
    const carComboboxList = document.getElementById('carComboboxList');
    const trackComboboxInput = document.getElementById('trackComboboxInput');
    const trackComboboxList = document.getElementById('trackComboboxList');
    
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
        { value: "GT3 Porsche_992_GT3_R WEC2024", display: "Porsche 992 GT3 R", category: "LMGT3" }
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

        function renderList(filterTerm = '', showAll = false) { // Added showAll parameter
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
                    listElement.appendChild(listItem);

                    listItem.addEventListener('click', () => {
                        inputElement.value = item.display;
                        selectedValueId = item.value; // Set the actual LMU ID
                        listElement.classList.remove('active');
                        // No need to keep focus here on click, it will blur
                    });
                });
            }
            if (filteredItems.length === 0 && filterTerm !== '') { // Only show no results if filter term is present
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
            }
        }

        // Event listeners
        inputElement.addEventListener('focus', () => {
            renderList('', true); // Show all on focus (empty filter term, showAll=true)
            listElement.classList.add('active'); // Show list on focus
        });
        inputElement.addEventListener('keyup', () => {
            renderList(inputElement.value); // Filter based on typing
            listElement.classList.add('active'); // Keep list active when typing
        });
        inputElement.addEventListener('blur', (event) => {
            // Delay closing to allow click on list item
            setTimeout(() => {
                if (!listElement.contains(event.relatedTarget)) { // Check if focus moved to a list item
                    listElement.classList.remove('active');
                    // If input is typed but not selected from list, ensure selectedValueId is cleared or updated
                    if (inputElement.value && !allItems.some(item => item.display.toLowerCase() === inputElement.value.toLowerCase())) {
                         selectedValueId = null; // Clear if typed value doesn't match a valid option
                         inputElement.value = ''; // Optionally clear invalid text
                    } else if (inputElement.value) {
                         // If user typed a matching value, update selectedValueId
                         selectedValueId = allItems.find(item => item.display.toLowerCase() === inputElement.value.toLowerCase())?.value || null;
                    } else {
                        selectedValueId = null; // If input is empty, clear selection
                    }
                }
            }, 100);
        });

        // Handle click on the chevron icon to show/hide list
        const iconElement = inputElement.nextElementSibling; // Get the chevron icon
        if (iconElement && iconElement.classList.contains('combobox-icon')) {
            iconElement.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent blur from immediately closing it again
                if (listElement.classList.contains('active')) {
                    listElement.classList.remove('active');
                } else {
                    renderList('', true); // Show all on click (empty filter term, showAll=true)
                    listElement.classList.add('active');
                    inputElement.focus(); // Focus the input to maintain context
                }
            });
        }
        
        // Click outside of combobox to close it
        document.addEventListener('click', (event) => {
            const comboboxContainer = inputElement.closest('.combobox-container');
            if (comboboxContainer && !comboboxContainer.contains(event.target) && !listElement.contains(event.target)) {
                listElement.classList.remove('active');
            }
        });

        // Return a getter for the actual value (LMU ID)
        return {
            getLmuId: () => selectedValueId,
            getDisplayName: () => inputElement.value,
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
                // Session duration logic
                if (groupElement.id === 'sessionTypeGroup') {
                    if (button.dataset.type === 'qualifying') {
                        sessionDurationInput.placeholder = 'e.g., flying lap, 10 min';
                    } else { // race
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

        const selectedTrackValue = trackCombobox.getLmuId(); 
        const selectedTrackDisplay = trackCombobox.getDisplayName(); 

        const selectedSetupType = setupTypeGroup.querySelector('.type-btn.selected').dataset.type;
        const selectedSessionType = sessionTypeGroup.querySelector('.type-btn.selected').dataset.type;
        const trackTemp = trackTempInput.value;
        const sessionDuration = sessionDurationInput.value.trim(); 
        const selectedWeather = weatherSelect.value; 

        const specificRequest = specificRequestInput.value.trim();

        if (!selectedCarValue || !selectedTrackValue || !selectedSetupType || !selectedSessionType || !trackTemp || !sessionDuration) {
            showMessage('Please ensure all main fields are selected/filled.', 'error');
            return;
        }
        
        // Validation for sessionDuration (always editable, but validate if numeric for race or specific text for quali)
        if (selectedSessionType === 'race') {
            const durationNum = parseInt(sessionDuration);
            if (isNaN(durationNum) || durationNum <= 0) {
                showMessage('For Race sessions, please enter a valid duration in minutes (e.g., 60).', 'error');
                return;
            }
        } else { // qualifying
             // For qualifying, allow "flying lap" or a number
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

        // Construct the detailed request string for the AI
        let aiRequest = `Provide a ${selectedSetupType} setup for the car identified by LMU ID "${selectedCarValue}" (display name: ${selectedCarDisplay}, category: ${allCars.find(c => c.value === selectedCarValue)?.category || 'N/A'} class) at track identified by LMU ID "${selectedTrackValue}" (display name: ${selectedTrackDisplay}) for a ${selectedSessionType} session.`;
        aiRequest += ` Track temperature is ${trackTemp}°C.`;
        aiRequest += ` Weather conditions are ${selectedWeather}.`;
        aiRequest += ` The session duration is ${sessionDuration}.`;

        if (selectedSessionType === 'race') {
            aiRequest += ` Please include an estimated fuel per lap in the Notes section of the VEH file based on this duration and track/car combination.`;
        }

        if (specificRequest) {
            aiRequest += ` User also requests: ${specificRequest}.`;
        }
        
        aiRequest += ` Output ONLY the LMU .VEH file content, no conversational text or explanations.`;


        try {
            const response = await fetch('/generate-setup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    car: selectedCarValue, 
                    track: selectedTrackValue, 
                    request: aiRequest 
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
            setupOutput.textContent = 'Failed to connect to the local server. Is the server running?';
            showMessage('Failed to connect to the local server. Please check your console.', 'error');
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
