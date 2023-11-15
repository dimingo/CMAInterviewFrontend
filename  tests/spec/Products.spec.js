import {beforeEach, describe, expect, it, test} from 'vitest';
import {mount} from '@vue/test-utils'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {createPinia, setActivePinia} from 'pinia'
import useCounterStore from '@/store/products'
import Products from '@/components/Products.vue'

const vuetify = createVuetify({
  components,
  directives,
})
global.ResizeObserver = require('resize-observer-polyfill')

describe('Product Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('products', () => {
    const store = useCounterStore()
    expect(store.products).toStrictEqual([])

  })

  test('renders correctly', () => {
    const wrapper = mount(Products, {
      props: {},
      global: {
        components: {
          Products,
        },
        plugins: [vuetify],
      }
    });
    expect(wrapper.exists()).toBe(true);
  });

  test('displays message', () => {
    const wrapper = mount(Products, {
      props: {},
      global: {
        components: {
          Products,
        },
        plugins: [vuetify],
      }
    })
    expect(wrapper.text()).toContain('Products')
  })

})
