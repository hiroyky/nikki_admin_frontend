<template>
  <v-form ref="form" v-model="formValidate">
    <v-container>
      <v-row>
        <v-col><v-text-field v-model="title" label="表題" :rules="titleRules" /></v-col>
      </v-row>
      <v-row>
        <v-col><v-textarea v-model="body" label="本文" rows="20" :rules="bodyRules" /></v-col>
      </v-row>
      <v-row>
        <v-col><v-subheader>公開状況</v-subheader></v-col>
        <v-col>
          <v-radio-group v-model="publishStatus" row>
            <v-radio label="公開する" :value="publish" />
            <v-radio label="下書きにする" :value="unpublish" />
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col><v-subheader>投稿日時</v-subheader></v-col>
        <v-col><v-checkbox v-model="currentPostedAtChecked" label="現在時刻を指定" /></v-col>
        <v-col>
          <datetime-picker v-model="postedAt" label="投稿日時" :disabled="isPostedAtDisabled">
            <template v-slot:title>
              投稿日時の選択
            </template>
          </datetime-picker>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn @click="onApplyClick">
            決定
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop } from 'vue-property-decorator'
import DatetimePicker from '~/components/molecules/DatetimePicker.vue'
import { ArticleEditFormData, ArticlePublishStatus, FormRule } from '~/@types/form'
import { showOkCancelDialog } from '~/components/utils'

  @Component({
    components: {
      DatetimePicker
    }
  })
export default class extends Vue {
  $refs!: Vue['$refs'] &{
    form: {
      validate: () => boolean
    }
  }

  private formValidate: boolean = false
  private title: string = ''
  private body: string = ''
  private publishStatus: ArticlePublishStatus = ArticlePublishStatus.Publish
  private currentPostedAtChecked: boolean = true
  private postedAt: Date = new Date()

  private titleRules: FormRule[] = [(val: string) => (!!val) || '入力してください']
  private bodyRules: FormRule[] = [(val: string) => (!!val) || '入力してください']

  private publish = ArticlePublishStatus.Publish
    private unpublish = ArticlePublishStatus.Unpublish

    private get isPostedAtDisabled (): boolean {
      return this.currentPostedAtChecked
    }

  @Prop()
  value?: ArticleEditFormData

  @Emit('input')
  onInput (newValue: ArticleEditFormData) {
    return newValue
  }

  @Emit('apply')
  apply () {
    return this.onInput(this.getEnteredValue())
  }

  onApplyClick () {
    if (!this.$refs.form.validate()) {
      return
    }

    showOkCancelDialog(this.$store, '反映します。', 'よろしいですか?', () => {
      this.apply()
    })
  }

  mounted (): void {
    this.initValues()
  }

  private initValues () {
    if (this.value === undefined) {
      this.reset()
      return
    }
    this.title = this.value.title
    this.body = this.value.body
    this.publishStatus = this.value.publishStatus
    this.postedAt = this.value.postedAt
  }

  private getEnteredValue (): ArticleEditFormData {
    return {
      title: this.title,
      body: this.body,
      publishStatus: this.publishStatus,
      postedAt: this.currentPostedAtChecked ? new Date() : this.postedAt
    }
  }

  private reset () {
    this.title = ''
    this.body = ''
    this.publishStatus = ArticlePublishStatus.Publish
    this.currentPostedAtChecked = true
    this.postedAt = new Date()
  }
}
</script>
