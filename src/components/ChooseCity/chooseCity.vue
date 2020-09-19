<template>
  <div id="example">
    <select v-model="prov">
      <option v-for="(option,index) in arr" :value="option.name" :key="index">{{ option.name }}</option>
    </select>
    <select v-model="city">
      <option v-for="(option,index) in cityArr" :value="option.name" :key="index">{{ option.name }}</option>
    </select>
    <select v-model="district" v-if="district">
      <option
        v-for="(option,index)  in districtArr"
        :value="option.name"
        :key="index"
      >{{ option.name }}</option>
    </select>
  </div>
</template>


<script>
import { arrAll } from "./cityDatas";

export default {
  name: "chooseCity",

  data() {
    return {
      arr: arrAll,
      prov: "北京",
      city: "北京",
      district: "东城区",
      cityArr: [],
      districtArr: []
    };
  },
  mounted() {
    this.setdefault();
  },
  methods: {
    updateCity: function() {
      for (var i in this.arr) {
        var obj = this.arr[i];
        if (obj.name == this.prov) {
          this.cityArr = obj.sub;
          break;
        }
      }
      this.city = this.cityArr[1].name;
    },
    updateDistrict: function() {
      for (var i in this.cityArr) {
        var obj = this.cityArr[i];
        if (obj.name == this.city) {
          this.districtArr = obj.sub;
          break;
        }
      }
      if (
        this.districtArr &&
        this.districtArr.length > 0 &&
        this.districtArr[1].name
      ) {
        this.district = this.districtArr[1].name;
      } else {
        this.district = "";
      }
    },
    setdefault: function(prov, city, dist) {
      this.prov = prov;
      this.city = city;
      this.district = dist;
    },
    setstatic_dist: function() {}
  },
  beforeMount: function() {
    this.updateCity();
    this.updateDistrict();
  },
  watch: {
    prov: function() {
      this.updateCity();
      // this.updateDistrict();
    },
    city: function() {
      this.updateDistrict();
    }
  }
};
</script>

<style >
.chooseCity {
  width: 100%;
  height: 40px;
  
}
</style>
