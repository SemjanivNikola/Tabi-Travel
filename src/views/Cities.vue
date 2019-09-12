<template>
    <div id="v-menu">

        <Navigation/>

        <div id="bord">
            <div>
                <b-navbar variant="info" >
                    <b-navbar-nav style="margin: 0 auto">
                        <b-nav-item  v-for="(c,index) in city" :key="index" @click="odabir(c)">{{c.state}}</b-nav-item>
                    </b-navbar-nav>
                </b-navbar>
                <b-navbar  v-if="skrivena" variant="success">
                    <b-navbar-nav style="margin: 0 auto" >
                        <b-nav-item v-for="(grad,index) in odabranaDrzava.city" :key="index" @click="odabirGrada(grad)">{{grad.city}}</b-nav-item>
                    </b-navbar-nav>
                </b-navbar>
            </div>
            <div id="parent" >
                <div id="nav" v-if="!prikaznav">
                    <b-img @click="slideshow=false"  class="nav-itemm"  fluid  :src="require('../assets/icons/about.png') " > </b-img>
                    <b-img @click="slideshow=true" class="nav-itemm"  fluid  :src="require('../assets/icons/gallery.png') "> </b-img>
                </div>

                <div class="image" v-if="!prikazslike">
                    <b-img  v-bind="dimensions" fluid  :src="require('../assets/icons/cit.png') "> </b-img>
                </div>

                <div class="section" v-if="!prikazsekcija" >

                    <div id="about" v-if="!slideshow">
                        <h1>{{odabraniGrad.city}}</h1>
                        <p> {{odabraniGrad.about}}</p>
                    </div>

                    <div id="gallery" v-if="slideshow">
                        <b-carousel
                                id="carousel-1"
                                :interval="4000"
                                controls
                                indicators
                                background="#ababab"
                                img-width="1024"
                                img-height="300"
                                style="text-shadow: 1px 1px 2px #333;">

                            <b-carousel-slide :img-src="odabraniGrad.icon"></b-carousel-slide>
                            <b-carousel-slide :img-src="odabraniGrad.iconn"></b-carousel-slide>

                        </b-carousel>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import Navigation from '@/components/Navigation'

    export default {
        name: 'Cities',
        components: {
            Navigation
        },
        data () {
            return {
                city: [],
                odabranaDrzava:[],
                skrivena: false,
                odabraniGrad:null,
                prikaziodabrano: false,
                prikaznav : true,
                prikazsekcija : true,
                prikazslike: true,
                slideshow: false,
                dimensions:{
                    height: 200,
                    width : 200,
                }

            }
        },
        created(){
            this.getCity();
        },
        methods: {
            async getCity() {
                await axios.get("/sections/city")
                        .then((response) => {
                            this.city = response.data.city;
                            console.log('city: ', this.city);
                        })
                        .catch((error) => {
                            alert(error);
                        })
            },

            odabir(c){
                this.odabranaDrzava = c;
                this.skrivena = true;
                this.prikaznav = true;
                this.prikazsekcija = true;
                this.prikazslike = false;

            },
            odabirGrada(grad){
                this.odabraniGrad = grad;
                var icon1 = this.odabraniGrad.icon.split(',');
                var icon2 = this.odabraniGrad.icon.split(',');

                if(icon1.length > 1){

                    this.odabraniGrad.icon = icon1[1];
                    this.odabraniGrad.iconn = icon2[1];
                }


                this.readImages();
                this.prikaziodabrano = true;
                this.prikaznav = false;
                this.prikazsekcija = false;
                this.prikazslike = true;
                this.slideshow = false;


            },
            readImages : function () {

                this.odabraniGrad.icon = `data:image/jpg;base64,${this.odabraniGrad.icon}`;
                this.odabraniGrad.iconn = `data:image/jpg;base64,${this.odabraniGrad.iconn}`;




            }




        }
    }


</script>

<style scoped>



    #bord{
        height: 500px;
        width: 70%;
        margin: 10% auto;
        background-color: white;
        position: relative;

    }

    #parent{
        background-color: white;
        height: 452px;
        position:relative;
        width: 100%;
        box-shadow: 1px 1px 5px gray;

    }

    .image{
        margin-top: 100px;
        padding-left: 40%;
        position:absolute;


    }

    .nav-itemm{


        display: block;

    }

    #nav{
        margin-top: 140px;
        position:absolute;
        background-color: #2E8B57;
        border: 2px solid;
        padding: 20px;
        width: 90px;
        height: 120px;
        resize: none;
        overflow: hidden;
        border-radius: 20px;



    }

    #about, #gallery{
        background-color: lavender;
        position: absolute;
        height: 400px;
        width: 800px;
        margin-top: 25px;
        margin-left: 150px;
        box-shadow: 0 2px 4px grey;
        border-radius: 10px;
        padding-top: 50px;
        padding-left: 50px;
        padding-right: 50px;
        overflow: auto;
        scroll-behavior: smooth;




    }

    #about p{
        text-indent: 50px;
        margin-top: 5%;

    }

    h1{
        margin-bottom: 2%;

    }



</style>
