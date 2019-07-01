<template>
  <div>
    <b-button @click="addDucan" variant="success">Registriraj ducan</b-button>
    <b-button @click="addUser" variant="success">Registriraj korisnika</b-button>
    <hr>
    <b-button @click="addItem" variant="success">Dodaj artikal</b-button>
    <b-button @click="addRes" variant="success">Dodaj rezervaciju</b-button>
    <hr>
    <b-button variant="success">Prijava korisnika</b-button>
    <b-button variant="success">Prijava ducana</b-button>
    <hr>
    <b-button variant="success">Ducan - rezervacije</b-button>
    <b-button variant="success">Ducan - artikli</b-button>
    <hr>
    <b-button variant="success">Rezervacije sve</b-button>
    <b-button variant="success">Rezervacije za korisnika</b-button>
    <hr>
    <b-button variant="success">Svi artikli</b-button>
  </div>
</template>

<script>
  export default {
    name: 'Cities',
    data () {
      return {
        korisnik: {
          username: 'sema',
          email: 'sema@gmail.com',
          ime_korisnika: 'Nikola',
          prezime: 'Semjaniv',
          phone_numb: '091293901291'
        },
        ducan: {
          store_code: '112345g',
          store_password: 'qweasd123'
        },
        artikal: {
          ime_artikla: 'hlace',
          cijena: 249.99,
          velicina: 'L',
        },
        rezervacija: {
          kolicina: 2,
        }
      }
    },
     methods: {
      async addUser () {
        const user = this.korisnik
        console.log(user);
        await axios.post('/korisnik/registracija', user)
                .then((response) => {
                  console.log(response)
                })
                .catch((error) => {
                  alert(error)
                })
      },
       async addDucan () {
         await axios.post('/ducan/registracija', this.ducan)
                 .then((response) => {
                   console.log(response)
                 })
                 .catch((error) => {
                   alert(error)
                 })
       },
       async addItem () {
         await axios.post('/artikal-dodaj', this.artikal)
                 .then((response) => {
                   console.log(response)
                 })
                 .catch((error) => {
                   alert(error)
                 })
       },
       async addRes () {
         await axios.post('/nova-rezervacija', this.rezervacija)
                 .then((response) => {
                   console.log(response)
                 })
                 .catch((error) => {
                   alert(error)
                 })
       },
       ///////////////////////////////////////////////////////////////////
       ///////////////////////////////////////////////////////////////////










     }
  }
</script>

<style scoped>

</style>
