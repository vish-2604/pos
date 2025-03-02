// document.addEventListener("DOMContentLoaded", function() {
//     let totalSales = 2450.00;
//     let numOrders = 120;
//     let discounts = 150.00;
//     let bestItem = "Cheese Burger";
    
//     document.getElementById("total-sales").innerText = `$${totalSales.toFixed(2)}`;
//     document.getElementById("num-orders").innerText = numOrders;
//     document.getElementById("discounts").innerText = `$${discounts.toFixed(2)}`;
//     document.getElementById("best-item").innerText = bestItem;

//     document.getElementById("search-box").addEventListener("input", function() {
//         let filter = this.value.toLowerCase();
//         let rows = document.querySelectorAll("#order-table tr");
//         rows.forEach(row => {
//             let text = row.innerText.toLowerCase();
//             row.style.display = text.includes(filter) ? "" : "none";
//         });
//     });
// });

    // Function to filter the table rows based on search input
    // function filterTable() {
    //   console.log("filterTable() function called");
    //   var input = document.getElementById("searchInput");
    //   var filter = input.value.toUpperCase();
    //   console.log("Search value:", filter);
      
    //   var table = document.querySelector("table");
    //   if (!table) {
    //     console.error("Table element not found!");
    //     return;
    //   }
    //   var tr = table.getElementsByTagName("tr");
      
      // Loop through table rows (skip the header row)
    //   for (var i = 1; i < tr.length; i++) {
    //     var orderCell = tr[i].getElementsByTagName("td")[0];
    //     var customerCell = tr[i].getElementsByTagName("td")[1];
        
    //     var orderText = orderCell ? orderCell.textContent || orderCell.innerText : "";
    //     var customerText = customerCell ? customerCell.textContent || customerCell.innerText : "";
        
    //     console.log("Row", i, "Order:", orderText, "Customer:", customerText);
        
    //     if (orderText.toUpperCase().indexOf(filter) > -1 || customerText.toUpperCase().indexOf(filter) > -1) {
    //       tr[i].style.display = "";
    //     } else {
    //       tr[i].style.display = "none";
    //     }
    //   }
    // }
    
    // // Attach event listener for live search when the DOM is fully loaded
    // document.addEventListener("DOMContentLoaded", function() {
    //   var searchInput = document.getElementById("searchInput");
    //   if (searchInput) {
    //     searchInput.addEventListener("keyup", filterTable);
    //   } else {
    //     console.error("Search input not found!");
    //   }
    // });

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



