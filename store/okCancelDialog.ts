import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({ stateFactory: true, namespaced: true })
export default class OkCancelDialog extends VuexModule {
  title: string = ''
  text: string = ''
  okFunc = () => {}
  isVisible: boolean = false

  @Mutation
  init (arg: {title: string, text: string, okFunc: () => void}) {
    this.title = arg.title
    this.text = arg.text
    this.okFunc = arg.okFunc
  }

  @Mutation
  setIsVisible (visible: boolean) {
    this.isVisible = visible
  }
}
