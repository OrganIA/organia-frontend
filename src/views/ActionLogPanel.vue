<template>
    <p>Action Log</p>
    <div v-for="action in actions" :key="action">
        <p>action</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            actions: []
        }
    }
}
</script>

<style>

</style>