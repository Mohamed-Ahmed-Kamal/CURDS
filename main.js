let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let search = document.getElementById("search");
let searchTitle = document.getElementById("searchTitle");
let searchCategory = document.getElementById("searchCategory");
let deleteAll = document.getElementById("deleteAll");
let table = document.getElementById("table");

let mood = "create";
let ind = "";
//get total -----------------------------
function getTotal() {
  if (price.value != "") {
    let resalt = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = resalt;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "red";
  }
}
//save data from local storeage to array
let products;
if (localStorage.product != null) {
  products = JSON.parse(localStorage.product);
} else {
  products = [];
}
// create the prudicts
submit.onclick = function () {
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  // active count input
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    count.value <= 100
  ) {
    if (mood === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          products.push(newPro);
        }
      } else {
        products.push(newPro);
      }
    } else {
      products[ind] = newPro;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
    clearData();
  }

  localStorage.setItem("product", JSON.stringify(products));
  showDate();
};
//clear data from inpts when create new product
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = "";
  total.style.background = "red";
}
// show product when click create
function showDate() {
  let table;
  for (let i = 0; i < products.length; i++) {
    table += `
    <tr>
    <td>${i + 1}</td>
    <td>${products[i].title.toLowerCase()}</td>
    <td>${products[i].price}</td>
    <td>${products[i].taxes}</td>
    <td>${products[i].ads}</td>
    <td>${products[i].discount}</td>
    <td>${products[i].total}</td>
    <td>${products[i].category.toLowerCase()}</td>
    <td><button onclick="updateData(${i})">updaet</button></td>
    <td><button onclick="deleteData(${i})">delete</button></td>
  </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;
  if (products.length <= 0) {
    deleteAll.style.display = "none";
  } else {
    deleteAll.style.display = "block";
  }
}
showDate();
//Delete product from array
function deleteData(i) {
  products.splice(i, 1);
  localStorage.product = JSON.stringify(products);
  showDate();
}
//clear data fron local storage and araay
function deleteAlldata() {
  localStorage.clear();
  products.splice(0);
  showDate();
}

//Update data from array
function updateData(i) {
  title.value = products[i].title;
  price.value = products[i].price;
  taxes.value = products[i].taxes;
  ads.value = products[i].ads;
  discount.value = products[i].discount;
  total.value = products[i].total;
  count.style.display = "none";
  category.value = products[i].category;
  getTotal();
  submit.innerHTML = "Update";
  ind = i;
  mood = "update";
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

let searchMood = "title";
//function to select type of search
function selectSearch(id) {
  let search = document.getElementById("search");

  if (id == "searchTitle") {
    searchMood = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMood = "category";
    search.placeholder = "Search By Category";
  }
  search.focus();
  search.value = "";
  showDate();
}

// actice search button
function search_fun(value) {
  let table = "";
  if (searchMood == "title") {
    for (let i = 0; i < products.length; i++) {
      if (products[i].title.includes(value.toLowerCase())) {
        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].taxes}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td><button onclick="updateData(${i})">updaet</button></td>
        <td><button onclick="deleteData(${i})">delete</button></td>
      </tr>
        `;
      }
    }
  } else {
    for (let i = 0; i < products.length; i++) {
      if (products[i].category.includes(value.toLowerCase())) {
        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].taxes}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td><button onclick="updateData(${i})">updaet</button></td>
        <td><button onclick="deleteData(${i})">delete</button></td>
      </tr>
        `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
