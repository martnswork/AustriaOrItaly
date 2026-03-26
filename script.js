// Get all slider elements
const pensionSlider = document.getElementById('pensionSlider');
const housingItalySlider = document.getElementById('housingItaly');
const housingAustriaSlider = document.getElementById('housingAustria');
const bankSavingsSlider = document.getElementById('bankSavingsSlider');

// Get all display elements
const pensionValue = document.getElementById('pensionValue');
const housingItalyValue = document.getElementById('housingItalyValue');
const housingAustriaValue = document.getElementById('housingAustriaValue');
const bankSavingsValue = document.getElementById('bankSavingsValue');

// Fixed costs (monthly)
const ITALY_HEALTHCARE = 100;
const ITALY_FOOD = 300;
const AUSTRIA_HEALTHCARE = 560;
const AUSTRIA_FOOD = 400;

// Tax calculation for Austria (progressive tax brackets 2026)
function calculateAustrianTax(monthlyIncome) {
    const annualIncome = monthlyIncome * 12;
    let tax = 0;

    if (annualIncome <= 13539) {
        tax = 0;
    } else if (annualIncome <= 21992) {
        tax = (annualIncome - 13539) * 0.20;
    } else if (annualIncome <= 36458) {
        tax = (21992 - 13539) * 0.20 + (annualIncome - 21992) * 0.30;
    } else if (annualIncome <= 70365) {
        tax = (21992 - 13539) * 0.20 + (36458 - 21992) * 0.30 + (annualIncome - 36458) * 0.40;
    } else if (annualIncome <= 104859) {
        tax = (21992 - 13539) * 0.20 + (36458 - 21992) * 0.30 + (70365 - 36458) * 0.40 + (annualIncome - 70365) * 0.48;
    } else {
        tax = (21992 - 13539) * 0.20 + (36458 - 21992) * 0.30 + (70365 - 36458) * 0.40 + (104859 - 70365) * 0.48 + (annualIncome - 104859) * 0.50;
    }

    return tax / 12; // Return monthly tax
}

// Format currency
function formatCurrency(value) {
    return '€' + value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Color total based on positive/negative
function colorizeTotal(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        if (value < 0) {
            element.style.color = '#dc3545'; // red for negative
        } else {
            element.style.color = '#28a745'; // green for positive
        }
    }
}

// Update display values for sliders
function updateSliderDisplays() {
    pensionValue.textContent = formatCurrency(parseFloat(pensionSlider.value));
    housingItalyValue.textContent = formatCurrency(parseFloat(housingItalySlider.value));
    housingAustriaValue.textContent = formatCurrency(parseFloat(housingAustriaSlider.value));
    bankSavingsValue.textContent = formatCurrency(parseFloat(bankSavingsSlider.value));
}

// Calculate and update all values
function updateCalculations() {
    const monthlyPension = parseFloat(pensionSlider.value);
    const housingItaly = parseFloat(housingItalySlider.value);
    const housingAustria = parseFloat(housingAustriaSlider.value);
    const bankSavings = parseFloat(bankSavingsSlider.value);

    // Italy calculations (7% flat tax)
    const italyMonthlyTax = monthlyPension * 0.07;
    const italyMonthlyNetPension = monthlyPension - italyMonthlyTax - housingItaly - ITALY_HEALTHCARE - ITALY_FOOD;
    const italyMonthlyTotal = italyMonthlyNetPension + bankSavings;
    
    const italyAnnualIncome = monthlyPension * 12;
    const italyAnnualTax = italyMonthlyTax * 12;
    const italyAnnualNetPension = italyMonthlyNetPension * 12;
    const italyAnnualTotal = italyMonthlyTotal * 12;
    const italyAnnualHousing = housingItaly * 12;
    const italyAnnualHealth = ITALY_HEALTHCARE * 12;
    const italyAnnualFood = ITALY_FOOD * 12;
    const italyAnnualSavings = bankSavings * 12;

    // Austria calculations (progressive tax)
    const austriaMonthlyTax = calculateAustrianTax(monthlyPension);
    const austriaMonthlyNetPension = monthlyPension - austriaMonthlyTax - housingAustria - AUSTRIA_HEALTHCARE - AUSTRIA_FOOD;
    const austriaMonthlyTotal = austriaMonthlyNetPension + bankSavings;
    
    const austriaAnnualIncome = monthlyPension * 12;
    const austriaAnnualTax = austriaMonthlyTax * 12;
    const austriaAnnualNetPension = austriaMonthlyNetPension * 12;
    const austriaAnnualTotal = austriaMonthlyTotal * 12;
    const austriaAnnualHousing = housingAustria * 12;
    const austriaAnnualHealth = AUSTRIA_HEALTHCARE * 12;
    const austriaAnnualFood = AUSTRIA_FOOD * 12;
    const austriaAnnualSavings = bankSavings * 12;

    // Update Italy displays
    document.getElementById('italyMonthlyIncome').textContent = formatCurrency(monthlyPension);
    document.getElementById('italyMonthlyTax').textContent = formatCurrency(-italyMonthlyTax);
    document.getElementById('italyMonthlyHousing').textContent = formatCurrency(-housingItaly);
    document.getElementById('italyMonthlyHealth').textContent = formatCurrency(-ITALY_HEALTHCARE);
    document.getElementById('italyMonthlyFood').textContent = formatCurrency(-ITALY_FOOD);
    document.getElementById('italyMonthlyNetPension').textContent = formatCurrency(italyMonthlyNetPension);
    document.getElementById('italyMonthlySavings').textContent = formatCurrency(bankSavings);
    document.getElementById('italyMonthlyTotal').textContent = formatCurrency(italyMonthlyTotal);
    colorizeTotal('italyMonthlyTotal', italyMonthlyTotal);

    document.getElementById('italyAnnualIncome').textContent = formatCurrency(italyAnnualIncome);
    document.getElementById('italyAnnualTax').textContent = formatCurrency(-italyAnnualTax);
    document.getElementById('italyAnnualHousing').textContent = formatCurrency(-italyAnnualHousing);
    document.getElementById('italyAnnualHealth').textContent = formatCurrency(-italyAnnualHealth);
    document.getElementById('italyAnnualFood').textContent = formatCurrency(-italyAnnualFood);
    document.getElementById('italyAnnualNetPension').textContent = formatCurrency(italyAnnualNetPension);
    document.getElementById('italyAnnualSavings').textContent = formatCurrency(italyAnnualSavings);
    document.getElementById('italyAnnualTotal').textContent = formatCurrency(italyAnnualTotal);
    colorizeTotal('italyAnnualTotal', italyAnnualTotal);

    // Update Austria displays
    document.getElementById('austriaMonthlyIncome').textContent = formatCurrency(monthlyPension);
    document.getElementById('austriaMonthlyTax').textContent = formatCurrency(-austriaMonthlyTax);
    document.getElementById('austriaMonthlyHousing').textContent = formatCurrency(-housingAustria);
    document.getElementById('austriaMonthlyHealth').textContent = formatCurrency(-AUSTRIA_HEALTHCARE);
    document.getElementById('austriaMonthlyFood').textContent = formatCurrency(-AUSTRIA_FOOD);
    document.getElementById('austriaMonthlyNetPension').textContent = formatCurrency(austriaMonthlyNetPension);
    document.getElementById('austriaMonthlySavings').textContent = formatCurrency(bankSavings);
    document.getElementById('austriaMonthlyTotal').textContent = formatCurrency(austriaMonthlyTotal);
    colorizeTotal('austriaMonthlyTotal', austriaMonthlyTotal);

    document.getElementById('austriaAnnualIncome').textContent = formatCurrency(austriaAnnualIncome);
    document.getElementById('austriaAnnualTax').textContent = formatCurrency(-austriaAnnualTax);
    document.getElementById('austriaAnnualHousing').textContent = formatCurrency(-austriaAnnualHousing);
    document.getElementById('austriaAnnualHealth').textContent = formatCurrency(-austriaAnnualHealth);
    document.getElementById('austriaAnnualFood').textContent = formatCurrency(-austriaAnnualFood);
    document.getElementById('austriaAnnualNetPension').textContent = formatCurrency(austriaAnnualNetPension);
    document.getElementById('austriaAnnualSavings').textContent = formatCurrency(austriaAnnualSavings);
    document.getElementById('austriaAnnualTotal').textContent = formatCurrency(austriaAnnualTotal);
    colorizeTotal('austriaAnnualTotal', austriaAnnualTotal);

    // Update summary - comparing TOTAL available to spend
    const difference = italyAnnualTotal - austriaAnnualTotal;
    const betterOption = difference > 0 ? 'Italy is better!' : difference < 0 ? 'Austria is better!' : 'It\'s equal!';
    const summaryText = document.getElementById('summaryText');
    summaryText.textContent = `Annual difference: ${formatCurrency(Math.abs(difference))} - ${betterOption}`;
}

// Add event listeners
pensionSlider.addEventListener('input', () => {
    updateSliderDisplays();
    updateCalculations();
});

housingItalySlider.addEventListener('input', () => {
    updateSliderDisplays();
    updateCalculations();
});

housingAustriaSlider.addEventListener('input', () => {
    updateSliderDisplays();
    updateCalculations();
});

bankSavingsSlider.addEventListener('input', () => {
    updateSliderDisplays();
    updateCalculations();
});

// Initial calculation
updateSliderDisplays();
updateCalculations();
