<template>
  <v-card>
    <v-layout>
      <AppBar/>
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      >

        <v-list density="compact" nav>

          <!--      <router-link to="/about">About</router-link>-->
          <v-list-item prepend-icon="mdi mdi-briefcase-outline" title="Products" to="/"
                       value="products">
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 100vh">
        <Alert v-show="true"/>
        <router-view/>

      </v-main>
    </v-layout>
  </v-card>
</template>
<script>
  export default {
    data() {
      return {
        drawer: true,
        rail: true,
      };
    },
  };
</script>
