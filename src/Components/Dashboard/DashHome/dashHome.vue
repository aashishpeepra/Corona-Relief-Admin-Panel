<template>
  <div id="dash-intro">
    <gov-holder>
      <div slot="heading">
        <h1>My Account</h1>
      </div>
      <gov-user></gov-user>
    </gov-holder>
    
    <gov-holder >
      <div slot="heading">
        <h2>Updates</h2>
      </div>
      <div id="updated" v-if="loading">
        <gov-tile v-for="i in passUpdates()" :key="i['name']" :data="i"></gov-tile>
      </div>
      <div v-else>
          <h3>Fetching Data...</h3>
      </div>
    </gov-holder>
<gov-holder>
      <div slot="heading">
        <h2>Alerts</h2>
      </div>
      <gov-alert v-for="i in 10" :key="i"></gov-alert>
    </gov-holder>
    <gov-holder>
      <div slot="heading">
        <h2>Health Centers</h2>
      </div>
      <div id="updated" v-if="loading1">
        <gov-tile v-for="i in passHospital()" :btn="true" :key="i['name']" :data="i"></gov-tile>
      </div>
      <div v-else>
          <h3>
              Fetching Data...
          </h3>
      </div>
    </gov-holder>

    <!-- <gov-holder>
      <div slot="heading">
        <h2>Application Information</h2>
      </div>
      <div id="updated">
        <gov-tile v-for="i in 2" :btn="true" :key="i['name']"></gov-tile>
      </div>
    </gov-holder> -->
  </div>
</template>

<script>
import Tile from "../../UI/Tiles/Tiles";
import Alert from "./Alerts";
import Holder from "../../UI/Tiles/Holder";
import User from "./User";
export default {
  data: function() {
    return {
      open: false
    };
  },
  components: {
    govTile: Tile,
    govHolder: Holder,
    govAlert: Alert,
    govUser: User
  },
  beforeMount: function() {
    this.$store.dispatch("loadInitials");
    this.$store.dispatch("loadHospital");
  },
  computed: {
    loading: function() {
      return this.$store.state.initialload;
    },
    loading1:function(){
        return this.$store.state.hospitalLoad;
    }
  },
  methods: {
    transform(num) {
      return String(num).substring(0, 2);
    },
    twoDigit(num_1, num_2) {
        // let num,twonum_1,tw
      for (let num = num_2; num > 1; num--) {
        if (num_1 % num == 0 && num_2 % num == 0) {
          num_1 = num_1 / num;
          num_2 = num_2 / num;
        }
      }
      var ratio = [this.transform(num_1) , this.transform(num_2)];
      return ratio;
    },
    passHospital(){
        let data=this.$store.getters.getHospital[36];
        return [
            {
                name:"Community Centers",
                value:data["NumCommunityHealthCenters_HMIS"],
                red:this.twoDigit(data["NumPublicBeds_HMIS"],data["NumRuralBeds_NHP18"])[1],
                blue:this.twoDigit(data["NumPublicBeds_HMIS"],data["NumRuralBeds_NHP18"])[0],
                link:"dashboard/chc"
            },
            {
                name:"Public Centers",
                value:data["NumPrimaryHealthCenters_HMIS"],
                blue:this.twoDigit(data["NumRuralHospitals_NHP18"],data["NumSubDistrictHospitals_HMIS"])[0],
                red:this.twoDigit(data["NumRuralHospitals_NHP18"],data["NumSubDistrictHospitals_HMIS"])[1],
                link:"dashboard/phc"
            },
            {
                name:"Total Public Facilities",
                value:data["TotalPublicHealthFacilities_HMIS"],
                blue:this.twoDigit(data["NumRuralHospitals_NHP18"],data["NumSubDistrictHospitals_HMIS"])[0],
                red:this.twoDigit(data["NumRuralHospitals_NHP18"],data["NumSubDistrictHospitals_HMIS"])[1],
                link:"dashboard/analytics"
            },
            {
                name:"District Hospitals",
                value:data["NumDistrictHospitals_HMIS"],
                blue:this.twoDigit(data["NumPublicBeds_HMIS"],data["NumRuralBeds_NHP18"])[0],
                red:this.twoDigit(data["NumPublicBeds_HMIS"],data["NumRuralBeds_NHP18"])[1],
                link:"dashboard/analytics"
            }
        ]
    },
    passUpdates() {
      let data = this.$store.getters.getInitial;
      return [
        {
          name: "Active Cases",
          value: data["activeCase"]["totalInfected"],
          blue: this.twoDigit(data["activeCase"]["mildCondition"],data["activeCase"]["critical"])[0],
          red: this.twoDigit(data["activeCase"]["mildCondition"],data["activeCase"]["critical"])[1]
        },
        {
          name: "Closed Cases",
          value: data["closedCase"]["totalSolved"],
          blue: this.twoDigit(data["closedCase"]["recovered"],data["closedCase"]["deaths"])[0],
          red: this.twoDigit(data["closedCase"]["recovered"],data["closedCase"]["deaths"])[1]
        },
        {
          name: "Total Cases",
          value: data["coronaCases"],
          blue: this.twoDigit(data["recovered"],data["deaths"])[0],
          red: this.twoDigit(data["recovered"],data["deaths"])[1]
        },
        {
          name: "Critical Cases",
          value: data["activeCase"]["critical"],
          blue: this.twoDigit(data["activeCase"]["mildCondition"],data["activeCase"]["critical"])[0],
          red: this.twoDigit(data["activeCase"]["mildCondition"],data["activeCase"]["critical"])[1]
        },
        {
          name: "Total Deaths",
          value: data["deaths"],
          blue: this.twoDigit(data["recovered"],data["deaths"])[0],
          red: this.twoDigit(data["recovered"],data["deaths"])[1]
        },
      ];
    }
  }
};
</script>

<style scoped>
#dash-intro {
  padding: 10px 0px;
}
</style>