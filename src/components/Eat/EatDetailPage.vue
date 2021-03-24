<template>
    <div>
        <Header></Header>
        <h1> EAT </h1>
        <div id="carousel">
            <div class="slide">
                <img src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_450,h_300/https://danielfooddiary.com/wp-content/uploads/2020/02/sumdimsum5.jpg" 
                width="600px" height="400px">
            </div>
            <div class="slide">
                <img src="https://danielfooddiary.com/wp-content/uploads/2020/02/sumdumsum-.jpg"
                width="600px" height="400px">
            </div>
            <div class="slide">
                <img src="https://media.timeout.com/images/103708796/image.jpg" 
                width="600px" height="400px">
            </div>
            <div class="slide">
                <img src="https://danielfooddiary.com/wp-content/uploads/2020/02/sumdimsum1.jpg"
                width="600px" height="400px">
            </div>
        </div>

        <br>
        <div class="btn-group">
            <button v-on:click="toggleAbout()" >About</button>
            <button v-on:click="toggleReview()">Reviews</button>
            <button v-on:click="toggleReservation()">Reservation</button>
        </div>

        <div id="body" v-show="About">
            <h2>{{shopName}}</h2>
            <b>Brand Story</b>

            <p id="para">
                {{description}}
                <br><br><br>
                Tel +65 {{telephone}}
            </p> <br><br>

            <b>Address</b> <br>
            <span id="openHours">  Opening Hours: </span> <span>{{openHours}}</span>
            <p>{{address}}</p>

            <div class="map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7796589646164!2d103.85417521472402!3d1.307396999046444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19b25f661e0b%3A0xae1f2871fd73a0f9!2sSum%20Dim%20Sum!5e0!3m2!1sen!2ssg!4v1616478759623!5m2!1sen!2ssg" 
                width="800" height="500" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </div>

        <div id="body" v-show="Review">
            <p> Add review stuff here </p>
    
        </div>

        <div id="body" v-show="Reservation">
            <p> Add reservation stuff here </p>

        </div>

    </div>
</template>

<script>
import Header from '../Header.vue'
export default {
    components: {
        Header:Header,
    },
    data() {
        return {
            About: true,
            Review: false,
            Reservation: false,
            shopName: "Sum Dim Sum",
            description:"Housed below a timeless shophouse, the restaurant’s Tiffany blue colour was striking," + 
                        "and customers can easily spot its storefront from afar. Sum Dim Sum serves up delicious dim sum " +
                        "in a beautiful atmosphere. Its menu is extensive with steamed, pan-fried, deep-fried, baked items," +
                        "noodles, porridge, rice and desserts.",
            telephone:"9005 9381",
            openHours:"11.30am - 12am (Mon - Sun)",
            address:"161 Jalan Besar Singapore 208876",

        }
    },
    methods: {
        toggleAbout: function() {
            //window.history.scrollRestoration = "manual"
            this.About = true;
            this.Review = false;
            this.Reservation = false;
        },
        toggleReview: function() {
            //window.history.scrollRestoration = "manual"
            this.About = false;
            this.Review = true;
            this.Reservation = false;
        },
        toggleReservation: function() {
            //window.history.scrollRestoration = "manual"
            this.About = false;
            this.Review = false;
            this.Reservation = true;
        },
    },

}
</script>

<style scoped>
    h1 {
        background-color:#d163b9 ;
        color: aliceblue;
        text-align: center;
        margin-top: 5px;
        margin-bottom: 5px;
        height: 69px;
        width: 100%;
        font-size: 55px;    
    }

    img {
        margin-left: 2px;
    }

    #carousel {
        width: 100%;
        height: 400px;
        overflow: scroll;
        white-space:nowrap;
        align-content: center;
    }

    #carousel .slide {
        display: inline-block;
    }

    ::-webkit-scrollbar {
        display: none;
    }

    #body {
        text-align: justify;
        text-size-adjust: 90%;
        margin-right: 20%;
        margin-left: 15px;
    }

    #openHours {
        background-color: aquamarine;
        border-radius: 10px;
    }

    .btn-group{
        margin-left: 15px; 
    }

    .btn-group button {
        background-color: transparent;
        border: 1px solid rgb(0, 0, 0); /* Green border */
        color: rgb(0, 0, 0); /* White text */
        padding: 10px 24px; /* Some padding */
        cursor: pointer; /* Pointer/hand icon */
        float: left; /* Float the buttons side by side */
        border-top: none;
            
    }

    .btn-group button:not(:last-child) {
        border-right: none; /* Prevent double borders */
    }
    .btn-group button:is(:first-child) {
        border-left: none; /* Prevent double borders */
    }
    .btn-group button:is(:last-child) {
        border-right: none; /* Prevent double borders */
    }

    /* Clear floats (clearfix hack) */
    .btn-group:after {
        content: "";
        clear: both;
        display: table;
    }

    /* Add a background color on hover */
    .btn-group button:hover {
        background-color: #d163b9;
        color: rgb(255, 255, 255);
    }
</style>