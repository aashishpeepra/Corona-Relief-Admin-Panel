<template>
  <div id="chc" @click="filterChc()">
    <div v-if="loading">
      <gov-holder>
        <div slot="heading">
          <h2>Community Centers</h2>
        </div>
        <gov-show
          type="barChart"
          style="height:400px;width:800px;position:relative"
          :currentProps="filterData()"
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
  <div v-if="loading && loading1">
    <div id="CHC">
        <gov-holder>
            <div slot="heading">
                <h2>
                    Primary Centers Assigned
                </h2>
            </div>
            <div class="row">
                <!-- <div class="col-md-3 cityname">
                    <input
              type="text"
              v-model="city"
              @keypress.enter="city=city"
              placeholder="Choose State"
            />
            <div style="height:330px;overflow:auto">
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
                </div> -->
            <div class="col-md-12" style="max-height:400px;overflow:auto">
                <gov-alert v-for="i in filterChc()" :key="i" :data="i"></gov-alert>

            </div>
            </div>
            

        </gov-holder>
    </div>
  </div>
  </div>
</template>


<script>
import Show from "../Analytics/Graphs/Show";
import Holder from "../../UI/Tiles/Holder";
import Alert from './Alerts3';
export default {
    data:function(){
        return {
          city:"Uttar Pradesh"
        }
    },
  components: {
    govShow: Show,
    govAlert:Alert,
    govHolder: Holder
  },
  beforeMount: function() {
    this.$store.dispatch("loadHospital");
    this.$store.dispatch("loadPhc");
  },
  methods:{
      filterData() {
      let dt = this.$store.getters.getHospital;
      let result = [];
      for (let i = 0; i < dt.length; i++) {
        if(dt[i]["State/UT"]!="Uttar Pradesh")
        result.push({
          label: dt[i]["State/UT"],
          backgroundColor:`rgb(${i*7},0,0)`,
          data: [dt[i]["NumCommunityHealthCenters_HMIS"]]
        });
      }
      return  { labels: ["states"], datasets: result };
    },
    filterChc(){
      let dt=this.$store.getters.getPhc;
      let keys=Object.keys(dt);
      let result=[];
      for(let i=0;i<keys.length;i++)
      {
        result.push({
          cid:dt[keys[i]]["chcId"],
          beds:dt[keys[i]]["beds"],
          city:dt[keys[i]]["local"],
          phone:dt[keys[i]]["phone"],
          doctor:dt[keys[i]]["id"],
          type:dt[keys[i]]["choice"]
          })
          if (!("moAllocated" in dt[keys[i]]))
          {
            result[i].moAllocated=["No MO Allocated yet!"];
          }
          else{
            result[i].moAllocated=[...dt[keys[i]]["moAllocated"]];
          }
          if(!("local" in dt[keys[i]]))
          {
            result[i].city="Local Area"
          }
      }
      return result.filter(each=>each["cid"]==this.$store.state.loginDetails.id)
    }
  },
  computed: {
    loading() {
      return this.$store.state.hospitalLoad;
    },
    names(){
        let dt=this.$store.getters.getHospital;
        return dt.map(each=>each["State/UT"]);
    },
    loading1(){
      return this.$store.state.phcload;
    },
    chcData(){
      if(this.$store.state.chchload)
      {
        return this.filterChc.filter(each=>{
          return each.match(this.city.toLowerCase())
        })
      }
      else
      return []
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