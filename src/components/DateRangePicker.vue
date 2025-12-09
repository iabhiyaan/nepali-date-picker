<script setup>
import NepaliDatePicker from "../components/NepaliDatePicker.vue";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  fromDate: {},
  toDate: {},
  format: { type: String, default: "yyyy-mm-dd" },
  calenderType: { type: String, default: "Nepali" },
  yearSelect: { type: Boolean, default: true },
  monthSelect: { type: Boolean, default: true },
  classValue: { type: String, default: "" },
  placeholder: { type: String, default: "" },
});

const fromDate = defineModel("fromDate");
const toDate = defineModel("toDate");
</script>

<template>
  <div style="display: flex; margin-bottom: 40px">
    <NepaliDatePicker
      v-model="fromDate"
      v-bind="{ ...$attrs, ...props }"
      classValue="form-control"
      placeholder="From Date"
    />
    <NepaliDatePicker
      v-model="toDate"
      v-bind="{ ...$attrs, ...props }"
      style="margin-left: 30px"
      placeholder="To Date"
      classValue="form-control"
    />
  </div>
</template>
