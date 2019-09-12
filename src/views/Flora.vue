<template>
    <div id="Flormain" :style="{height: getHeight + 'px', width: getWidth + 'px'}">
        <Navigation />
        <h1> Flora </h1>

        <div class="flo1">
            <b-img thumbnail fluid  @click ="openModal(0)" :src="require('../assets/images/flora1.jpg') "> </b-img>
        </div>

        <div class="flo2">
            <b-img thumbnail fluid  @click ="openModal(1)" :src="require('../assets/images/flora2.jpg') "> </b-img>
        </div>

        <div class="flo3">
            <b-img  thumbnail fluid @click ="openModal(2)" :src="require('../assets/images/flora3.jpg') "> </b-img>
        </div>

        <div class="flo4">
            <b-img  thumbnail fluid @click ="openModal(3)" :src="require('../assets/images/flora4.jpg') "> </b-img>
        </div>

        <div class="flo5">
            <b-img thumbnail fluid @click ="openModal(4)" :src="require('../assets/images/flora5.jpg') "> </b-img>
        </div>

        <div class="flo6">
            <b-img  thumbnail fluid @click ="openModal(5)" :src="require('../assets/images/flora6.jpg') "> </b-img>
        </div>

        <div class="flo7">
            <b-img thumbnail fluid @click ="openModal(6)" :src="require('../assets/images/flora7.jpg') "> </b-img>
        </div>

        <div class="flo8">
            <b-img thumbnail fluid @click ="openModal(7)" :src="require('../assets/images/flora8.jpg') "> </b-img>
        </div>

        <b-modal v-model="modalShow" id="modal-1" :title="modalData.title">
            <p class="my-4">{{modalData.about}}</p>
        </b-modal>

    </div>
</template>

<script>
    import Navigation from "../components/Navigation";
    export default {
        name: "Flora",
        data () {
            return {
                flora: [],
                modalData: {
                    id: '',
                    title: '',
                    about: ''
                },
                modalShow: false
            }
        },
        computed: {
            getWidth(){
                return window.innerWidth;
            },
            getHeight(){
                return window.innerHeight;
            }
        },
        components: {
            Navigation
        },
        created () {
            this.getFlora();
        },
        methods: {
            getFlora : function () {
                axios.get("/sections/flora")
                    .then((response) => {
                        this.flora = response.data.flora;
                        console.log('flora: ', this.flora);
                    })
                    .catch((error) => {
                        alert(error);
                    })
            },
            openModal : function (index) {
                console.log('ovdje');
                this.modalData.id = this.flora[index].id;
                this.modalData.title = this.flora[index].title;
                this.modalData.about = this.flora[index].about;
                this.modalShow = true;

            }
        }
    }
</script>

<style scoped>
    #FaunaMain{


    }
    h1{

        color: white;
        font-family: Georgia, sans-serif;
        text-shadow: 4px 4px 2px black;
        font-size: 5em;
        margin-top: 0%;
        text-align: center;


    }
    .flo1{
        height: 200px;
        width: 300px;
        position: absolute;
        margin-left: 80px;
        margin-top: 100px;

    }
    .flo2{


        height: 200px;
        width: 300px;
        position: absolute;
        margin-left: 440px;
        margin-top: 100px;

    }
    .flo3{


        height: 200px;
        width: 300px;
        position: absolute;
        margin-left: 790px;
        margin-top: 100px;

    }

    .flo4{
        position:absolute;
        margin-left: 1140px;
        margin-top: 100px;
    }

    .flo5{
        margin-top: 350px;
        margin-left: 80px;
        position:absolute;
    }

    .flo6{
        margin-top: 350px;
        margin-left: 440px;
        position:absolute;
    }

    .flo7{
        margin-top: 350px;
        margin-left: 790px;
        position:absolute;
    }

    .flo8{
        margin-top: 350px;
        margin-left: 1140px;
        position:absolute;

    }

    .flo1 img, .flo2 img, .flo3 img, .flo4 img, .flo5 img, .flo6 img , .flo7 img , .flo8 img{
        border-radius: 10%;

    }


</style>


