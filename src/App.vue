<template>
	<div id="app">
		<router-view @authenticated="setAuthenticated" />
	</div>
</template>

<script>
	export default {
		name: 'App',
		data() {
			return {
				authenticated: false
			}
		},
		mounted() {
			if (!this.authenticated) {
				this.$router.replace({ name: "home" })
			}else{
				this.$router.replace({ name: "profile" })
			}
		},
		methods: {
			setAuthenticated(status) {
				this.authenticated = status;
			},
			logout() {
				this.authenticated = false;
			}
		}
	}

</script>

<style>
	/*.modal-mask {
	  position: fixed;
	  z-index: 9998;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 100%;
	  background-color: rgba(0, 0, 0, .5);
	  display: table;
	  transition: opacity .3s ease;
	}

	.modal-wrapper {
	  display: table-cell;
	  vertical-align: middle;
	}

	.modal-container {
	  width: 300px;
	  margin: 0px auto;
	  padding: 20px 30px;
	  background-color: #fff;
	  border-radius: 2px;
	  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
	  transition: all .3s ease;
	  font-family: Helvetica, Arial, sans-serif;
	}

	.modal-header h3 {
	  margin-top: 0;
	  color: #42b983;
	}

	.modal-body {
	  margin: 20px 0;
	}

	.modal-default-button {
	  float: right;
	}

	.modal-enter {
	  opacity: 0;
	}

	.modal-leave-active {
	  opacity: 0;
	}

	.modal-enter .modal-container,
	.modal-leave-active .modal-container {
	  -webkit-transform: scale(1.1);
	  transform: scale(1.1);
	}
  */






	body {
		margin: 0 !important;
		background-attachment: fixed;
		background-position: center;
		background-repeat: no-repeat;
		scroll-behavior: smooth;
	}

	#app {
		width: 100%;
		margin: 0;
		padding: 0;
	}
</style>

<!--
<div id="app">
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
</div>
-->
