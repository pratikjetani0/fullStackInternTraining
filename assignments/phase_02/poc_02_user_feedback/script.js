const form = document.getElementById("feedback-form");
const checkbox = document.getElementById("form-checkbox");
const submitBtn = document.getElementById("submit-btn");
const messageInput = document.getElementById("form-message");
const charCount = document.getElementById("char-count");
const successBox = document.getElementById("success-box");
const phoneInput = document.getElementById('form-phone')

//! Validation fucntion
// Name validation
function validateName(name) {
  return name.trim() !== "";
}

// Email validation with regex
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Phone validation with regex
function validatePhone(phone) {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(phone);
}

// Message validation
function validateMessage(message) {
  return message.trim().length >= 20;
}

function filterPhoneInput() {
  phoneInput.value = phoneInput.value.replace(/\D/g, "").slice(0, 10);
}



//! UI helper function
// success message
function showSuccess(inputId) {
  const input = document.getElementById(inputId);
  const error = input.parentElement.querySelector(".error");

  error.innerText = "";

  input.classList.add("success-border");
  input.classList.remove("error-border");
}

// Error message
function showError(inputId, message) {
  const input = document.getElementById(inputId);
  const error = input.parentElement.querySelector(".error");

  error.innerText = message;

  input.classList.add("error-border");
  input.classList.remove("success-border");
}

// reset the form ui
function resetFormUI() {
  form.reset();

  document.querySelectorAll("input, textarea, select").forEach((field) => {
    field.classList.remove("error-border", "success-border");
  });

  document.querySelectorAll(".error").forEach((error) => {
    error.innerText = "";
  });

  submitBtn.disabled = true;
  charCount.innerText = "0 / 20 characters";
  charCount.style.color = "#666";
}

//! store data in local storage
function saveToLocalStorage(formData) {
  // this is object
  let existingData = JSON.parse(localStorage.getItem("userData")) || []; // its reterive and  convert text string in to object

  // if existind data is an object so reset it to empty array
  if (!Array.isArray(existingData)) {
    existingData = [];
  }

  existingData.push(formData);

  localStorage.setItem("userData", JSON.stringify(existingData));
}

//! Succes screen
function showSuccessScreen() {
  document.querySelector(".main").style.display = "none";
  successBox.classList.remove("hidden");
  successBox.classList.add("active");
}

function showFormAgain() {
  successBox.classList.add("hidden");
  successBox.classList.remove("active");

  document.querySelector(".main").style.display = "block";

  resetFormUI();
}

//! Character Count
function characterCount() {
  const length = messageInput.value.length;

  charCount.innerText = `${length} / 20 characters`;

  charCount.style.color = length >= 20 ? "green" : "";
}

//! Checkbox
function toggleCheckboxButton() {
  submitBtn.disabled = !checkbox.checked;
}

//! submit form
function handleSubmit(e) {
  e.preventDefault();

  const user = document.getElementById("form-fullname").value;
  const email = document.getElementById("form-email").value;
  const phone = document.getElementById("form-phone").value;
  const feedback = document.getElementById("form-feedback").value;
  const message = document.getElementById("form-message").value;

  let isValid = true;

  //Name
  if (!validateName(user)) {
    showError("form-fullname", "Name is Requried");
    isValid = false;
  } else {
    showSuccess("form-fullname");
  }

  //email
  if (!validateEmail(email)) {
    showError("form-email", "Invalid email");
    isValid = false;
  } else {
    showSuccess("form-email");
  }

  // Phone
  if (!validatePhone(phone)) {
    showError("form-phone", "Invalid Phone number");
    isValid = false;
  } else {
    showSuccess("form-phone");
  }

  // Feedback
  if (feedback === "") {
    showError("form-feedback", "Select a feedback type");
    isValid = false;
  } else {
    showSuccess("form-feedback");
  }

  // Message
  if (!validateMessage(message)) {
    showError("form-message", "Minimum 20 character requried");
    isValid = false;
  } else {
    showSuccess("form-message");
  }

  //checkbox
  if (!checkbox.checked) {
    alert("You must agree to terms");
    isValid = false;
  }

  if (!isValid) return;

  // final submit

  const formData = {
    name: user,
    email,
    phone,
    feedback,
    message,
  };

  saveToLocalStorage(formData);
  resetFormUI();
  showSuccessScreen();
}

//! Event listener
form.addEventListener("submit", handleSubmit);

checkbox.addEventListener("change", toggleCheckboxButton);

messageInput.addEventListener("input", characterCount);

phoneInput.addEventListener("input", filterPhoneInput);

document
  .getElementById("new-feedback-btn")
  .addEventListener("click", showFormAgain);


// Initial state
submitBtn.disabled = true;
