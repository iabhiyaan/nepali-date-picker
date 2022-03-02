<script>
import NepaliDatePicker from '../components/NepaliDatePicker.vue';

export default {
  components: {
    NepaliDatePicker,
  },
  props: {
    fromDate: {},
    toDate: {},
    format: {type: String, default: "yyyy-mm-dd"},
    calenderType: {type: String, default: "Nepali"},
    yearSelect: {type: Boolean, default: true},
    monthSelect: {type: Boolean, default: true},
    classValue: {type: String, default: ""},
    placeholder: {type: String, default: ""},
  },
  setup(props, {emit}) {
    function fromDateFn(val) {
      emit('update:fromDate', val)
    }

    function toDateFn(val) {
      emit('update:toDate', val)
    }

    return {
      fromDateFn,
      toDateFn
    }
  }
};
</script>

<template>
  <div style="display: flex; margin-bottom: 40px;">
    <NepaliDatePicker
        v-bind="{...$attrs, ...$props}"
        classValue="form-control"
        placeholder="From Date"
        :model-value="fromDate"
        @update:modelValue="fromDateFn"
    />
    <NepaliDatePicker
        v-bind="{...$attrs, ...$props}"
        style="margin-left: 30px;"
        placeholder="To Date"
        classValue="form-control"
        :model-value="toDate"
        @update:modelValue="toDateFn"
    />
  </div>
</template>
