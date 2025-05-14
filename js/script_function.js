let products1 = [];

async function fetchProductsFn() {
    const setProducts = await fetch("https://dummyjson.com/products ");
  
    const data = await setProducts.json();
  
    const { products } = data;
  
    return products;
  }
  
  products1 = await fetchProductsFn();


  export {
    
    fetchProductsFn,
   
  };