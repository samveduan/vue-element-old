import Vue from 'vue'
import Vuex from 'vuex'
import People from './modules/people'
import Product from './modules/product'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        People,
        Product
    }
})