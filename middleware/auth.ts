export default function ({ route, store, redirect }: authProps) {
  if (route.path !== '/login' && !store.state.auth.isAuthenticated) {
    redirect('/login')
  }
}

type authProps = {
  route: any
  store: any
  redirect: any
}
