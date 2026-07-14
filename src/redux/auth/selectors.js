export const selectUser = (state) => state.auth.user
export const selectToken = (state) => state.auth.token
export const selectIsLoggedIn = (state) => Boolean(state.auth.token && state.auth.user)
export const selectIsRefreshing = (state) => state.auth.isRefreshing
export const selectIsAuthLoading = (state) => state.auth.isLoading
