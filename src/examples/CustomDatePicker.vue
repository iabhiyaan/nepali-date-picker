<script type="module" setup>
// node_modules
import {defineProps, ref} from 'vue'
// helpers
import useDate from "@/composables/useDate";

const props = defineProps({
  calenderType: {type: String, default: "Nepali"},
  format: {
      type: String,
      default(rawProps) {
        if (rawProps.calenderType === 'English') {
          return 'YYYY-MM-DD'
        }
        return 'yyyy-mm-dd'
      },
  },
  yearSelect: {type: Boolean, default: true},
  monthSelect: {type: Boolean, default: true},
  classValue: {type: String, default: ""},
  placeholder: {type: String, default: ""},
  modelValue: {type: String, default: ""},
})

const {days, date, visible, show, convertToNepali, formatEnglish} = useDate(props)
const formData = ref('');

function selectDay(dateData) {
  date.value = dateData;
  formData.value = date.value.format(props.format)
}

</script>

<template>
  <input type="text" v-model="formData" @focus="show" class="mt-1 block w-50 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border-gray">
  <div>
    {{ formData }}
  </div>
  <div v-if="visible" class="flex flex-wrap" style="max-width: 400px; margin-top: 10px;">
    <div class="day-box" v-for="(date, i) in days" :key="i">
      <div class="cursor-pointer" @click="selectDay(date)">{{ formatEnglish ? date.day :  convertToNepali(date).substr(8, 10)}}</div>
    </div>
  </div>
</template>

<style>
.border-gray {
  border: 1px solid grey;
}

.flex {
  display: flex;
}

.flex-wrap {
  flex-wrap: wrap;
}

.day-box {
  outline: 1px solid red;
  padding: 12px;
  width: 40px;
  background: #eee;
}

.cursor-pointer {
  cursor: pointer
}
</style>