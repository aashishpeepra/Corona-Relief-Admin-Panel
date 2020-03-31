<template>
    <div class="row" slot="content">
            <div id="my-account" class="col-sm-6 col-xs-6 col-md-3">
                <div id="profile-picture">
                    <figure >
                        <img src="../../../assets/user.png" alt="Display Profile of the user"/>
                    </figure>
                </div>
            </div>
            <div id="my-account" class="col-sm-6 col-xs-6 col-md-7">
                <div id="email" class="row">
                    <div class="col-sm-2 col-md-3 col-xs-4 t-tile">
                        EMAIL
                    </div>
                    <div class="col-sm-10 col-md-9 col-xs-8 t-cont">
                        {{login["email"]}}
                    </div>
                </div>
                <div id="username" class="row">
                    <div class="col-sm-2 col-md-3 col-xs-4 t-tile">
                     USER
                    </div>
                    <div class="col-sm-10 col-md-9 col-xs-8 t-cont">
                        {{login["id"]}}
                    </div>
                </div>
            </div>
            <div class="col-sm-1 col-xs-3 col-md-2">
                <button class="btn btn-danger" @click="$router.push('/')">
                    Log Out
                </button>
            </div>
        </div>
</template>

<script>
export default {
   computed:{
       login(){
       return this.$store.getters.getLogin;
       }
   }
}
</script>

<style scoped>
.t-tile
{
    color:#aaa;

}
#my-account{
    font-size:70%;
}
#profile-picture{
    height:80px;
    width:80px;
    display:inline-block;
    margin-top:-15px;
}
#profile-picture img{
    height:100%;
    width:100%;
} 
</style>
