function toggleSearch() {
  let searchContainer = document.querySelector(".search-container");
  let searchInput = document.querySelector(".search-input");

  searchContainer.classList.toggle("active");
  if (searchContainer.classList.contains("active")) {
    searchInput.focus();
  }
}

// Search function
document.getElementById("searchInput").addEventListener("keyup", function () {
  let filter = this.value.trim().toLowerCase();
  let rows = document.querySelectorAll("#foodTableBody tr");

  rows.forEach(function (row) {
    let itemname = row.cells[2].textContent.trim().toLowerCase();
    let category = row.cells[3].textContent.trim().toLowerCase();

    if (itemname.includes(filter) || category.includes(filter)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
});


let foodItemId = 1;

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("foodItemForm").addEventListener("submit", function (event) {
    event.preventDefault();
    addFoodItem();
  });

  populateStaticDropdowns();
});


function populateStaticDropdowns() {
  let names = ["Pizza", "Burger", "Pasta"];
  let categories = ["Fast Food", "Beverages", "Desserts"];
  let stores = ["Store A", "Store B", "Store C"];

  let nameDropdown = document.getElementById("itemName");
  let categoryDropdown = document.getElementById("itemCategory");
  let storeDropdown = document.getElementById("itemStore");

  names.forEach(name => {
    let option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    nameDropdown.appendChild(option);
  });

  categories.forEach(category => {
    let option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryDropdown.appendChild(option);
  });

  stores.forEach(store => {
    let option = document.createElement("option");
    option.value = store;
    option.textContent = store;
    storeDropdown.appendChild(option);
  });
}

function addFoodItem() {
  let itemName = document.getElementById("itemName");
  let itemCategory = document.getElementById("itemCategory");
  let itemDescription = document.getElementById("itemDescription");
  let itemQuantity = document.getElementById("itemQuantity");
  let itemStore = document.getElementById("itemStore");
  let itemCost = document.getElementById("itemCost");
  let itemSelling = document.getElementById("itemSelling");
  let itemMFG = document.getElementById("itemMFG");
  let itemExpiry = document.getElementById("itemExpiry");


  clearErrors();

  let isValid=true;

  if (!itemName.value.trim()) {
    showError("nameError", "Item name is required.");
    isValid = false;
  }
  if (!itemCategory.value.trim()) {
    showError("categoryError", "Category is required.");
    isValid = false;
  }
  if (!itemDescription.value.trim()) {
    showError("descriptionError", "Description is required.");
    isValid = false;
  }
  if (!itemQuantity.value.trim() || isNaN(itemQuantity.value) || itemQuantity.value <= 0) {
    showError("quantityError", "Enter a valid quantity.");
    isValid = false;
  }
  if (!itemStore.value.trim()) {
    showError("storeError", "Store selection is required.");
    isValid = false;
  }
  if (!itemCost.value.trim() || isNaN(itemCost.value) || itemCost.value <= 0) {
    showError("costPriceError", "Enter a valid cost.");
    isValid = false;
  }
  if (!itemSelling.value.trim() || isNaN(itemSelling.value) || itemSelling.value <= 0) {
    showError("sellingPriceError", "Enter a valid selling price.");
    isValid = false;
  }
  if (!itemMFG.value.trim()) {
    showError("MFG-Error", "Manufacturing date is required.");
    isValid = false;
  }
  if (!itemExpiry.value.trim()) {
    showError("expiryError", "Expiry date is required.");
    isValid = false;
  }

  if (!isValid) return; 

  let newRow = document.createElement("tr");
  newRow.innerHTML = `
        <td>${foodItemId}</td>
        <td>Image</td>
        <td>${itemName.value}</td>
        <td>${itemCategory.value}</td>
        <td>${itemDescription.value}</td>
        <td>${itemQuantity.value}</td>
        <td>${itemStore.value}</td>
        <td>${itemCost.value}</td>
        <td>${itemSelling.value}</td>
        <td>${itemMFG.value}</td>
        <td>${itemExpiry.value}</td>
        <td>
            <button class="update-btn" onclick="updateRow(this)"><i class="fas fa-edit"></i></button>
            <button class="delete-btn" onclick="deleteRow(this)"><i class="fas fa-trash"></i></button>
        </td>
    `;

  document.getElementById("foodTableBody").appendChild(newRow);
  foodItemId++;

  document.getElementById("foodItemForm").reset();
  closeForm();
}

function showError(id, message) {
  document.getElementById(id).textContent = message;
}

function clearErrors() {
  document.querySelectorAll(".error-message").forEach((el) => {
      el.textContent = "";
  });
}

function updateRow(button) {
  let row = button.closest("tr");
  let columns = row.getElementsByTagName("td");

  document.getElementById("itemName").value = columns[2].innerText;
  document.getElementById("itemCategory").value = columns[3].innerText;
  document.getElementById("itemDescription").value = columns[4].innerText;
  document.getElementById("itemQuantity").value = columns[5].innerText;
  document.getElementById("itemStore").value = columns[6].innerText;
  document.getElementById("itemCost").value = columns[7].innerText;
  document.getElementById("itemSelling").value = columns[8].innerText;
  document.getElementById("itemMFG").value = columns[9].innerText;
  document.getElementById("itemExpiry").value = columns[10].innerText;

  openForm();
  row.remove(); 
}

function deleteRow(button) {
  button.closest("tr").remove();
}

function openForm() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("myForm").style.display = "block";
  document.body.classList.add("popup-open");
}

function closeForm() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("myForm").style.display = "none";
  document.body.classList.remove("popup-open");
}
