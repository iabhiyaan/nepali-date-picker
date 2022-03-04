<script>
// node_modules
import {computed, ref, toRefs} from "vue";
import NepaliDate from "nepali-date/cjs/NepaliDate";

// helpers
import useDate from "../composables/useDate";
// import useNavigation from "../composables/useNavigation";
import {ENGLISH_WEEK} from "./constants";

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
  setup(props, context) {
    const {emit} = context

    const dateValue = computed({
      get: () => props.modelValue,
      set: (val) => emit('update:modelValue', val)
    })

    const {date, setMonthAndYear, yearValue, monthValue, visible, show, hide} = useDate(props)

    function select(dateData) {
      date.value = dateData;
      dateValue.value = date.value.format(props.format);
      hide();
    }

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
      /* useDate Starts */
      ...useDate(props),
      ...toRefs(date),
      ...toRefs(yearValue),
      ...toRefs(monthValue),
      /* useDate Ends */
      select,
      getNepaliDateWithYear,
      convertToNepali,
      today,
      visible,
      show,
      hide,
      numberOfYears,
      startingYear,
      startMonthValue,
      startWeek,
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
          <span>{{ formattedYearOrMonth }} </span>
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
