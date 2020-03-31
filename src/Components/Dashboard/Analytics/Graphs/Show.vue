    // Just pass the correct name and It will work

<template>
<div style="height:40vh;width:80vw;position:relative" @click="show()">
    <component :is="type" :chartData="currentProps">
    </component>
    <!-- <line-chart :chartData="currentProps"></line-chart> -->
</div>
</template>

<script>
import Barchart from './Barchart';
import Linechart from './Linechart';
import { Line } from 'vue-chartjs';
export default {
    methods:{
        show(){
            
        }
    },
    props:{
        type:{
            type:String,
            required:false
        },
        currentProps:{
            type:Object,
            required:false
        }
    },
    data(){
        return {
            downloads:[
                54,56,78,12
            ],
            labels:[
                "hey","bye","try","cry"
            ]
        }
    },
    components:{
        barChart:Barchart,
        lineChart:Linechart
    }
}
</script>

<style scoped>

</style>