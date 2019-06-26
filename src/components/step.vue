<template>
    <div id="step">
        <div class="slide-container">
            <b-form v-if="show" >
                <transition name="slide-fade" mode="out-in">
                <div v-if="this.slideIndex === 1" class="reg-slide slide">
                    <h4>First, let's get your email.</h4>
                    <svg height="20" width="400" class="head-line">
                        <polyline points="0,0 0,20 370,20" style="fill:none; stroke: #8D7D29; stroke-width: 2"></polyline>
                    </svg>
                    <b-form-group style="margin-left: 29%">
                        <b-form-input
                                id="input-email"
                                class="reg-input"
                                v-model="form.user_email"
                                type="email"
                                required
                                placeholder="Enter email">
                        </b-form-input>
                    </b-form-group>
                </div>
                </transition>

                <transition name="slide-fade" mode="out-in">
                <div v-if="this.slideIndex === 2"  class="reg-slide slide">
                    <h4>Now enter your name and birth date.</h4>
                    <svg height="20" width="400" class="head-line">
                        <polyline points="0,0 0,20 370,20" style="fill:none; stroke: #8D7D29; stroke-width: 2"></polyline>
                    </svg>
                    <div id="form-input-2">
                        <b-form-group>
                            <b-form-input
                                id="input-fristName"
                                class="reg-input form-el-margin"
                                v-model="form.firstName"
                                type="text"
                                required
                                placeholder="First name">
                            </b-form-input>e
                            <b-form-input
                                    id="input-lastName"
                                    class="reg-input form-el-margin"
                                    v-model="form.lastName"
                                    type="text"
                                    required
                                    placeholder="Last name">
                            </b-form-input>
                            <div style="padding-top: 2.5%; padding-left: 10%">
                                <b-form-select v-model="selectDay" :options="optionsDay" class="form-el-margin date-dropdown"></b-form-select>
                                <b-form-select v-model="selectMonth" :options="optionsMonth" class="form-el-margin date-dropdown date-child"></b-form-select>
                                <b-form-input
                                        id="input-yearOfBirth"
                                        class="reg-input form-el-margin"
                                        v-model="form.yearOfBirth"
                                        type="text"
                                        placeholder="Year">
                                </b-form-input>
                            </div>
                        </b-form-group>
                    </div>
                </div>
                </transition>

                <transition name="slide-fade" mode="out-in">
                <div v-if="this.slideIndex === 3"  class="reg-slide slide">
                    <h4>Secure your account with password.</h4>
                    <svg height="20" width="400" class="head-line">
                        <polyline points="0,0 0,20 370,20" style="fill:none; stroke: #8D7D29; stroke-width: 2"></polyline>
                    </svg>
                    <div style="display: inline-block; margin-left: 6%">
                        <b-form-group>
                            <b-input-group>
                                <b-form-input
                                        id="input-password"
                                        class="reg-input form-el-margin"
                                        v-model="form.password"
                                        type="password"
                                        required
                                        placeholder="Password">
                                </b-form-input>
                                <b-form-input
                                        id="input-confirmPass"
                                        class="reg-input form-el-margin"
                                        v-model="form.confirmPassword"
                                        type="password"
                                        required
                                        placeholder="Confirm password">
                                </b-form-input>
                            </b-input-group>
                        </b-form-group>
                    </div>
                </div>
                </transition>

                <transition name="slide-fade" mode="out-in">
                <div v-if="this.slideIndex === 4"  class="reg-slide slide">
                    <h4>Select your region.</h4>
                    <svg height="20" width="400" class="head-line">
                        <polyline points="0,0 0,20 370,20" style="fill:none; stroke: #8D7D29; stroke-width: 2"></polyline>
                    </svg>
                    <b-form-select v-model="selectRegion" :options="optionsRegion" class="date-dropdown" style="margin-left: 32%; margin-bottom: auto; width: 200px"></b-form-select>
                </div>
                </transition>

                <transition>
                <div v-if="this.slideIndex === 5" class="slide justify-content-center mb-3 loader">
                    <strong>Checking form inputs...</strong>
                    <b-spinner variant="info" style="margin: 8% 0 0 43%"></b-spinner>
                </div>
                </transition>

                <transition name="slide-fade" mode="out-in">
                <div v-if="this.slideIndex === 6"  class="reg-slide slide" style="text-align: center">
                    <h4>Congratulations!</h4>
                    <svg height="20" width="450" class="head-line">
                        <polyline points="30,20 450,20" style="fill:none; stroke: #8D7D29; stroke-width: 2"></polyline>
                    </svg>
                    <div style="display: inline-block; color: gray; font-family: Verdana, sans-serif; margin-bottom: 7%">
                        <p>You have completed your registration.</p>
                        <p>Please verify your email to start using all our features at once.</p>
                    </div>
                </div>
                </transition>
                <button v-if="!registrationDone" id="reg-btn" class="next-btn" @click="nextSlide">Next</button>
                <button v-if="registrationDone" id="reg-btn-finish" class="next-btn" @click="onSubmit">Finish</button>
            </b-form>
        </div>

        <table style="width: 340px; margin: 15px 0 0 85px;">
            <tr>
                <th class="tbl-head"><i class="material-icons">adjust</i></th>
                <th rowspan="2" class="tbl-mid-head"><div style="overflow: visible; width: 0; height: 0;"><hr class="next-step-line"></div></th>
                <th class="tbl-head"><i class="material-icons">adjust</i></th>
                <th rowspan="2" class="tbl-mid-head"><div style="overflow: visible; width: 0; height: 0;"><hr class="next-step-line"></div></th>
                <th class="tbl-head"><i class="material-icons">adjust</i></th>
                <th rowspan="2" class="tbl-mid-head"><div style="overflow: visible; width: 0; height: 0;"><hr class="next-step-line"></div></th>
                <th class="tbl-head"><i class="material-icons">adjust</i></th>
                <th rowspan="2" class="tbl-mid-head"><div style="overflow: visible; width: 0; height: 0;"><hr class="next-step-line"></div></th>
                <th class="tbl-head"><i class="material-icons">adjust</i></th>
            </tr>
            <tr>
                <td class="step">STEP 1</td>
                <td class="step">STEP 2</td>
                <td class="step">STEP 3</td>
                <td class="step">STEP 4</td>
                <td class="step">DONE!</td>
            </tr>
        </table>
    </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'

    export default {
        name: "step",
        data () {
            return {
                slideIndex: 1,
                show: true,
                registrationDone: false,
                registrationDoneAlert: false,
                registrationError: false,
                form: {
                    user_email: '',
                    firstName: '',
                    lastName: '',
                    yearOfBirth: '',
                    password: '',
                    confirmPassword: ''
                },
                selectDay: null,
                selectMonth: null,
                selectRegion: null,
                optionsDay: [
                    { value: null, disabled: true, text: '-- Day --' },
                    { value: 1, text: '1'},
                    { value: 2, text: '2'},
                    { value: 3, text: '3'},
                    { value: 4, text: '4'},
                    { value: 5, text: '5'},
                    { value: 6, text: '6'},
                    { value: 7, text: '7'},
                    { value: 8, text: '8'},
                    { value: 9, text: '9'},
                    { value: 10, text: '10'},
                    { value: 11, text: '11'},
                    { value: 12, text: '12'},
                    { value: 13, text: '13'},
                    { value: 14, text: '14'},
                    { value: 15, text: '15'},
                    { value: 16, text: '16'},
                    { value: 17, text: '17'},
                    { value: 18, text: '18'},
                    { value: 19, text: '19'},
                    { value: 20, text: '20'},
                    { value: 21, text: '21'},
                    { value: 22, text: '22'},
                    { value: 23, text: '23'},
                    { value: 24, text: '24'},
                    { value: 25, text: '25'},
                    { value: 26, text: '26'},
                    { value: 27, text: '27'},
                    { value: 28, text: '28'},
                    { value: 29, text: '29'},
                    { value: 30, text: '30'},
                    { value: 31, text: '31'}
                ],
                optionsMonth: [
                    { value: null, disabled: true, text: '-- Month --' },
                    { value: 1, text: 'January'},
                    { value: 2, text: 'February'},
                    { value: 3, text: 'March'},
                    { value: 4, text: 'April'},
                    { value: 5, text: 'May'},
                    { value: 6, text: 'June'},
                    { value: 7, text: 'July'},
                    { value: 8, text: 'August'},
                    { value: 9, text: 'September'},
                    { value: 10, text: 'October'},
                    { value: 11, text: 'November'},
                    { value: 12, text: 'December'}
                ],
                optionsRegion: [
                    { value: null, disabled: true, text: '-- Region --' },
                    { value: 'Europe', text: 'Europe'},
                    { value: 'North America', text: 'North America'},
                    { value: 'Latin America', text: 'Latin America'},
                    { value: 'South America', text: 'South America'},
                    { value: 'Asia', text: 'Asia'},
                    { value: 'Africa', text: 'Africa'},
                    { value: 'Australia and Oceania', text: 'Australia and Oceania'}
                ],
            }
        },
        validations: {
            form: {
                user_email: { required, email },
                lastName: { required, minLength: minLength(2)},
                firstName: { required,  minLength: minLength(2)},
                yearOfBirth: { required },
                password: { required, minLength: minLength(6) },
                confirmPassword: { required, minLength: minLength(6) },
            },
            selectDay: { required },
            selectMonth: { required },
            selectRegion: { required }
        },
        methods: {
            nextSlide : function () {
                if (this.slideIndex <= 4) {
                    this.slideIndex++;
                }
                if ( this.slideIndex === 5) {
                    if (!this.checkForm()) {
                        this.$store.state.errorInfo = true;
                        this.registrationError = false;
                    }else{
                        this.slideIndex++;
                    }
                }
                if (this.slideIndex === 6) {
                    this.registrationDone = true;
                }
            },
            addUser : function (new_user) {
                this.error = null;
                axios.post("/registration", new_user)
                    .then((response) => { this.registrationDoneAlert = true;})
                    .catch((error) => {
                        alert(error);
                    })
            },
            initForm : function () {
                this.form.user_email = '';
                this.form.firstName = '';
                this.form.lastName = '';
                this.form.password = '';
                this.form.confirmPassword = '';
                this.selectDay = null;
                this.selectMonth = null;
                this.form.yearOfBirth = '';
                this.selectRegion = '';
            },
            onSubmit : function (evt) {
                evt.preventDefault();
                const new_user = {
                    email: this.form.user_email,
                    firstName: this.form.firstName,
                    lastName: this.form.lastName,
                    password: this.form.password,
                    dateOfBirth: this.selectDay + '.' + this.selectMonth + '.' + this.form.yearOfBirth,
                    region: this.selectRegion
                };
                this.addUser(new_user);
                this.initForm();
                this.$store.state.isActive = false;
                this.slideIndex = 1;
                this.registrationDone = false;
            },
            checkForm : function () {
                if (this.$v.form.user_email.$error || this.$v.form.firstName.$error || this.$v.form.lastName.$error || this.$v.selectDay.$error || this.$v.selectMonth.$error
                    || this.$v.form.yearOfBirth.$error || this.$v.form.password.$error || this.$v.form.confirmPassword.$error || this.$v.selectRegion.$error) {
                    this.$store.dispatch("fillErrorList", 'Something is missing. Please check your form.');
                    this.registrationError = true;
                }
                if (!this.firstNameValidator() || !this.lastNameValidator() || !this.yearValidator()) {
                    this.$store.dispatch("fillErrorList", 'Please enter a valid informations. Thank you!');
                    this.registrationError = true;
                }
                if (!this.passwordCheck()) {
                    this.$store.dispatch("fillErrorList", 'Please check your form and try again. Thank you!');
                    this.registrationError = true;
                }
                if (this.registrationError){
                    return false;
                }else{
                    return true;
                }
            },
            passwordCheck : function () {
                if (this.form.confirmPassword === this.form.password) {
                    return true;
                }else{
                    this.$store.dispatch("fillErrorList", 'Passwords not matching!');
                    return false;
                }
            },
            firstNameValidator () {
                return /^[a-zA-Z\s]*$/.test(this.form.firstName);
            },
            lastNameValidator () {
                return /^[a-zA-Z\s]*$/.test(this.form.lastName);
            },
            yearValidator () {
                return /^[0-9]*$/.test(this.form.yearOfBirth);
            }
        }
    }
</script>

<style scoped>
    .slide-container{
        margin-top: 2em;
        position: relative;
        background-color: whitesmoke;
        border-top: 1px solid white;
        border-bottom: 1px solid white;
        height: 220px;
    }
    .next-btn{
        position: absolute;
        width: 100px;
        height: 30px;
        padding: 3px 8px;
        bottom: 10px;
        margin-left: 40%;
        background-color: #eadeb8;
        border: 1px solid white;
        border-radius: 8px;
        box-shadow: 2px 2px 5px black;
        transition: 0.3s;
        z-index: 1001;
    }
    .next-btn:hover{
        background-color: #A54545;
        border-color: #A54545;
        color: white;
    }
    #reg-btn{
        display: block;
    }
    .reg-slide{
        height: 100%;
        width: 100%;
        display: grid;
        position: absolute;
        z-index: 1000;
        animation-name: slide;
        animation-duration: 0.5s;
    }
    .loader{
        margin-top: 12%;
        display: grid;
        letter-spacing: 2px;
        animation-name: slide;
        animation-duration: 0.5s;
    }
    .step{
        cursor: pointer;
        font-size: small;
        padding: 3%;
        color: gray;
    }
    .step:hover, .step:focus{
        transform: scale(1.5);
        color: black;
    }
    .next-step-line{
        width: 30px;
        margin-top: -20px;
        margin-left: -18px;
    }
    table, th, td {
        border-collapse: collapse;
        padding: 0;
        text-align: center;
        transition: 0.3s;
    }
    @keyframes slide {
        from {transform: scale(0.8)}
        to {transform: scale(1)}
    }
    h4{
        color: #8D7D29;
        font-family: Georgia, sans-serif;
        margin-left: 3%;
        margin-top: 12px;
        font-size: large;

    }
    .head-line{
        margin-left: 2%;
        margin-top: 15px;
        display: block;
        position: absolute;
        transition: 0.2s;
    }
    .active{
        color: #A54545;
    }
    .reg-input{
        width: 200px;
        color: gray;
        display: initial;
        border: none;
        border-bottom: 2px solid #8D7D29;
        background-color: whitesmoke;
        text-align: center;
        transition: 0.5s;
    }
    .input-line:focus{
        margin-left: -15%;
        width: 300px;
    }
    #input-line-2:focus{
        transform-origin: left;
        width: 280px;
    }
    .date-dropdown{
        width: 100px;
        color: gray;
        border: none;
        border-bottom: 2px solid #8D7D29;
        background-color: whitesmoke;
        text-align: center;
    }
    .date-child{
        margin-left: 3%;
    }
    #form-input-2{
        margin-left: 6%;
    }
    #input-yearOfBirth{
        width: auto;
        max-width: 120px;
        display: initial;
    }
    .form-el-margin{
        margin: 0 1.3%;
    }




/*-------------------------------------------------------------------------------------------
                                      Animations
-------------------------------------------------------------------------------------------*/
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
</style>
