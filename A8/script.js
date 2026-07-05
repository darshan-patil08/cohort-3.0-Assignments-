 // --- 1. State Variables ---
        
        let isLoggedIn = false;
        let transactions = [];
        let currentFilter = 'all';
        let myChart = null; 
        
        let userSettings = {
            name: 'User',
            currency: 'USD',
            darkMode: false
        };

        const currencySymbols = {
            'USD': '$', 
            'EUR': '€', 
            'GBP': '£', 
            'INR': '₹', 
            'JPY': '¥'
        };

        // --- 2. Initial Setup 
        function initApp() {
            // Check if logged in
            let savedLogin = localStorage.getItem('fintrack_loggedIn');
            if (savedLogin === 'true') {
                isLoggedIn = true;
            }

            // Check if we have saved data in Local Storage
            let savedTransactions = localStorage.getItem('fintrack_transactions');
            if (savedTransactions) {
                transactions = JSON.parse(savedTransactions);
            }

            let savedSettings = localStorage.getItem('fintrack_settings');
            if (savedSettings) {
                userSettings = JSON.parse(savedSettings);
            }

            // Apply theme colors based on settings
            applySettingsToUI();
            
            // Render everything on the screen!
            masterRefresh();

            checkAuthState();
        }

        function checkAuthState() {
            if (isLoggedIn) {
                document.getElementById('login-section').style.display = 'none';
                document.getElementById('app-content').style.display = 'block';
            } else {
                document.getElementById('login-section').style.display = 'flex';
                document.getElementById('app-content').style.display = 'none';
            }
        }

        function login() {
            let user = document.getElementById('login-username').value;
            let pass = document.getElementById('login-password').value;
            
            if (user === "" || pass === "") {
                alert("Please enter any username and password to login.");
                return;
            }
            
            isLoggedIn = true;
            localStorage.setItem('fintrack_loggedIn', 'true');
            
            
            if (userSettings.name === 'User') {
                userSettings.name = user;
                localStorage.setItem('fintrack_settings', JSON.stringify(userSettings));
            }
            
            checkAuthState();
            masterRefresh();
            showPage('dashboard');
        }

        // --- 3. Page Navigation ---
       
        function showPage(page) {
            // Hide both first
            document.getElementById('dashboard').classList.remove('active');
            document.getElementById('settings').classList.remove('active');
            
            // reset nav colors
            document.getElementById('nav-dashboard').style.color = '';
            document.getElementById('nav-settings').style.color = '';
            
            if(page === 'dashboard') {
                document.getElementById('dashboard').classList.add('active');
                document.getElementById('nav-dashboard').style.color = 'var(--primary-color)';
            } else if(page === 'settings') {
                document.getElementById('settings').classList.add('active');
                document.getElementById('nav-settings').style.color = 'var(--primary-color)';
                
               
                document.getElementById('setting-name').value = userSettings.name;
                document.getElementById('setting-currency').value = userSettings.currency;
                document.getElementById('setting-darkmode').checked = userSettings.darkMode;
            }
        }

        function logout() {
            let confirmLogout = confirm("Are you sure you want to logout?");
            if (confirmLogout) {
                isLoggedIn = false;
                localStorage.removeItem('fintrack_loggedIn');
                document.getElementById('login-username').value = "";
                document.getElementById('login-password').value = "";
                checkAuthState();
            }
        }

        // --- 4. Modal Controls ---
        function openModal() {
            document.getElementById('transactionModal').classList.add('active');
            // Auto-fill today's date to make it easier for the user
            document.getElementById('t-date').valueAsDate = new Date();
        }

        function closeModal() {
            document.getElementById('transactionModal').classList.remove('active');
            // Clear out the inputs so it's fresh next time
            document.getElementById('t-desc').value = '';
            document.getElementById('t-amount').value = '';
        }

       
        window.onclick = function(event) {
            let modal = document.getElementById('transactionModal');
            if (event.target == modal) {
                closeModal();
            }
        }

        // --- 5. Transaction Actions ---
        function saveTransaction() {
            // Get values from form
            let type = document.getElementById('t-type').value;
            let desc = document.getElementById('t-desc').value;
            let amount = document.getElementById('t-amount').value;
            let date = document.getElementById('t-date').value;
            let category = document.getElementById('t-category').value;

            // Simple Validation
            if (desc === "" || amount === "" || date === "") {
                alert("Oops! Please fill in the description, amount, and date.");
                return;
            }

            // Create new transaction object
            let newTx = {
                id: Date.now(), 
                type: type,
                desc: desc,
                amount: parseFloat(amount), 
                date: date,
                category: category
            };

            // Add to array
            transactions.push(newTx);
            
            // Save & update screen
            saveData();
            closeModal();
            masterRefresh();
        }

        function deleteTransaction(id) {
            let confirmDel = confirm("Are you sure you want to delete this transaction?");
            if (confirmDel) {
               
                transactions = transactions.filter(t => t.id !== id);
                saveData();
                masterRefresh();
            }
        }

        function setFilter(type) {
            currentFilter = type;
            
            // Update button styles to show which is active
            document.getElementById('filter-all').classList.remove('active');
            document.getElementById('filter-income').classList.remove('active');
            document.getElementById('filter-expense').classList.remove('active');
            
            document.getElementById('filter-' + type).classList.add('active');
            
            // Only need to re-render the table, not the whole app
            renderTable();
        }

        // --- 6. THE MASTER REFRESH (The Golden Rule) ---
        // Every time data changes, this runs to make sure nothing goes out of sync
        function masterRefresh() {
            updateCards();
            renderTable();
            renderChart();
            
            // Update greeting
            document.getElementById('greetingMsg').innerText = "Hello, " + userSettings.name + "!";
        }

        // --- 7. Updating UI Parts ---
        function updateCards() {
            let totalIncome = 0;
            let totalExpense = 0;

            // Loop through all transactions to sum them up
            for (let i = 0; i < transactions.length; i++) {
                if (transactions[i].type === 'income') {
                    totalIncome += transactions[i].amount;
                } else {
                    totalExpense += transactions[i].amount;
                }
            }

            let balance = totalIncome - totalExpense;
            let sym = currencySymbols[userSettings.currency] || '$';

            // Push numbers into HTML (toFixed(2) makes it always have 2 decimal places)
            document.getElementById('card-balance').innerText = sym + balance.toFixed(2);
            document.getElementById('card-income').innerText = sym + totalIncome.toFixed(2);
            document.getElementById('card-expense').innerText = sym + totalExpense.toFixed(2);
            document.getElementById('card-count').innerText = transactions.length;
        }

        function renderTable() {
            let tbody = document.getElementById('transaction-list');
            tbody.innerHTML = ''; // Clear old rows

            let sym = currencySymbols[userSettings.currency] || '$';
            let filteredList = transactions;
            if (currentFilter !== 'all') {
                filteredList = transactions.filter(t => t.type === currentFilter);
            }

       
            filteredList.sort((a, b) => new Date(b.date) - new Date(a.date));

            
            if (filteredList.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 20px; opacity: 0.7;">No transactions found. Add some to get started!</td></tr>';
                return;
            }

            // Build rows
            for (let i = 0; i < filteredList.length; i++) {
                let tx = filteredList[i];
                let row = document.createElement('tr');
                
                // Color and sign logic
                let amountClass = tx.type === 'income' ? 'amount-income' : 'amount-expense';
                let sign = tx.type === 'income' ? '+' : '-';

                row.innerHTML = `
                    <td>${tx.date}</td>
                    <td>${tx.desc}</td>
                    <td>${tx.category}</td>
                    <td class="${amountClass}">${sign}${sym}${tx.amount.toFixed(2)}</td>
                    <td><button class="delete-btn" onclick="deleteTransaction(${tx.id})">Delete</button></td>
                `;
                
                tbody.appendChild(row);
            }
        }

        function renderChart() {
            let ctx = document.getElementById('cashFlowChart').getContext('2d');
            
            // Crucial step: Destroy the old chart before building a new one!
            if (myChart !== null) {
                myChart.destroy();
            }

            // Group our data by date so we can chart it nicely
            let groupedData = {};
            
            for (let i = 0; i < transactions.length; i++) {
                let tx = transactions[i];
                // If we haven't seen this date yet, create an empty bucket
                if (!groupedData[tx.date]) {
                    groupedData[tx.date] = { inc: 0, exp: 0 };
                }
                
                // Add amount to the correct bucket
                if (tx.type === 'income') {
                    groupedData[tx.date].inc += tx.amount;
                } else {
                    groupedData[tx.date].exp += tx.amount;
                }
            }

            // Get all dates and sort them chronologically (oldest to newest)
            let dates = Object.keys(groupedData).sort((a, b) => new Date(a) - new Date(b));
            
            let incomesList = [];
            let expensesList = [];

            // Split buckets back into arrays for Chart.js
            for (let i = 0; i < dates.length; i++) {
                incomesList.push(groupedData[dates[i]].inc);
                expensesList.push(groupedData[dates[i]].exp);
            }

            // Create the bar chart
            myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: dates, // x-axis
                    datasets: [
                        {
                            label: 'Income',
                            data: incomesList,
                            backgroundColor: '#10b981', // matches our CSS variable
                            borderRadius: 4
                        },
                        {
                            label: 'Expense',
                            data: expensesList,
                            backgroundColor: '#ef4444', // matches our CSS variable
                            borderRadius: 4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'top' }
                    },
                    scales: {
                        y: { beginAtZero: true }
                    }
                }
            });
        }

        // --- 8. Local Storage Controls ---
        function saveData() {
            // Convert array to a string to save it in browser storage
            localStorage.setItem('fintrack_transactions', JSON.stringify(transactions));
        }

        function saveSettings() {
            let name = document.getElementById('setting-name').value;
            let cur = document.getElementById('setting-currency').value;
            let dark = document.getElementById('setting-darkmode').checked;

            if (name === "") name = "User"; // fallback

            userSettings.name = name;
            userSettings.currency = cur;
            userSettings.darkMode = dark;

            localStorage.setItem('fintrack_settings', JSON.stringify(userSettings));
            
            applySettingsToUI();
            masterRefresh();
            showPage('dashboard'); // take them back to main screen
            
            alert("Settings saved successfully!");
        }

        function applySettingsToUI() {
            if (userSettings.darkMode) {
                document.body.classList.add('dark');
                // Optional: chart text turns white in dark mode
                Chart.defaults.color = '#f8fafc'; 
            } else {
                document.body.classList.remove('dark');
                Chart.defaults.color = '#333333';
            }
        }

        function resetData() {
            let confirmWipe = confirm("WARNING! This will delete ALL your transactions and settings. Are you completely sure?");
            if (confirmWipe) {
                // Clear from storage
                localStorage.removeItem('fintrack_transactions');
                localStorage.removeItem('fintrack_settings');
                
                // Clear from memory
                transactions = [];
                userSettings = { name: 'User', currency: 'USD', darkMode: false };
                
                applySettingsToUI();
                masterRefresh();
                showPage('dashboard');
                alert("All data has been wiped clean.");
            }
        }

        // Start the engine!
        window.onload = initApp;
