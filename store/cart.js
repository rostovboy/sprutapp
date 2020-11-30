// function for Mock API
const sleep = m => new Promise(r => setTimeout(r, m))
const findMax = (array, field) => {
  if (!array || array.lenght === 0) return 1
  return Math.max(...array.map(o => o[field]), 0)
}

export const state = () => ({
  products: [],
  metaProducts: [],
  version: '0.0.1'

})

export const getters = {
  getProductsInCart: state => {
    const products = []
    state.products.map(p => {
      const metaProduct = state.metaProducts.find(mp => mp.id === p.productId)
      if (metaProduct) {
        products.push({ ...p, meta: metaProduct })
      }
    })
    return products.sort((a, b) => a.order - b.order)
  }
}

export const mutations = {
  ADD_PRODUCT (state, productId) {
    // if cart doesn't have product add it
    if (!state.products.find(p => productId === p.id)) {
      state.products = [...state.products, { productId, qty: 1, order: findMax(state.products, 'order') + 1 }]
    }
  },
  ADD_META_PRODUCT (state, product) {
    if (!state.metaProducts.find(p => product.id === p.id)) {
      state.metaProducts = [...state.metaProducts, product ]
    }
  },
  SET_PRODUCT_QTY (state, { productId, qty }) {
    state.products = [
      ...state.products.filter(prod => prod.productId !== productId),
      { ...state.products.find(prod => prod.productId === productId), qty }
    ]
  },
  REMOVE_PRODUCT (state, productId) {
    state.products = Array.from(state.products.filter(prod => prod.productId !== productId))
  },
  REMOVE_META_PRODUCT (state, id) {
    state.metaProducts = Array.from(state.metaProducts.filter(mprod => id !== mprod.id))
  }
}
export const actions = {
  async addProduct ({ commit }, data) {
    await sleep(300)
    await commit('ADD_PRODUCT', data)
  },
  async addMetaProduct ({ commit }, data) {
    await sleep(300)
    await commit('ADD_META_PRODUCT', data)
  },
  async removeProduct ({ commit }, productId) {
    await sleep(300)
    await commit('REMOVE_PRODUCT', productId)
  },
  async removeMetaProduct ({ commit }, productId) {
    await sleep(300)
    await commit('REMOVE_META_PRODUCT', productId)
  },
  async setProductQuantity ({ commit, dispatch }, { productId, qty }) {
    await sleep(50)
    await commit('SET_PRODUCT_QTY', { productId, qty })
  }
}
