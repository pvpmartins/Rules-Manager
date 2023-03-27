export const state = () => ({
  isAuthenticated: false,
  accessToken: null
})

export const mutations = {
  setAccessToken(state, token) {
    state.accessToken = token
    state.isAuthenticated = true
  },
  clearAccessToken(state) {
    state.accessToken = null
    state.isAuthenticated = false
  }
}
