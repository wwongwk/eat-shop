import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
    extends: Line,
    data: function () {
      return {
          datacollection: {
              labels: [],
              datasets: [{ 
                  data: [],
                  fill: false
              }]
          },
          options: {
              legend: { display: false },
              title: {
                display: true,
                text: ''
              },
              responsive: true,
              maintainAspectRatio: false
          }
      }
    },

    methods: {
        fetchItems: function () {
            //axios.get(`https://data.gov.sg/api/action/datastore_search`)
            axios.get(`https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=10&length=100&type=json`)
            .then(response => {
                response.data.forEach(data => { 
                    this.datacollection.labels.push(data[0])
                    this.datacollection.datasets[0].data.push(data[1])
                })
                this.renderChart(this.datacollection, this.options)
            })
        }
    },

    created () {
    this.fetchItems()
    }
}

