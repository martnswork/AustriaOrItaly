// Define the bank savings slider and corresponding variable
const bankSavingsSlider = document.getElementById('bankSavingsSlider');
const bankSavingsValue = document.getElementById('bankSavingsValue');

// Add event listener to update the display when the slider value changes
bankSavingsSlider.addEventListener('input', function() {
    bankSavingsValue.textContent = this.value;
});

// Update the calculateAustrianTax function to account for bank savings not being taxable income
function calculateAustrianTax() {
    // existing tax calculation code...
    const bankingSavings = parseFloat(bankSavingsSlider.value);
    const taxableIncome = grossIncome - bankingSavings; // Adjust taxable income
    // Continue with the rest of the tax calculation logic
}

// Modify the display logic to include bank savings rows
function displayCalculations() {
    // existing display code...
    const bankSavings = parseFloat(bankSavingsSlider.value);
    // Add bank savings info to display
    document.getElementById('bankSavingsDisplay').textContent = `Bank Savings: €${bankSavings}`;
}

// Update net disposable income calculation to subtract bank savings
function calculateNetDisposableIncome() {
    const bankSavings = parseFloat(bankSavingsSlider.value);
    return grossIncome - totalTax - bankSavings; // Adjust calculation to account for bank savings
}