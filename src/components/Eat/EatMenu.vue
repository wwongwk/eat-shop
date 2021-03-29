<template>
    <div>
        <ul>
            <li>
                <div id="float-container">
                    <div id="foodImage">
                        <img src="https://www.fairprice.com.sg/wp-content/uploads/2020/05/chicken-rice-970x526-2.jpg" width="200" height="200">
                    </div>
                    <div id="foodDescription">
                        <h1>Food Name here</h1> 
                        <h2>$9.99</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt deserunt minima praesentium blanditiis, ipsum dicta quam laborum esse magnam nemo unde consequatur autem mollitia consequuntur quaerat vel quis quos error.</p>
                    </div><br><br><br>
                    <hr>
                </div>
            </li>

            <li>
                <div id="float-container">
                    <div id="foodImage">
                        <img src="https://www.jessicagavin.com/wp-content/uploads/2018/06/how-to-reverse-sear-a-steak-3.jpg" width="200" height="200">
                    </div>
                    <div id="foodDescription">
                        <h1>Food Name 2 here</h1> 
                        <h2>$69.69</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt deserunt minima praesentium blanditiis, ipsum dicta quam laborum esse magnam nemo unde consequatur autem mollitia consequuntur quaerat vel quis quos error.</p>
                    </div><br><br><br>
                    <hr>
                </div>
            </li>
        </ul>

    </div>
</template>

<script>
export default {
    components: {

    },
    data(){
        return{
            menu: {},

        };
    },

    methods: {
        get: function() {
            var shop = JSON.parse(localStorage.getItem("KEY"));
            this.menu = shop["menu"];
        },
        setMenu() {

        }
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