<template>
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head organia-modal-head">
                <p class="modal-card-title is-3">Créer une nouvelle conversation</p>
                <button class="delete" aria-label="close" @click="closeModal(false)"></button>
            </header>
            <section class="modal-card-body organia-modal-body">
                <form @submit.prevent="createRoom">
                    <label class="label">Nom de la conversation</label>
                    <input class="input cypress-chat-title" type="text" placeholder="Nom de la conversation" v-model="newRoomName"
                        required>
                    <div class="select is-multiple user-list">
                        <label class="label">Utilisateurs non ajoutés
                            <select class="non-add-user cypress-nonadd-user" multiple v-if="usersNotAdded.length > 0" :size="usersNotAdded.length">
                                <option v-for="user, index in usersNotAdded" :key="user.id" :value="user.id"
                                    @click="addUser(user, index)">{{ user.email }}</option>
                            </select>
                        </label>
                    </div>
                    <div class="select is-multiple user-list">
                        <label class="label">Utilisateurs ajoutés
                            <select class="list-user-added" multiple v-if="usersToAdd.length > 0" :size="usersToAdd.length">
                                <option v-for="user in usersToAdd" :key="user.id" :value="user.id"
                                    @click="removeUser(user, index)">{{
                                            user.email
                                    }}</option>
                            </select>
                        </label>
                    </div>
                </form>
            </section>
            <footer class="modal-card-foot organia-modal-footer">
                <button @click="createRoom" class="button is-success cypress-save">Sauvegarder</button>
                <button class="button is-danger" @click="closeModal(false)">
                    Annuler
                </button>
            </footer>
        </div>
    </div>
</template>

<script>
import translate from "@/translate"
export default {
    name: "ChatCreateModal",
    props: {
        users: {
            type: Array,
            default() {
                return []
            },
        },
        currentUserId: {
            type: Number,
            default: 0,
        },
    },
    emits: ["closeModal"],
    watch: {
        users() {
            this.usersNotAdded = this.users.filter(user => user.id != this.currentUserId)
        }
    },
    data() {
        return {
            usersNotAdded: [],
            usersToAdd: [],
            newRoomName: "",
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
        createRoom() {
            if (this.newRoomName == "") {
                this.$toast.error(
                    "Erreur: un nom est requis"
                );
                return
            } else if (this.usersToAdd.length == 0) {
                this.$toast.error(
                    "Erreur: vous n'avez ajouté aucun utilisateur à la conversation"
                );
                return
            }
            const users = {
                users_ids: [],
            };
            this.usersToAdd.forEach((user) => {
                users.users_ids.push(user.id);
            });
            this.$http
                .post("/chats/", {
                    users_ids: users.users_ids,
                    name: this.newRoomName,
                })
                .then(() => {
                    this.$toast.success("Création réussie!");
                    setTimeout(this.$toast.clear, 3000);
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
    },
}
</script>

<style>

</style>
<style scoped>
.user-list {
    margin: 10px;
    width: 15em;
    height: 12em;
    box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.20);
    overflow: hidden;
    background-color: #D8E0E9;
    border-radius: 25px;
}

.non-add-user{
border: transparent;
border-radius: 15px;
overflow: hidden;
margin-top: 1em;
margin-left: 2.5em;
background-color: #c9d1da;
}
.list-user-added{
    border: transparent;
border-radius: 15px;
overflow: hidden;
margin-top: 1em;
margin-left: 2.5em;
background-color: #c9d1da;
}
</style>