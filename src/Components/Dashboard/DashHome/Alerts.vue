<template>
     <div class="alt">
                
            <div slot="content">
                <div class="alert alert-danger">
                    <div class="row alert-data" >
                        <div class="col-sm-4 col-md-2" style="text-align:left">
                            Patient Name
                        </div>
                        <div class="col-sm-4 col-md-4">
                            Kanpur, Uttar Pradesh
                        </div>
                        <div class="col-sm-4 col-md-2">
                            Dr. Dipendra 
                        </div>
                        <div class="col-sm-4 col-md-2">
                            27/03/2020
                        </div>
                        <div class="col sm-4 col-md-2">
                            <button class="btn btn-primary btn-sm" @click="open= !open">
                                {{open?"Close Tab":"Load More"}}
                            </button>
                        </div>
                    </div> 
                        <div v-if="open" class="row alert-data" style="margin-top:10px">
                        <div class="col-sm-4 col-md-6" style="text-align:left">
                            <p>
                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout
                            </p>
                        </div>
                        <div class="col-sm-4 col-md-2">
                            <button class="btn btn-primary ">
                                Contact Patient
                            </button>
                        </div>
                        <div class="col-sm-4 col-md-2">
                            <button class="btn btn-primary ">
                                Contact Doctor
                            </button>
                        </div>
                        
                    </div>

                    </div>
            </div>
     </div>
</template>

<script>
export default {
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
</style>