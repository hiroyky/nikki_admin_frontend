<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>作成</v-card-title>
            <v-subheader>新規記事を作成します。</v-subheader>

            <article-edit-form @apply="onArticleApply" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import ArticleEditForm from '~/components/organisms/ArticleEditForm.vue'
import NewArticleGql from '~/gql/newArticle.gql'
import { ArticleEditFormData } from '~/@types/form'

@Component({
  components: {
    ArticleEditForm
  },
  apollo: {}
})
export default class extends Vue {
  async onArticleApply (val: ArticleEditFormData) {
    try {
      await this.$apollo.mutate({
        mutation: NewArticleGql,
        variables: {
          title: val.title,
          body: val.body,
          publishStatus: val.publishStatus,
          postedAt: val.postedAt,
          description: '',
          thumbnailImage: ''
        }
      })
    } catch (err) {
      console.error(err)
    }
  }
}
</script>
