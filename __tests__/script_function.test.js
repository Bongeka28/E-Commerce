import {
    
    fetchProductsFn,
   
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