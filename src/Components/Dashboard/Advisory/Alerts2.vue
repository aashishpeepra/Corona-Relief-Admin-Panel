<template>
     <div class="alt">
                
            <div slot="content">
                <div class="alert alert-info">
                    <div class="row alert-data" >
                        <div class="col-sm-2 col-md-2">
                            <figure>
                                <img :src="`${data.url==undefined?'../../../assets/info.png':data.url}`" alt="ico for iformation"/>
                            </figure>
                        </div>
                        <div class="col-sm-6 col-md-6 my-auto">
                            <p>
                                {{data.title}}
                            </p>
                        </div>
                        <div class="col-sm-2 col-md-2 my-auto">
                            <p>
                                {{data.time}}
                            </p>
                        </div>
                        <div class="col-sm-2 col-md-2 my-auto">
                            <button class="btn btn-primary btn-sm" @click="open= !open">
                                {{open?"Close Tab":"Load More"}}
                            </button>
                        </div>
                    </div> 
                        <div v-if="open" class="row alert-data" style="margin-top:10px">
                        <div class="col-sm-4 col-md-6 my-auto" style="text-align:left">
                            <p>
                                {{data.content}}
                            </p>
                        </div>
                        <div class="col-sm-4 col-md-2">
                            <button class="btn btn-primary ">
                                View Analytics
                            </button>
                        </div>
                        <div class="col-sm-4 col-md-2">
                            <button class="btn btn-primary " @click="$store.dispatch('deleteData',data.id)">
                                Remove
                            </button>
                        </div>
                        
                    </div>

                    </div>
            </div>
     </div>
</template>

<script>

export default {
    props:{
        data:{
            type:Object
        }
    },
    data(){
        return {
            open:false
        }
    }
}
</script>

<style scoped>
.alt{
    font-size:70%;
}

.alert-data figure{
    height:70px;
    width:70px;
    margin:5px 0;
}
.alert-data figure img{
    height:100%;
    width:100%;
    border-radius: 50%;
}
.alert-data p{
    font-size:110%;
    margin:2px 0;
}
</style>