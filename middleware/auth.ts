export default function ({ route, store, redirect }) {
  if (route.path !== '/login' && !store.state.auth.isAuthenticated) {
    redirect('/login')
  } 
}
