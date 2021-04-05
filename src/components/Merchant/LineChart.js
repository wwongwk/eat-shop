import { Line } from 'vue-chartjs'
import database from "../../firebase.js";
import firebase from "firebase/app";

export default {
    extends: Line,
    data: function () {
        return {
            datacollection: {
                labels: [],
                datasets: [{
                    data: [],
                    label: "Reservations",
                    borderColor: "#3e95cd",
                    fill: false
                }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: 'Monthly Performance'
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }

            },
            name: "",
            email: "",
            mobile: "",
            reservations: [],
            uid: "",
            phone: "",
            datesMonthYear: [],
            datesFormatted: [],
            reservationAxis: [],
            datesAxis: [],
        }
    },
    methods: {
        fetchReservations() {
            database
                .collection("reservation")
                .get()
                .then((snapshot) => {
                    snapshot.docs.forEach((doc) => {
                        if (doc.data().user_id == this.uid) {
                            var seconds = doc.data().date.seconds;
                            var nanoseconds = doc.data().date.nanoseconds;
                            var date = new Date(seconds * 1000 + nanoseconds / 1000000);
                            this.reservations.push(doc.data());
                            this.datesMonthYear.push([date.getMonth(), date.getFullYear()]);
                            this.datesFormatted.push(date.toLocaleDateString());
                        }
                    });
                    this.generateAxes();
                    this.renderChart(this.datacollection, this.options);
                    console.log('X-axis is ' + this.datacollection.labels)
                    console.log('Y-axis is ' + this.datacollection.datasets[0].data)
                    
                });
            //this.renderChart(this.datacollection, this.options);

        },
        fetchDetails() {
            this.uid = firebase.auth().currentUser.uid;
            this.email = firebase.auth().currentUser.email;
            this.phone = firebase.auth().currentUser.phoneNumber;
        },
        generateAxes() {
            console.log('generateAxes() running')
            //alert('generateAxes() is running and the length of datesMonth is: ' + this.datesMonth.length)
            let obj = {};
            for (let i = 0; i < this.datesMonthYear.length; i++) {
                obj[this.datesMonthYear[i][0]] = (obj[this.datesMonthYear[i][0]] || 0) + 1;
            }
            this.datacollection.datasets[0].data = Object.values(obj);
            var arr = Array.from(new Set(this.datesMonthYear.map(JSON.stringify)), JSON.parse).sort();
            for (let i = 0; i < arr.length; i++) {
                this.datacollection.labels.push('0' + (arr[i][0] + 1).toString() + '/' + arr[i][1].toString().slice(-2));
            }
        },
    },
    watch: {
        data: function() {
          //this._chart.destroy();
          //this.renderChart(this.data, this.options);
          this.renderChart(this.datacollection, this.options);
        }
      },
    mounted() {  
        this.fetchDetails();
        this.fetchReservations();
        //this.renderChart(this.datacollection, this.options);
    },
    created () {
        
    },
}