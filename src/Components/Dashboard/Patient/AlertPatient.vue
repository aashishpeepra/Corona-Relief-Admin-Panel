<template>
  <div class="alt">
    <div slot="content">
      <div class="alert alert-primary">
        <div class="row alert-data">
          <div class="col-sm-2 col-md-1">
            <figure>
              <img :src="data.url==undefined?'../../../assets/quarantine.png':data.url" alt="ico for iformation" />
            </figure>
          </div>
          <div class="col-sm-4 col-md-3 my-auto" style="text-align:center">
            <b>{{data.doctor}}</b>
          </div>
          
          <div class="col-sm-3 col-md-4 my-auto">
            <div class="progress" style="height: 5px;">
      <div
        :class="`progress-bar bg-info`"
        role="progressbar"
        :style="`width: ${data.beds.substring(0,2)}%`"
        :aria-valuenow="`${data.beds.substring(0,2)}`"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
          </div>
          <div class="col-sm-2 col-md-2 my-auto">
            <p>{{data.status}}</p>
          </div>
          <div class="col-sm-2 col-md-2 my-auto">
            <button
              class="btn btn-primary btn-sm"
              @click="open= !open"
            >{{open?"Close Tab":"Load More"}}</button>
          </div>
        </div>
        <div v-if="open" class="row alert-data" style="margin-top:10px">
          <div class="col-sm-3 col-md-3 my-auto">
            <p>{{data.city}}</p>
          </div>
          <div class="col-sm-4 col-md-3">
            <button class="btn btn-primary"><a :href="`tel:${data.phone}`">{{data.phone}}</a></button>
          </div>
          <div class="col-sm-4 col-md-3">
            <router-link to="/dashboard/mo" tag="button" class="btn btn-primary"><a>View MO</a></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false
    };
  },
  props:{
    data:{
      type:Object
    }
  },
  methods:{
    close(){
      // setTimeout(()=>this.open=false,3000);
    }
  }
};
</script>

<style scoped>
a{
  color:#fff
}
.alt {
  font-size: 70%;
}

.alert-data figure {
  height: 100px;
  width: 100px;
  margin: 5px 0;
}
.alert-data figure img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
  /* box-shadow: 6px 6px 10px #012341; */
  /* border:1px solid #aaa; */
}
.alert-data p {
  font-size: 110%;
  margin: 2px 0;
}
</style>