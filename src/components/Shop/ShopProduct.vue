<template>
    <div>
        <ul>
            <li v-for="item in products" :key="item.index">
                <div id="float-container">
                    <div id="itemImage">
                        <img :src='item["productImage"]'
                        width="200" height="200">
                    </div>
                    <div id="itemDescription">
                        <h1>{{ item["productName"] }}</h1> 
                        <h2>{{ item["productPrice"] }}</h2>
                        <p>{{ item["productDescription"] }}</p>
                    </div><br><br><br>
                </div>
                <hr>
            </li>
            
        </ul>

    </div>
</template>

<script>
export default {
    props: ['shop'], 
     data(){
        return{
            products: {}
        };
    },
 
    methods: {
        get: function() {
            this.products = JSON.parse(this.shop["menu_str"])
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

#itemImage {
    float: left;
    padding-right: 10px;
}

#itemDescription {
    margin-top: 0;
    padding: 10px;
    padding-top: 0;
}


</style>