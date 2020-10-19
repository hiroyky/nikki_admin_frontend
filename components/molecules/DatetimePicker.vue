<template>
  <v-dialog v-model="isDisplay" :persistent="persistent">
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-bind="attrs"
        :disabled="disabled"
        :loading="loading"
        :label="label"
        :value="displayDatetime"
        readonly
        v-on="on"
      >
        <template v-slot:progress>
          <slot name="progress">
            <v-progress-linear color="primary" indeterminate absolute height="2" />
          </slot>
        </template>
      </v-text-field>
    </template>

    <v-card>
      <v-card-title>
        <slot name="title" />
      </v-card-title>

      <v-container fluid>
        <v-row align="baseline">
          <v-col>
            <v-date-picker v-model="date" full-width />
          </v-col>
          <v-col>
            <v-time-picker v-model="time" format="24hr" full-width />
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn @click="onApplyClick">
          決定
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
import { format, parse } from 'date-fns'
import { Component, Prop, Emit } from 'vue-property-decorator'

const DATE_FORMAT = 'yyyy-MM-dd'
const TIME_FORMAT = 'HH:mm:ss'

@Component({})
export default class extends Vue {
  @Prop()
  persistent?: boolean

  @Prop()
  value?: Date

  @Prop()
  label?: string

  @Prop()
  loading?: boolean

  @Prop()
  disabled?: boolean

  @Emit('input')
  onInput (): Date {
    const t = this.time.split(':').length === 3 ? this.time : `${this.time}:00`
    return parse(`${this.date} ${t}`, `${DATE_FORMAT} ${TIME_FORMAT}`, new Date())
  }

  isDisplay = false
  date = ''
  time = '00:00:00'

  mounted () {
    this.reset()
  }

  reset () {
    this.date = this.value ? format(this.value, DATE_FORMAT) : format(new Date(), DATE_FORMAT)
    this.time = this.value ? format(this.value, TIME_FORMAT) : format(new Date(), TIME_FORMAT)
  }

  get displayDatetime (): string {
    if (!this.value) {
      return ''
    }
    return format(this.value, `${DATE_FORMAT} ${TIME_FORMAT}`)
  }

  onApplyClick () {
    this.onInput()
    this.isDisplay = false
  }

  onCancelClick () {
    this.isDisplay = false
  }
}
</script>
