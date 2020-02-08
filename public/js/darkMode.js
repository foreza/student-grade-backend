var isDarkMode;
var localStorage;
const storageKeyName = "studentGrade-darkMode";


document.addEventListener("DOMContentLoaded", function(event) {

  // Attach event handlers
  attachListenerToDarkMode();

  localStorage = window.localStorage;               // Get the local storage
  isDarkMode = getDarkModeStateFromStorage();       // Set initial state
  setDarkMode(isDarkMode);

});


function attachListenerToDarkMode() {

    document.getElementById('darkModeToggle')
        .addEventListener('click', function(eventObj) {
            toggleDarkModeState();                        // Toggle the value
      });

}


// Toggle the state
function toggleDarkModeState() {
  isDarkMode = !isDarkMode;                     // Toggle the value
  setDarkMode(isDarkMode);                      // Update the style
  saveDarkModeStateToStorage();                 // Save state to local storage
}



// Function to retrieve the state from local storage; returns T/F depending on storage state
function getDarkModeStateFromStorage() {

  var state = localStorage.getItem(storageKeyName);

  if (state != null && (state === 'true')) {
    return true;
  } else {
    return false;     // Return no by default
  }

}

// Method to save the current state to local storage 
function saveDarkModeStateToStorage() {
  localStorage.setItem(storageKeyName, isDarkMode);
}


// Update DOM to use darkMode style or remove it
function setDarkMode(value) {

  if (value) {
    document.querySelector('#body-content').setAttribute('class', 'darkMode');
    // $('#body-content').attr('class', 'darkMode');
  } else {
    document.querySelector('#body-content').removeAttribute('class', 'darkMode');
    // $('#body-content').removeAttr('class', 'darkMode');
  }

}

