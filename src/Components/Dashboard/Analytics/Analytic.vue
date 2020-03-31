<template>
  <div>
    <!-- <h1 @click="filterForLine()">Analytics</h1> -->
    <!-- <keep-alive> -->
    <div v-if="loading1">
      <gov-holder>
        <div slot="heading">
          <h2>Total Cases</h2>
        </div>
        <gov-show
          :type="'barChart'"
          :currentProps="filterForBar()"
          style="height:400px;width:1000px;position:relative"
        ></gov-show>
      </gov-holder>
      <gov-holder>
        <div slot="heading">
          <h2>Timeline</h2>
        </div>
        <gov-show
          :type="'lineChart'"
          :currentProps="filterForLine()"
          style="height:400px;width:1000px"
        ></gov-show>
      </gov-holder>
    </div>
    <div v-else>
      <gov-holder>
        <div class="heading">
          <h1>Fetching the latest data...</h1>
        </div>
      </gov-holder>
    </div>
    <div v-if="loading2">
      <gov-holder>
        <div slot="heading">
          <h2>City Wise Cases</h2>
        </div>
        <div class="row">
          <div class="col-sm-2 col-md-3 cityname">
            <input
              type="text"
              v-model="city"
              @keypress.enter="city=city"
              placeholder="Choose State"
            />
            <div style="height:300px;overflow:auto">
              <ul class="list-group">
                <li
                  :class="city!=each?'list-group-item':'list-group-item active'"
                  v-for="each in names"
                  :key="each"
                  @click="()=>{
                      city=each}"
                >{{each}}</li>
              </ul>
            </div>
          </div>
          <div class="col-sm-10 col-md-9">
            <gov-show
              :type="'barChart'"
              :currentProps="returnValue"
              style="height:400px;width:800px;position:relative"
            ></gov-show>
          </div>
        </div>
      </gov-holder>
    </div>
    <div v-else>
      <gov-holder>
        <div class="heading">
          <h1>Fetching the latest data...</h1>
        </div>
      </gov-holder>
    </div>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
import Show from "./Graphs/Show";
import { mapGetters } from "vuex";
import Holder from "../../UI/Tiles/Holder";
export default {
  methods: {
    ...mapGetters(["getCovidInfo"]),
    convertHex(num) {
      if (num <= 9) return num + "0";
      else if (num < 16) return ["a", "b", "c", "d", "e", "f"][num - 10] + "0";
      else {
        return "f" + this.convertHex(num - 16).substring(0, 1);
      }
    },
    filterForBar() {
      let complete = this.filterForLine();
      let data = complete["datasets"];
      let result = [];
      for (let i = 0; i < data.length; i++) {
        result.push({
          label: data[i]["label"],
          backgroundColor: "#" + this.convertHex(i) + "0000",
          data: [data[i]["data"].length]
        });
      }
      return { labels: ["states"], datasets: result };
    },
    filterForDistrict(name) {
      let data = this.$store.getters.getDistrict[name]["districtData"];
      let keys = Object.keys(data);
      let dataSet = [];
      let result = [];
      for (let j = 0; j < keys.length; j++) {
        dataSet.push(data[keys[j]]["confirmed"]);
      }
      for (let i = 0; i < keys.length; i++) {
        result.push({
          label: keys[i],
          backgroundColor: "#" + this.convertHex(i) + "0000",
          data: [dataSet[i]]
        });
      }
      return { labels: ["states"], datasets: result };
    },
    filterForLine() {
      let data = this.$store.getters.getCovidInfo;
      let result = [];
      let k = 0;
      let counter = [];
      for (let i = 0; i < data.length; i++) {
        let check = false;
        for (let j = 0; j < result.length; j++) {
          if (result[j]["label"] == data[i]["State/UnionTerritory"]) {
            let current = data[i]["Date"];
            let date = parseInt(current.substring(0, 2));
            let month = parseInt(current.substring(3, 5)) - 1;
            let year = parseInt("20" + current.substring(6, 8));
            let temp = new Date(year, month, date);
            counter[j].value++;
            let d2 = new Date();
            if (temp != "Invalid Date" && d2 >= temp) {
              result[j]["data"].push({ x: temp, y: counter[j].value });
            }
            check = true;
          }
        }
        if (!check) {
          counter.push({ label: data[i]["State/UnionTerritory"], value: 0 });
          result.push({
            label: data[i]["State/UnionTerritory"],
            data: [
              {
                x: new Date(data[i]["Date"]),
                y: 0
              }
            ],
            backgroundColor: "#fff",
            borderColor: "#f" + i + ""
          });
        }
      }
      result[0]["data"].splice(0, 1);
      return { labels: ["states"], datasets: result };
    }
  },
  components: {
    govShow: Show,
    govHolder: Holder
  },
  beforeMount: function() {
    this.$store.dispatch("loadCovidInfo");
    this.$store.dispatch("loadDistrict");
  },
  computed: {
    loading1: function() {
      return this.$store.state.barloaded;
    },
    loading2: function() {
      return this.$store.state.districtLoaded;
    },
    names: function() {
      let value = Object.keys(this.$store.state.districtData);
      if (value.length == 0) return [];
      // return value.filter(each=>each.toLowerCase().match(this.city.toLowerCase()));
      return value;
    },
    dataToPass: function() {
      this.returnValue = this.filterForDistrict(this.city);

      // this.$forceUpdate();
      // return this.filterForDistrict(this.city)
    }
  },
  data: function() {
    return {
      city: "",
      returnValue: {}
    };
  },
  watch: {
    city() {
      this.returnValue = this.filterForDistrict(this.city);
    }
  }
};
</script>

<style scoped>
.cityname input {
  margin-top: 10px;
  background-color: inherit;
  border: 0px;
  border-bottom: 2px solid #0082c8;
  font-size: 70%;
  width: 12vw;
  margin-bottom: 20px;
  transition: all ease-in-out 0.5s;
}
.cityname input:focus {
  outline: none;
  border-bottom: 2px solid #004b73;

  width: 16vw;
}
.cityname li {
  font-size: 60%;
}
.cityname li:hover {
  background-color: #0082c8;
  color: #fff;
  cursor: pointer;
}
</style>