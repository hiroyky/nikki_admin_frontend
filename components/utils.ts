import { Store } from 'vuex'

export function showOkCancelDialog (store: Store<any>, title: string, text: string, okFunc: (() => void) | undefined) {
  store.commit('okCancelDialog/init', {
    title,
    text,
    okFunc: okFunc || (() => {})
  })
  store.commit('okCancelDialog/setIsVisible', true)
}
