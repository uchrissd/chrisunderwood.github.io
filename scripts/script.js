//This program is a password generator. User confirms which criteria they want to include in the password though a series of prompts.
//Program sets lowercase letters as the default in the event a user declines all of the criteria confirmation prompts.
//The user then chooses a number between 8 and 128 for the length of the password.
//After they hit the "generate" button, the password appears in the text-area.
//The "copy to clipboard" button copies the generated password to the clipboard.

//User hits the "generate" button and initiates the program.
var generateEl = document.getElementById("generate");

generateEl.addEventListener("click", function(event) {
  event.preventDefault();

  //Constan variables for containing necessary password information for later password generation.

  const validPasswordCharacters = setUpPassWordCharacters();
  const passwordLength = getPasswordLength();
  const password = generatePassword(validPasswordCharacters, passwordLength);
  const passwordEl = document.getElementById("password");

  passwordEl.value = password;
  //Console logs for debugging the variable values throughout the development process.
  console.log(validPasswordCharacters);
  console.log(passwordLength);
  console.log(password);
});

//The keys in this object contain the possible characters that can be used in the password.
let passwordCharacters = [
  {
    description: "Do you want upper case letters in your password?",
    chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  },
  {
    description: "Do you want numbers in your password?",
    chars: "0123456789"
  },
  {
    description: "Do you want special characters in your password?",
    chars: ".!@#$%^&*()_+-="
  }
];

//This function sets lower case letters as the default for the passowrd and then adds any additional characters based on the user choices.
function setUpPassWordCharacters() {
  let validPasswordCharacters = "abcdefghijklmonpqrstuvwxyz";
  for (let i = 0; i < passwordCharacters.length; ++i) {
    const passSetting = passwordCharacters[i];
    const answer = confirm(passSetting.description);
    if (answer) {
      validPasswordCharacters += passSetting.chars;
    }
  }
  return validPasswordCharacters;
}

//This function confirms that the length of the password is between the required 8 and 128 characters.
function isValidPasswordLength(passwordLength) {
  return (
    isNaN(passwordLength) === false &&
    passwordLength >= 8 &&
    passwordLength <= 128
  );
}

//This function prompts the user to choose how long they want their password to be.
function getPasswordLength() {
  let passwordLength = 0;
  let question =
    "How long do you want your password to be? Choose a number between 8 and 128.";
  while (isValidPasswordLength(passwordLength) === false) {
    passwordLength = parseInt(prompt(question));
    question = "Uh oh! Choose a number between 8 and 128.";
  }
  return passwordLength;
}

//This function generates the password once the user criteria has been met.
function generatePassword(validPasswordCharacters, passwordLength) {
  let password = "";
  for (let i = 0; i < passwordLength; ++i) {
    password +=
      validPasswordCharacters[
        Math.floor(Math.random() * validPasswordCharacters.length)
      ];
  }
  return password;
}

//This function allows the user to copy their generated password to the clipboard.
function copy() {
  var copyText = document.querySelector("#password");
  copyText.select();
  document.execCommand("copy");
}

document.querySelector("#copy").addEventListener("click", copy);
