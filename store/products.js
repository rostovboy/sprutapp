export const state = () => ({
  products: []
})

export const mutations = {
  setProductsByParent(state, products) {
    state.products = products
  }
}

export const actions = {
  async fetchProductsByParent({commit}, parentId) {
    try {
      const products = await this.$axios.$get(`https://sprut.fract.ru/api/products&parent=${parentId}`)
      commit('setProductsByParent', products.results) // .results указывает на подмассив results
    } catch (e) {
      throw e
    }
  }
}

export const getters = {
  products: state => state.products,
}
