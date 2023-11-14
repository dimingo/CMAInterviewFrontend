/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import Alert from './components/Alert.vue'

// Composables
import {createApp} from 'vue'

// Plugins
import {registerPlugins} from '@/plugins';


const app = createApp(App)

registerPlugins(app)

// eslint-disable-next-line vue/multi-word-component-names
app.component('Alert', Alert)
app.mount('#app')
