<template>
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title is-3">Créer une nouvelle conversation</p>
                <button class="delete" aria-label="close" @click="closeModal(false)"></button>
            </header>
            <section class="modal-card-body">
                <form @submit.prevent="createRoom">
                    <label class="label">Nom de la conversation</label>
                    <input class="input cypress-edit-chat-name" type="text" placeholder="Nom de la conversation" v-model="updatedChat.name"
                        required>
                    <div class="select is-multiple user-list">
                        <label class="label">Utilisateurs non ajoutés
                            <select multiple v-if="users_list.length > 0" :size="users_list.length">
                                <option v-for="user, index in users_list" :key="user.id" :value="user.id"
                                    @click="addUser(user, index)">{{ user.email }}</option>
                            </select>
                        </label>
                    </div>
                    <div class="select is-multiple user-list">
                        <label class="label">Utilisateurs ajoutés
                            <select multiple v-if="updatedChat.users.length > 0" :size="updatedChat.users.length">
                                <option v-for="user, index in updatedChat.users" :key="user.id" :value="user.id"
                                    @click="removeUser(user, index)">
                                    {{ user.email }}
                                </option>
                            </select>
                        </label>
                    </div>
                </form>
            </section>
            <footer class="modal-card-foot">
                <button @click="editRoom" class="button is-success cypress-edit-chat-save">Sauvegarder</button>
                <button class="button is-danger" @click="closeModal(false)">
                    Annuler
                </button>
                <button class="button is-danger cypress-delete-chat" @click="deleteChat(false)">
                    Supprimer
                </button>
            </footer>
        </div>
    </div>
</template>

<script>
import translate from "@/translate"
export default {
    name: "ChatEditModal",
    props: {
        users: {
            type: Array,
            default() {
                return []
            },
        },
        chat: {
            type: Object,
            default() {
                return {}
            },
        },
    },
    emits: ["closeModal"],
    computed: {
        updatedChat() {
            return this.chat
        },
        users_list() {
            return this.users.filter((user) => {
                return !this.chat.users.some((u) => {
                    return u.id === user.id
                })
            })
        },
    },
    methods: {
        closeModal(refresh) {
            this.$emit("closeModal", refresh)
        },
        async addUser(user, index) {
            this.users_list.splice(index, 1)
            this.updatedChat.users.push(user)
        },
        async removeUser(user, index) {
            this.updatedChat.users.splice(index, 1)
            this.users_list.push(user)
        },
        editRoom() {
            if (this.newChatName == "") {
                this.$toast.error(
                    "Erreur: un nom est requis"
                );
                setTimeout(this.$toast.clear, 3000);
                return
            } else if (this.updatedChat.users.length == 0) {
                this.$toast.error(
                    "Erreur: vous n'avez ajouté aucun utilisateur a la conversation"
                );
                setTimeout(this.$toast.clear, 3000);
                return
            }
            const users_ids = [];
            this.updatedChat.users.forEach((user) => {
                users_ids.push(user.id);
            });
            this.$http
                .post(`/chats/${this.updatedChat.id}`, {
                    users_ids: users_ids,
                    name: this.updatedChat.name,
                })
                .then(() => {
                    this.closeModal(true)
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response.data.msg.includes("is already taken")) {
                        error.response.data.msg = error.response.data.msg.replace("is already taken", "est déjà utilisé")
                        this.$toast.error(
                            "Erreur lors de la connexion : " + error.response.data.msg
                        );
                    } else {
                        this.$toast.error(
                            "Erreur lors de la connexion : " + translate[error.response.data.msg]
                        );
                    }
                    setTimeout(this.$toast.clear, 3000);
                });
        },
        deleteChat() {
            this.$http
                .delete(`/chats/${this.updatedChat.id}`)
                .then(() => {
                    this.$toast.success("Suppression réussie");
                    setTimeout(this.$toast.clear, 3000);
                    this.closeModal(true)
                })
                .catch((error) => {
                    console.log(error);
                    this.$toast.error(
                        "Erreur lors de la connexion : " + translate[error.response.data.msg]
                    );
                    setTimeout(this.$toast.clear, 3000);
                });
            this.$toast.success("Suppression en cour");
        },
    },
}
</script>

<style>

</style>
<style scoped>
.user-list {
    margin: 10px
}
</style>