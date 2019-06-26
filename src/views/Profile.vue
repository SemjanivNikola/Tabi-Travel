<template>
	<div id="profile">
		<Navigation />
		<div class="parent-header">
			<b-img right rounded v-bind="headerProps" :src="defaultHeadImg" class="imgHead" alt="Header image"></b-img>
			<div class="user">
				<b-img left rounded="circle" v-bind="profileProps" :src="defaultProfileImg" class="imgCircle" alt="Profile image"></b-img>
				<span></span>
				<h1>{{ user.firstName + " " + user.lastName}}</h1>
			</div>
		</div>
		<div class="info-section">
			<div id="user-details" class="parent-content">
				<div id="user-details-headline" class="child-headline" @click="hideSection(1)">
					<h1>INFORMATIONS AVALIABLE FOR PUBLIC DISCLOSURE</h1>
				</div>
				<div class="user-details-parent" v-bind:style="{ 'height' : ( displayInfoSection ? 'auto' : '0') }" style="padding-top: 2%;">
					<b-button v-if="displayInfoSection &&  !editInfo" @click="editUserInfo" variant="light" class="editFormBtn"><i class="material-icons" style="font-size: 1rem; margin-right: 5%">edit</i>Edit</b-button>
					<b-button v-if="displayInfoSection && editInfo" @click="editUserInfo" variant="light" class="editFormBtn"><i class="material-icons" style="font-size: 1rem; margin-right: .5%">check</i>Submit</b-button>

					<div class="user-details-child-content">
						<table>
							<tr>
								<th>First Name:</th>
								<td v-if="!editInfo">{{user.firstName}}</td>
								<td v-else><b-input class="inputTransform" v-model="user.firstName" type="text" :placeholder="user.firstName"></b-input></td>
							</tr>
							<tr>
								<th>Last Name:</th>
								<td v-if="!editInfo">{{user.lastName}}</td>
								<td v-else><b-input class="inputTransform" v-model="user.lastName" type="text" :placeholder="user.lastName"></b-input></td>
							</tr>
							<tr>
								<th>Birthday:</th>
								<td v-if="!editInfo">{{user.dateOfBirth}}</td>
								<td v-else><b-input class="inputTransform" v-model="user.dateOfBirth" ttpe="date" :placeholder="user.dateOfBirth"></b-input></td>
							</tr>
							<tr>
								<th>Country:</th>
								<td v-if="!editInfo">{{user.country}}</td>
								<td v-else><b-input class="inputTransform" v-model="user.country" type="text" :placeholder="user.country"></b-input></td>
							</tr>
						</table>
						<table style="margin: 0 10% 0 10%;">
							<tr>
								<th>Language:</th>
								<td v-if="!editInfo">{{user.language}}</td>
								<td v-else><b-input class="inputTransform" v-model="user.language" type="text" :placeholder="user.language"></b-input></td>
							</tr>
							<tr>
								<th>City:</th>
								<td v-if="!editInfo">{{user.city}}</td>
								<td v-else><b-input class="inputTransform" v-model="user.city" type="text" :placeholder="user.city"></b-input></td>
							</tr>
							<tr>
								<th>Tier:</th>
								<td>{{user.tier}}</td>
							</tr>
							<tr>
								<th>Achievements:</th>
								<td>{{user.achievements}}</td>
							</tr>
						</table>
						<div class="right">
							<p><b>Quote:<br></b></p>
							<p id="quote" v-if="!editInfo">"{{ user.quote }}"</p>
							<b-input id="inputQuote" class="inputTransform" v-else v-model="user.quote" type="text" :placeholder="user.quote"></b-input>
						</div>
					</div>
				</div>
			</div>

			<div id="achievements" class="parent-content">
				<div id="achievements-headline" class="child-headline" @click="hideSection(2)">
					<h1>ACHIEVEMENTS</h1>
				</div>
				<div v-bind:style="{ 'height' : ( displayAchievementsSection ? 'auto' : '0') }" class="child-selection">
					<ul style="list-style-type: none">
						<li>Filters:</li>
					</ul>
					<b-form-group id="filterGroup">
						<b-form-radio-group
								v-model="selected"
								:options="options"
								name="filters">
						</b-form-radio-group>
						<hr style="height: 1px; background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));">
					</b-form-group>
				</div>
				<div class="child-content">
					<div class="left-group">
						<div class="search-toolbar">
							<b-form-input id="searchInput" v-model="searchAchievements" type="text" placeholder="Search..."></b-form-input>
							<b-button id="searchBtn" right variant="outline- light"><i class="material-icons" style="float: right; color: #A54545">search</i></b-button>
							<hr style="height: 1px; background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));">
						</div>
						<div class="list">
							<ul style="list-style-type: none">
								<li v-for="(achievement, index) in achievements" v-bind:key="index" @click="showAchi(achievement)" class="achi-item">
									<b-img left v-bind="iconProps" alt="Testna ikona"></b-img>
									<h5>{{achievement.title}}</h5>
								</li>
							</ul>
						</div>
					</div>
					<div class="right-declaration" v-if="currAchievement.active">
						<h3 >{{currAchievement.item[0].title}}</h3>
						<section style="padding: 4% 0; height: 245px">{{currAchievement.item[0].about}}</section>
						<b-img v-if="currAchievement.item[0].owned" right :src="require('../assets/icons/unlocked.png')" alt="Unlocked Trophy"></b-img>
						<b-img v-else @click="unlock" right :src="require('../assets/icons/locked.png')" alt="locked Trophy"></b-img>
						<section>
							<p>Difficulty: {{currAchievement.item[0].difficulty}}</p>
							<p v-if="currAchievement.item[0].owned" class="owned">OWNED</p>
							<p v-else class="unowned">NOT OWNED</p>
						</section>
					</div>
					<div class="right-declaration" v-else></div>
				</div>
			</div>
		</div>
	</div>

	<!--
	:src="require('../assets/images/HomeBackground.jpg')"
	-->

</template>

<script>
	import Navigation from '@/components/Navigation'


	export default {
		name: 'Profile',
		components: {
			Navigation
		},
		data () {
			return {
				currHeight: 0,
				profileProps: { width: 220, height: 220, class: ['thumbnail', 'profile-img'] },
				headerProps: { width: 1220, height: 'auto' },
				iconProps: { width: 35, height: 35, blank: true, blankColor: '#777' },
				user: {
					firstName: this.$store.state.userData[2],
					lastName: this.$store.state.userData[3],
					dateOfBirth: this.$store.state.userData[4],
					language: this.$store.state.userData[6],
					country: this.$store.state.userData[7],
					city: this.$store.state.userData[8],
					tier: this.$store.state.userData[9],
					achievements: this.$store.state.userData[10],
					quote: this.$store.state.userData[11],
					profileImg: this.defaultProfileImg, /* this.$store.state.userData[12] */
					headerImg: this.defaultHeadImg /* this.$store.state.userData[13] */
				},
				selected: 'All',
				options: [
					{ text: 'All', value: 'all' },
					{ text: 'Unlocked', value: 'owned' },
					{ text: 'Locked', value: 'locked'}
				],
				searchAchievements: '',
				achievements: [],
				currAchievement: {
					item: [{ id: '', title: '', about: '', difficulty: '', owned: false }],
					active: false
				},
				displayInfoSection: true,
				displayAchievementsSection: true,
				editInfo: false,
			}
		},
		beforeCreate() {

		},
		created() {
			this.getAchievements();
		},
		mounted() {
			document.querySelector('body').style.backgroundImage = this.bgImage;
		},
		watch: {

		},
		methods: {
			hideSection : function (a) {
				if (a === 1) {
					// if displayInfoSection true set false and the other way around
					this.displayInfoSection = this.displayInfoSection !== true;
				}
				else if (a === 2) {
					this.displayAchievementsSection = this.displayAchievementsSection !== true;
				}
			},
			editUserInfo : function () {
				if (this.editInfo === false) {
					this.editInfo = true;
				}else{
					this.editInfo = false;
					const details = {
						type: 'information',
						language: this.user.language,
						country: this.user.country,
						city: this.user.city,
						tier: this.user.tier,
						achievements: this,
						quote: this.user.quote
					};
					this.submitUserInfo(details);
				}
			},
			submitUserInfo : function (details) {
				axios.put("/profile/user/", details)
						.then((response) => {
						})
						.catch((error) => {
							alert(error);
						})
			},
			async getAchievements () {
				await axios.get("/achievements")
						.then((response) => {
							this.achievements = response.data.achievements;
						});
				const userId = { id: this.$store.state.userData[0]};
				axios.post("/user/achievements", userId)
						.then((response) => {
							response.data.data.forEach(function(value, key){
								this.updateUnlockedAchi(value[0])
							}, this)
						})
						.catch((error) => {
							alert(error);
						})
			},
			submitAchievement : function (achi) {
				axios.post("/achievements", achi)
						.then((response) => {
						})
						.catch((error) => {
							alert(error);
						})
			},
			showAchi : function (currAchi) {
				this.currAchievement.item.pop();
				this.currAchievement.item.push(currAchi);
				this.currAchievement.active = true;
			},
			unlock : function () {
				this.currAchievement.item[0].owned = true;
				const achi = {
					id: this.currAchievement.item[0].id,
					userId: this.$store.state.userData[0],
					title: this.currAchievement.item[0].title,
					unlocked: this.currAchievement.item[0].owned
				};
				this.submitAchievement(achi);
				this.getAchievements();
			},
			updateUnlockedAchi : function (achiId) {
				this.achievements.forEach(function(value, key) {
					if (value.id === achiId) {
						value.owned = true;
					}
				})

			}
		},
		computed: {
			bgImage () {
				return "url('" + require('@/assets/images/searchBackground.jpeg') + "')";
			},
			getHeight () {
				return window.innerHeight;
			},
			defaultProfileImg () {
				return require('../assets/images/DefaultProfile.png');
			},
			defaultHeadImg () {
				return require('../assets/images/DefaultHeader.jpg');
			}
		}
	}
</script>

<style>
	#profile{
		margin: 0;
		padding: 0;
		position: relative;
	}
	.parent-header{
		width: max-content;
		background-color: #ffffff;
		display: grid;
		margin: 4% 0 2.5% 17%;
		padding: .25em;
		border: 2px solid #f2f2f2;
		border-radius: 5px;
		box-shadow: 1px 3px 8px #808080;
	}
	.user{
		width: 100%;
		height: 100%;
		margin: -.5% 0 0 0;
		display: inline-block;
		background-color: #ffffff;
		box-shadow: inset 0 1px 8px 4px #bbbbbb;
		border-radius: 0 0 5px 5px;
		text-align: start;
	}
	.user h1{
		font-family: Papyrus, 'Comic Sans MS',serif;
		padding-top: 1%;
		padding-bottom: 1%;
	}
	.profile-img{
		margin: -13% 0 0 -5%;
	}
	.thumbnail{
		background-color: #f2f2f2;
		padding: .25em;
		border: 1px solid #ffffff;
		max-width: 100%;
	}
	.info-section{
		width: 100%;
		height: auto;
		background-color: rgba(192, 192, 192, .7);
		padding: 2.5% 0 .1% 0;
		box-shadow: 0 2px 20px 0 rgba(0,0,0,1);
	}
	.parent-content{
		width: 65%;
		background-color: #ffffff;
		margin: 0 0 2.5% 17%;
		padding: .25em;
		border: 2px solid #f2f2f2;
		border-radius: 5px;
		box-shadow: 1px 3px 8px #808080;
		position: relative;
	}
	.child-headline{
		color: #ffffff;
		padding: 1.5% 0 1.5% 3.5%;
		letter-spacing: 4px;
		border-radius: 5px 5px 0 0;
		box-shadow: 0 3px 8px 2px gray;
		cursor: pointer;
	}
	#achievements-headline{
		background-color: #2E8B57;
		background-image: linear-gradient(#3bb16f, #2E8B57);
	}
	#user-details-headline{
		background-color: #990000;
		background-image: linear-gradient(#ad3232, #990000);
	}
	.user-details-child-content{
		width: 100%;
		padding: 6% 2% 2% 2%;
		display: inline-flex;
		transition: all .5s;
		overflow: hidden;
	}
	.editFormBtn{
		height: max-content;
		width: 8%;
		position: absolute;
		right: 2%;
		display: block;
	}
	.right{
		display: block;
		width: 30%;
		margin: 0;
	}
	.right p{
		display: initial;
		font-size: medium;
		padding-top: 1.5%;
	}
	#quote{
		color: darkred;
		font-size: xx-large;
		font-family: Rage,serif;
	}
	#inputQuote{
		height: 82%;
	}
	.child-selection{
		width: 100%;
		height: auto;
		display: inline-flex;
		padding-top: 2%;
	}
	#filterGroup{
		margin-left: 3.5%;
	}
	.child-content{
		height: auto;
		width: 100%;
		display: inline-flex;
		transition-duration: .5s;
	}
	.left-group{
		width: 50%;
		height: 400px;
		padding: .2em;
		border-right: 1px solid #bbbbbb;
		position: initial;
		display: block;
		transition: all .3s;
	}
	.search-toolbar{
		position: relative;
	}
	#searchInput, #searchBtn{
		display: inline-block;
		box-sizing: border-box;
	}
	#searchInput{
		width: 100%;
	}
	#searchBtn{
		width: auto;
		position: absolute;
		top: 0;
		right: 0;
	}
	.achi-item:hover{
		background-color: aliceblue;
		padding-left: 1.5%;
		cursor: pointer;
	}
	.achi-item img{
		margin-top: 1.5%;
	}
	.right-declaration{
		display: block;
		word-wrap: break-word;
		word-break: normal;
		width: 100%;
		padding: 1.2%;
		height: 410px;
	}
	.list{
		scroll-behavior: smooth;
		overflow-y: scroll;
		height: 80%;
	}
	.list ul li {
		height: max-content;
		display: block;
		text-align: center;
		padding-bottom: 1.5%;
	}
	.list ul li h5{
		padding-top: 3%;
	}
	.owned{
		background-color: #2E8B57;
	}
	.unowned{
		background-color: #A54545;
	}
	.owned, .unowned{
		color: #ffffff;
		width: max-content;
		border-radius: 5px;
		padding: 1.2%;
		text-align: center;
	}
	table tr th{
		height: 34px;
	}
	table{
		width: 25%;
	}
	.inputTransform{
		transition: all .3s ease-in-out;
	}
</style>
