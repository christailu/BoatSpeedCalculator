// Wait for the DOM content to be fully loaded before executing JavaScript
document.addEventListener("DOMContentLoaded", function () {
    // Get references to various HTML elements
    const boatWeightInput = document.getElementById("boatWeight");
    const horsepowerInput = document.getElementById("horsepower");
    const boatTypeSelect = document.getElementById("boatType");
    const calculateButton = document.getElementById("calculateButton");
    const resetButton = document.getElementById("resetButton");
    const resultSpan = document.getElementById("result");
    const boatTypeTooltip = document.getElementById("boatTypeTooltip");

    // Event listeners

    // Listen for changes in the boat type dropdown and display the tooltip
    boatTypeSelect.addEventListener("change", displayBoatTypeDescription);

    // Listen for a click on the "Calculate" button and perform the calculation
    calculateButton.addEventListener("click", calculateBoatSpeed);

    // Listen for a click on the "Reset" button and reset the form
    resetButton.addEventListener("click", resetForm);

    // Function to display the boat type description in a tooltip
    function displayBoatTypeDescription() {
        const selectedOption = boatTypeSelect.options[boatTypeSelect.selectedIndex];
        boatTypeTooltip.innerHTML = selectedOption.textContent;
    }

    // Function to calculate and display the boat speed
	function calculateBoatSpeed() {
		const boatWeight = parseFloat(boatWeightInput.value);
		const horsepower = parseFloat(horsepowerInput.value);
		const boatType = boatTypeSelect.value;
		
		let constant;
		
		// Assign the constant value based on the selected boat type
		switch (boatType) {
			case "225":
				constant = 225;
				break;
			case "250":
				constant = 250;
				break;
			case "275":
				constant = 275;
				break;
			case "300":
				constant = 300;
				break;
			default:
				constant = 0; // Set a default value if no valid boat type is selected
				break;
		}

		if (constant === 0) {
			// Display a warning message if no valid boat type is selected
			resultSpan.textContent = "Please select a valid boat type.";
		} else if (isNaN(boatWeight) || isNaN(horsepower) || boatWeight < 0 || horsepower < 0) {
			// Display a warning message for invalid input
			resultSpan.textContent = "Please enter valid positive numeric values.";
		} else if (boatWeight > 45000 || horsepower > 750) {
			// Display a warning message for input values that exceed the limits
			resultSpan.textContent = "Input values exceed the maximum limits.";
		} else {
			// Calculate and display the boat speed with unit (MPH)
			const maxSpeed = (horsepower / boatWeight) * constant;
			resultSpan.textContent = `Maximum Boat Speed: ${maxSpeed.toFixed(2)} MPH`;
		}
	}

    // Function to reset the form and clear result and tooltip
    function resetForm() {
        document.getElementById("boatSpeedCalculator").reset();
        resultSpan.textContent = "0";
        boatTypeTooltip.innerHTML = "";
    }
});

