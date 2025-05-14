import {
  products1,
  addToCartFn,
  cart,
} from "./js/script_function.js";

let cart1=[];
cart1 =cart;



const viewProductModalBtn = document.querySelectorAll(".btn-secondary");
const viewProductDialog = document.querySelector("dialog");
const closeProductDialog = document.querySelector("dialog button");

//login and register

const loginBtn = document.getElementById("login");
const viewLogin = document.getElementById("loginDialog");
const closeLogin = document.getElementById("closeLogin");

const registerBtn = document.getElementById("signup");
const viewRegister = document.getElementById("signupDialog");
const closeRegister = document.getElementById("closeSignup");

//Cart and wislist

const favoriteBtns = document.querySelectorAll(".bi.bi-heart");
const viewFavorite = document.querySelector("#favDialog");
const closeFavorite = document.querySelector("#heartButton");


viewProductModalBtn.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    viewProductDialog.showModal();
  });
});

closeProductDialog.addEventListener("click", () => {
  viewProductDialog.close();
});

registerBtn.addEventListener("click", () => {
  viewRegister.showModal();
});

closeRegister.addEventListener("click", () => {
  viewRegister.close();
});
//
loginBtn.addEventListener("click", () => {
  viewLogin.showModal();
});

closeLogin.addEventListener("click", () => {
  viewLogin.close();
});

favoriteBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    viewFavorite.showModal();
  });
});

closeFavorite.addEventListener("click", () => {
  viewFavorite.close();
});

//Product container

let container = document.getElementById("product-container");

function displayProducts(products) {
  for (let i = 0; i < products.length; i++) {
    let product = products[i];

    let productHtml = `
          
          <div class="product">
              <img src="${product.thumbnail}"
                  alt="">
  
                  <div class="discount">${product.discountPercentage}%</div>
  
              <div class="details">
                  <div class="reviews"><i class="bi bi-star-fill"></i> <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i> ${product.rating}</div>
                  <div class="title">${product.title}</div>
                  <div class="price">$ ${product.price}</div>
                  <div class="btn-group">
                      <button class="btn-secondary btnViewProduct" data-index="${i}">View</button>
                      <button class="btn-primary" data-id="${product.id}">Add to Cart</button>
                  </div>
              </div>
          </div>`;
    container.innerHTML += productHtml;
  }

  const viewButtons = document.querySelectorAll(".btnViewProduct");
  viewButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const viewProductDialog = document.querySelector("#viewProductDialog");
      viewProductDialog.showModal();
    });
  });

  const addToCartButtons = document.querySelectorAll(".btn-primary");

  addToCartButtons.forEach((btn) => {


    btn.addEventListener("click", (event) => {

      try {

        const productId = event.currentTarget.dataset.id;
      console.log("Product ID added to cart:", productId);
      const product = products.find((p) => p.id == productId);

      if (product) {
        addToCartFn(product.id);
        localStorage.setItem('cart', JSON.stringify(cart1));
        
      }
        
      } catch (error) {
        alert(error.message)
      }
      
    });
  });


     
}
displayProducts(products1);
