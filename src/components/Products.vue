<script setup>
  import useProductsStore from '@/store/products';
  import {computed, nextTick, onMounted, reactive, ref, watch} from 'vue';

  import useAlertStore from '@/store/alert'

  const AlertStore = useAlertStore();

  const formTitle = computed(() => editedIndex.value === -1 ? 'New Product' : 'Edit Product');
  const headers = [
    {
      title: 'Product Name',
      align: 'start',
      sortable: false,
      key: 'name',
    },
    {title: 'Description', align: 'start', key: 'description'},
    {title: 'Price in (Ksh)', align: 'start', key: 'price'},
    {title: 'Actions', key: 'actions', sortable: false},
  ];
  const editedIndex = ref(-1);
  const loading = ref(false);
  const editedItem = reactive({
    name: '',
    description: '',
    price: null,
  });
  const defaultItem = reactive
  ({
    name: '',
    description: '',
    price: null,
  });
  const store = useProductsStore();
  const products = computed(() => store.products);
  const dialog = ref(false);
  const form = ref(null);
  const dialogDelete = ref(false);
  const productNameRules = [
    value => {
      if (value?.length > 3) return true;
      return 'Products name must be at least 3 characters.';
    },
  ];
  const priceRules = [
    value => {
      if (value > 0) return true;
      return 'Price Must be greater than 0';
    },
  ];
  const descriptionRules = [
    v => !!v || 'Description is required',
    v => (v && v.length > 10) || 'Description must be more than 10 characters',
  ];

  watch(dialog, (val) => {
    if (!val) {
      close();
    }
  });
  watch(dialogDelete, (val) => {
    if (!val) {
      closeDelete();
    }
  });
  const getProducts = async () => {
    await store.getProducts().then(
      (response) => {
        if (response.status === 200) {
          AlertStore.showAlert('success', "Records Retrieved");
        } else {
          AlertStore.showAlert("error", "Error Retrieving Records");
        }
      });
  }
  onMounted(getProducts);

  // functions
  function editItem(item) {
    editedIndex.value = products.value.indexOf(item);
    // change below
    editedItem.id = item.id;
    editedItem.name = item.name;
    editedItem.description = item.description;
    editedItem.price = item.price;
    dialog.value = true;
  }


  function deleteItem(item) {
    editedIndex.value = products.value.indexOf(item);
    dialogDelete.value = true;
  }

  function deleteItemConfirm() {
    products.value.splice(editedIndex.value, 1);
    store.deleteProduct(editedIndex.value).then(
      (response) => {
        if (response.status === 200) {
          AlertStore.showAlert('success', "Record Deleted Successfully");
        } else {
          AlertStore.showAlert("error", "Error Deleting Records");
        }
      });
    closeDelete();
  }

  function close() {
    dialog.value = false;
    nextTick(() => {
      editedIndex.value = -1;
      editedItem.id = defaultItem.id;
      editedItem.name = defaultItem.name;
      editedItem.description = defaultItem.description;
      editedItem.price = defaultItem.price;
    });
  }

  function closeDelete() {
    dialogDelete.value = false;
    nextTick(() => {
      editedIndex.value = -1;
    });
  }

  const save = async () => {
    const {valid} = await form.value.validate();
    if (valid) {
      if (editedIndex.value === -1) {
        store.storeProduct(editedItem).then(
          (response) => {
            if (response.status === 201) {
              AlertStore.showAlert('success', "Records Saved Successfully");
              getProducts()
            } else {
              AlertStore.showAlert("error", "Error Saving Record");
            }
          });
        close();
      } else {
        store.updateProduct(editedItem).then(
          (response) => {
            if (response.status === 200) {
              AlertStore.showAlert('success', "Record Updated Successfully");
              store.getProducts()
            } else {
              AlertStore.showAlert("error", "Error Updating Record");
            }
          });
        close();
      }
    } else {
      AlertStore.showAlert("warning", 'Please correct the errors in the form.');
    }
  };

</script>
<template>
  <v-container>
    <v-toolbar
      density="comfortable"
      flat
    >
      <v-toolbar-title>Products</v-toolbar-title>
      <v-divider
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog
        v-model="dialog"
        max-width="500px"
        persistent
      >
        <template v-slot:activator="{ props }">
          <v-btn
            append-icon="mdi-plus-circle"
            class="text-none text-subtitle-1"
            color="success"
            dark
            size="small"
            v-bind="props"
            variant="flat"
          >
            Add Product
          </v-btn>
        </template>
        <v-form ref="form" fast-fail @submit.prevent>
          <v-card rounded="3">
            <v-toolbar color="primary" density="compact" flat>
              <v-btn icon="mdi-pencil"></v-btn>
              <span class="subtitle-2 text-white">{{ formTitle }}</span>
            </v-toolbar>
            <v-card-text>
              <v-container>
                <v-row dense>
                  <v-col
                    cols="12"
                    md="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      :rules="productNameRules"
                      color="primary"
                      density="compact"
                      label="Product Name"
                      type="string"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="editedItem.description"
                      :rules="descriptionRules"
                      color="primary"
                      density="compact"
                      label="Product Description"
                      type="string"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="editedItem.price"
                      :rules="priceRules"
                      color="primary"
                      density="compact"
                      label="Product Price"
                      type="number"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="error"
                variant="flat"
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                :loading="loading"
                color="primary"
                type="submit"
                variant="flat"
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <VDataTable
      :headers="headers"
      :items="products"
      :sort-by="[{ key: 'name', order: 'asc' }]"
      class="elevation-1"
    >

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          class="me-2"
          color="warning"
          size="small"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          color="error"
          size="small"
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </VDataTable>
  </v-container>
</template>


