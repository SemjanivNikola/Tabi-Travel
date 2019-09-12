<template>
    <div class="justify-content-center">
        <div class="spinner-border custome" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Loading"
    }
</script>

<style scoped>
    .custome{
        border: 1.25em solid violet;
        border-right-color: transparent;
    }
</style>
