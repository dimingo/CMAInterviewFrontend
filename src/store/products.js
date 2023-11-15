/* eslint-disable */
import {defineStore} from 'pinia';
import axios from "axios";


export default defineStore('products', {

  state: () => ({products: [], product: null}),
  getters: {},
  actions: {
    async getProducts() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
        if (response.status === 200) {
          this.products = response.data.data.products;
          return response;
        } else {
          throw new Error('Records Not Retrieved');
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async storeProduct(product) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/products`, product, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (response.status === 201) {
          return response;
        } else {
          throw new Error('Records Not Stored');
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async showProduct(id) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
        if (response.status === 200) {
          this.product = response.data.product;
          return response;
        } else {
          throw new Error('Records Not Retrieved');
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async updateProduct(product) {
      try {
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/products/${product.id}`, product, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 200) {
          await this.getProducts();
          return response;
        } else {
          throw new Error('Error Updating Record');
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async deleteProduct(id) {
      try {
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`);
        if (response.status === 200) {
          return response;
        } else {
          throw new Error('Error Deleting Record');
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  },
});
