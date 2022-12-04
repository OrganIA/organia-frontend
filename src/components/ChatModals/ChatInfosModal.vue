<template>
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title is-3">Informations</p>
                <button class="delete" aria-label="close" @click="closeModal(false)"></button>
            </header>
            <section class="modal-card-body content">
                <label class="label">Nom de la conversation</label>
                <p>{{ chat.name }}</p>
                <label class="label">Créateur:</label>
                <p>{{  `${chat.creator.firstname} ${chat.creator.lastname}` }}</p>
                <div class="select is-multiple user-list">
                    <label class="label">Utilisateurs ajoutés</label>
                    <select multiple v-if="chat.users.length > 0" :size="chat.users.length">
                        <option v-for="user in chat.users" :key="user._id" :value="user._id">{{ `${user.firstname} ${user.lastname}` }}</option>
                    </select>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    name: "ChatInfosModal",
    props: {
        chat: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    emits: ["closeModal"],
    methods: {
        closeModal(refresh) {
            this.$emit("closeModal", refresh)
        },
    }
}
</script>

<style scoped>
.user-list {
    margin: 10px;
    user-select: none;
    pointer-events: none;
}
</style>