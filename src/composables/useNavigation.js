//node_modules
import NepaliDate from "nepali-date/cjs/NepaliDate";

// helpers
export default function useNavigation({date, setMonthAndYear}) {
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

    return {
        // methods
        prev,
        next,
    }
}