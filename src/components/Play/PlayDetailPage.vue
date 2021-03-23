<template>
    <div>
        <Header></Header>
        <h1> PLAY </h1>
        <div id="carousel">
            <div class="slide">
                <img src="https://s.yimg.com/ny/api/res/1.2/3nAgenb7PTxF4am_7AR_mw--~A/YXBwaWQ9aGlnaGxhbmRlcjtzbT0xO3c9NzQ0O2g9NDk2/http://media.zenfs.com/en/homerun/feed_manager_auto_publish_494/987e3e934d38bfa53bde33c332148130" 
                width="600px" height="400px">
            </div>
            <div class="slide">
                <img src="https://thesmartlocal.com/wp-content/uploads/2020/01/Pottery-Classes-in-Singapore-10.jpg"
                width="600px" height="400px">
            </div>
            <div class="slide">
                <img src="https://thesmartlocal.com/wp-content/uploads/2020/01/Pottery-Classes-in-Singapore-11.jpg" 
                width="600px" height="400px">
            </div>
            <div class="slide">
                <img src="https://zula.sg/wp-content/uploads/2020/10/cover-collage-2-990x500.jpg"
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
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.705086565759!2d103.69063441469358!3d1.3535189990128265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da0fba96c55cbb%3A0x18fce31af8198b65!2s85%20Lor%20Tawas%2C%20Singapore%20639823!5e0!3m2!1sen!2ssg!4v1616478663188!5m2!1sen!2ssg" 
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
            shopName: "The Music Scientist Human Anatomy Workshop",
            description:"Have your kids started pestering you with questions about how their body works? Don't worry if you can't answer them all - let them find out themselves at The Music Scientist's Human Anatomy Workshop! Through innovative music, your kids will be discovering the basic functions of their vital organs and bodily systems. Soon, they'll be the ones educating you on the way your body operates. There's no better way to ignite their wonder of science and spirit of curiosity than through this highly engaging workshop.",
            telephone:"8579 2238",
            openHours:"10am - 5pm (Tues - Sun)",
            address:"85 Lor Tawas, Singapore 639823",
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

    #openHours {
        background-color: aquamarine;
        border-radius: 10px;
    }

    #body {
        text-align: justify;
        text-size-adjust: 90%;
        margin-right: 20%;
        margin-left: 15px;
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