document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const heightRange = document.getElementById('height-range');
    const weightRange = document.getElementById('weight-range');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultSection = document.getElementById('result');
    const bmiResult = document.getElementById('bmi-result');
    const category = document.getElementById('category');
    const bmiMarker = document.getElementById('bmi-marker');
    
    // Sync range sliders with number inputs
    heightInput.addEventListener('input', function() {
        heightRange.value = this.value;
    });
    
    heightRange.addEventListener('input', function() {
        heightInput.value = this.value;
    });
    
    weightInput.addEventListener('input', function() {
        weightRange.value = this.value;
    });
    
    weightRange.addEventListener('input', function() {
        weightInput.value = this.value;
    });
    
    // Increment/decrement buttons functionality
    document.querySelectorAll('.down-buttons').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.closest('.input-wrapper').querySelector('input');
            const step = parseFloat(input.step) || 1;
            
            if (this.classList.contains('fa-chevron-up')) {
                input.value = (parseFloat(input.value) + step).toFixed(1);
            } else {
                input.value = (parseFloat(input.value) - step).toFixed(1);
            }
            
            // Trigger input event to update range slider
            const event = new Event('input');
            input.dispatchEvent(event);
        });
    });
    
    // Calculate BMI
    calculateBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const height = parseFloat(heightInput.value);
        const weight = parseFloat(weightInput.value);
        
        // Validation
        if (isNaN(height) || isNaN(weight)) {
            alert('Please enter valid height and weight');
            return;
        }
        
        if (height < 100 || height > 250) {
            alert('Height must be between 100cm and 250cm');
            return;
        }
        
        if (weight < 30 || weight > 200) {
            alert('Weight must be between 30kg and 200kg');
            return;
        }
        
        // Calculate BMI
        const heightInMeters = height / 100;
        const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
        
        // Display result
        showResult(bmi);
    });
    
    function showResult(bmi) {
        // Update BMI value
        bmiResult.textContent = bmi;
        
        // Determine category
        let categoryText, categoryClass, fillClass, markerPosition;
        
        if (bmi < 18.5) {
            categoryText = 'Underweight';
            categoryClass = 'category-underweight';
            fillClass = 'fill-underweight';
            markerPosition = (bmi / 30) * 100;
        } else if (bmi < 25) {
            categoryText = 'Normal weight';
            categoryClass = 'category-normal';
            fillClass = 'fill-normal';
            markerPosition = 18.5 + ((bmi - 18.5) / (25 - 18.5)) * 25;
        } else if (bmi < 30) {
            categoryText = 'Overweight';
            categoryClass = 'category-overweight';
            fillClass = 'fill-overweight';
            markerPosition = 43.5 + ((bmi - 25) / (30 - 25)) * 25;
        } else {
            categoryText = 'Obese';
            categoryClass = 'category-obese';
            fillClass = 'fill-obese';
            markerPosition = 68.5 + (Math.min((bmi - 30), 20) / 20) * 31.5;
        }
        
        category.innerHTML = `
            <span class="${categoryClass}">${categoryText}</span>
            <div class="progress-bar">
                <div class="progress-fill ${fillClass}" style="width: ${markerPosition}%"></div>
            </div>
        `;
        
        
        const safeMarkerPosition = Math.min(Math.max(markerPosition, 2), 98);
        bmiMarker.style.left = `${safeMarkerPosition}%`;
    
        resultSection.classList.remove('hidden');
        
        
        resultSection.scrollIntoView({ behavior: 'smooth' });
    }
});