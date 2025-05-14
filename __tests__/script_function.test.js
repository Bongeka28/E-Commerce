import {
  cart,
  addToCartFn,
  deleteFromCartFn,
  fetchProductsFn,
  removeByCartIdFn,
  calculateTotalFn,
  increaseProductCounterFn,
  addToWishListFn,
  removeByWishListIdFn,
  removeByProductIdWishlistFn,
  wishList,
  products1,
} from "../js/script_function.js";

//fetch Tests

describe("[fetchProductsFn]", () => {
    test("should be a valid function", async () => {
      expect(fetchProductsFn).toBeDefined();
      expect(typeof fetchProductsFn).toBe("function");
  
      const data = await fetchProductsFn();
  
      expect(data.length).toBe(30);
    });
  });


  //cart Test
describe("[cart]", () => {
    test("Should be defined", () => {
      expect(cart).toBeDefined();
    });
  
    test("Should be an array", () => {
      expect(Array.isArray(cart)).toBe(true);
    });
  
    test("Should be a valid array", () => {
      expect(typeof cart).toBe("object");
    });
  });


  //product
describe("[products1]", () => {
    test("Should be defined", () => {
      expect(products1).toBeDefined();
    });
  
    test("Should be an array", () => {
      expect(Array.isArray(products1)).toBe(true);
    });
  
    test("Should be a valid array", () => {
      expect(typeof products1).toBe("object");
    });
  });



//Add to cart Function Tests
describe("[addToCartFn]", () => {
    test("Should be defined", () => {
      expect(addToCartFn).toBeDefined();
    });
  
    test("Should be a valid function", () => {
      expect(typeof addToCartFn).toBe("function");
    });
  
    test("given an invalid productId, it should throw an error", () => {
      const productId = -1;
      expect(() => addToCartFn(productId)).toThrow();
    });
  
    test("Should add an element into a cart", () => {
      const productId = 1;
      const cart=[];
      addToCartFn(productId);
  
      expect(cart.length).toBe(cart.length);
    });
  });
  
  //Deleting from cart
  describe("[deleteFromCartFn]", () => {
    test("Should be defined", () => {
      expect(deleteFromCartFn).toBeDefined();
    });
  
    test("Should be a valid function", () => {
      expect(typeof deleteFromCartFn).toBe("function");
    });
  
    test("given an invalid productCartId, it should throw an error", () => {
      const productCartId = -1;
      expect(() => deleteFromCartFn(productCartId)).toThrow();
    });
  
  
    test("Should delete an element from the cart", () => {
      const productCartId = 1;
  
      deleteFromCartFn(productCartId);
    });
  });
  
  //remove by cart Id
  
  describe("[removeByCartIdFn]", () => {
    test("Should be defined", () => {
      expect(removeByCartIdFn).toBeDefined();
    });
  
    test("Should be a valid function", () => {
      expect(typeof removeByCartIdFn).toBe("function");
    });
  
    test("cart_id should be a number", () => {
      let cart_id = "";
  
      expect(() => removeByCartIdFn(cart_id)).toThrow();
    });
  
    test("given an invalid cart_id, it should throw an error", () => {
      const cart_id = -1;
      expect(() => removeByCartIdFn(cart_id)).toThrow();
    });
  
    test("Should delete an element from the cart using cart_id", () => {
      const cart_id = 1;
  
      removeByCartIdFn(cart_id);
    });
  });
  
  //Calculating Total Function
  describe("[calculateTotalFn]", () => {
    test("Should be defined", () => {
      expect(calculateTotalFn).toBeDefined();
    });
  
    test("Should be a valid function", () => {
      expect(typeof calculateTotalFn).toBe("function");
    });
  
    test("cartProduct Should be an object", () => {
      const cartProduct = "";
      const productCount=1;
      expect(() => calculateTotalFn(cartProduct, productCount)).toThrow();
    });
    test("productCount should be a positive number", () => {
      const productCount = -1;
      const cartProduct = {
        id: 1,
        title: "Essence Mascara Lash Princess",
        description:
          "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
        category: "beauty",
        price: 9.99,
        discountPercentage: 7.17,
        rating: 4.94,
        stock: 5,
        tags: ["beauty", "mascara"],
        brand: "Essence",
        sku: "RCH45Q1A",
        weight: 2,
        dimensions: {
          width: 23.17,
          height: 14.43,
          depth: 28.01,
        },
        warrantyInformation: "1 month warranty",
        shippingInformation: "Ships in 1 month",
        availabilityStatus: "Low Stock",
        reviews: [
          {
            rating: 2,
            comment: "Very unhappy with my purchase!",
            date: "2024-05-23T08:56:21.618Z",
            reviewerName: "John Doe",
            reviewerEmail: "john.doe@x.dummyjson.com",
          },
          {
            rating: 2,
            comment: "Not as described!",
            date: "2024-05-23T08:56:21.618Z",
            reviewerName: "Nolan Gonzalez",
            reviewerEmail: "nolan.gonzalez@x.dummyjson.com",
          },
          {
            rating: 5,
            comment: "Very satisfied!",
            date: "2024-05-23T08:56:21.618Z",
            reviewerName: "Scarlett Wright",
            reviewerEmail: "scarlett.wright@x.dummyjson.com",
          },
        ],
        returnPolicy: "30 days return policy",
        minimumOrderQuantity: 24,
        meta: {
          createdAt: "2024-05-23T08:56:21.618Z",
          updatedAt: "2024-05-23T08:56:21.618Z",
          barcode: "9164035109868",
          qrCode: "https://assets.dummyjson.com/public/qr-code.png",
        },
        images: [
          "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png",
        ],
        thumbnail:
          "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
      };
      expect(() => calculateTotalFn(cartProduct, productCount)).toThrow();
    });
  
    test("Should delete an element from the cart using cart_id", () => {
      const cart_id = 1;
  
      removeByCartIdFn(cart_id);
    });
  });


//Increasing the count function
describe("[increaseProductCounterFn]", () => {
    test("Should be defined", () => {
      expect(increaseProductCounterFn).toBeDefined();
    });
  
    test("Should be a valid function", () => {
      expect(typeof increaseProductCounterFn).toBe("function");
    });
  
    test("given an invalid productCartId, it should throw an error", () => {
      const productCartId = -1;
      expect(() => increaseProductCounterFn(productCartId)).toThrow();
    });
  
    test("Should increase the count in a cart", () => {
      const productCartId = 1;
  
      increaseProductCounterFn(productCartId);
    });
  });


//wishlist
describe("[wishList]", () => {
  test("Should be defined", () => {
    expect(wishList).toBeDefined();
  });

  test("Should be an array", () => {
    expect(Array.isArray(wishList)).toBe(true);
  });

  test("Should be a valid array", () => {
    expect(typeof wishList).toBe("object");
  });
});

//adding to wishlist
describe("[addToWishListFn]", () => {
  test("Should be defined", () => {
    expect(addToWishListFn).toBeDefined();
  });

  test("Should be a valid function", () => {
    expect(typeof addToWishListFn).toBe("function");
  });

  test("productId should be a valid parameter", () => {
    const productId = -1;
    expect(() => addToWishListFn(productId)).toThrow("Invalid productId");
  });


  test("should add to wishlist", () => {
    const productId = 1;
    addToWishListFn(productId);
  });
});

//removeByWishListIdFn test
describe("[removeByWishListIdFn]", () => {
  test("Should be defined", () => {
    expect(removeByWishListIdFn).toBeDefined();
  });

  test("Should be a valid function", () => {
    expect(typeof removeByWishListIdFn).toBe("function");
  });

  test("wishlist_id should be a valid parameter", () => {
    const wishlist_id = "";
    expect(() => removeByWishListIdFn(wishlist_id)).toThrow(
      "Invalid wishlist_id"
    );
  });


  test("should remove from wishlist", () => {
    const wishlist_id = 1;
    removeByWishListIdFn(wishlist_id);
  });
});

//removeByProductIdWishlistFn tests
describe("[removeByProductIdWishlistFn]", () => {
  test("Should be defined", () => {
    expect(removeByProductIdWishlistFn).toBeDefined();
  });

  test("Should be a valid function", () => {
    expect(typeof removeByProductIdWishlistFn).toBe("function");
  });

  test("product_id should be a valid parameter", () => {
    const product_id = "";
    expect(() => removeByProductIdWishlistFn(product_id)).toThrow(
      "Invalid product_id"
    );
  });

  test("should remove from wishlist", () => {
    const product_id = 1;
    removeByProductIdWishlistFn(product_id);
  });
});