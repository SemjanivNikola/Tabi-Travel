<template>
    <div id="errorInfoPanel">
        <div v-if="errorList.length">
            <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in this.$store.state.registration_errors" v-bind:key="error"> {{ error }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RegistrationErrorInfo",
        data () {
            return {
                errorList: []
            }
        },
        methods: {

        },
        beforeCreate() {
            this.errorList = this.$store.state.registration_errors;
        }
    }
</script>

<style>
    #errorInfoPanel{
        z-index: 999999;
        display: block;
        width: 250px;
        height: 500px;
        position: absolute;
        top: 20%;
        right: 20%;
        background-color: #E5FFE5;
        color: #000;
    }

</style>
