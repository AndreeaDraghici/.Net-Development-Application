import { API_ROUTE } from "../config/api";
import Category from "../models/category";
import Product from "../models/product";

const ApiClient = {

  get: (url, headers) => {
    return ApiClient.makeRequest(`${API_ROUTE}/${url}`, "GET", {}, headers);
  },

  post: (url, params, headers) => {
    return ApiClient.makeRequest(`${API_ROUTE}/${url}`, "POST", params, headers);
  },

  put: (url, params, headers) => {
    return ApiClient.makeRequest(`${API_ROUTE}/${url}`, "PUT", params, headers);
  },

  delete: (url, headers) =>{
    return ApiClient.makeRequest(`${API_ROUTE}/${url}`, "DELETE", {}, headers);
  },

  makeRequest: async (url, type, params = {}, headers = {}) => {
    try {
      type = type.toUpperCase();
      const request = {
        method: type,
        headers: headers,
      };
      if (type === "POST" || type === "PUT") {
        request.body = JSON.stringify(params);
      }

      const result = await fetch(url, request);
      return await result.json();
    } catch (error) {
      console.log(error.message);
    }
  },
};

const Categories = {
  getAll: async () => {
    const { categories } = await ApiClient.get("category");

    return categories.map(
      (c) => new Category(c.categoryId, c.name, c.description)
    );
  },

  get: async (id) => {
    await ApiClient.get(`category/${id}`);
  },

  insert: async (category) =>{
    await ApiClient.post("category", category,
    {
      'Accept':'application/json',
      'Content-Type':'application/json'
    });

  },

  update: async (id, category) =>{
    await ApiClient.put(`category/${id}`, category,
    {
      'Accept':'application/json',
      'Content-Type':'application/json'
    });

  },

  delete: async (id) =>{
    await ApiClient.delete(`category/${id}`,
    {
      'Accept':'application/json',
      'Content-Type':'application/json'
    });
  },


};

const Products = {
  getAll: async () => {
    const { products } = await ApiClient.get("product");

    return products.map(
      (p) => new Product(p.productId, p.name, p.description, p.price, p.basePrice,  p.categoryId, p.imageName)
    );
  },

  get: async (id) => {
    const p = await ApiClient.get(`product/${id}`);

    return new Product(p.productId, p.name, p.description, p.price, p.basePrice,  p.categoryId, p.imageName);
  },

  insert: async (category) =>{
    const product = await ApiClient.post("product", category,
    {
      'Accept':'application/json',
      'Content-Type':'application/json'
    });

    return product;
  },

  update: async (id, category) =>{
    await ApiClient.put(`product/${id}`, category,
    {
      'Accept':'application/json',
      'Content-Type':'application/json'
    });

  },

  delete: async (id) =>{
    await ApiClient.delete(`product/${id}`,
    {
      'Accept':'application/json',
      'Content-Type':'application/json'
    });
  },


};



const ApiHelper = {
  Categories,
  Products,
};
export default ApiHelper;
