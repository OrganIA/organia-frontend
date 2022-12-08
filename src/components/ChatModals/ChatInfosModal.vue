<template>
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head organia-modal-head">
                <p class="modal-card-title is-3">Informations</p>
                <button class="delete" aria-label="close" @click="closeModal(false)"></button>
            </header>
            <section class="modal-card-body content organia-modal-body">
                <label class="label">Nom de la conversation</label>
                <p>{{ chat.name }}</p>
                <label class="label">Créateur:</label>
                <p>{{  `${chat.creator?.firstname} ${chat.creator?.lastname}` }}</p>
                <div class="select is-multiple user-list">
                    <label class="label">Utilisateurs ajoutés</label>
                    <select class="added-user-info" multiple v-if="chat.users?.length > 0" :size="chat.users?.length">
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
.added-user-info {
  width: 19em;
  height: 36em;
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.20);
  overflow: hidden;
  background-color: #D8E0E9;
  display: inline-block;
  border-radius: 25px;
}
.user-list {
    margin: 10px;
    user-select: none;
    pointer-events: none;
}
</style>