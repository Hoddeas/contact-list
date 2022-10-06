// My Contacts Basic

// HTML Elements
let goBtnEl = document.getElementById('go-btn');
let menuEl = document.getElementById('menu');
let outputEl = document.getElementById('output');

// Global Variable
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
    outputStr += getTaskHTMLStr(contacts[i], i);
  }
  outputEl.innerHTML = outputStr;
}

function addContact() {
  let name = prompt("Enter Contact Name:");
  let email = prompt("Enter Contact Email:"); 
  let phone = prompt("Enter Contact Phone:");
  let country = prompt("Enter Contact Country:");
  if (findByEmail(email) === -1) {
    contacts.push(newContact(name, email, phone, country));
    saveContacts();
    outputEl.innerHTML = `New Contact Added (${name})`
  } else {
    outputEl.innerHTML = "Email Already Exists";
  }
}

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

function displayByName() {
  let searchName = prompt("Enter Contact Name:");
  let outputName = "";
  for (i = 0; i < contacts.length; i++) {
    if (contacts[i].name.includes(searchName)) {
      outputName += getTaskHTMLStr(contacts[i], i);
    }
  }
  outputEl.innerHTML = outputName;
}

function displayByCountry() {
  let searchCountry = prompt("Enter Country Name:");
  let outputCountry = "";
  for (i = 0; i < contacts.length; i++) {
    if (contacts[i].country === searchCountry) {
      outputCountry += getTaskHTMLStr(contacts[i], i);
    }
  }
  outputEl.innerHTML = outputCountry;
}

function displayByEmail() {
  let searchEmail = prompt("Enter Email Name:");
  let index = findByEmail(searchEmail);
  outputEl.innerHTML = getTaskHTMLStr(contacts[index], index);
}

// HELPER FUNCTIONS

// Return New Contact
function newContact(contactName, contactEmail, contactPhone, contactCountry) {
  return {
    name: contactName,
    email: contactEmail,
    phone: contactPhone,
    country: contactCountry
  };
}

// Get HTML for given task
function getTaskHTMLStr(contact, i) {
  return `
    <div>
      <h3>${i}: ${contact.name}</h3>
      ${contact.email} <br>
      ${contact.phone} (${contact.country})
    </div>
  `
}

// Save tasks to localStorage
function saveContacts() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
} 

// Load tasks from localStorage
function loadContacts() {
  let contactsStr = localStorage.getItem("contacts");
  return JSON.parse(contactsStr) ?? [];
}

// Find by email
function findByEmail(email) {
  for (i = 0; i < contacts.length; i++) {
    if (contacts[i].email == email) {
      return i;
    } else {
      return -1;
    }
  }
}