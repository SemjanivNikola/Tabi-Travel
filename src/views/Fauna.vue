<template>
    <div id="FaunaMain" :style="{height: getHeight + 'px', width: getWidth + 'px'}">
        <h1>Fauna  </h1>
        <Navigation />
        <div class="tig">
            <b-img  thumbnail fluid @click="openModal(0)" :src="require('../assets/images/tigar.jpg') "> </b-img>

        </div>

        <div class="anak">
            <b-img thumbnail fluid  @click="openModal(1)" :src="require('../assets/images/anaconda.jpg')"></b-img>
        </div>

        <div class="ris">
            <b-img  thumbnail fluid @click="openModal(2)" :src="require('../assets/images/ris.jpg')"> </b-img>

        </div>

        <div class="klo">
            <b-img thumbnail fluid @click="openModal(3)" :src="require('../assets/images/klokan.jpg') "> </b-img>

        </div>

        <div class="ali">
            <b-img thumbnail fluid @click="openModal(4)" :src="require('../assets/images/aligator.jpg') "> </b-img>

        </div>

        <div class="pan">
            <b-img thumbnail fluid @click="openModal(5)" :src="require('../assets/images/panda.jpg') "> </b-img>

        </div>

        <div class="ara">
            <b-img thumbnail fluido @click="openModal(6)" :src="require('../assets/images/ara.jpg') "> </b-img>
        </div>

        <div class="nos">
            <b-img thumbnail fluid @click="openModal(7)" :src="require('../assets/images/nosorog.jpg') "> </b-img>
        </div>

        <b-modal v-model="modalShow" id="modal-1" :title="modalData.title">
            <p class="my-4">{{modalData.about}}</p>
        </b-modal>

    </div>
</template>

<script>
    import Navigation from "../components/Navigation";

    export default {
        name: "Fauna",
        data () {
            return {
                fauna: [],
                modalData: {
                    id: '',
                    title: '',
                    about: ''
                },
                modalShow: false
            }
        },
        components: {
            Navigation
        },
        computed: {
            getWidth(){
                return window.innerWidth;
            },
            getHeight(){
                return window.innerHeight;
            }
        },
        created () {
          this.getFauna();
        },
        methods: {
            getFauna : function () {
                axios.get("/sections/fauna")
                    .then((response) => {
                        this.fauna = response.data.fauna;
                        console.log('fauna: ', this.fauna);
                    })
                    .catch((error) => {
                        alert(error);
                    })
            },
            openModal : function (index) {
                console.log('ovdje');
                this.modalData.id = this.fauna[index].id;
                this.modalData.title = this.fauna[index].title;
                this.modalData.about = this.fauna[index].about;
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
    .tig{

        height: 200px;
        width: 300px;
        position: absolute;
        margin-left: 80px;
        margin-top: 100px;

    }
    .anak{


        height: 200px;
        width: 300px;
        position: absolute;
        margin-left: 440px;
        margin-top: 100px;

    }
    .ris{


        height: 200px;
        width: 300px;
        position: absolute;
        margin-left: 790px;
        margin-top: 100px;

    }

    .klo{
        position:absolute;
        margin-left: 1140px;
        margin-top: 100px;
    }

    .ali{
        margin-top: 350px;
        margin-left: 80px;
        position:absolute;
    }

    .pan{
        margin-top: 350px;
        margin-left: 440px;
        position:absolute;
    }

    .ara{
        margin-top: 350px;
        margin-left: 790px;
        position:absolute;
    }

    .nos{
        margin-top: 350px;
        margin-left: 1140px;
        position:absolute;
    }

    .tig img, .ris img, .anak img, .klo img, .ali img, .pan img , .ara img , .nos img{ border-radius: 10%;}


</style>



