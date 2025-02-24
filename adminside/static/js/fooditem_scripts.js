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


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("foodItemForm").addEventListener("submit", function (event) {
        event.preventDefault();
        addFoodItem();
    });
});

function addFoodItem() {
    let itemId = document.getElementById("itemId").value;
    let itemName = document.getElementById("itemName").value;
    let itemCategory = document.getElementById("itemCategory").value;
    let itemDescription = document.getElementById("itemDescription").value;
    let itemPrice = document.getElementById("itemPrice").value;
    let itemSize = document.getElementById("itemSize").value;
    let itemStatus = document.getElementById("itemStatus").value;

    let newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${itemId}</td>
        <td>${itemName}</td>
        <td>${itemCategory}</td>
        <td>${itemDescription}</td>
        <td>${itemPrice}</td>
        <td>${itemSize}</td>
        <td><div class="item-status-check ${itemStatus.replace(' ', '-').toLowerCase()}">${itemStatus}</div></td>
        <td class="action-buttons">
            <button class="update-btn" onclick="updateRow(this)"><i class="fas fa-edit"></i></button>
            <button class="delete-btn" onclick="deleteRow(this)"><i class="fas fa-trash"></i></button>
        </td>
    `;
    document.getElementById("foodTableBody").appendChild(newRow);

    document.getElementById("foodItemForm").reset();
    closeForm();
}

function updateRow(button) {
    let row = button.closest("tr");
    let columns = row.getElementsByTagName("td");

    document.getElementById("itemId").value = columns[0].innerText;
    document.getElementById("itemName").value = columns[1].innerText;
    document.getElementById("itemCategory").value = columns[2].innerText;
    document.getElementById("itemDescription").value = columns[3].innerText;
    document.getElementById("itemPrice").value = columns[4].innerText;
    document.getElementById("itemSize").value = columns[5].innerText;
    document.getElementById("itemStatus").value = columns[6].innerText.trim();

    openForm();
    row.remove();
}

function deleteRow(button) {
    button.closest("tr").remove();
}

function openForm() {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("myForm").style.display = "block";
    document.body.classList.add("popup-open"); // Prevent background scrolling
}

function closeForm() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("myForm").style.display = "none";
    document.body.classList.remove("popup-open");
}