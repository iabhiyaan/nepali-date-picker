// node_modules
import {computed, ref} from "vue";
import NepaliDate from "nepali-date/cjs/NepaliDate";

// helpers
import {
    YEAR_DATES,
    ENGLISH_WEEK,
    NEPALI_WEEK,
    NEPALI_MONTH,
    ENGLISH_NEPALI_MONTH,
} from "../components/constants";

export default function useDate(props) {
    const date = ref(props.modelValue === '' ? new NepaliDate() : new NepaliDate(props.modelValue))
    const formatNepali = ref(props.calenderType === "Nepali");
    const formatEnglish = ref(props.calenderType === "English");

    const endDay = ref(null)

    const formattedYear = computed(() => formatNepali.value ? date.value.format("yyyy") : date.value.format("YYYY"));

    const defaultDateFormat = ref("dddd, dd mmmm")
    const defaultEnglishDateFormat = ref("DDDD, DD MMMM")
    const formattedDate = computed(() => formatNepali.value ? date.value.format(defaultDateFormat.value) : date.value.format(defaultEnglishDateFormat.value))

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

    function selectDate(dateData) {
        date.value = dateData;
        hide();
        return date.value.format(props.format);
    }

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

    function getToday() {
        date.value = new NepaliDate();
        setMonthAndYear(date.value.getMonth(), date.value.getYear());
        hide();
        return new NepaliDate().format(props.format);
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

    function convertToNepali(date) {
        return new NepaliDate(date).format("yyyy-mm-d");
    }

    function getNepaliDays(date) {
        return convertToNepali(date).substr(8, 10)
    }


    // feature next-prev
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

    // feature years
    const startingYear = ref(2001)

    const numberOfYears = ref(87)

    function getNepaliDateWithYear(year) {
        return new NepaliDate(year, 0, 1).format("yyyy-mm-d");
    }

    function getNepaliYears(year) {
        return getNepaliDateWithYear(year).substr(0, 4)
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
        // states
        date,
        formatNepali,
        formatEnglish,
        endDay,
        formattedYear,
        defaultDateFormat,
        defaultEnglishDateFormat,
        getToday,
        selectDate,
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
        convertToNepali,
        getNepaliDays,
        // feature next-prev
        prev,
        next,
        //    others
        NepaliDate,
        // feature years
        numberOfYears,
        getNepaliDateWithYear,
        getNepaliYears,
        startingYear,
        // feature week
        startMonthValue,
        startWeek
    }

}