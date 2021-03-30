<template>
    <div>
        <ul>


            <li v-for="food in menu" :key="food.id">
                <div id="float-container">
                    <div id="foodImage">
                        <img :src='food["foodImage"]'
                        width="200" height="200">
                    </div>
                    <div id="foodDescription">
                        <h1>{{ food["foodName"] }}</h1> 
                        <h2>{{ food["foodPrice"] }}</h2>
                        <p>{{ food["foodDescription"] }}</p>
                    </div><br><br><br>
                    <hr>
                </div>
            </li>
        </ul>

    </div>
</template>

<script>
export default {
    props: {
        shop:[]
    },
    data(){
        return{
            menu: {}
        };
    },

    methods: {
        get: function() {
            this.shop = this.$route.params;
            this.menu = this.shop["menu"];
        },
    
    },
    created() {
        this.get();
    }

}
</script>

<style scoped>

h1 {
    margin-top: 0;
    margin-bottom: 0px;
}
h2 {
    margin: 0;
}
p {
    margin: 10px;
}
hr {
    page-break-before: avoid;
    page-break-inside: avoid;
    page-break-after: avoid;
    border-top: dotted 1px;
    float:inline-end
}
ul{
  list-style-type: none;
  padding: 0;
  margin: 0;
}

#float-container {
    border: 3px solid #fff;
    padding: 10px;
    height: 200px;
    
}

#foodImage {
    float: left;
    padding-right: 10px;
}

#foodDescription {
    margin-top: 0;
    padding: 10px;
    padding-top: 0;
}
</style>