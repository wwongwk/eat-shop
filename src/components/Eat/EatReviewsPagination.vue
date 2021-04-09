<template>
    <div>
        <div class = "pagination-row">

            <span v-for = "(item, index) in new Array(10)" :key = "index">
                <button class = "pagination-button" > {{index + 1}} </button>
                    </span> 

    </div>

</template>
    export default {


    }

<script>


</script>


<style>
    .pagination-button {
        padding : 8px;
        margin : 2px;
        border-radius : 3px;
        font-size : 1em;
        cursor : pointer;

        
    }

</style>