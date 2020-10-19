<template>
  <v-dialog v-model="isVisible" max-width="290">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>{{ text }}</v-card-text>
      <v-card-actions>
        <v-btn @click="onOkClick">
          OK
        </v-btn>
        <v-btn @click="onCancelClick">
          キャンセル
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
@Component({})
export default class extends Vue {
  get title (): string {
    return this.$store.state.okCancelDialog.title
  }

  get text (): string {
    return this.$store.state.okCancelDialog.text
  }

  get isVisible (): boolean {
    return this.$store.state.okCancelDialog.isVisible
  }

  set isVisible (val: boolean) {
    this.$store.commit('okCancelDialog/setIsVisible', val)
  }

  onOkClick () {
    this.$store.commit('okCancelDialog/setIsVisible', false)
    this.$store.state.okCancelDialog.okFunc()
  }

  onCancelClick () {
    this.$store.commit('okCancelDialog/setIsVisible', false)
  }
}
</script>
