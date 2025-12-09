<script setup>
// node_modules
import { ref } from "vue";

// components
import DateRangePicker from "../components/DateRangePicker.vue";

const formData = ref({});
</script>

<template>
  <div style="margin-bottom: 10px">
    <input type="text" v-model="formData.title" placeholder="Meeting title" />
  </div>
  <DateRangePicker
    v-model:from-date="formData.meetingFromDate"
    v-model:to-date="formData.meetingToDate"
  />
  <pre>{{ formData }}</pre>
</template>
