<template>
    <div id="dashboard" class="w-100">
        <div class="row">
            <div class="col-xs-12 col-sm-1 col-md-2 box left-box">
                <ul id="options">
                    <router-link to="/dashboard" tag="li" active-class="active" exact><a>Dashboard</a></router-link>
                    <router-link to="/dashboard/analytics" tag="li" active-class="active"><a>Analytics</a></router-link>
                    <router-link to="/dashboard/advisory" tag="li" active-class="active"><a>Advisory</a></router-link>
                    <router-link to="/dashboard/patient" tag="li" active-class="active"><a>Patient</a></router-link>                    
                    <router-link v-if="this.$store.state.loginDetails.choice=='chc'" to="/dashboard/phc" tag="li" active-class="active"><a>PHC</a></router-link>
                    <router-link to="/dashboard/mo" tag="li" active-class="active"><a>MO</a></router-link>
                </ul>
            </div>
            <div class="col-xs-0 col-sim-11 col-md-10 box right-box" style="overflow-x:auto">
                <transition
                    appear
                    enter-class=""
                    enter-active-class="animated fadeInLeft"
                    leave-class=""
                    leave-active-class="animated fadeOutUp"
                    mode="out-in"
                >
                <!-- <keep-alive> -->
                 <router-view></router-view>   

                <!-- </keep-alive> -->
                </transition>
                <!-- <h1 class="alert alert-danger">To finish all these things and run to you</h1> -->
            </div>
        </div>
    </div>

</template>

<script>
export default {
    
}
</script>

<style scoped>
#options{
    margin-top:30px;
}

.box{
    height:100vh;
}
.left-box{
    text-align: right;
    /* background-color:#b3b2c0; */
    background-color: inherit;
}
.right-box{
    background-color: #fff;
    /* overflow-y: hidden; */
}
#dashboard{
    height:100vh;
    width:100%;
    margin:0;
    background-color: inherit;
}
/* #dashboard li{
    font-size:80%;
    background-color:#fff;
    border-radius:20px;
    padding:5px 10px;
} */
#dashboard ul{
    text-align: center;
    font-size: 70%;
    list-style: none;
}
#dashboard li{
    margin:20px 10px 20px -15px;
    padding:10px 20px;
    border-radius: 20px;
    /* display: none; */
    transition: all ease-in .5s;
    display: block;
}
#dashboard li:hover{
    background-color:#0077b7;
}
#dashboard a{
    color:#fff;
    text-decoration: none;
}

.active{
    color:#fff;
    display: none
}
</style>