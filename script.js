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