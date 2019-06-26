<template>
	<div id="navigation">
		<b-navbar type="light" variant="light" class="nav-hover">
			<b-img left v-bind="logoProps" :src="require('../assets/icons/logo.png')" alt="Tabi Logo"></b-img>
			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<!-- Right aligned nav items -->
				<b-navbar-nav class="ml-auto">
					<b-nav-form>
						<b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
						<b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
					</b-nav-form>
					<b-nav-item><b-img v-bind="profileProps" rounded :src="require('../assets/images/Profil.jpeg')" alt="Nikola Semjaniv" /></b-nav-item>
					<b-nav-item-dropdown right style="padding-top: 2%">
						<!-- Using 'button-content' slot -->
						<template slot="button-content"><em>Menu</em></template>
						<b-dropdown-item href="#">World Map</b-dropdown-item>
						<b-dropdown-item href="#">Flora And Funa</b-dropdown-item>
						<b-dropdown-item href="#">Animals</b-dropdown-item>
						<b-dropdown-item href="#">Cities</b-dropdown-item>
						<b-dropdown-item href="#">Search</b-dropdown-item>
						<hr>
						<b-dropdown-item href="#">Sign Out</b-dropdown-item>
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
			}
		},
		mounted: function () {
			window.addEventListener('scroll', function(e) {
				var scrollPos = window.scrollY;
				var winHeight = window.innerHeight;
				if (scrollPos === 0) {

				}else{

				}
			})
		},
		methods: {

		},
		computed: {

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
	}

</style>
