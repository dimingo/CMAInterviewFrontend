/* eslint-disable */
import {defineStore} from 'pinia';
import axios from "axios";
import useAlertStore from '@/store/alert'

const store = useAlertStore();

export default defineStore('products', {

  state: () => ({products: [], product: null}),
  getters: {},
  actions: {
    async getProducts() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
        if (response.status === 200) {
          this.products = response.data.data.products;
          store.showAlert('success', 'Records Retrieved Successfully');
        } else {
          store.showAlert('error', 'Records Not Retrieved');
        }
      } catch (error) {
        console.log(error);
        store.showAlert('error', 'Error Retrieving Records');
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
          store.showAlert('success', 'Records Stored Successfully');
        } else {
          store.showAlert('error', 'Records Not Stored');
        }
      } catch (error) {
        console.log(error);
        store.showAlert('error', 'Error Storing Records');
      }
    },
    async showProduct(id) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
        if (response.status === 200) {
          this.product = response.data.product;
          store.showAlert('success', 'Records Retrieved Successfully');
        } else {
          store.showAlert('error', 'Records Not Retrieved');
        }
      } catch (error) {
        console.log(error);
        store.showAlert('error', 'Error Retrieving Record');
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
          store.showAlert('success', 'Records Updated Successfully');
        } else {
          store.showAlert('error', 'Error Updating Record');
        }
      } catch (error) {
        console.log(error);
        store.showAlert('error', 'Error Updating Record');
      }
    },
    async deleteProduct(id) {
      try {
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`);
        if (response.status === 200) {
          store.showAlert('success', 'Record Deleted Successfully');
        } else {
          store.showAlert('error', 'Error Deleting Record');
        }
      } catch (error) {
        console.log(error);
        store.showAlert('error', 'Error Deleting Record');
      }
    },
  },
});
