<script>
import { Line, mixins  } from "vue-chartjs";


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
        scales: {
          yAxes: [
            {
                stacked:true,
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                color: "rgba(0, 0, 0, 0)"
              }
            }
          ],
          xAxes:[
              {
                  type: 'time',
                  distribution:"series",
                time: {
                    unit: 'day'
                },
                ticks: {
                beginAtZero: true
              },
              gridLines: {
                color: "rgba(0, 0, 0, 0)"
              }
            }
              
          ]
        }
      }
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
  extends: Line
};
</script>