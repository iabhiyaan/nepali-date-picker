<script>
import NepaliDatePicker from '../components/NepaliDatePicker.vue';

export default {
  components: {
    NepaliDatePicker,
  },
  props: {
    fromDate: {},
    toDate: {}
  },
  setup(props, { emit }) {
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
        calenderType="Nepali"
        format="yyyy-mm-dd"
        classValue="form-control"
        :model-value="fromDate"
        @update:modelValue="fromDateFn"
    />
    <NepaliDatePicker
        style="margin-left: 30px;"
        calenderType="Nepali"
        format="yyyy-mm-dd"
        classValue="form-control"
        :model-value="toDate"
        @update:modelValue="toDateFn"
    />
  </div>
</template>
