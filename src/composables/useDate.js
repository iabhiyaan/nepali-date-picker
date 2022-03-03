import {computed, reactive, ref} from "vue";
import NepaliDate from "nepali-date/cjs/NepaliDate";

import {
    YEAR_DATES,
    ENGLISH_WEEK,
    NEPALI_WEEK,
    NEPALI_MONTH,
    ENGLISH_NEPALI_MONTH,
} from "../components/constants";

export const dateStore = reactive({
    dateValue: ''
})

export default function useDate(props) {

    // const dateValue = computed({
    //     get: () => props.modelValue,
    //     set: (val) => {
    //         console.log('===');
    //         console.log(val);
    //         return props.modelValue = val
    //     },
    // })

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

    // feature toggle visibility of picker
    const visible = ref(false);

    function show() {
        visible.value = true;
        setTimeout(() => document.addEventListener("click", hide), 200);
    }

    function hide() {
        visible.value = false;
        document.removeEventListener("click", hide);
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

    return {
        // states
        date,
        formatNepali,
        endDay,
        formattedYear,
        formattedDate,
        formattedTodayText,
        formattedYearOrMonth,
        getMonthsList,
        year,
        days,
        weekdays,
        yearValue,
        monthValue,
        visible,

        //    methods
        monthSelectChange,
        active,
        checkToday,
        setMonthAndYear,
        yearSelectChange,
        show,
        hide,
    }

}