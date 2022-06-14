<template>
  <div class="window-container" :class="{ 'window-mobile': isDevice }">
    <div class="modal" v-bind:class="{ 'is-invisible': (state !== 'newRoom'), 'is-active': (state === 'newRoom') }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title is-3">Créer une nouvelle conversation</p>
          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-users">
          <form @submit.prevent="createRoom">
            <label class="label">Nom de la conversation</label>
            <input class="input" type="text" placeholder="Nom de la conversation" v-model="newRoomName" required>
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
                  <option v-for="user in usersToAdd" :key="user.id" :value="user.id" @click="removeUser(user, index)">{{
                      user.email
                  }}</option>
                </select>
              </label>
            </div>
          </form>
        </section>
        <footer class="modal-card-foot">
          <button @click="createRoom" class="button is-success">Sauvegarder</button>
          <button class="button is-danger" @click="closeModal">
            Annuler
          </button>
        </footer>
      </div>
    </div>

    <chat-window :text-messages="text_messages" :current-user-id="currentUserId" :rooms="rooms" :messages="messages"
      @fetch-messages="getMessages" @add-room="addRoom" :show-files="false" :show-audio="false" :height="'800px'"
      :load-first-room="false" :loading-rooms="loadingRooms" :rooms-loaded="roomsLoaded"
      :messages-loaded="messagesLoaded" :show-new-messages-divider="false" />
  </div>
</template>

<script>
import ChatWindow from 'vue-advanced-chat'
import 'vue-advanced-chat/dist/vue-advanced-chat.css'

export default {
  components: {
    ChatWindow
  },
  emits: [],
  data() {
    return {
      addNewRoom: false,
      rooms: [],
      messages: [],
      currentUserId: 0,
      latest_messages: [],
      users: [],
      state: "",
      newRoomName: "",
      usersNotAdded: [],
      usersToAdd: [],
      loadingRooms: true,
      roomsLoaded: false,
      messagesLoaded: false,
      text_messages: {
        ROOMS_EMPTY: 'Aucune conversation',
        ROOM_EMPTY: 'Aucune conversation sélectionnée',
        NEW_MESSAGES: 'Nouveaux messages',
        MESSAGES_EMPTY: 'Aucun message',
        CONVERSATION_STARTED: 'La conversation a commencée le :',
        TYPE_MESSAGE: 'Tapez votre message',
        SEARCH: 'Rechercher',
      }
    }
  },
  async mounted() {
    await this.getMe()
    await this.getUsers()
    await this.getRooms()
    await this.getLatestMessages()
  },
  methods: {
    async getMe() {
      await this.$http
        .get("/users/me")
        .then((response) => {
          this.currentUserId = response.data.id;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    async getRooms() {
      this.loadingRooms = true
      this.roomsLoaded = false
      await this.$http
        .get("/chats")
        .then((response) => {
          const chats = [];
          response.data.forEach(chat => {
            const users = this.getUsersOfChat(chat.users_ids)
            chats.push({
              roomId: chat.chat_id,
              roomName: chat.chat_name,
              users: users
            })
          });
          this.rooms = JSON.parse(JSON.stringify(chats));
          this.loadingRooms = false
          this.roomsLoaded = true
        })
        .catch((error) => {
          this.$toast.error(
            "Erreur lors de la connexion : " + error.response.data.detail
          );
          setTimeout(this.$toast.clear, 3000);
        });
    },
    async getUsers() {
      await this.$http
        .get("/users")
        .then((response) => {
          this.users = response.data
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error(
            "Erreur lors de la connexion : " + error.response.data.detail
          );
          setTimeout(this.$toast.clear, 3000);
        });
    },
    getUsersOfChat(users_ids) {
      const users = []
      users_ids.forEach((user) => {
        users.push({
          _id: user,
          username: this.users.filter(elem => elem.id == user)[0].email
        })
      })
      return users
    },
    async getMessages(chat) {
      this.messagesLoaded = false
      this.messages = []
      await this.$http
        .get(`/chats/${chat.room.roomId}/messages`)
        .then((response) => {
          const messages = []
          response.data.forEach(message => {
            const tmp_date = Date.parse(message.created_at)
            const date = new Date()
            date.setUTCSeconds(tmp_date)
            messages.push({
              disableActions: true,
              disableReactions: true,
              _id: message.id,
              content: message.content,
              senderId: message.sender_id,
              timestamp: date.toLocaleTimeString(),
              username: this.users.find(user => user.id == message.sender_id).email,
            })
          })
          this.messages = messages
          this.messagesLoaded = true
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error(
            "Erreur lors de la connexion : " + error.response.data.detail
          );
          setTimeout(this.$toast.clear, 3000);
        });
    },
    async getLatestMessages() {
      const rooms = JSON.parse(JSON.stringify(this.rooms))
      await this.$http
        .get("/chats/messages/latest")
        .then((response) => {
          response.data.forEach(message => {
            const tmp_date = Date.parse(message.created_at)
            const date = new Date()
            date.setUTCSeconds(tmp_date)
            rooms.find(room => room.roomId == message.chat_id).lastMessage = {
              disableActions: true,
              disableReactions: true,
              _id: message.id,
              content: message.content,
              senderId: message.sender_id,
              timestamp: date.toLocaleTimeString(),
              username: this.users.find(user => user.id == message.sender_id).email,
            }
          })
          this.rooms = rooms
        })
        .catch((error) => {
          this.$toast.error(
            "Erreur lors de la connexion : " + error.response.data.detail
          );
          setTimeout(this.$toast.clear, 3000);
        })

    },
    addRoom() {
      this.newRoomName = ""
      this.usersNotAdded = this.users.filter(user => user.id != this.currentUserId)
      this.usersToAdd = []
      this.state = "newRoom"
    },
    closeModal() {
      this.state = ""
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
      }
      else if (this.usersToAdd.length == 0) {
        this.$toast.error(
          "Erreur: vous n'avez ajouté aucun utilisateur a la conversation"
        );
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
        .post("/chats", {
          users_ids: users.users_ids,
          chat_name: this.newRoomName,
          creator_id: this.currentUserId,
        })
        .then(() => {
          this.$toast.success("Création réussie!");
          setTimeout(this.$toast.clear, 3000);
          this.refreshChatList()
          this.closeModal()
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error(
            "Erreur lors de la connexion : " + error.response.data.detail
          );
          setTimeout(this.$toast.clear, 3000);
        });
    },
    async refreshChatList() {
      this.rooms = []
      await this.getRooms()
      await this.getLatestMessages()
    }
  },
}
</script>

<style scoped>
.user-list {
  margin: 10px
}
</style>