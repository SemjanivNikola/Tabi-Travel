<template>

	<div id="app" :style="{height: getHeight + 'px'}">
		<BackPanelSignUp v-bind:style='{"display" : ( $store.state.isActive ? "block" : "none" )}'/>
		<span v-bind:class="[{shown: $store.state.isActive}, 'close-panel']" @click="showPanel">&times;</span>

		<transition name="slide-fade" mode="out-in">
			<div v-bind:style="bgimagehome" :style="{height: getHeight + 'px'}" v-if="!transformPage" class="home">
				<div style="width: 100%; height: 65px; position: relative">
					<button id="loginBtn" v-bind:class="[{hidden: transformPage}, 'index-button', 'first']" style="padding: 8px 23px 8px 23px;" @click="gotoLoginHome">LOGIN</button>
					<button id="signUpBtn" v-bind:class="[{hidden: transformPage}, 'index-button']" @click="showPanel">SIGN UP</button>
				</div>

				<div v-bind:class="[transformPage ? 'header-login' : 'header', 'header-static' ]">
					<h1>{{ message }}</h1>
					<div class="smoke-text intro">
						<h3>Where your journey begins.</h3>
					</div>
				</div>

			</div>
		</transition>

		<transition name="slide-fade" mode="in-out">
			<div v-bind:style="bgimage" :style="{height: getHeight + 'px'}" v-if="transformPage" class="background-login">
				<div v-bind:class="[transformPage ? 'header-login' : 'header', 'header-static' ]">
					<h1>{{ message }}</h1>
				</div>
				<div class="left-block slide-enter">
					<div class="smoke-text left-center">
						<h3>Don't have an account?</h3>
					</div>
					<b-button block variant="success" @click="gotoLoginHome">Register Here</b-button>
				</div>
				<div class="login-form">
					<b-form @submit="onSubmit" v-if="show">
						<b-form-group id="input-group-1">
							<b-form-input
									id="input-1"
									v-model="form.email"
									type="email"
									required
									placeholder="Enter email">
							</b-form-input>
							<b-link class="links" href="#" disabled>Forgot your username?</b-link>
						</b-form-group>

						<b-form-group id="input-group-2">
							<b-form-input
									id="input-2"
									v-model="form.password"
									type="password"
									required
									placeholder="Enter password">
							</b-form-input>
							<b-link class="links" href="#" disabled>Forgot your password</b-link>
						</b-form-group>
						<SubmitButton type="submit">Sign In</SubmitButton>
					</b-form>

				</div>

			</div>
		</transition>

	</div>

	<!--v-bind:style='{"background-image" : ( isActive ? "url(" + imageWelcome + ")" : "url(" + imageLogin + ")" )}'-->


</template>

<script>
	import BackPanelSignUp from '@/components/BackPanel_SignUp'
	import SubmitButton from '@/components/SubmitButton'

	export default {
		name: 'home',
		data () {
			return {
				message: 'Tabi',
				transformPage: false,
				form: {
					email: '',
					password: ''
				},
				show: true,
				loginResponse: null,
				submitLoading: false
			}
		},
		components: {
			BackPanelSignUp,
			SubmitButton
		},
		methods: {
			showPanel : function () {
				if(this.$store.state.isActive === false){
					this.$store.state.isActive = true;
				}else{
					this.$store.state.isActive = false;
				}
			},
			gotoLoginHome : function () {
				if(this.transformPage){
					this.transformPage = false;
					this.message = 'Tabi';
				}else{
					this.transformPage = true;
					this.message = 'Welcome Traveler';
				}
			},
			async onSubmit(evt) {
				evt.preventDefault();
				await this.submitLogin();
				if (this.loginResponse) {
					this.emitReplaceToRouter();
					// Reset our form values
					this.form.email = '';
					this.form.password = '';
					// Trick to reset/clear native browser form validation state
					this.show = false;
					this.$nextTick(() => {
						this.show = true
					})
				}

			},
			async submitLogin () {
				this.submitLoading = true;
				const loginDetails = {
					email: this.form.email,
					password: this.form.password
				};
				await axios.post("/login", loginDetails)
					.then((response) => {
						this.$store.state.userData = response.data.user;
						response.data.data.forEach(function(value, key){
							if (key === 0 || key === 1) {
								return
							}
							this.$store.state.userData.push(value);
						}, this);
						this.$delete(this.$store.state.userData, 5);
						this.loginResponse = true;
					})
					.catch((error) => {
						this.loginResponse = false;
						alert(error);
					})
					.finally(() => {
						this.submitLoading = false;
					});
			},
			emitReplaceToRouter () {
				this.$emit("authenticated", true);
				this.$router.replace({name: "profile"});
			}
		},
		computed: {
			bgimage(){
				return "background-image : url('" + require('@/assets/images/LoginBackground.jpeg') + "')";
			},
			bgimagehome(){
				return "background-image : url('" + require('@/assets/images/HomeBackground.jpg') + "')";
			},
			getHeight(){
				return window.innerHeight;
			}
		}
	}

</script>

<style >
	/*----------------------------------------------------------------------------------------------
											  Home View
	----------------------------------------------------------------------------------------------*/
	#app {
		margin: 0;
		padding: 0;
	}
	.home{
		position: fixed;
		width: 100%;
	}
	.header{
		padding: 0 0 0 5%;
		transition-duration: .5s;
	}
	.header-static h1{
		width: fit-content;
		color: white;
		font-family: Georgia, sans-serif;
		text-shadow: 4px 4px 2px black;
		font-size: 10em;
		margin-top: 3%;
	}
	.smoke-text{
		color: white;
		background:rgba(255,255,255,0.2);
		border-radius: 12px;
		width: 14%;
	}
	.smoke-text h3{
		font-size: 23px;
		padding: 15px;
		text-shadow: 2px 2px 1px black;
		margin-top: inherit;
	}
	.intro{
		margin-left: 10%;
		width: 33%;
	}
	.index-button{
		color: #2E8B57;
		position: absolute;
		right: 4%;
		top: 3em;
		padding: 8px;
		font-size: 14px;
		font-family: Verdana, serif;
		border-radius: 8px;
		border: 2px solid #2E8B57;
		background-color: #E5FFE5;
		cursor: pointer;
		letter-spacing: 1px;
		transition: .5s ease-out;
	}
	.first{
		margin-right: 6%;
	}
	.index-button:hover{
		background-color: #2E8B57;
		color: white;
	}
	.delay{
		transition-delay: 2s;
		transform: translateX(5%);
	}

	/*--------------------------------------------------------------------------------------------
									  Register Modal
	--------------------------------------------------------------------------------------------*/
	.close-panel{
		display: none;
		position: absolute;
		right: 35px;
		top: 35px;
		color: white;
		font-size: 40px;
		font-weight: bold;
		z-index: 2;
		animation-name: come-in;
		animation-duration: 1s;
	}
	.shown{
		display: block;
	}
	.hidden {
		transform: translateY(-200px);
	}
	.close-panel:hover,
	.close-panel:focus{
		color: #bbb;
		text-decoration: none;
		cursor: pointer;
	}
	@keyframes come-in{
		from{transform: scale(0)}
		to{transform: scale(1)}
	}

	/*--------------------------------------------------------------------------------------------
									  Login Panel
	--------------------------------------------------------------------------------------------*/
	.left-block{
		margin: 5% 0 0 -20%;
		padding-left: .3%;
		width: 20%;
		transition: 1s ease-in;
		transform: translateX(385px);
	}
	.background-login{
		position: fixed;
		top: 0;
		width: 100%;
	}
	.header-login h1{
		letter-spacing: 5px;
		margin: 7% auto 0 16%;
	}
	.login-form{
		margin: 2% 40% 0 40%;
	}
	.left-center{
		border-radius: 4px;
		display: block;
		width: 100%;
	}
	.left-center h3{
		margin-bottom: .5%;
	}
	.btn{
		font-family: Verdana, serif;
		letter-spacing: 1px;
	}
	#input-group-1, #input-group-2{
		margin-bottom: 2em;
	}
	.links{
		color: white;
	}
	.links:hover{
		color: gray;
	}
	@keyframes slide-in{
		from{transform: scale(0)}
		to{transform: scale(1)}
	}
	/*-------------------------------------------------------------------------------------------
									Footer
	-------------------------------------------------------------------------------------------*/


	/*-------------------------------------------------------------------------------------------
									  Animations
	-------------------------------------------------------------------------------------------*/
	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}
	.slide-fade-enter-active {
		transition: all .5s ease;
	}
	.slide-fade-leave-active {
		transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.slide-fade-enter, .slide-fade-leave-to {
		transition-delay: .6s;
		transform: translateX(10px);
		opacity: 0;
	}
	.slide-fade-login-enter-active{
		transition: opacity .5s ease;
	}
	.slide-fade-login-leave-active{
		transition: opacity .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.slide-fade-login-enter, .slide-fade-login-leave-to{
		transition-delay: .6s;
		opacity: 0;
	}
</style>
