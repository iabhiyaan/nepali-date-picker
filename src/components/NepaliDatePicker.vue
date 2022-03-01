<script>
import {computed, ref} from "vue";
import NepaliDate from "nepali-date/cjs/NepaliDate";
import {
  YEAR_DATES,
  ENGLISH_WEEK,
  NEPALI_WEEK,
  NEPALI_MONTH,
  ENGLISH_NEPALI_MONTH,
} from "./constants.js";

export default {
  name: 'NepaliDatePicker',
  props: {
    format: {type: String, default: "YYYY-MM-DD"},
    calenderType: {type: String, default: "English"},
    yearSelect: {type: Boolean, default: true},
    monthSelect: {type: Boolean, default: true},
    classValue: {type: String, default: ""},
    placeholder: {type: String, default: ""},
    modelValue: {type: String, default: ""},
  },
  setup(props, {emit}) {
    const dateValue = computed({
      get: () => props.modelValue,
      set: (val) => emit('update:modelValue', val)
    })

    const numberOfYears = ref(87)
    const startingYear = ref(2001)

    function getNepaliDateWithYear(year) {
      return new NepaliDate(year, 0, 1).format("yyyy-mm-d");
    }

    function convertToNepali(date) {
      return new NepaliDate(date).format("yyyy-mm-d");
    }

    function today() {
      dateValue.value = new NepaliDate().format(props.format);
      date.value = new NepaliDate();
      setMonthAndYear(date.value.getMonth(), date.value.getYear());
      hide();
    }

    // feature toggle visibility of picker
    const visible = ref(false);

    function show() {
      visible.value = true;
      setTimeout(() => document.addEventListener("click", this.hide), 200);
    }

    function hide() {
      visible.value = false;
      document.removeEventListener("click", hide);
    }

    // feature formatted dates
    const date = ref(props.modelValue === '' ? new NepaliDate() : new NepaliDate(props.modelValue))
    const formatNepali = ref(props.calenderType === "Nepali");
    const endDay = ref(null)


    const formattedYear = computed(() => formatNepali.value ? date.value.format("yyyy") : date.value.format("YYYY"));
    const formattedDate = computed(() => formatNepali.value ? date.value.format("dddd, dd mmmm") : date.value.format("DDDD, DD MMMM"))
    const formattedTodayText = computed(() => formatNepali.value ? "आज" : "Today");
    const formattedYearOrMonth = computed(() => {
      if (props.monthSelect === false && props.yearSelect === false) {
        return formatNepali.value
            ? date.value.format("mmmm yyyy")
            : date.value.format("MMMM YYYY");
      }

      if (props.monthSelect === false) {
        return formatNepali.value
            ? date.value.format("mmmm")
            : date.value.format("MMMM");
      }

      if (props.yearSelect === false) {
        return formatNepali.value
            ? date.value.format("yyyy")
            : date.value.format("YYYY");
      }
      return "";
    });
    const getMonthsList = computed(() => formatNepali.value ? NEPALI_MONTH : ENGLISH_NEPALI_MONTH)
    const year = computed(() => date.value.year)

    const days = computed(() => {
      YEAR_DATES.forEach((yearData) => {
        if (yearData.year == date.value.year) {
          yearData.value.forEach((data, index) => {
            // compare monthValue selected to index of yearData value
            if (index == date.value.month) {
              endDay.value = data; // eslint-disable-line
            }
          });
        }
      });
      return Array(endDay.value)
          .fill()
          .map((_, idx) => new NepaliDate(year.value, date.value.month, idx + 1));
    })

    const weekdays = computed(() => formatNepali.value ? NEPALI_WEEK : ENGLISH_WEEK)

    function monthSelectChange() {
      date.value.setMonth(monthValue.value);
    }

    function active(argDate) {
      return date.value.getTime() === argDate.getTime();
    }

    function checkToday(date) {
      let today = new NepaliDate();
      return (
          date.day == today.day &&
          date.year == today.year &&
          date.month == today.month
      );
    }

    function select(date) {
      date.value = date;
      dateValue.value = date.value.format(props.format);
      hide();
    }

    const yearValue = ref(props.modelValue === "" ? new NepaliDate().getYear() : new NepaliDate(props.modelValue).getYear())
    const monthValue = ref(props.modelValue === "" ? new NepaliDate().getMonth() : new NepaliDate(props.modelValue).getMonth())

    function setMonthAndYear(month, year) {
      monthValue.value = month;
      yearValue.value = year;
    }

    function yearSelectChange() {
      date.value.setYear(yearValue.value);
    }

    // feature prev next
    function prev() {
      let _month = date.value.month - 1;
      let _year = date.value.year;
      if (_month < 0) {
        _year--;
        _month = 11;
      }
      setMonthAndYear(_month, _year);
      date.value = new NepaliDate(_year, _month, 1);
    }

    function next() {
      let _month = date.value.month + 1;
      let _year = date.value.year;
      if (_month > 11) {
        _year++;
        _month = 0;
      }
      setMonthAndYear(_month, _year);
      date.value = new NepaliDate(_year, _month, 1);
    }

    // feature week
    const startMonthValue = ref(null)

    const startWeek = computed(() => {
      let currentDateValue = new NepaliDate(yearValue.value, monthValue.value, 1);
      ENGLISH_WEEK.forEach((data, index) => {
        if (currentDateValue.format("DDD") === "Sun") {
          startMonthValue.value = 7; // eslint-disable-line
        } else if (currentDateValue.format("DDD") === data) {
          startMonthValue.value = index; // eslint-disable-line
        }
      });
      return startMonthValue.value;
    })

    return {
      dateValue,
      getNepaliDateWithYear,
      convertToNepali,
      today,
      visible,
      show,
      hide,
      formatNepali,
      formattedYear,
      formattedDate,
      formattedTodayText,
      yearValue,
      monthValue,
      weekdays,
      formattedYearOrMonth,
      getMonthsList,
      prev,
      next,
      monthSelectChange,
      yearSelectChange,
      numberOfYears,
      startingYear,
      startMonthValue,
      startWeek,
      active,
      checkToday,
      endDay,
      year,
      days,
      select
    }
  },
}
</script>

<template>
  <div class="datepicker" @click.stop>
    <input
        type="text"
        v-model="dateValue"
        :class="classValue"
        @focus="show"
        :placeholder="placeholder"
    />
    <div v-if="visible" :class="['calendar', { show: visible }]">
      <div class="calendar__header">
        <div class="calendar__year">{{ formattedYear }}</div>
        <div class="calendar__date">{{ formattedDate }}</div>
      </div>
      <div class="calendar__body">
        <!-- month -->
        <div class="calendar__month">
          <button class="calendar__month__prev" @click="prev">
            <b>></b>
          </button>
          <span>{{ formattedYearOrMonth }}</span>
          <select
              @change="monthSelectChange"
              v-model="monthValue"
              size="mini"
              v-if="monthSelect"
              style=" "
          >
            <option
                style="text-align-last:center"
                v-for="(month, index) in getMonthsList"
                :key="month"
                :label="month"
                :value="index"
            >
              <!-- {{ month }} -->
            </option>
          </select>
          <select
              @change="yearSelectChange"
              v-model="yearValue"
              size="mini"
              v-if="yearSelect"
              style="margin-left:5px"
          >
            <option
                style="text-align-last:center"
                v-for="i in numberOfYears"
                :key="i"
                :value="startingYear + (i - 1)"
                :label="formatNepali ? getNepaliDateWithYear(startingYear + (i - 1)).substr(0, 4) : startingYear + (i - 1)"
            >
            </option>
          </select>
          <button icon="el-icon-arrow-right" @click="next"><b>></b></button>
        </div>

        <!-- week days -->
        <div style="padding:3px">
          <div class="calendar__weeks">
            <div
                style="font-weight: bold;"
                class="calendar__weekday"
                v-for="(weekday, w) in weekdays"
                :key="w"
            >
              {{ weekday }}
            </div>
          </div>
          <!-- days of month -->
          <div class="calendar__days">
            <div
                class="calendar__day_spacer"
                :style="{ gridColumn: `span ${startWeek}` }"
            ></div>
            <div
                :class="[
                'calendar__day',
                { selected: active(day) },
                { today: checkToday(day) },
              ]"
                v-for="(day, d) in days"
                :key="d"
                @click="select(day)"
            >
              {{ formatNepali ? convertToNepali(day).substr(8, 10) : day.day }}
            </div>
          </div>
        </div>
      </div>
      <div class="calendar__footer">
        <button @click="today">{{ formattedTodayText }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  box-sizing: border-box;
  font-family: "Open Sans", sans-serif;
}

.datepicker {
  position: relative;
}

.datepicker button {
  outline: none;
  border: 0;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.calendar {
  z-index: 9;
  position: absolute;
  width: 260px;
  top: 100%;
  box-shadow: 0px 14px 45px rgba(0, 0, 0, 0.25),
  0px 10px 18px rgba(0, 0, 0, 0.22);
  background: #fff;
  visibility: hidden;
  opacity: 0;
  /* transform: translateY(-50%) translateX(50%); */
  /* transition: all 0.3s linear; */
}

.calendar.show {
  visibility: visible;
  opacity: 1;
  /* transform: translateY(0px); */
}

.calendar__header {
  padding: 15px 10px;
  /* border-radius: 10px; */
  background: #5495c5;
  color: #fff;
}

.calendar__year {
  opacity: 0.6;
  font-size: 1rem;
  line-height: 1.2rem;
}

.calendar__date {
  font-size: 1.2rem;
  line-height: 1.5rem;
}

.calendar__month {
  padding: 5px 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.calendar__month select {
  height: 28px;
  width: 100px;
  border-radius: 5px;
  border-color: #7ca3f1;
  text-align-last: center;
}

.calendar__month button {
  width: 25px;
  margin-right: 4px;
  height: 28px;
  margin-left: 4px;
  border-radius: 5px;
  color: white;
  text-align: center;
  background: #247ac4;
}

.calendar__month button:hover {
  background: rebeccapurple;
}

.calendar__month__prev {
  transform: rotate(180deg);
}

.calendar__weeks,
.calendar__days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.calendar__days {
  gap: 4px;
}

.calendar__day,
.calendar__weekday {
  text-align: center;
  font-size: 12px;
}

.calendar__weekday {
  opacity: 0.8;
  font-weight: 300;
}

.calendar__day {
  width: 32px;
  height: 32px;
  line-height: 32px;
  font-weight: 300;
  color: #1c94b8;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  background: #dfeffc;
  /* transition: all 0.3s ease-in-out; */
}

.calendar__day.selected {
  background: rebeccapurple;
  color: #fff;
}

.calendar__day.today {
  background: #f77777;
  color: #fff;
}

.calendar__day:hover {
  background: rebeccapurple;
  color: #fff;
  opacity: 0.8;
}

.calendar__footer {
  text-align: right;
}

.calendar__footer button {
  padding: 8px 10px;
  text-transform: uppercase;
  font-weight: bold;
  color: rebeccapurple;
  opacity: 0.9;
}

.calendar__footer button:hover {
  opacity: 1;
}
</style>
