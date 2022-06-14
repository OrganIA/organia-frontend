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
                <p>{{ room.roomName }}</p>
                <label class="label">Créateur:</label>
                <p>{{ creator.email }}</p>
                <div class="select is-multiple user-list">
                    <label class="label">Utilisateurs ajoutés</label>
                    <select multiple v-if="users.length > 0" :size="users.length">
                        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.email }}</option>
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
        users: {
            type: Array,
            default() {
                return []
            },
        },
        room: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            creator: {}
        }
    },
    watch: {
        room(newRoom) {
            this.creator = newRoom.creator
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