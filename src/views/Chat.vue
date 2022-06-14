<template>
  <div class="window-container">
    <chat-create-modal-vue :users="users" :currentUserId="currentUserId"
      :class="{ 'is-invisible': (state !== 'newRoom'), 'is-active': (state === 'newRoom') }" @closeModal="closeModal" />
    <chat-infos-modal-vue :users="users" :room="currentRoom"
      :class="{ 'is-invisible': (state !== 'roomInfos'), 'is-active': (state === 'roomInfos') }"
      @closeModal="closeModal" />
    <chat-window :text-messages="text_messages" :current-user-id="currentUserId" :rooms="rooms" :messages="messages"
      @fetch-messages="getMessages" @add-room="openCreateModal" :show-files="false" :show-audio="false"
      :load-first-room="false" :loading-rooms="loadingRooms" :rooms-loaded="roomsLoaded"
      :messages-loaded="messagesLoaded" :show-new-messages-divider="false" :menu-actions="menu_actions"
      @menu-action-handler="menuActionHandler" />
  </div>
</template>

<script>
import ChatWindow from 'vue-advanced-chat'
import ChatCreateModalVue from '@/components/ChatModals/ChatCreateModal.vue'
import ChatInfosModalVue from '@/components/ChatModals/ChatInfosModal.vue'
import 'vue-advanced-chat/dist/vue-advanced-chat.css'

export default {
  components: {
    ChatWindow,
    ChatCreateModalVue,
    ChatInfosModalVue,
  },
  emits: [],
  data() {
    return {
      rooms: [],
      messages: [],
      currentUserId: 0,
      latest_messages: [],
      users: [],
      state: "",
      loadingRooms: true,
      roomsLoaded: false,
      messagesLoaded: false,
      currentRoom: {},
      text_messages: {
        ROOMS_EMPTY: 'Aucune conversation',
        ROOM_EMPTY: 'Aucune conversation sélectionnée',
        NEW_MESSAGES: 'Nouveaux messages',
        MESSAGES_EMPTY: 'Aucun message',
        CONVERSATION_STARTED: 'La conversation a commencée le :',
        TYPE_MESSAGE: 'Tapez votre message',
        SEARCH: 'Rechercher',
      },
      menu_actions: [
        {
          name: 'infos',
          title: 'Informations'
        },
      ],
    }
  },
  async created() {
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
            const creator = this.users.filter(user => user.id == chat.creator_id)[0]
            const users = this.getUsersOfChat(chat.users_ids)
            chats.push({
              roomId: chat.chat_id,
              roomName: chat.chat_name,
              users: users,
              creator: creator
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
      this.currentRoom = chat.room
      if (chat.room.creator.id == this.currentUserId) {
        this.menu_actions = [
          {
            name: 'infos',
            title: 'Informations'
          },
          {
            name: 'edit',
            title: 'Éditer'
          },
        ]
      } else {
        this.menu_actions = [
          {
            name: 'infos',
            title: 'Informations'
          },
        ]
      }
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
    openCreateModal() {
      this.state = "newRoom"
    },
    openInfosModal() {
      this.state = "roomInfos"
    },
    closeModal(refresh) {
      this.state = ""
      if (refresh)
        this.refreshChatList()

    },
    async refreshChatList() {
      this.rooms = []
      await this.getRooms()
      await this.getLatestMessages()
    },
    menuActionHandler({ action, roomId }) {
      switch (action.name) {
        case 'infos':
          return this.openInfosModal()
        case 'edit':
          return this.showEdit(roomId)
      }
    },
  },
}
</script>
