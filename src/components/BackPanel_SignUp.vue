<template>
  <div id="back-panel">
    <div id="registerPanel" class="register-panel" >
      <div class="reg-panel-headline">

        <h1>YOUR JOURNEY STARTS HERE</h1>
        <svg height="50" width="500">
          <polyline points="80,6 50,0 450,0 410,10 90,10 145,20 376,20 393,16" style="fill:none;  stroke: white; stroke-width: 2"></polyline>
        </svg>
      </div>
      <step></step>
      <RegistrationErrorInfo v-if="this.$store.state.errorInfo"></RegistrationErrorInfo>
    </div>
  </div>
</template>

<script>
import Step from './step'
import RegistrationErrorInfo from './RegistrationErrorInfo'

export default {
  name: 'BackPanelSignUp',
  components: {
    Step,
    RegistrationErrorInfo
  }
}
</script>

<style scoped>
  #back-panel{
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.7); /* Black w/ opacity */
    animation-name: zoom;
    animation-duration: .2s;
  }
  .register-panel{
    margin: 3% 38%;
    height: 500px;
    width: 500px;
    background-color: #eadeb8;
    border: 1px solid black;
    display: block;
    animation-name: zoom;
    animation-duration: .6s;
    border-radius: 10px;
  }

  @keyframes zoom{
    from {transform:scale(0)}
    to {transform:scale(1)}
  }
  .reg-panel-headline{
    display: inline-block;
    text-align: center;

  }
  .reg-panel-headline h1 {
    text-align: center;
    color: #8D7D29;
    font-family: Georgia, sans-serif;
    padding-left: 2%;
  }
  .register-panel .slide-container .next-btn a{
    text-decoration: none;
    color: inherit;
  }
</style>
