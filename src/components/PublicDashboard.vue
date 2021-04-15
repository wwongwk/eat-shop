<template>
    <div>
        <div class="home">
            <app-header></app-header>
        </div>

        <div>
            <h2> Daily Temperature Chart </h2>
            <chart></chart>
        </div>
        <iframe width="600" height="400" src="https://data.gov.sg/dataset/psi/resource/82776919-0de1-4faf-bd9e-9c997f9a729d/view/5897450a-1536-40a2-953e-2c8981347b0c" frameBorder="0"> </iframe>
        <iframe width="600" height="400" src="https://data.gov.sg/dataset/psi/resource/82776919-0de1-4faf-bd9e-9c997f9a729d/view/942289fe-4b23-40b8-8c9a-7ac58cf2b237" frameBorder="0"> </iframe>
    </div>
</template>

<script>
import Header from "./Header.vue";
import Chart from "./dailyTempAPI.js"
export default {
    components: {
        AppHeader: Header,
        Chart: Chart,
    },
}
</script>

<style scoped>

</style>