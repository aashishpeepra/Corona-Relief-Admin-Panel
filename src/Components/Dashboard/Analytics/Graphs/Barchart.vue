<script>
import { Bar,mixins } from "vue-chartjs";


export default {
  // props:{
  //     chartData:{
  //         type:Array,
  //     },
  //     chartLabels:{
  //         type:Array
  //     }
  // },
  props:{
      chartData:{
          type:Object
      }
  },
  
  data:function(){
    return {
      
      options: {
        responsive: true,
        maintainAspectRatio: false,
         legend: {
        display: false
    },
    // tooltips: {
    //     callbacks: {
    //        label: function(tooltipItem) {
    //               return tooltipItem.yLabel;
    //        }
    //     }
    // },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                color: "rgba(0, 0, 0, 0)"
              },
            }
          ],
          xAxes:[
              {
                  gridLines: {
                color: "rgba(0, 0, 0, 0)",
            }
              }
          ]
        }
      }
    };
  },
  mounted() {
    this.renderChart(this.chartData3, this.options);
  },
  computed:{
    chartData3:function(newone){
      return this.chartData;
    }
  },
  watch:{
    chartData2(new1,old1){
      this.renderChart(this.chartData,this.options)
    }
  },
  extends: Bar,
  mixins:[mixins.reactiveProp]
};
</script>