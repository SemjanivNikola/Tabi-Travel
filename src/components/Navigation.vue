<template>
	<div id="navigation">
		<b-navbar type="light" variant="light" class="nav-hover">
			<b-img left v-bind="logoProps" :src="require('../assets/icons/logo.png')" alt="Tabi Logo"></b-img>
			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav class="ml-auto">
					<b-nav-form>
						<b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
						<b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
					</b-nav-form>
					<b-nav-item><router-link to="profile"><b-img v-bind="profileProps" rounded :src="this.profileImg" :alt="this.$store.state.userData[2]" /></router-link></b-nav-item>
					<b-nav-item-dropdown right style="padding-top: 2%">
						<template slot="button-content"><em>Menu</em></template>
						<b-dropdown-item href="#">World Map</b-dropdown-item>
						<b-dropdown-item href="#"><router-link to="floraAndFauna">Flora And Fauna</router-link></b-dropdown-item>
						<b-dropdown-item href="#"><router-link to="cities" >Cities</router-link></b-dropdown-item>
						<b-dropdown-item href="#">Search</b-dropdown-item>
						<hr>
						<b-dropdown-item @click="emitReplaceToRouter">Sign Out</b-dropdown-item>
					</b-nav-item-dropdown>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
	export default {
		name: "Navigation",
		data() {
			return {
				logoProps: { width: 60, height: 50},
				profileProps: { width: 35, height: 35},
				profileImg: this.$store.state.userData[12]
			}
		},
		mounted() {
			window.addEventListener('scroll', function(e) {
				var scrollPos = window.scrollY;
				var winHeight = window.innerHeight;
				if (scrollPos === 0) {


				}else{

				}
			})
		},
		methods: {
			emitReplaceToRouter () {
				this.$emit("authenticated", false);
				this.$router.replace({name: "home"});
				this.$store.state.userData = [];
			}
		},
		computed: {
			defaultProfileImg() {
				return require('../assets/images/DefaultProfile.png');
			}
		}
	}
</script>

<style>
	#navigation{
		z-index: 9999999;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
	}
	.nav-hover{
		transition: .5s ease-in-out;
		opacity: .6;
		box-shadow: 0 4px 6px -6px #222;
	}
	.nav-hover:hover{
		opacity: 1;
		background-color: #A54545 !important;
	}

</style>
