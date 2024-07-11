document.addEventListener('DOMContentLoaded', () => {
    fetch('names.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(nameParts => {
            console.log('Name parts loaded:', nameParts);

            const raceSelect = document.getElementById('race');
            const genderSelect = document.getElementById('gender');
            const prefixSelect = document.getElementById('prefix');

            // Function to populate prefix dropdown with all available prefixes
            const populatePrefixDropdown = () => {
                prefixSelect.innerHTML = ''; // Clear previous options

                const prefixes = new Set();

                for (const race in nameParts) {
                    for (const gender in nameParts[race]) {
                        if (nameParts[race][gender].prefixes) {
                            nameParts[race][gender].prefixes.forEach(prefix => {
                                prefixes.add(prefix);
                            });
                        }
                    }
                }

                prefixes.forEach(prefix => {
                    const option = document.createElement('option');
                    option.value = prefix;
                    option.textContent = prefix;
                    prefixSelect.appendChild(option);
                });
            };

            // Initial population of prefix dropdown
            populatePrefixDropdown();

            document.getElementById('generateBtn').addEventListener('click', () => {
                console.log('Generate button clicked');

                const race = raceSelect.value;
                const gender = genderSelect.value;
                const amount = parseInt(document.getElementById('amount').value);
                const prefix = prefixSelect.value; // Get the selected prefix
                const nameOutput = document.getElementById('nameOutput');

                console.log(`Race: ${race}, Gender: ${gender}, Amount: ${amount}, Prefix: ${prefix}`);

                nameOutput.innerHTML = ''; // Clear previous names

                if (nameParts[race] && nameParts[race][gender]) {
                    const selectedNames = nameParts[race][gender];
                    for (let i = 0; i < amount; i++) {
                        let generatedName = '';
                        if (prefix) { // Include prefix if selected
                            generatedName += `${prefix} `;
                        }
                        const randomMiddle = selectedNames.middles[Math.floor(Math.random() * selectedNames.middles.length)];
                        const randomSuffix = selectedNames.suffixes[Math.floor(Math.random() * selectedNames.suffixes.length)];
                        generatedName += `${randomMiddle} ${randomSuffix}`;

                        const nameElement = document.createElement('p');
                        nameElement.textContent = generatedName;
                        nameOutput.appendChild(nameElement);
                        console.log(`Generated Name: ${generatedName}`);
                    }
                } else {
                    nameOutput.textContent = 'No names available for the selected options.';
                    console.log('No names available for the selected options.');
                }
            });

            const darkModeToggle = document.getElementById('darkModeToggle');
            const darkModeIcon = document.getElementById('darkModeIcon');

            // Function to enable dark mode
            const enableDarkMode = () => {
                document.body.classList.add('dark-mode');
                darkModeIcon.textContent = '🌜';
                localStorage.setItem('theme', 'dark');
            };

            // Function to enable light mode
            const enableLightMode = () => {
                document.body.classList.remove('dark-mode');
                darkModeIcon.textContent = '🌞';
                localStorage.setItem('theme', 'light');
            };

            // Apply the theme based on the stored preference or OS preference
            const applyTheme = () => {
                const storedTheme = localStorage.getItem('theme');
                if (storedTheme) {
                    if (storedTheme === 'dark') {
                        enableDarkMode();
                    } else {
                        enableLightMode();
                    }
                } else {
                    // No stored preference, use OS preference
                    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                        enableDarkMode();
                    } else {
                        enableLightMode();
                    }
                }
            };

            // Initialize theme
            applyTheme();

            darkModeToggle.addEventListener('click', () => {
                if (document.body.classList.contains('dark-mode')) {
                    enableLightMode();
                } else {
                    enableDarkMode();
                }
            });

            // Listen for changes to the OS dark mode preference
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
                if (!localStorage.getItem('theme')) { // Only change if user has not set a preference
                    if (e.matches) {
                        enableDarkMode();
                    } else {
                        enableLightMode();
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error loading name parts:', error);
        });
});
