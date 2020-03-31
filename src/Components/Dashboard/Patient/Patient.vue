<template>
  <div id="patient" style="margin-top:30px">
    <gov-holder>
      <div slot="heading">
        <h2>Patient Database</h2>
      </div>
      <div v-if="loading">
        <gov-alert v-for="each in filterData()" :key="each['id']" :data="each"></gov-alert>
      </div>
      <div v-else>
        <h1>Loading</h1>
      </div>
    </gov-holder>
  </div>
</template>

<script>
import Holder from "../../UI/Tiles/Holder";
import Alert from "./AlertPatient";
export default {
  components: {
    govHolder: Holder,
    govAlert: Alert
  },
  beforeMount: function() {
    this.$store.dispatch("loadUser");
  },
  computed: {
    loading() {
      return this.$store.state.databaseload;
    }
  },
  methods: {
    filterData() {
        let dt=this.$store.getters.getDatabase;
        let keys=Object.keys(dt);
        let result=[];
        for(let i=0;i<keys.length;i++)
        {
            result.push({
            id:dt[keys[i]]["id"],
            beds:String(Math.abs(dt[keys[i]]["dayStarted"]*7)),
            city:dt[keys[i]]["address"],
            phone:dt[keys[i]]["id"],
            doctor:dt[keys[i]]["name"],
            url:dt[keys[i]]["imageurl"]
            })
            if(!("date" in dt[keys[i]]))
            {
                let time=new Date();
                result[i]["status"]=time.getDate()+"/"+(time.getMonth()+1)+"/"+time.getFullYear()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()
            }

        }
      return result
    }
  }
};
</script>

<style scoped>
</style>