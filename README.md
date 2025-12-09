# nepali-datepicker-vuejs

A sleek, fully customizable Nepali date-picker for **Vue 3**, powered by a composable that lets you integrate its core logic into any UI and create exactly the experience you want.  

> **Note:** Heavily inspired by [v-nepalidatepicker](https://github.com/krijanniroula/v-nepalidatepicker)

---

## Demo

- [Vue 3 Vite Demo](https://stackblitz.com/edit/vitejs-vite-33k3cq32?file=src%2FApp.vue)  
- [Vue 3 Webpack Demo](https://codesandbox.io/p/sandbox/usage-np-date-picker-h26brp)

---

## Quick Start

```bash
npm i np-date-picker-vue-3

```

```vue
<script setup>
import { NepaliDatePicker } from 'np-date-picker-vue-3';
import 'np-date-picker-vue-3/style.css';
</script>
```

## Customizable Properties

| Property       | Type    | Description                    |
| -------------- | ------- | ------------------------------ |
| `classValue`   | String  | Custom CSS class for the input |
| `calenderType` | String  | "Nepali" or "English Nepali"   |
| `placeholder`  | String  | Placeholder text for the input |
| `format`       | String  | Date output format             |
| `yearSelect`   | Boolean | Toggle year dropdown           |
| `monthSelect`  | Boolean | Toggle month dropdown          |


## Examples

1. `classValue`
```vue
<template>
  <NepaliDatePicker classValue="datepicker" />
</template>

<style>
.datepicker {
  width: 50px;
  height: 20px;
}
</style>
```

2. `calenderType`
```vue
<template>
  <NepaliDatePicker calenderType="Nepali" />
</template>
```

3. `placeholder`
   
```vue
<template>
  <NepaliDatePicker placeholder="YYYY-MM-DD" />
</template>
```

4. `format`

Supported formats:
```
'yyyy-mm-dd'       => २०७५-०२-०१
'YYY-MM-DD'        => 075-02-01
'mmmm d, yyyy ddd' => जेष्ठ १, २०७५ मंगल
'MMM D, YYYY DDD'  => Jes 1, 2075 Tue
```

Format tokens:
| Token | Meaning                                            |
| ----- | -------------------------------------------------- |
| YYYY  | 4-digit year (2075)                                |
| yyyy  | 4-digit Nepali year (२०७५)                         |
| YYY   | 3-digit year (075)                                 |
| yyy   | 3-digit Nepali year (०७५)                          |
| YY    | 2-digit year                                       |
| yy    | 2-digit Nepali year                                |
| M     | Month number (1-12)                                |
| m     | Month number in Nepali (१-१२)                      |
| MM    | Month number with 0 padding (01-12)                |
| mm    | Month number in Nepali with 0 padding (०१-१२)      |
| MMM   | Short month name (Bai, Jes, Asa, Shr, etc.)        |
| mmm   | Short month name in Nepali (ब‍ै, जे, अ, श्रा, etc) |
| MMMM  | Full month name (Baisakh, Jestha, Asar, ...)       |
| mmmm  | Full month name Nepali (बैसाख, जेष्ठ, ...)         |
| D     | Day of month (1-31)                                |
| d     | Day of month in Nepali (१-३१)                      |
| DD    | Day of month zero padded (01-31)                   |
| dd    | Day of month zero padded Nepali (०१-३१)            |
| DDD   | Day of week short form (Sun, Mon, Tue, ...)        |
| ddd   | Day of week short Nepali (आइत, सोम, ...)           |
| DDDD  | Day of week full form (Sunday, Monday, ...)        |
| dddd  | Day of week full Nepali (आइतबार, सोमबार, ...)      |

```vue
<template>
  <NepaliDatePicker format="YYYY-MM-DD" />
</template>
```

5. `v-model/modelValue`
   
```vue
<script setup>
import { ref } from 'vue';
const birthDay = ref('2055-02-20');
const modelValue = ref('2055-02-20');
</script>

<template>
  <NepaliDatePicker v-model="birthDay" />
  <br />
  <NepaliDatePicker :modelValue="modelValue" />
</template>
```

6. `yearSelect / monthSelect`

```vue
<template>
  <NepaliDatePicker :yearSelect="false" :monthSelect="false" />
</template>
```

7. `All-in-One Example`

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

8. `Custom Component using Composable`

```vue
<script setup>
import { defineProps, ref } from 'vue';
import { useDate } from 'np-date-picker-vue-3';

const props = defineProps({
  format: { type: String, default: "YYYY-MM-DD" },
  calenderType: { type: String, default: "English" },
  yearSelect: { type: Boolean, default: true },
  monthSelect: { type: Boolean, default: true },
  classValue: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  modelValue: { type: String, default: "" },
})

const { days, date, visible, show } = useDate(props);
const formData = ref('');

function selectDay(dateData) {
  date.value = dateData;
  formData.value = date.value.format(props.format);
}
</script>

<template>
  <input type="text" v-model="formData" @focus="show">
  <div>{{ formData }}</div>
  <div v-if="visible" class="flex flex-wrap" style="max-width: 400px; margin-top: 10px;">
    <div class="day-box" v-for="(date, i) in days" :key="i">
      <div class="cursor-pointer" @click="selectDay(date)">{{ date.day }}</div>
    </div>
  </div>
</template>

<style>
.flex { display: flex; }
.flex-wrap { flex-wrap: wrap; }
.day-box { outline: 1px solid red; padding: 12px; width: 40px; background: #eee; }
.cursor-pointer { cursor: pointer; }
</style>
```

