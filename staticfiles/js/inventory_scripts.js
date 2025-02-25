// Toggle search input on small devices
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
    let filter = this.value.toLowerCase();
    let rows = document.querySelectorAll("#foodTableBody tr");
  
    rows.forEach(function (row) {
      let itemName = row.cells[1].textContent.toLowerCase();
      let category = row.cells[2].textContent.toLowerCase();
  
      if (itemName.includes(filter) || category.includes(filter)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });


  
 let foodItemId = 1; // Initialize ID counter

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("foodItemForm").addEventListener("submit", function (event) {
    event.preventDefault();
    addFoodItem();
  });

  populateStaticDropdowns();
});

// Populate static dropdowns for Name, Category, and Store
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

// Add new food item to the table
function addFoodItem() {
  let itemName = document.getElementById("itemName").value;
  let itemCategory = document.getElementById("itemCategory").value;
  let itemDescription = document.getElementById("itemDescription").value;
  let itemQuantity = document.getElementById("itemQuantity").value;
  let itemStore = document.getElementById("itemStore").value;
  let itemCost = document.getElementById("itemCost").value;
  let itemSelling = document.getElementById("itemSelling").value;
  let itemMFG = document.getElementById("itemMFG").value;
  let itemExpiry = document.getElementById("itemExpiry").value;
  let itemImage = document.getElementById("itemImage").files[0];

  if (!itemName || !itemCategory || !itemQuantity || !itemStore || !itemCost || !itemSelling || !itemMFG || !itemExpiry) {
    alert("Please fill in all required fields.");
    return;
  }

  let newRow = document.createElement("tr");
  newRow.innerHTML = `
        <td>${foodItemId}</td>
        <td><img src="${itemImage ? URL.createObjectURL(itemImage) : 'placeholder.jpg'}" class="food-img" width="50"></td>
        <td>${itemName}</td>
        <td>${itemCategory}</td>
        <td>${itemDescription}</td>
        <td>${itemQuantity}</td>
        <td>${itemStore}</td>
        <td>${itemCost}</td>
        <td>${itemSelling}</td>
        <td>${itemMFG}</td>
        <td>${itemExpiry}</td>
        <td class="action-buttons">
            <button class="update-btn" onclick="updateRow(this)"><i class="fas fa-edit"></i></button>
            <button class="delete-btn" onclick="deleteRow(this)"><i class="fas fa-trash"></i></button>
        </td>
    `;

  document.getElementById("foodTableBody").appendChild(newRow);
  foodItemId++; // Auto-increment the ID for the next entry

  document.getElementById("foodItemForm").reset();
  closeForm();
}

// Update food item
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
  row.remove(); // Remove the row before re-adding updated data
}

// Delete food item
function deleteRow(button) {
  button.closest("tr").remove();
}

// Open popup form
function openForm() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("myForm").style.display = "block";
  document.body.classList.add("popup-open");
}

// Close popup form
function closeForm() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("myForm").style.display = "none";
  document.body.classList.remove("popup-open");
}
