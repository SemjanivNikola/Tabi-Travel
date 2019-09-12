<template>
    <div id="Menu" :style="{height: getHeight + 'px', width: getWidth + 'px'}">
      <Navigation />
        <v-btn   large color="green"> <router-link to="flora"><h1>Flora</h1></router-link> </v-btn >

 <div id="user">
     <v-btn  large color="blue"> <router-link to="fauna"><h1>Fauna</h1></router-link> </v-btn >
 </div>


  </div>

</template>

<script>
    import Navigation from '@/components/Navigation'

  export default {
    name: 'FloraAndFauna',
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
      }
  }
</script>

<style scoped>
  #Menu{
    margin: 0;
    padding: 0;
    position: relative;
    height: 700px;
    width: 500px;
      background-image: url('../assets/images/ff.jpg');
}
  .v-btn {

    height: 500px;
    width: 300px;
    position: absolute;
    margin-left: 450px;
    margin-top: 130px;
    border-radius: 10%;

  }

  #user {
    height: 500px;
    width: 100px;
    position: absolute;
    margin-left: 350px;
    margin-top: 0px;

  }
    h1{
        color: white;
        font-family: Georgia, sans-serif;
        text-shadow: 4px 4px 2px black;
    }




</style>
