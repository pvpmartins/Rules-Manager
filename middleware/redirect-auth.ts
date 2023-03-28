export default function ({ store, redirect }: Props) {
  if (store.state.auth.isAuthenticated) {
    redirect('/')
  }
}

type Props = {
  store: any
  redirect: any
}
