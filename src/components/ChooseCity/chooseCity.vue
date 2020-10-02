<template>
  <div id="example">
    <select v-model="prov">
      <option v-for="(option, index) in arr" :value="option.name" :key="index">
        {{ option.name }}
      </option>
    </select>
    <select v-model="city">
      <option
        v-for="(option, index) in cityArr"
        :value="option.name"
        :key="index"
      >
        {{ option.name }}
      </option>
    </select>
    <select v-model="district" v-if="district">
      <option
        v-for="(option, index) in districtArr"
        :value="option.name"
        :key="index"
      >
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script>
import { arrAll } from './cityDatas';

export default {
  name: 'chooseCity',

  data() {
    return {
      arr: arrAll, //引入数据
      prov: '选择省份',
      city: '请选择',
      district: '',
      cityArr: [],
      districtArr: [],
    };
  },

  mounted() {
    this.setdefault();
  },
  methods: {
    updateCity() {
      
      for (let i in this.arr) {
        let obj = this.arr[i];
        if (obj.name == this.prov) {
          this.cityArr = obj.sub;
          break;
        }
      }

      this.city = this.cityArr[0].name;
    },
    updateDistrict() {
      for (let i in this.cityArr) {
        let obj = this.cityArr[i];
        if (obj.name == this.city) {
          this.districtArr = obj.sub;
          break;
        }
      }
      if (this.city != this.cityArr[0].name) {
        this.district = this.districtArr[0].name;
      } else {
        this.district = '';
      }
    },
    setdefault(prov, city, dist) {
      this.prov = prov;
      this.city = city;
      this.district = dist;
    },
  },
  watch: {
    prov() {
      this.updateCity();
    },
    city() {
      this.updateDistrict();
    },
  },
};
</script>

<style>
.chooseCity {
  width: 100%;
  height: 40px;
}
</style>
