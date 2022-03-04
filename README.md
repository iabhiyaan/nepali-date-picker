# nepali-datepicker-vuejs

An easy-to-use and customizable nepali date picker component powered by Vue 3

## NOTE: This Component is heavily based on https://github.com/krijanniroula/v-nepalidatepicker

## Quick Start

```
npm i np-date-picker-vue-3
```

``` javascript
import { NepaliDatePicker } from 'np-date-picker-vue-3'

export default {
  components: {
    NepaliDatePicker,
  },
  // rest of the component
}

## Customizable Properties

The following customizable properties can be added to the component

1. classValue
2. calenderType
3. placeholder
4. format
5. yearSelect
6. monthSelect

## Examples - classValue

This works exactly as class properties. Eg: classValue="form-control" (boostrap class)
(Note : In class="form-control", input will be rendered inside another input.)

```vue
<template>
  <NepaliDatePicker classValue="datepicker" />
</template>
<style>
.datepicker{
  width: 50px;
  height: 20px;
}
</style>
```

## Examples - calenderType

Date picker is present in nepali language and English nepali language. Default type will be English nepali.

For nepali language :

```vue

<template>
  <NepaliDatePicker calenderType="Nepali"/>
</template>

```

## Examples - placeholder

```vue

<template>
  <NepaliDatePicker placeholder="YYYY-MM-DD"/>
</template>

```

## Examples - format

Format the date to provide various output based on format string

```vue

'yyyy-mm-dd' => २०७५-०२-०१
'YYY-MM-DD' => 075-02-01
'mmmm d, yyyy ddd' => जेष्ठ १, २०७५ मंगल
'MMM D, YYYY DDD' => Jes 1, 2075 Tue

```

```vue

YYYY - 4 digit of year (2075)
yyyy - 4 digit of year in nepali unicode (२०७५)
YYY  - 3 digit of year (075)
yyy  - 3 digit of year (०७५)
YY   - 2 digit of year
yy   - 2 digit of year in nepali unicode (७५)
M    - month number (1 - 12)
m    - month number (१ - १२) in nepali unicode
MM   - month number with 0 padding (01 - 12)
mm   - month number in nepali unicode with 0 padding - (०१-१२)
MMM  - short month name (Bai, Jes, Asa, Shr, etc.)
mmm  - short month name in nepali unicde (ब‍ै, जे, अ, श्रा, etc)
MMMM - full month name (Baisakh, Jestha, Asar, ...)
mmmm - full month name nepali (बैसाख, जेष्ठ, ...)
D    - Day of Month (1, 2, ... 31, 32)
d    - Day of Month in Nepali unicode (१, २, ३ ... ३१, ३२)
DD   - Day of Month with zero padding (01, 02, ...)
dd   - Day of Month with zero padding in Nepali unicode (०१, ०२, ...)
DDD  - Day of Week short form (Sun, Mon, Tue, ...)
ddd  - Day of week in short form nepali (आइत, सोम, ...)
DDDD - Day of week full form (Sunday, Monday, Tuesday, ...)
dddd - Day of week full form nepali (आइतबार, सोमबार, ...)

```

```vue

<template>
  <NepaliDatePicker format="YYYY-MM-DD"/>
</template>

```

## Examples - value

Initial value for the datepicker.

```vue

<script setup>
import {ref} from 'vue'

const birthDay = ref('2055-02-20')
</script>

<template>
  <NepaliDatePicker :modelValue="birthDay"/>
</template>

```

## Examples - yearSelect

The dropdown year select can be turned off using boolean type to yearSelect

```vue

<template>
  <NepaliDatePicker :yearSelect="false"/>
</template>

```

## Examples - monthSelect

The dropdown month select can be turned off using boolean type to monthSelect

```vue

<template>
  <NepaliDatePicker :monthSelect="false"/>
</template>

```

## Examples - All in one

```vue

<template>
  <NepaliDatePicker
      calenderType="Nepali"
      placeholder="YYYY-MM-DD"
      format="YYYY-MM-DD"
      value="2055-02-20"
      :yearSelect="false"
      :monthSelect="false"
  />
</template>

```

## Examples - Custom Component

```vue

<script setup>
import {defineProps, ref} from 'vue'
import {useDate} from "np-date-picker-vue-3";

const props = defineProps({
  format: {type: String, default: "YYYY-MM-DD"},
  calenderType: {type: String, default: "English"},
  yearSelect: {type: Boolean, default: true},
  monthSelect: {type: Boolean, default: true},
  classValue: {type: String, default: ""},
  placeholder: {type: String, default: ""},
  modelValue: {type: String, default: ""},
})

const {days, date, visible, show} = useDate(props)

const formData = ref('');

function selectDay(dateData) {
  date.value = dateData;
  formData.value = date.value.format(props.format)
}

</script>

<template>
  <input type="text" v-model="formData" @focus="show">
  <div>
    {{ formData }}
  </div>
  <div v-if="visible" class="flex flex-wrap" style="max-width: 400px; margin-top: 10px;">
    <div class="day-box" v-for="(date, i) in days" :key="i">
      <div class="cursor-pointer" @click="selectDay(date)">{{ date.day }}</div>
    </div>
  </div>
</template>

<style>
.flex {
  display: flex;
}

.flex-wrap {
  flex-wrap: wrap;
}

.day-box {
  outline: 1px solid red;
  padding: 12px;
  width: 24px;
  background: #eee;
}

.cursor-pointer {
  cursor: pointer
}
</style>

```
