<template>
	<div id="profile">

		<Navigation />

		<div class="parent-header">
			<div class="child-header-img">
				<b-img right rounded v-bind="headerProps" :src="this.user.headerImg" alt="Header image"></b-img>
				<div class="headImgOverlay">
					<input id="headerImage" type="file" @change="selectImages" style="display: none;" ref="fileImage">
					<b-img @click="$refs.fileImage.click()" class="addImgButton" :src="require('../assets/icons/AddNewHeader.png')" alt="Add New Head Image" style="margin-top: 2%; margin-left: 2%;"></b-img>
				</div>
			</div>

			<div class="user">
				<b-img left rounded="circle" v-bind="profileProps" :src="this.user.profileImg" alt="Profile image"></b-img>
				<span style="position: absolute;">
					<input id="profileImage" type="file" @change="selectImages" style="display: none;" ref="fileImageProfile">
					<b-button @click="$refs.fileImageProfile.click()" variant="outline-primary"><i class="material-icons">add_a_photo</i></b-button>
				</span>
				<div class="user-info">
					<h1>{{ user.firstName + " " + user.lastName}}</h1>
					<hr>
					<div class="user-details-child-content">
						<table id="info-table">
							<tr>
								<th>Country:</th>
								<td>{{user.country}}</td>
							</tr>
							<tr>
								<th>City:</th>
								<td>{{user.city}}</td>
							</tr>
							<tr>
								<th>Language:</th>
								<td>{{user.language}}</td>
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
					</div>
					<hr>
				</div>
			</div>
		</div>

		<div class="quick-menu">
			<b-img v-bind="quickMenuIcon" @click="toggleSections(1)" :src="require('../assets/icons/info.png')"></b-img>
			<b-img v-bind="quickMenuIcon" @click="toggleSections(2)" :src="require('../assets/icons/cup.png')"></b-img>
			<b-img v-bind="quickMenuIcon" @click="toggleSections(3)" :src="require('../assets/icons/gallery.png')"></b-img>
		</div>

		<div class="articles">
			<div v-if="infoTrue" id="user-details" class="parent-content">
				<div id="user-details-headline" class="child-headline">
					<h1>INFORMATIONS AVALIABLE FOR PUBLIC DISCLOSURE</h1>
				</div>
				<div class="user-details-parent" style="padding-top: 2%;">
					<b-button v-if="!editInfo" @click="editUserInfo" variant="light" class="editFormBtn"><i class="material-icons" style="font-size: 1rem; margin-right: 5%">edit</i>Edit</b-button>
					<b-button v-if="editInfo" @click="editUserInfo" variant="light" class="editFormBtn"><i class="material-icons" style="font-size: 1rem; margin-right: .5%">check</i>Submit</b-button>

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
								<td v-else><b-input class="inputTransform" v-model="user.dateOfBirth" type="text" :placeholder="user.dateOfBirth"></b-input></td>
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
							<b-form-textarea id="inputQuote" class="inputTransform" v-else v-model="user.quote" type="text" rows="3" max-rows="3" :placeholder="user.quote"></b-form-textarea>
						</div>
					</div>
				</div>
			</div>

			<div v-if="achievementsTrue" id="achievements" class="parent-content">
				<div id="achievements-headline" class="child-headline">
					<h1>ACHIEVEMENTS</h1>
				</div>
				<div class="child-selection">
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
				<div v-bind:style="{ 'display' : ( displayAchievementsSection ? 'inline-flex' : 'none') }" class="child-content">
					<div class="left-group">
						<div class="search-toolbar">
							<b-form-input id="searchInput" v-model="searchAchiInput" type="text" placeholder="Search..."></b-form-input>
							<b-button id="searchBtn" right variant="outline- light"><i class="material-icons" style="float: right; color: #A54545">search</i></b-button>
							<hr style="height: 1px; background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));">
						</div>
						<div class="list">
							<ul style="list-style-type: none">
								<li class="achi-item" v-for="(achievement, index) in filteredAchievements" v-bind:key="index" @click="showAchi(achievement)">
									<b-img left v-bind="iconProps" :src="achievement.icon" alt="Testna ikona"></b-img>
									<h5>{{achievement.title}}</h5>
								</li>
							</ul>
						</div>
					</div>
					<div class="right-declaration" v-if="currAchievement.active">
						<h3 >{{currAchievement.item[0].title}}</h3>
						<section style="padding: 4% 0; height: 245px">{{currAchievement.item[0].about}}</section>
						<b-img v-if="currAchievement.item[0].owned" right :src="require('../assets/icons/unlocked.png')" alt="Unlocked Trophy"></b-img>
						<b-img v-else @click="unlock" right :src="require('../assets/icons/locked.png')" alt="locked Trophy" class="trophy"></b-img>
						<section>
							<p>Difficulty: {{currAchievement.item[0].difficulty}}</p>
							<p v-if="currAchievement.item[0].owned" class="owned">OWNED</p>
							<p v-else class="unowned">NOT OWNED</p>
						</section>
					</div>
					<div class="right-declaration" v-else></div>
				</div>
			</div>

			<div v-if="galleryTrue" id="gallery" class="parent-content">
				<div id="gallery-details-headline" class="child-headline">
					<h1>GALLERY</h1>
				</div>
				<div class="child-selection">
					<b-tabs content-class="mt-3" style="width: 100%">
						<b-tab title="All Images" active>
							<b-card-group columns>
								<b-card v-for="image in myImages" :key="image[0]"
										:title="image[3]"
										:img-src="image[4]"
										:img-alt="image[3]"
										img-top>
								</b-card>
							</b-card-group>
						</b-tab>
						<b-tab title="Albums">
							<b-card-group columns>
								<b-card v-for="album in myAlbums" :key="album[0]"
										:title="album[2]"
										:img-src="album[4]"
										img-alt="First Image"
										img-top>
									<b-card-text>{{album[5]}}</b-card-text>
								</b-card>
							</b-card-group>
						</b-tab>
						<b-tab title="New Album">
							<Loading v-if="loading"></Loading>
							<b-form v-if="galleryForm && !loading">
								<b-form-group
										id="fieldset-1"
										label="Let us know where you've been"
										label-for="input-1"
										:invalid-feedback="invalidFeedback"
										:state="state">
									<b-form-input id="input-album-1" v-model="album.name" type="text" :state="state" trim placeholder="Album name"></b-form-input>
									<b-form-input id="input-album-2" v-model="album.date" type="date" :state="state" trim></b-form-input>
									<b-form-input id="input-album-3" v-model="album.about" type="text" trim placeholder="Something about it"></b-form-input>
								</b-form-group>
							</b-form>
							<div v-if="!loading">
								<template>
									<b-form-file v-if="galleryForm" multiple accept="image/jpeg, image/jpg" v-model="helpAlbumArray" placeholder="Chose a file"></b-form-file>
								</template>
								<b-list-group>
									<b-list-group-item v-for="(img, index) in album.images" v-bind:key="index">
										<b-img v-bind="iconProps" :src="img.photo" alt="Image" ></b-img>
										{{img.name}}
										<b-button @click="deleteFromList(index)" variant="outline-danger" size="sm" style="float: right"><i class="material-icons" style="color:whitesmoke">clear</i></b-button>
									</b-list-group-item>
								</b-list-group>
							</div>
							<b-button-group style="float: right; margin-top: 1.8%;">
								<b-button v-if="state" @click="submitNewAlbum" variant="success">Upload</b-button>
								<b-button @click="resetAlbumForm" variant="danger">Reset</b-button>
							</b-button-group>
						</b-tab>
						<b-tab title="New Image">
							<Loading v-if="loading"></Loading>
							<b-form v-else>
								<b-form-group
										id="fieldset-2"
										label="Choose an album then add some more awesome pictures">
									<b-form-select v-model="selectedAlbum" :options="albumSelectList" size="sm" class="mt-3">
										<template v-slot:first>
											<option :value="null" disabled>-- Please select an album --</option>
										</template>
									</b-form-select>
									<b-form-file accept="image/jpeg, image/jpg" v-model="newImage" placeholder="Chose a file"></b-form-file>
								</b-form-group>
							</b-form>
							<b-button-group style="float: right; margin-top: 1.8%;">
								<b-button id="newImageUploadBtn" @click="selectImages" variant="success">Upload</b-button>
								<b-button @click="resetAlbumForm" variant="danger">Reset</b-button>
							</b-button-group>
						</b-tab>
					</b-tabs>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Navigation from '@/components/Navigation'
	import Loading from "../components/Loading";


	export default {
		name: 'Profile',
		components: {
			Navigation,
			Loading
		},
		data () {
			return {
				currHeight: 0,
				profileProps: { width: 220, height: 220, class: ['thumbnail', 'profile-img', 'imgCircle'] },
				headerProps: { class: 'headerImgProps' },
				iconProps: { width: 35, height: 35 },
				quickMenuIcon: { width: 64, height: 64, class: 'icon' },
				user: {
					firstName: this.$store.state.userData[2],
					lastName: this.$store.state.userData[3],
					dateOfBirth: this.$store.state.userData[4],
					language: this.$store.state.userData[6],
					country: this.$store.state.userData[7],
					city: this.$store.state.userData[8],
					tier: this.$store.state.userData[9],
					achievements: parseInt(this.$store.state.userData[10]),
					quote: this.$store.state.userData[11],
					profileImg: this.$store.state.userData[12],
					headerImg: this.$store.state.userData[13]
				},
				album: {
					name: '',
					about: '',
					date: '',
					images: [],
					check: false
				},
				myAlbums: [],
				myImages: [],
				loading: false,
				helpAlbumArray: [],
				albumSelectList: [],
				selectedAlbum: null,
				newImage: null,
				selected: 'all',
				options: [
					{ text: 'All', value: 'all' },
					{ text: 'Unlocked', value: 'owned' },
					{ text: 'Locked', value: 'locked'}
				],
				searchAchiInput: '',
				achievements: [],
				filteredAchievements: [],
				currAchievement: {
					item: [{ id: '', title: '', about: '', difficulty: '' }],
					active: false
				},
				galleryForm: true,
				infoTrue: false,
				achievementsTrue: false,
				galleryTrue: false,
				displayAchievementsSection: true,
				editInfo: false,
			}
		},
		created() {
			this.getAchievements();
			if(this.user.headerImg === 0){
				this.user.headerImg = this.defaultHeadImg;
			}
			if(this.user.profileImg === 0){
				this.user.profileImg = this.defaultProfileImg;
			}
			this.getAlbumsAndImages();
		},
		mounted() {
			document.querySelector('body').style.backgroundColor = '#fff';
		},
		watch: {
			selected () {
				this.filterAchi();
			},
			searchAchiInput () {
				this.searchAchievements();
			},
			helpAlbumArray () {
				this.selectImagesToAlbum();
			}
		},
		methods: {
			toggleSections : function (a) {
				if (a === 1) {
					// if displayInfoSection true set false and the other way around
					this.infoTrue = this.infoTrue !== true;
				}
				else if (a === 2) {
					this.achievementsTrue = this.achievementsTrue !== true;
				}
				else if (a === 3) {
					this.galleryTrue = this.galleryTrue !== true;
				}
			},
			editUserInfo : function () {
				if (this.editInfo === false) {
					this.editInfo = true;
				}else{
					this.editInfo = false;
					const details = {
						type: 'information',
						userId: this.$store.state.userData[0],
						language: this.user.language,
						country: this.user.country,
						city: this.user.city,
						tier: this.user.tier,
						achievements: this.user.achievements,
						quote: this.user.quote
					};
					this.submitUserInfo(details);
				}
			},
			submitUserInfo : function (details) {
				axios.put("/profile/user/", details)
					.then(() => {
					})
					.catch((error) => {
						alert(error);
					})
			},
			async getAchievements () {
				await axios.get("/achievements")
					.then((response) => {
						this.achievements = response.data.achievements;
						this.filteredAchievements = this.achievements;
						this.readImages();
					});
				const userId = { id: this.$store.state.userData[0]};
				axios.post("/user/achievements", userId)
					.then((response) => {
						response.data.data.forEach(function(value){
							this.updateUnlockedAchi(value[0]);
						}, this)
					})
					.catch((error) => {
						alert(error);
					})
			},
			submitAchievement : function (achi) {
				axios.post("/achievements", achi)
					.then(() => {
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
				this.achievements.forEach(function(value) {
					if (value.id === achiId) {
						value.owned = true;
						this.user.achievements = this.user.achievements + 1;
					}
				}, this);
			},
			filterAchi : function () {
				this.filteredAchievements = [];
				if (this.selected === 'owned') {
					this.achievements.forEach(function(value) {
						if (value.owned === true) {
							this.filteredAchievements.push(value);
						}
					}, this);
				}
				else if (this.selected === 'locked') {
					this.achievements.forEach(function(value) {
						if (value.owned === false) {
							this.filteredAchievements.push(value);
						}
					}, this);
				}else{
					this.filteredAchievements = this.achievements;
				}
			},
			searchAchievements : function () {
				if (this.searchAchiInput.length < 1) {
					this.filteredAchievements = this.achievements;
				}else{

					return this.achievements.filter();
				}


				/*
				this.filteredAchievements = [];
				this.achievements.forEach(function(value, key) {
				  if (this.searchAchiInput === value.title) {

				  }
				}, this)
				*/
			},
			readImages : function () {
				this.achievements.forEach(function(value) {
					value.icon = `data:image/png;base64,${value.icon}`;
				});
			},
			async getAlbumsAndImages(){
				await axios.get('/profile/user/images/albums/' + this.$store.state.userData[0])
					.then((response) => {
						this.myAlbums = response.data.albums;
						this.myImages = response.data.images;
						this.makeAlbumSelect();
					})
					.catch((error) => {
						console.log('Greska: ', error);
					})
			},
			submitNewAlbum : function () {
				this.loading = true;
				const album = {
					userId: this.$store.state.userData[0],
					name: this.album.name,
					date: this.album.date,
					about: this.album.about,
					images: []
				};
				this.album.images.forEach(function(value){
					album.images.push([value.name, value.file]);
				});
				axios.post('/profile/user/images/albums/' + this.$store.state.userData[0], album)
					.then(() => {
						this.loading = false;
						this.resetAlbumForm();
						this.getAlbumsAndImages();
					})
					.catch((error) => {
						this.loading = false;
						alert(error);
					});
			},
			updateAlbum : function (file) {
				const newImg = {
					albumId: this.selectedAlbum,
					title: this.newImage.name,
					image: file
				};
				axios.put('/profile/user/images/albums/' + this.$store.state.userData[0], newImg)
					.then((response) => {
						this.myImages = response.data.images;
					})
			},
			resetAlbumForm : function () {
				this.newImage = null;
				this.selectedAlbum = null;
				this.album.name = '';
				this.album.date = '';
				this.album.about = '';
				this.album.images = [];
				this.album.check = false;
				this.galleryForm = false;
				this.$nextTick(() => {
					this.galleryForm = true
				})
			},
			makeAlbumSelect(){
				this.myAlbums.forEach(function(value){
					this.albumSelectList.push({value: value[0], text: value[2]})
				}, this);
			},
			onImgSelected : function () {
				const details = {
					type: 'images',
					userId: this.$store.state.userData[0],
					profileImg: this.user.profileImg,
					headImg: this.user.headerImg
				};
				this.submitUserInfo(details);
			},
			selectImages(e){
				var self = this;
				var reader = new FileReader();
				if (e.target.id === 'newImageUploadBtn'){
					var file = new Blob([this.newImage]);
				} else {
					const item = e.target.files[0];
					var file = new Blob([item]);
				}
				reader.readAsDataURL(file);
				reader.onload = function (){
					file = reader.result;
					if (e.target.id === 'newImageUploadBtn'){
						self.updateAlbum(file);
					}
					else if(e.target.id === 'profileImage'){
						self.user.profileImg = file;
						self.onImgSelected();
					} else {
						self.user.headerImg = file;
						self.onImgSelected();
					}
				};
			},
			selectImagesToAlbum () {
				var name = null;
				var url = null;
				var file = null;
				var self = this;
				this.helpAlbumArray.forEach(function(value){
					let reader = new FileReader();
					file = new Blob([value]);
					reader.readAsDataURL(file);
					reader.onload = function () {
						file = reader.result;
						name = value.name.split('.');
						url = URL.createObjectURL(value);
						self.album.images.push({name: name[0], photo: url, file: file});
					};
				}, this);
			},
			deleteFromList : function (index) {
				return this.$delete(this.album.images, index);
			}
		},
		computed: {
			getHeight () {
				return window.innerHeight;
			},
			defaultProfileImg () {
				return require('../assets/images/DefaultProfile.png');
			},
			defaultHeadImg () {
				return require('../assets/images/DefaultHeader.jpg');
			},
			state() {
				return this.album.name.length >= 4 && this.album.date !== '' ? true : false
			},
			invalidFeedback() {
				if (this.album.name.length > 4) {
					return ''
				} else if (this.album.name.length > 0) {
					return 'Enter at least 4 characters'
				} else {
					return "Please enter information's above"
				}
			},
			validFeedback() {
				return this.state === true ? [this.album.check = true] : ''
			},
		}
	}
</script>

<style>
	#profile{
		margin: 0;
		padding: 0;
		position: relative;
	}
	.quick-menu{
		position: fixed;
		top: 30%;
		right: 2.5%;
	}
	.icon{
		margin-bottom: 50%;
		display: block;
		transition: .5s ease-out;
		cursor: pointer;
	}
	.icon:hover{
		width: 85px;
		height: 85px;
	}
	.parent-header{
		width: 100%;
		margin: 0;
		padding: 0;
	}
	.child-header-img{
		width: max-content;
		padding: .25em;
		border: 2px solid #f2f2f2;
		border-radius: 5px;
		box-shadow: 1px 3px 8px #808080;
		background-color: #ffffff;
		float: right;
		margin-top: 4%;
		right: 18%;
		display: inline-block;
		position: relative;
	}
	.child-header-img:hover .headImgOverlay{
		bottom: 85%;
		height: 15%;
	}
	.headerImgProps{
		max-height: 610px;
		width: auto;
	}
	.headImgOverlay{
		width: 99.4%;
		height: 0;
		position: absolute;
		bottom: 100%;
		left: .3%;
		right: 0;
		top: .5%;
		overflow: hidden;
		transition: .5s ease;
		background-color: transparent;
	}
	.addImgButton:hover{
		transition: .5s ease-in-out;
		cursor: pointer;
	}
	.user{
		width: auto;
		height: 100%;
		margin: 8% 0 0 6%;
		display: inline-block;
		background-color: #ffffff;
		/*box-shadow: 0 1px 8px 4px #808080;*/
		border-radius: 8px;
		text-align: start;
	}
	.user h1{
		font-family: Papyrus, 'Comic Sans MS',serif;
	}
	.user-info{
		margin-top: 90%;
	}
	.profile-img{
		margin: 0;
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
		width: 100%;
		background-color: #ffffff;
		height: auto;
		padding: .25em;
		border: 2px solid #f2f2f2;
		border-radius: 5px;
		box-shadow: 1px 3px 8px #808080;
		position: relative;
		transition: 1s ease-in;
		margin: 1.3% 0;
		animation-name: slideIn;
		animation-duration: .8s;
	}
	@keyframes slideIn {
		from{transform: translateX(1580px)}
		to{transform: translateX(0)}
	}
	.articles{
		margin-top: 2.5%;
		padding: 2.5% 10%;
		background-color: #F5F5F5;
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
	#gallery-details-headline{
		background-color: #ffb732;
		background-image: linear-gradient(#ffb732, #cc8400);
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
		overflow: hidden;
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
	.trophy:hover{
		background-color: aliceblue;
		border-radius: 25px;
		cursor: pointer;
	}
	table tr th{
		height: 34px;
	}
	table{
		width: 25%;
	}
	#info-table{
		width: 100%;
	}
	.inputTransform{
		transition: all .3s ease-in-out;
	}
	#fieldset-1, #fieldset-2{
	}
	#input-album-1, #input-album-2, #input-album-3 {
		margin-bottom: 1.5%;
	}
</style>
