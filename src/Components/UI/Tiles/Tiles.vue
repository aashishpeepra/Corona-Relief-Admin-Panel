<template>
  <!-- <div :id="id" style="text-align:left;margin-left:3%;"> -->
  <div class="title">
    <span>{{data.value}}</span>
    <h3>{{data.name}}</h3>
    <div class="details">
         <!-- <p class="lead">Active</p> -->
    <div class="progress" style="height: 5px;">
      <div
        class="progress-bar"
        role="progressbar"
        :style="`width: ${data.blue}%;`"
        :aria-valuenow="`${data.blue}`"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
    </div>
   <div class="details">
       <!-- <p class="lead" >Danger</p> -->
    <div class="progress" style="height: 5px;">
      <div
        class="progress-bar bg-danger"
        role="progressbar"
        :style="`width: ${data.red}%;`"
        :aria-valuenow="`${data.red}`"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
   </div>
    
    <router-link :to="data['link']" tag="button"  v-if="btn" class="btn btn-primary" style="margin:15px 20px 0px 20px;">
      View
      </router-link>
  </div>
  <!-- </div>     -->
</template>

<script>
export default {
  props: {
    btn: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    data:{
      type:Object
    }
  }
};
</script>

<style scoped>
.details{
    margin-top:10px;
    color:#aaa;
}
.details p{
    display:none;
    font-size:80%;
}
.title {
  /* box-shadow: 5px 5px 10px #ccc; */
  border: 1px solid #ddd;
  display: inline-block;
  margin: 20px 20px;
  width: auto;
  max-width: 300px;
  padding: 20px 20px;
  border-radius: 20px;
  text-align: center;
  font-size: 80%;
  cursor: pointer;
}
.title:hover {
  box-shadow: 5px 5px 10px #ddd;
}
.title span {
  color: #111;
  font-family: "Anton", sans-serif;
  letter-spacing: 2px;
  font-size:140%;
}
h3 {
  font-size: 100%;
}
</style>