<script setup>
import { ref } from "vue";

import NepaliDatePicker from "./components/NepaliDatePicker.vue";

import Meeting from "./examples/Meeting.vue";
import CustomDatePicker from "./examples/CustomDatePicker.vue";
import useDate from "./composables/useDate";

const englishDate = ref("");
const nepaliDate = ref("");
const englishDate1 = ref("");
const nepaliDate1 = ref("");
const slottedDate = ref("");

const { formattedYear } = useDate({
  modelValue: slottedDate.value,
});
</script>

<template>
  <div id="app">
    <div>
      <h3>Meeting Example:</h3>
      <Meeting />
    </div>
    <div class="mb-10">
      <h3>Custom Date Picker</h3>
      <CustomDatePicker />
    </div>

    <h3>Available Ways</h3>
    <div style="display: flex">
      <div id="nepali-date">
        <label>Nepali DatePicker :</label>
        <NepaliDatePicker v-model="nepaliDate" />
        <div>
          {{ nepaliDate }}
        </div>
      </div>
      <div style="margin-left: 30px" id="english-date">
        <label>English DatePicker :</label>
        <NepaliDatePicker
          calenderType="English"
          classValue="form-control"
          v-model="englishDate"
        />
        <div>
          {{ englishDate }}
        </div>
      </div>
      <div style="margin-left: 30px" id="english-nepali-without-select">
        <label>English DatePicker (without select):</label>
        <NepaliDatePicker
          calenderType="English"
          v-model="englishDate1"
          :monthSelect="false"
          :yearSelect="false"
        />
        <div class="mt-4">{{ englishDate1 }}</div>
      </div>
      <div style="margin-left: 30px" id="nepali-without-select">
        <label>Nepali DatePicker (without select):</label>
        <NepaliDatePicker
          classValue="form-control"
          v-model="nepaliDate1"
          :monthSelect="false"
          :yearSelect="false"
        />
        <div class="mt-4">{{ nepaliDate1 }}</div>
      </div>
    </div>
    <div style="max-width: 200px">
      <label>Nepali date picker with slots</label>
      <NepaliDatePicker v-model="slottedDate" :calenderHeaderStyle="{ backgroundColor: '#b81c1d' }">
        <template #calendar-year>
          <div class="slotted-calender-year">
            Custom Year: {{ formattedYear }}
          </div>
        </template>
        <template #calendar-date="{ formattedDate }">
          <div class="slotted-calender-date">
            formattedDate: {{ formattedDate }}
          </div>
        </template>
      </NepaliDatePicker>
    </div>
  </div>
</template>

<style scoped>
.slotted-calender-year {
  color: #d5d5d5;
}

.slotted-calender-date {
  color: #bcbcbc;
}
</style>
