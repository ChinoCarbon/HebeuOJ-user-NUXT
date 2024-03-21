export const state = () => ({
  user: null
})

export const mutations = {
  setUser (state, user) {
    state.user = user
  },

  getUser(state) {
    return state.user
  }
}
