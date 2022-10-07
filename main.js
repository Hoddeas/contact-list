// My Contacts Basic

// HTML Elements
let goBtnEl = document.getElementById('go-btn');
let menuEl = document.getElementById('menu');
let outputEl = document.getElementById('output');

// Global Variable Contacts
let contacts = loadContacts();
displayAllContacts();

// Go Btn - Menu Listener
goBtnEl.addEventListener('click', goBtnHandler);

function goBtnHandler() {
  // Get Menu Selection
  let selection = menuEl.value;

  if (selection === 'display-all') {
    displayAllContacts();
  } else if (selection === 'add') {
    addContact();
  } else if (selection === 'remove') {
    removeContact();
  } else if (selection === 'display-name') {
    displayByName();
  } else if (selection === 'display-country') {
    displayByCountry();
  } else if (selection === 'display-email') {
    displayByEmail();
  }
}

// MENU FUNCTIONS

// Display all contacts
function displayAllContacts() {
  let outputStr = "";
  for (let i = 0; i < contacts.length; i++) {
    outputStr += createContactsHTMLStr(contacts[i]);
  }
  outputEl.innerHTML = outputStr;
}

// Add a new contact with a name, email, phone, country
function addContact() {
  let name = prompt("Enter Contact Name:");
  let email = prompt("Enter Contact Email:"); 
  let phone = prompt("Enter Contact Phone:");
  let country = prompt("Enter Contact Country:");
  if (name === "") {
    outputEl.innerHTML = "Please Enter A Name";
  } else if (email === "") {
    outputEl.innerHTML = "Please Enter An Email";
  } else if (phone === "") {
    outputEl.innerHTML = "Please Enter A Phone Number";
  } else if (country === "") {
    outputEl.innerHTML = "Please Enter A Country";
  } else if (findByEmail(email) === -1) {
    contacts.push(newContact(name, email, phone, country));
    saveContacts();
    outputEl.innerHTML = `New Contact Added (${name})`
  } else {
    outputEl.innerHTML = "Email Already Exists";
  }
}

// Remove a contact by email (must be exact match, case insensitive)
function removeContact() {
  let removeEmail = prompt("Enter Contact Email:");
  let index = findByEmail(removeEmail);
  if (index != -1) {
    contacts.splice(index, 1);
    saveContacts();
    displayAllContacts();
  } else {
    outputEl.innerHTML = "Email Does Not Exist";
  }
}

// Display contacts matching a name (can be partial match, does not need to be exact match, case insensitive)
function displayByName() {
  let searchName = prompt("Enter Contact Name:");
  let outputName = "";
  for (i = 0; i < contacts.length; i++) {
    if (contacts[i].name.toLowerCase().includes(searchName.toLowerCase())) {
      outputName += createContactsHTMLStr(contacts[i]);
    }
  }
  outputEl.innerHTML = outputName;
}

// Display contacts matching a country (must be exact match, case insensitive)
function displayByCountry() {
  let searchCountry = prompt("Enter Country Name:");
  let outputCountry = "";
  for (i = 0; i < contacts.length; i++) {
    if (contacts[i].country.toLowerCase() === searchCountry.toLowerCase()) {
      outputCountry += createContactsHTMLStr(contacts[i]);
    }
  }
  outputEl.innerHTML = outputCountry;
}

// Display contacts matching an email (must be exact match, case insensitive)
function displayByEmail() {
  let searchEmail = prompt("Enter Email Name:");
  let index = findByEmail(searchEmail);
  if (index != -1) {
    outputEl.innerHTML = createContactsHTMLStr(contacts[index]);
  } else {
    outputEl.innerHTML = "Email Does Not Exist";
  }
}

// HELPER FUNCTIONS

// Create and return a new contacts array object
function newContact(contactName, contactEmail, contactPhone, contactCountry) {
  return {
    name: contactName,
    email: contactEmail,
    phone: contactPhone,
    country: contactCountry
  };
}

// Create and return an HTML string for a contacts array object
function createContactsHTMLStr(contact) {
  return `
    <div>
      <h3>${contact.name}</h3>
      ${contact.email} <br>
      ${contact.phone} (${contact.country})
    </div>
  `
}

// Save contacts array objects to localStorage
function saveContacts() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
} 

// Load contacts array objects from localStorage
function loadContacts() {
  let contactsStr = localStorage.getItem("contacts");
  return JSON.parse(contactsStr) ?? [];
}

// Search contacts array for email, if no email is found then return -1 (case insensitive)
function findByEmail(email) {
  let returnValue = -1;
  for (i = 0; i < contacts.length; i++) {
    if (contacts[i].email.toLowerCase() === email.toLowerCase()) {
      returnValue = i;
    }
  }
  return returnValue;
}