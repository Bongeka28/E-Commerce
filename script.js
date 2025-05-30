import {
  products1,
  addToCartFn,
  cart,
  removeByCartIdFn,
  calculateTotalFn,
  deleteFromCartFn,
  increaseProductCounterFn,
  wishList,
  addToWishListFn,
  removeByWishListIdFn,
   users,
  registerPeople,
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  loginUser
  

} from "./js/script_function.js";

let cart1=[];




const viewProductModalBtn = document.querySelectorAll(".btn-secondary");
const viewProductDialog = document.querySelector("dialog");
const closeProductDialog = document.querySelector("dialog button");

// Get dialog and its elements
const dialog = document.getElementById("viewProductDialog");
const modal = document.querySelector("#viewProductDialog");
const closeModalBtn = document.querySelector("#btn-decclose");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalPrice = document.getElementById("modalPrice");
const modalRating = document.getElementById("modalRating");

// Slide buttons
let currentSlideIndex = 0;
let currentImageList = [];

const thumbnailScroll = document.querySelector(".thumbnail-scroll");
const prevSlideBtn = document.getElementById("prevSlide");
const nextSlideBtn = document.getElementById("nextSlide");

//login and register

const loginBtn = document.getElementById("login");
const viewLogin = document.getElementById("loginDialog");
const closeLogin = document.getElementById("closeLogin");

const registerBtn = document.getElementById("signup");
const viewRegister = document.getElementById("signupDialog");
const closeRegister = document.getElementById("closeSignup");

//Cart and wislist

const cartBtns = document.querySelectorAll(".bi.bi-bag");
const viewCart = document.querySelector("#cartDialog");
const closeCart = document.querySelector("#cartButton");

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
        localStorage.setItem('cart', JSON.stringify(cart));
        AddToCartRender();
      }
        
      } catch (error) {
        alert(error.message)
      }
      
    });
  });

  function showSlide(index) {
    currentSlideIndex =
      (index + currentImageList.length) % currentImageList.length;
    modalImage.src = currentImageList[currentSlideIndex];

    // Highlight the selected thumbnail
    document.querySelectorAll(".thumbnail-scroll img").forEach((img, i) => {
      img.classList.toggle("active", i === currentSlideIndex);
    });
  }
  prevSlideBtn.addEventListener("click", () =>
    showSlide(currentSlideIndex - 1)
  );
  nextSlideBtn.addEventListener("click", () =>
    showSlide(currentSlideIndex + 1)
  );
  viewButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      const product = products[index];

      currentImageList =
        product.images && product.images.length
          ? product.images
          : [product.thumbnail];
      currentSlideIndex = 0;

      // Add thumbnails dynamically
      thumbnailScroll.innerHTML = "";
      currentImageList.forEach((src, i) => {
        const thumb = document.createElement("img");
        thumb.src = src;
        thumb.addEventListener("click", () => showSlide(i));
        thumbnailScroll.appendChild(thumb);
      });

      // Set up slideshow
      showSlide(currentSlideIndex);

      // Fill in modal with selected product details

      modalTitle.textContent = product.title;
      modalDescription.textContent = product.description;
      modalPrice.textContent = product.price;
      modalRating.textContent = product.rating;
      modalReviews.textContent = product.reviews;
      modalDiscount.textContent = `${product.discountPercentage}%`;
      modalQuantity.textContent = product.stock;
      modalCategory.textContent = product.category;
      modalBrand.textContent = product.brand;
      modalWarranty.textContent = product.warrantyInformation;
      modalShipping.textContent = product.shippingInformation;
      modalReturn.textContent = product.returnPolicy;
      modalAvailability.textContent = product.availabilityStatus;

      modalReviews.innerHTML = ""; // Clear any previous reviews

      product.reviews.forEach((review) => {
        const reviewHTML = `
                    <div class="single-review" style="margin-bottom: 1em;">
                      <p><strong>${review.reviewerName}</strong> (${new Date(
          review.date
        ).toLocaleDateString()})</p>
                      <p>Rating: ${review.rating} ⭐</p>
                      <p><em>${review.comment}</em></p>
                    </div>
                  `;
        modalReviews.innerHTML += reviewHTML;
      });

      modal.showModal();
    });
  });

  // add action for the slide buttons
  prevSlideBtn.addEventListener("click", () => {
    showSlide(currentSlideIndex - 1);
  });

  nextSlideBtn.addEventListener("click", () => {
    showSlide(currentSlideIndex + 1);
  });
}
displayProducts(products1);


// Populate the category dropdown
function populateCategoryFilter(products) {
  const select = document.getElementById("category-select");
  const uniqueCategories = [...new Set(products.map(p => p.category))];

  uniqueCategories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    select.appendChild(option);
  });
}

// Filter products based on category selection
document.getElementById("category-select").addEventListener("change", (e) => {
  const selectedCategory = e.target.value;
  const filtered = selectedCategory
    ? products1.filter(product => product.category === selectedCategory)
    : products1;

  // Clear and redisplay products
  container.innerHTML = "";
  displayProducts(filtered);
});


populateCategoryFilter(products1);


//Search by title
const searchInput = document.getElementById("searchInput");


searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase(); 

  const filteredProducts = products1.filter(product =>
    product.title.toLowerCase().includes(searchTerm)
  );

  
  container.innerHTML = "";
  displayProducts(filteredProducts);
});



//Add to cart Render 
let cartContainer = document.getElementById("cartDialog");
let total = 0;
let StorageCartList=[];
//Adding to cart HTML
function AddToCartRender() {
  total = 0;
  let totalItemCount = 0;
  cartContainer.innerHTML = `
  <button id="cartButton">Close</button>
        <h1>Cart</h1>`;

  

   
  for (let i = 0; i < cart.length; i++) {
    const cartItem = cart[i];
    const cartProduct = cartItem.product;
    totalItemCount += cartItem.count;

    const cartItemsTotal = calculateTotalFn(cartProduct, cartItem.count);
    total += cartItemsTotal;

    cartContainer.innerHTML += `
    
        <div class="cart">

            <div class="cart-img">
              <img
                src="${cartProduct.thumbnail}"
                alt="image"
              />
            </div>
      
            <div class="cart-description">
              
                <div class="title"><h1>${cartProduct.title}</h1></div>
                <div class="price">$${cartProduct.price}</div>

                <div class="quatity-div">

                 
                   <i class="bi bi-dash-circle-fill" data-id="${cartItem.id}"></i>
                 
                   
                    <div>${cartItem.count}</div>

                    
                    <i class="bi bi-plus-circle-fill" data-id="${cartItem.id}"></i>
                   
                   
                 
                    
                </div>

                <div class="btn-cartDialog">
                    <button class="btn-saveitem" type="button" data-id="${cartProduct.id}"> Wishlist</button>
                    <button class="btn-removeitem" type="button" data-id="${cartItem.id}">Remove</button>
                </div>
            </div>
      
             
        </div>
 
        </div>
     `;
  }

  cartContainer.innerHTML += `
    <div class="btn-cartcheckout">
      <div class="total-price">Total Price : $ ${total.toFixed(2)}</div>
      <button class="btn-checkout">Checkout</button>
    </div> 
  `;

  // Update cart count in the red dot
  const cartCountSpan = document.querySelector(".cartCount span");
  if (totalItemCount > 0) {
    cartCountSpan.innerText = totalItemCount;
    cartCountSpan.style.display = "inline";
  } else {
    cartCountSpan.style.display = "none";
  }
  const closeButton = document.getElementById("cartButton");
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      cartContainer.close();
    });
  }

  const removeItemBtn = document.querySelectorAll(".btn-removeitem");

  removeItemBtn.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const cartId = event.currentTarget.dataset.id;
      const cId = parseInt(cartId);

      console.log("Cart ID removed from cart:", cartId);
      removeByCartIdFn(cId);
      AddToCartRender();
    });
  });

  const increaseCountBtn = document.querySelectorAll(".bi.bi-plus-circle-fill");

  increaseCountBtn.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const productId = event.currentTarget.dataset.id;

      const prodId = parseInt(productId);

      console.log("Product ID :", productId);
      increaseProductCounterFn(prodId);
      AddToCartRender();
    });
  });

  const decreaseCountBtn = document.querySelectorAll(".bi.bi-dash-circle-fill");

  decreaseCountBtn.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const productId = event.currentTarget.dataset.id;

      const prodId = parseInt(productId);
      for (let i = 0; i < cart.length; i++) {
        const cartItem = cart[i];
        console.log(cartItem);
      }

      console.log("Product ID :", productId);
      deleteFromCartFn(prodId);
      AddToCartRender();
    });
  });

  const addToWishListBtn = document.querySelectorAll(".btn-saveitem");

  addToWishListBtn.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      try {
        const productId = event.currentTarget.dataset.id;
        const prodId = parseInt(productId);
        console.log("Product ID added to wishlist:", productId);

        addToWishListFn(prodId);
        localStorage.setItem('cart', JSON.stringify(wishList));
        AddToWishListRender();
        console.log(wishList);
      } catch (error) {
        alert(error.message);
      }
    });
  });

  const checkoutbtn = document.querySelectorAll(".btn-checkout");
  checkoutbtn.forEach((btn) => {

    btn.addEventListener("click", () => {
      viewLogin.showModal();
      
    });
  });

}

//adding to wishlist
let wishListContainer = document.getElementById("favDialog");

function AddToWishListRender() {
  wishListContainer.innerHTML = `
  <button id="heartButton">Close</button>
        <h1>WishList</h1>`;

  for (let i = 0; i < wishList.length; i++) {
    const wishListItem = wishList[i];
    const wishListProduct = wishListItem.product;

    wishListContainer.innerHTML += `
        <div class="fav">

      <div>
        <img
          src="${wishListProduct.thumbnail}"
          alt="image"
        />
      </div>

      <div class="fav-description">
        <div>
          <div class="title">${wishListProduct.title}</div>
          <div class="price">${wishListProduct.price}</div>
        </div>

        <div class="btn-favDialog">
          <button class="fav-btn" type="button" data-id="${wishListProduct.id}">Add to Cart</button>
          <button class="btn-primary" type="button" data-id="${wishListItem.id}">Remove</button>
        </div>
      </div>
    </div>`;
  }

  // Update wishlist count
  const wishListCountSpan = document.querySelector(".favCount span");
  if (wishListCountSpan) {
    if (wishList.length > 0) {
      wishListCountSpan.innerText = wishList.length;
      wishListCountSpan.style.display = "inline";
    } else {
      wishListCountSpan.style.display = "none";
    }
  }
  const closeButton = document.getElementById("heartButton");
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      wishListContainer.close();
    });
  }

  const removeItemBtn = document.querySelectorAll(".btn-primary");

  removeItemBtn.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      try {
        const cartId = event.currentTarget.dataset.id;
        const cId = parseInt(cartId);

        console.log("Cart ID removed from cart:", cartId);
        removeByWishListIdFn(cId);

        AddToWishListRender();
      } catch (error) {
        alert(error.message);
      }
    });
  });

  const addToCartButtons = document.querySelectorAll(".btn-secondary");

  addToCartButtons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      try {
        const productId = event.currentTarget.dataset.id;
        const cId = parseInt(productId);
        console.log("Product ID added to cart from wishlist:", productId);
        addToCartFn(cId);

        AddToCartRender();
        AddToWishListRender();
      } catch (error) {
        alert(error.message);
      }
    });
  });
}

//Event Listeners
cartBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    viewCart.showModal();
  });
});

closeCart.addEventListener("click", () => {
  viewCart.close();
});


//login
document.getElementById('signin-form').addEventListener("submit", function (e) {
  e.preventDefault();

 
  const emailInput=document.getElementById('email');
  const passwordInput =document.getElementById('password');

  const email = emailInput.value ;
    const password= passwordInput.value;
    try {
      const loggedInUser= loginUser(email,password);
      if (loggedInUser) {
        alert(`You have logged in successfully as ${loggedInUser.name}!`);
        document.getElementById('signin-form').reset();

      }
      window.location.href = "index.html";
      
    } catch (error) {
      alert(error.message)
    }

});
//

//Signup
document.getElementById("signup-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("fullname").value.trim();
  const email = document
    .getElementById("signup-email")
    .value.trim()
    .toLowerCase();
  const password = document.getElementById("signup-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  try {
   
    validateName(name);
    validateEmail(email);
    validatePassword(password);
    validateConfirmPassword(password, confirmPassword);

    registerPeople(name, email, password, confirmPassword);

    let existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    let emailExists = existingUsers.some(user => user.email === email);
    let  newUser;
    if (emailExists) {
      alert("Email already exists");
    } else {
      // Create new user object
       newUser = {
        name: name,
        email: email,
        password: password
      };
      existingUsers.push(newUser);
    
      localStorage.setItem("users", JSON.stringify(existingUsers));
      document.getElementById("signup-form").reset();
      alert("Registration successful!");
      window.location.href = "index.html";
    }
       
    
    

  } catch (err) {
    alert(err.message);
  }
});


