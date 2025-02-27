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
    let rows = document.querySelectorAll("#storeTableBody tr");
  
    rows.forEach(function (row) {
      let store = row.cells[1].textContent.toLowerCase();
      let manager = row.cells[2].textContent.toLowerCase();
  
      if (store.includes(filter) || manager.includes(filter)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });


  
 let ID = 1; // Initialize ID counter

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("storeForm").addEventListener("submit", function (event) {
    event.preventDefault();
    addstore();
  });

  populateStaticDropdowns();
  
});

// Populate static dropdowns for Name, Category, and Store
function populateStaticDropdowns() {
  let statuss = ["Open","Close"];


  let statusDropdown = document.getElementById("status");


  statuss.forEach(status => {
    let option = document.createElement("option");
    option.value = status;
    option.textContent = status;
    statusDropdown.appendChild(option);
  });

}

// Add new store details to the table
function addstore() {
  let storeid = document.getElementById("storeID").value;
  let storeName = document.getElementById("storeName").value;
  let location = document.getElementById("location").value;
  let manager = document.getElementById("manager").value;
  let Phone_no = document.getElementById("PhoneNo").value;
  let Status = document.getElementById("status").value;


  if (!storeid|| !storeName || !location || !manager  || !Phone_no || !Status) {
    alert("Please fill in all required fields.");
    return;
  }

  let newRow = document.createElement("tr");
  newRow.innerHTML = `
        <td>${storeid}</td>
        <td>${storeName}</td>
        <td>${location}</td>
        <td>${manager}</td>
        <td>${Phone_no}</td>
        <td>${Status}</td>
        <td class="action-buttons">
            <button class="update-btn" onclick="updateRow(this)"><i class="fas fa-edit"></i></button>
            <button class="delete-btn" onclick="deleteRow(this)"><i class="fas fa-trash"></i></button>
        </td>
    `;

  document.getElementById("storeTableBody").appendChild(newRow);
  foodItemId++; // Auto-increment the ID for the next entry

  document.getElementById("storeForm").reset();
  closeForm();
}

// Update food item
function updateRow(button) {
  let row = button.closest("tr");
  let columns = row.getElementsByTagName("td");

  document.getElementById("storeID").value = columns[0].innerText;
  document.getElementById("storeName").value = columns[1].innerText;
  document.getElementById("location").value = columns[2].innerText;
  document.getElementById("manager").value = columns[3].innerText;
  document.getElementById("PhoneNo").value = columns[4].innerText;
  document.getElementById("status").value = columns[5].innerText;

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
