<script type="module" setup>
// node_modules
import { defineProps, ref } from "vue";
// helpers
import useDate from "@/composables/useDate";

const props = defineProps({
  calenderType: { type: String, default: "Nepali" },
  format: {
    type: String,
    default(rawProps) {
      if (rawProps.calenderType === "English") {
        return "YYYY-MM-DD";
      }
      return "yyyy-mm-dd";
    },
  },
  yearSelect: { type: Boolean, default: true },
  monthSelect: { type: Boolean, default: true },
  classValue: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  modelValue: { type: String, default: "" },
});

const {
  weekdays,
  days,
  visible,
  show,
  getNepaliDays,
  getToday,
  selectDate,
  formatEnglish,
  formattedYear,
  formattedDate,
  formattedYearOrMonth,
  formattedTodayText,
  monthSelectChange,
  monthValue,
  getMonthsList,
  prev,
  next,
  yearSelectChange,
  yearValue,
  getNepaliYears,
  numberOfYears,
  startingYear,
} = useDate(props);
const formData = ref("");

function selectDay(dayData) {
  formData.value = selectDate(dayData);
}

function today() {
  formData.value = getToday();
}
</script>

<template>
  <input
    type="text"
    v-model="formData"
    @focus="show"
    class="mt-1 block w-50 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border-gray"
  />
  <div>
    {{ formData }}
  </div>
  <div v-if="visible" style="max-width: 400px; margin-top: 10px">
    <div class="calendar__header" style="border: 1px solid blue">
      <div class="calendar__year">{{ formattedYear }}</div>
      <div class="calendar__date">{{ formattedDate }}</div>
    </div>
    <div class="calendar__body" style="padding: 20px 0; border: 1px solid blue">
      <div class="calendar__month">
        <button class="calendar__month__prev" @click="prev">
          <b> Prev </b>
        </button>
        <span>{{ formattedYearOrMonth }} </span>
        <select
          @change="monthSelectChange"
          v-model="monthValue"
          v-if="monthSelect"
        >
          <option
            style="text-align-last: center"
            v-for="(month, index) in getMonthsList"
            :key="month"
            :label="month"
            :value="index"
          ></option>
        </select>
        <select
          @change="yearSelectChange"
          v-model="yearValue"
          size="mini"
          v-if="yearSelect"
          style="margin-left: 5px"
        >
          <option
            style="text-align-last: center"
            v-for="i in numberOfYears"
            :key="i"
            :value="startingYear + (i - 1)"
            :label="
              formatEnglish
                ? startingYear + (i - 1)
                : getNepaliYears(startingYear + (i - 1))
            "
          ></option>
        </select>

        <button icon="el-icon-arrow-right" @click="next">
          <b> Next-> </b>
        </button>
      </div>
    </div>
    <div class="calendar__weeks grid-calendar" style="border: 1px solid blue">
      <div
        style="font-weight: bold"
        class="calendar__weekday"
        v-for="(weekday, w) in weekdays"
        :key="w"
      >
        {{ weekday }}
      </div>
    </div>

    <div class="grid-calendar">
      <div class="day-box" v-for="(day, i) in days" :key="i">
        <div class="cursor-pointer" @click="selectDay(day)">
          {{ formatEnglish ? day.day : getNepaliDays(day) }}
        </div>
      </div>
    </div>
    <div class="calendar__footer">
      <button @click="today">{{ formattedTodayText }}</button>
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
  outline: 1px solid darkblue;
  padding: 12px;
  width: 40px;
  background: #eee;
}

.cursor-pointer {
  cursor: pointer;
}

.grid-calendar {
  display: grid;
  grid-template-columns: repeat(7, 40px);
}
</style>
