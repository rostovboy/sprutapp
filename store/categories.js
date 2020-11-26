export const state = () => ({
  categories: []
})

export const mutations = {
  setCategories(state, categories) {
    state.categories = categories
  }
}

export const actions = {
  async fetchCategories({commit}) {
    try {
      const categories = await this.$axios.$get('https://sprut.fract.ru/api/categories')
      commit('setCategories', categories.results) // .results указывает на подмассив results
    } catch (e) {
      throw e
    }
  },
  async fetchCategoryById({}, categoryId) {
    try {
      const category = await this.$axios.$get(`https://sprut.fract.ru/api/categories/${categoryId}`)
      return category.object // .object указывает на подмассив
    } catch (e) {
      throw e
    }
  }
}

export const getters = {
  categories: state => state.categories,
}
