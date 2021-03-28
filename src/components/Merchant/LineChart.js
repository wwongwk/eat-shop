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
                maintainAspectRatio: false
            },
            name: "",
            email: "",
            mobile: "",
            reservations: [],
            uid: "",
            phone: "",
            datesMonth: [],
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
                            this.reservations.push(doc.data());
                        }
                    });
                });
        },
        fetchDetails() {
            this.uid = firebase.auth().currentUser.uid;
            this.email = firebase.auth().currentUser.email;
            this.phone = firebase.auth().currentUser.phoneNumber;
        },
        generateAxes() {
            let obj = {}
            for (let i = 0; i < this.datesMonth.length; i++) {
                obj[this.datesMonth[i]] = (obj[this.datesMonth[i]] || 0) + 1;
            }
            this.datacollection.datasets.data = Object.values(obj)
            this.datacollection.labels = Array.from(new Set(this.datesMonth)).sort();
        }
    },
    mounted() {
        this.fetchDetails();
        this.fetchReservations();
        
        this.renderChart(this.datacollection, this.options)
    },
}