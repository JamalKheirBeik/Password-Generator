// DOM elements
let checkboxes = document.querySelectorAll(".form-check-input");
let range = document.getElementById("length");
let dynamicRange = document.getElementById("current-length");
let generateBtn = document.getElementById("generate");
let result = document.getElementById("result");
let clipboard = document.getElementById("clipboard");
let clipboardIcon = document.getElementById("icon");
// dynamically show range input on the page
range.addEventListener("input", () => {
  dynamicRange.innerText = range.value;
});
// clipboard functionality
clipboard.addEventListener("click", () => {
  // select the text field
  result.select();
  result.setSelectionRange(0, 99999); // For mobile devices
  // copy the text inside the text field
  document.execCommand("copy");
  // change the icon to checked icon
  icon.classList.replace("far", "fa");
  icon.classList.replace("fa-clipboard", "fa-check");
  // reset the icon after 1 second
  setTimeout(() => {
    icon.classList.replace("fa", "far");
    icon.classList.replace("fa-check", "fa-clipboard");
  }, 1000);
});
// generate button listener
generateBtn.addEventListener("click", (e) => {
  // prevent form submission
  e.preventDefault();
  // generate the settings
  let settings = generateSettings();
  // generating the password
  let password = generatePassword(settings);
  // append the password to the DOM
  result.value = password;
});

function generateSettings() {
  let settings = [];
  // filter the checkboxes (add the ones with true value only)
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked == true) {
      // create a new object
      let item = {};
      if (checkbox.getAttribute("id") == "numbers") {
        item = { chars: "0123456789" };
      }
      if (checkbox.getAttribute("id") == "characters") {
        item = { chars: "abcdefghijklmnopqrstuvwxyz" };
      }
      if (checkbox.getAttribute("id") == "capital-characters") {
        item = { chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" };
      }
      if (checkbox.getAttribute("id") == "special-characters") {
        item = { chars: "!@#_" };
      }
      // add the new object to the settings array
      settings.push(item);
    }
  });
  // settings empty
  if (settings.length == 0) {
    alert("you must choose atleast 1 option to generate the password");
  }
  // return the settings array
  return settings;
}

function generatePassword(settings) {
  if (settings.length == 0) return "";
  let passworrd = "";
  // repeat till we get the selected password length
  for (let i = 0; i < parseInt(range.value); i++) {
    // get a random item from the settings array
    let randomItem = Math.floor(Math.random() * settings.length);
    let chars = settings[randomItem].chars;
    // get a random char from the random item
    let randomChar = Math.floor(Math.random() * chars.length);
    let char = chars.charAt(randomChar);
    passworrd += char;
  }
  return passworrd;
}
