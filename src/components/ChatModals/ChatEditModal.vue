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
                    <input class="input" type="text" placeholder="Nom de la conversation" v-model="newRoomName"
                        required>
                    <div class="select is-multiple user-list">
                        <label class="label">Utilisateurs non ajoutés
                            <select multiple v-if="usersNotAdded.length > 0" :size="usersNotAdded.length">
                                <option v-for="user, index in usersNotAdded" :key="user.id" :value="user.id"
                                    @click="addUser(user, index)">{{ user.email }}</option>
                            </select>
                        </label>
                    </div>
                    <div class="select is-multiple user-list">
                        <label class="label">Utilisateurs ajoutés
                            <select multiple v-if="usersToAdd.length > 0" :size="usersToAdd.length">
                                <option v-for="user in usersToAdd" :key="user.id" :value="user.id"
                                    @click="removeUser(user, index)">{{
                                            user.email
                                    }}</option>
                            </select>
                        </label>
                    </div>
                </form>
            </section>
            <footer class="modal-card-foot">
                <button @click="editRoom" class="button is-success">Sauvegarder</button>
                <button class="button is-danger" @click="closeModal(false)">
                    Annuler
                </button>
                <button class="button is-danger" @click="deleteChat(false)">
                    Supprimer
                </button>
            </footer>
        </div>
    </div>
</template>

<script>
export default {
    name: "ChatEditModal",
    props: {
        users: {
            type: Array,
            default() {
                return []
            },
        },
        usersAdded: {
            type: Array,
            default() {
                return []
            },
        },
        roomId: {
            type: Number,
            default: 0,
        },
        roomName: {
            type: String,
            default: "",
        },
        currentUserId: {
            type: Number,
            default: 0,
        },
    },
    emits: ["closeModal"],
    data() {
        return {
            usersNotAdded: [],
            usersToAdd: [],
            newRoomName: "",
        }
    },
    watch: {
        usersAdded() {
            this.newRoomName = this.roomName
            this.usersAdded.forEach(user => {
                this.usersToAdd.push({
                    id: user._id,
                    email: user.username
                })
            })
            console.log(this.usersToAdd)
            this.usersNotAdded = this.users.filter(user => !this.usersToAdd.find(elem => elem.id == user.id))
        }
    },
    methods: {
        closeModal(refresh) {
            this.newRoomName = ""
            this.usersNotAdded = this.users.filter(user => user.id != this.currentUserId)
            this.usersToAdd = []
            this.$emit("closeModal", refresh)
        },
        async addUser(user, index) {
            this.usersNotAdded.splice(index, 1)
            this.usersToAdd.push(user)
        },
        async removeUser(user, index) {
            this.usersToAdd.splice(index, 1)
            this.usersNotAdded.push(user)
        },
        editRoom() {
            if (this.newRoomName == "") {
                this.$toast.error(
                    "Erreur: un nom est requis"
                );
                setTimeout(this.$toast.clear, 3000);
                return
            } else if (this.usersToAdd.length == 0) {
                this.$toast.error(
                    "Erreur: vous n'avez ajouté aucun utilisateur a la conversation"
                );
                setTimeout(this.$toast.clear, 3000);
                return
            }
            const users = {
                users_ids: [],
            };
            users.users_ids.push({
                user_id: this.currentUserId,
            });
            this.usersToAdd.forEach((user) => {
                users.users_ids.push({
                    user_id: user.id,
                });
            });
            this.$http
                .post(`/chats/${this.roomId}`, {
                    users_ids: users.users_ids,
                    chat_name: this.newRoomName,
                    creator_id: this.currentUserId,
                })
                .then(() => {
                    this.$toast.success("Création réussie!");
                    setTimeout(this.$toast.clear, 3000);
                    this.closeModal(true)
                })
                .catch((error) => {
                    console.log(error);
                    this.$toast.error(
                        "Erreur lors de la connexion : " + error.response.data.detail
                    );
                    setTimeout(this.$toast.clear, 3000);
                });
        },
        deleteChat() {
            this.$http
                .delete(`/chats/${this.roomId}`)
                .then(() => {
                    this.$toast.success("Suppression réussie");
                    setTimeout(this.$toast.clear, 3000);
                    this.closeModal(true)
                })
                .catch((error) => {
                    console.log(error);
                    this.$toast.error(
                        "Erreur lors de la connexion : " + error.response.data.detail
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