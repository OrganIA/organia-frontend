<template>
    <button class="button is-link is-light is-large is-responsive is-rounded is-focused"><strong>MON
            COMPTE</strong></button><br><br>
    <div class="columns">
        <article class="message is-info column">
            <div class="message-header">
                <p>Nom</p>
            </div>
            <div class="message-body">
                <strong>CHAOUCH</strong>
            </div>
        </article>
        <article class="message is-info column">
            <div class="message-header">
                <p>Prénom</p>
            </div>
            <div class="message-body">
                <strong>Irama</strong>
            </div>
        </article>
    </div>
    <div class="columns">
        <article class="message is-info column">
            <div class="message-header">
                <p>Numéro de téléphone</p>
            </div>
            <div class="message-body">
                <strong>+33 6 41 02 70 22</strong>
            </div>
        </article>
        <article class="message is-info column">
            <div class="message-header">
                <p>Email</p>
            </div>
            <div class="message-body">
                <strong>{{ email }}</strong>
            </div>
        </article>
    </div>
</template>

<script>

export default {
    name: "my-account",
    emits: ["login"],
    data() {
        return {
            email: "",
        }
    },
    created() {
        this.getMyinfo();
    },
    methods: {
        getMyinfo() {
            this.$http
                .get("/users/me", {
                    headers: { Authorization: `Bearer ${this.$cookies.get("token")}` },
                })
                .then((response) => {
                    console.log(response);
                    this.email = response.data.email;
                })
        },
    },
};
</script>

<style scoped>
</style>