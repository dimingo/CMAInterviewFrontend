import {defineStore} from 'pinia';

export default defineStore('alert', {
  state: () => ({
    type: null,
    message: null,
    show: false,
    title: null,
  }),
  actions: {
    showAlert(type, message) {
      this.type = type;
      this.message = message;
      this.show = true;

      setTimeout(() => {
        this.show = false;
      }, 5000);
    },
    clearAlert() {
      this.type = null;
      this.message = null;
      this.show = false;
    },
  },
});
