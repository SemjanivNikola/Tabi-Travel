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
