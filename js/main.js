// Start Generate Letters Function

// Select Letters Container
let lettersContainer = document.querySelector(".letters");

function generateLetters() {
	// Letters
	const letters = "abcdefghijklmnopqrstuvwxyz";

	let // Get Array From Letters
		lettersArray = Array.from(letters);

	// Generate Letters
	lettersArray.forEach((letter) => {
		let // Create Span
			span = document.createElement("span"),
			// Create Letter Text Node
			theLetter = document.createTextNode(letter);

		// Append The Letter To Span
		span.appendChild(theLetter);

		// Add Class On Span
		span.className = "letter-box";

		// Append Span To The Letters Container
		lettersContainer.appendChild(span);
	});
}

generateLetters();

// End Generate Letters Function
// Start Get Word Function

let randomValueValue;

function getWord() {
	// Object Of Words + Categories
	const words = {
		programming: [
			"php",
			"javascript",
			"go",
			"scala",
			"fortran",
			"r",
			"mysql",
			"python",
		],
		movies: [
			"prestige",
			"inception",
			"parasite",
			"interstellar",
			"whiplash",
			"memento",
			"coco",
			"up",
		],
		people: [
			"Albert Einstein",
			"Hitchcock",
			"Alexander",
			"Cleopatra",
			"Mahatma Ghandi",
		],
		countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
	};

	// Get Random Property
	let // Object Keys
		allKeys = Object.keys(words),
		// Random Number Depend On Keys Length
		randomPropNumber = Math.floor(Math.random() * allKeys.length),
		// Category
		randomPropName = allKeys[randomPropNumber],
		// Category Words
		randomPropValue = words[randomPropName],
		// Random Number Depend On Words
		randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

	// Word
	randomValueValue = randomPropValue[randomValueNumber];

	// Set Category Info
	document.querySelector(
		".game-info .category span"
	).textContent = randomPropName;
}

getWord();

// End Get Word Function
// Start Create Guees Function

let // Select Letters Guess Element
	lettersGuessContainer = document.querySelector(".letters-guess"),
	// Convert Word To Array
	lettersAndSpace,
	// Set Wrong Attempts
	wrongAttempts = 0,
	// Right Choose
	rightChoose = 0,
	// Select Guess Spans
	guessSpans;

function guess() {
	// Convert Word To Array
	lettersAndSpace = Array.from(randomValueValue.toLowerCase());

	// Create Spans Depend On Word
	lettersAndSpace.forEach((letter) => {
		// Create Empty Span
		let span = document.createElement("span");

		// If Letter Is Space
		if (letter === " ") {
			// Add Class To The Span
			span.className = "with-space";

			// Increase Right Choose
			rightChoose++;
		}

		// Append Span To The Letters Guess Container
		lettersGuessContainer.appendChild(span);
	});
}

guess();

// End Create Guees Function
// Start Game Macanism Function

// Select The Draw Element
let theDraw = document.querySelector(".hangman-draw"),
	clicked = false;

function gameMacanism() {
	guessSpans = lettersGuessContainer.querySelectorAll("span");

	// Handle Clicking On Letters
	document.addEventListener("click", (e) => {
		// Set The Choose Status
		let theStatus = false;

		if (e.target.className === "letter-box") {
			if (!clicked) {
				clicked = true;

				e.target.classList.add("clicked");

				// Get Clicked Letter
				let theClickedLetter = e.target.textContent.toLowerCase();

				lettersAndSpace.forEach((letter, wordIndex) => {
					// If The Clicked Letter Equal To One Of The Chosen Word Letter
					if (theClickedLetter === letter) {
						// Set Status To Correct
						theStatus = true;

						// Increase Right Choose
						rightChoose++;

						// Loop On All Guess Spans
						guessSpans.forEach((span, spanIndex) => {
							if (wordIndex === spanIndex) {
								span.textContent = letter;
							}
						});
					}
				});

				// If Letter Is Worng
				if (!theStatus) {
					// Increase The Wrong Attempts
					wrongAttempts++;

					// Add Class Worng On The Draw Element
					theDraw.classList.add(`wrong-${wrongAttempts}`);

					// Play Fail Sound
					document.getElementById("fali").play();

					if (wrongAttempts === 8) {
						endGame("Fail");

						lettersContainer.classList.add("finished");
					}
				} else {
					// Play Success Sound
					document.getElementById("success").play();

					if (rightChoose === lettersAndSpace.length) {
						endGame("Win");
					}
				}

				setTimeout(() => {
					clicked = false;
				}, 1000);
			}
		}
	});
}

gameMacanism();

// End Game Macanism Function
// Start End Game Function

function endGame(status) {
	let // Select Popuo Element
		popup = document.querySelector(".popup"),
		// Select Player Status Element
		playerStatus = popup.querySelector(".player-status"),
		// Select Player Status Span
		playerStatusSpan = playerStatus.querySelector("span"),
		// Select Wrong Attempts Span
		wrongAttemptsSpan = popup.querySelector(".wrong-attempts span"),
		// Select Play Again Button
		playAgainBtn = popup.querySelector(".play-again");

	// Show Popup Element
	popup.style.display = "block";

	// Set Player Status [Win Or Fail]
	playerStatusSpan.textContent = status;

	// Set Wrong Attempts Number
	wrongAttemptsSpan.textContent = wrongAttempts;

	// Check If The Player [Win Or Fail]
	if (status === "Win") {
		playerStatus.classList.add("win");

		if (playerStatus.classList.contains("fail")) {
			playerStatus.classList.remove("fail");
		}
	} else {
		playerStatus.classList.add("fail");

		if (playerStatus.classList.contains("win")) {
			playerStatus.classList.remove("win");
		}
	}

	// Play Again
	playAgainBtn.onclick = function () {
		// Hid Popup Element
		popup.style.display = "none";

		// Reset [wrongAttempts] & [rightChoose] Value
		wrongAttempts = 0;
		rightChoose = 0;

		// Empty Letters Container
		lettersContainer.innerHTML = "";

		// Remove Finished Class From Letters Container
		if (lettersContainer.classList.contains("finished")) {
			lettersContainer.classList.remove("finished");
		}

		// Trigger Generate Letters Function
		generateLetters();

		// Trigger Get Word Functuin
		getWord();

		// Empty Letters Guess Contianer
		lettersGuessContainer.innerHTML = "";

		// Trigger Guess Function
		guess();

		// Remove Wrong Class From Hangman Draw
		for (let i = 1; i <= 8; i++) {
			if (theDraw.classList.contains(`wrong-${i}`)) {
				theDraw.classList.remove(`wrong-${i}`);
			}
		}

		gameMacanism();
	};
}

// End End Game Function
