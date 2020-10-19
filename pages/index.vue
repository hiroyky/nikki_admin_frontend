<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <v-card-actions>
              <v-btn to="/edit">
                新規作成
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <article-list-table />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import ArticleListTable from '~/components/atoms/ArticleListTable.vue'

@Component({
  components: {
    ArticleListTable
  }
})
export default class extends Vue {
}
</script>
