<template>
    <b-button block variant="light" :disabled="loading">
        <template v-if="loading">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Loging you in...
        </template>
        <slot v-else></slot>
    </b-button>
</template>

<script>
    export default {
        name: "SubmitButton",
        props: ['loading']
    }
</script>

<style scoped>

</style>
