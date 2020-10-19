<template>
  <v-app dark>
    <app-bar />
    <nuxt />
    <ok-cancel-dialog />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import AppBar from '~/components/organisms/AppBar.vue'
import OkCancelDialog from '~/components/molecules/OkCancelDialog.vue'

@Component({
  components: {
    AppBar,
    OkCancelDialog
  }
})
export default class extends Vue {

}
</script>
