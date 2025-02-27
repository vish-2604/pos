// Toggle search input on small devices
// function toggleSearch() {
//     let searchContainer = document.querySelector(".search-container");
//     let searchInput = document.querySelector(".search-input");
  
//     searchContainer.classList.toggle("active");
//     if (searchContainer.classList.contains("active")) {
//       searchInput.focus();
//     }
//   }
  
//   // Search function
//   document.getElementById("searchInput").addEventListener("keyup", function () {
//     let filter = this.value.toLowerCase();
//     let rows = document.querySelectorAll("#storeTableBody tr");
  
//     rows.forEach(function (row) {
//       let store = row.cells[1].textContent.toLowerCase();
//       let manager = row.cells[2].textContent.toLowerCase();
  
//       if (store.includes(filter) || manager.includes(filter)) {
//         row.style.display = "";
//       } else {
//         row.style.display = "none";
//       }
//     });
//   });


  
//  let ID = 1;

// document.addEventListener("DOMContentLoaded", function () {
//   document.getElementById("storeForm").addEventListener("submit", function (event) {
//     event.preventDefault();
//     addstore();
//   });
//   populateStaticDropdowns();
// });


// function populateStaticDropdowns() {
//   let statuss = ["Open","Close"];
//   let statusDropdown = document.getElementById("status");
//   statuss.forEach(status => {
//     let option = document.createElement("option");
//     option.value = status;
//     option.textContent = status;
//     statusDropdown.appendChild(option);
//   });

// }


// function addstore() {
//   let location = document.getElementById("location").value;
//   let area = document.getElementById("storeArea").value;
//   let manager = document.getElementById("managerID").value;
//   let Phone_no = document.getElementById("PhoneNo").value;
//   let Status = document.getElementById("status").value;
//   if (  !location || !area || !manager  || !Phone_no || !Status) 
//     {
//     alert("Please fill in all required fields.");
//     return;
//   }
//   let newRow = document.createElement("tr");
//   newRow.innerHTML = `
//         <td>${ID}</td>
//         <td>${location}</td>
//         <td>${area}</td>
//         <td>${manager}</td>
//         <td>${Phone_no}</td>
//         <td>${Status}</td>
//         <td class="action-buttons">
//             <button class="update-btn" onclick="updateRow(this)"><i class="fas fa-edit"></i></button>
//             <button class="delete-btn" onclick="deleteRow(this)"><i class="fas fa-trash"></i></button>
//         </td>
//     `;
//   document.getElementById("storeTableBody").appendChild(newRow);
//   ID++; 
//   document.getElementById("storeForm").reset();
//   closeForm();
// }

// // Update store item
// function updateRow(button) {
//   let row = button.closest("tr");
//   let columns = row.getElementsByTagName("td");
//   document.getElementById("location").value = columns[1].innerText;
//   document.getElementById("storeArea").value = columns[2].innerText;
//   document.getElementById("managerID").value = columns[3].innerText;
//   document.getElementById("PhoneNo").value = columns[4].innerText;
//   document.getElementById("status").value = columns[5].innerText;

//   openForm();
//   row.remove(); 
// }

// // Delete food item
// function deleteRow(button) {
//   button.closest("tr").remove();
// }

// // Open popup form
// function openForm() {
//   document.getElementById("overlay").style.display = "block";
//   document.getElementById("myForm").style.display = "block";
//   document.body.classList.add("popup-open");
// }

// // Close popup form
// function closeForm() {
//   document.getElementById("overlay").style.display = "none";
//   document.getElementById("myForm").style.display = "none";
//   document.body.classList.remove("popup-open");
// }



// New Code



let ID = 1;
let updateIndex = null; // Track the row index to update

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("purchaseForm").addEventListener("submit", function (event) {
    event.preventDefault();
    if (updateIndex !== null) {
        saveUpdatedpurchase();
    } else {
        addpurchases();
    }
      
  });
  populateStaticDropdowns();
});

function populateStaticDropdowns() {
  let statuss = ["Done", "Remain"];
  let statusDropdown = document.getElementById("status");
  statuss.forEach(status => {
    let option = document.createElement("option");
    option.value = status;
    option.textContent = status;
    statusDropdown.appendChild(option);
  });
}

function addpurchases() {
  let foodItem = document.getElementById("foodItem").value;
  let quantity = document.getElementById("quantity").value;
  let cost = document.getElementById("cost").value;
  let SupID = document.getElementById("SupID").value;
  let Status = document.getElementById("status").value;

  if (!foodItem || !quantity || !cost || !SupID || !Status) {
    alert("Please fill in all required fields.");
    return;
  }

  let newRow = document.createElement("tr");
  newRow.innerHTML = `
        <td>${foodItem}</td>
        <td>${quantity}</td>
        <td>${cost}</td>
        <td>${SupID}</td>
        <td>${Status}</td>
        <td class="action-buttons">
            <button class="update-btn" onclick="updateRow(this)"><i class="fas fa-edit"></i></button>
            <button class="delete-btn" onclick="deleteRow(this)"><i class="fas fa-trash"></i></button>
        </td>
    `;

  document.getElementById("storeTableBody").appendChild(newRow);
  ID++;
  document.getElementById("purchaseForm").reset();
  closeForm();
}

function updateRow(button) {
  let row = button.closest("tr");
  let columns = row.getElementsByTagName("td");

  document.getElementById("foodItem").value = columns[1].textContent;
  document.getElementById("quantity").value = columns[2].textContent;
  document.getElementById("cost").value = columns[3].textContent;
  document.getElementById("SupID").value = columns[4].textContent;
  document.getElementById("status").value = columns[5].textContent;

  updateIndex = row; // Store the reference to the row instead of removing it

  openForm();
}




function saveUpdatedpurchase() {
  if (updateIndex) {
    let foodItem = document.getElementById("foodItem").value;
    let quantity = document.getElementById("quantity").value;
    let cost = document.getElementById("cost").value;
    let SupID = document.getElementById("SupID").value;
    let Status = document.getElementById("status").value;

    updateIndex.cells[1].textContent = foodItem;
    updateIndex.cells[2].textContent = quantity;
    updateIndex.cells[3].textContent = cost;
    updateIndex.cells[4].textContent = SupID;
    updateIndex.cells[5].textContent = Status;

    updateIndex = null;
    document.getElementById("purchaseForm").reset();
    closeForm();
  }
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

  updateIndex = null; // Reset update index when closing the form
}
