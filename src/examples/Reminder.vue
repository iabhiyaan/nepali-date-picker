<script setup>
// node_modules
import {ref} from 'vue'

// components
import DateRangePicker from "../components/DateRangePicker";

const formData = ref({});

</script>

<template>
  <div style="margin-bottom: 10px;">
    <input type="text" v-model="formData.title" placeholder="title">
  </div>
  <DateRangePicker v-model:from-date="formData.reminderFromDate" v-model:to-date="formData.reminderToDate"/>
  <pre>{{ formData }}</pre>
</template>