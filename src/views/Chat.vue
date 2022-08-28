<template>
  <div class="window-container">
    <chat-create-modal :users="users" :currentUserId="currentUserId"
      :class="{ 'is-invisible': (state !== 'newRoom'), 'is-active': (state === 'newRoom') }" @closeModal="closeModal" />
    <chat-infos-modal :users="currentRoom.users" :room="currentRoom"
      :class="{ 'is-invisible': (state !== 'roomInfos'), 'is-active': (state === 'roomInfos') }"
      @closeModal="closeModal" />
    <chat-edit-modal :users="users" :currentUserId="currentUserId" :usersAdded="currentRoom.users"
      :roomName="currentRoom.roomName" :roomId="currentRoom.roomId"
      :class="{ 'is-invisible': (state !== 'editRoom'), 'is-active': (state === 'editRoom') }"
      @closeModal="closeModal" />
    <chat-window :text-messages="text_messages" :current-user-id="currentUserId" :rooms="rooms" :messages="messages"
      @fetch-messages="getMessages" @add-room="openModal('newRoom')" :show-files="false" :show-audio="false"
      :load-first-room="false" :loading-rooms="loadingRooms" :rooms-loaded="roomsLoaded"
      :messages-loaded="messagesLoaded" :show-new-messages-divider="false" :menu-actions="menu_actions"
      @send-message="sendMessage" @menu-action-handler="menuActionHandler" />
  </div>
</template>

<script>
import ChatWindow from 'vue-advanced-chat'
import ChatCreateModal from '@/components/ChatModals/ChatCreateModal.vue'
import ChatInfosModal from '@/components/ChatModals/ChatInfosModal.vue'
import ChatEditModal from '@/components/ChatModals/ChatEditModal.vue'
import 'vue-advanced-chat/dist/vue-advanced-chat.css'

export default {
  components: {
    ChatWindow,
    ChatCreateModal,
    ChatInfosModal,
    ChatEditModal,
  },
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
      websocket: null,
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
            const creator = this.users.find(user => user.id == chat.creator_id)
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
          console.log(error);
          this.$toast.error(
            "Erreur lors du chargement des conversations"
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
        });
    },
    getUsersOfChat(users_ids) {
      const users = []
      users_ids.forEach((user) => {
        users.push({
          _id: user,
          username: this.users.find(elem => elem.id == user).email
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
        });
      this.websocketSetup(chat.room.roomId)
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
          console.log(error)
        })

    },
    async refreshChatList() {
      this.rooms = []
      await this.getRooms()
      await this.getLatestMessages()
    },
    openModal(state) {
      this.state = state
    },
    closeModal(refresh) {
      this.state = ""
      if (refresh)
        this.refreshChatList()
    },
    menuActionHandler({ action }) {
      switch (action.name) {
        case 'infos':
          return this.openModal("roomInfos")
        case 'edit':
          return this.openModal("editRoom")
      }
    },
    websocketSetup(chatId) {
      if (this.websocket != null)
        this.websocket.close();
      this.websocket = new WebSocket(
        `${process.env.VUE_APP_WEBSOCKET_REMOTE_URL}/${chatId}`
      );
      this.websocket.onopen = async () => {
        this.websocket.send(
          JSON.stringify({
            event: "login",
            token: `Bearer ${this.$cookies.get("token")}`,
          })
        );
        this.websocket.onmessage = async (data) => {
          let resp = JSON.parse(data.data);
          if (resp.status != 200) {
            this.$toast.error(resp.error);
            this.websocket.close();
          }
          if (resp.event == "message_received" || resp.event == "message_sent") {
            const tmp_date = Date.parse(resp.data.created_at)
            const date = new Date()
            date.setUTCSeconds(tmp_date)
            this.messages.push({
              disableActions: true,
              disableReactions: true,
              _id: resp.data.id,
              content: resp.data.content,
              senderId: resp.data.sender_id,
              timestamp: date.toLocaleTimeString(),
              username: this.users.find(user => user.id == resp.data.sender_id).email,
            })
          }
        };
      };
    },
    async sendMessage(params) {
      if (this.websocket != null && this.websocket.readyState == WebSocket.OPEN) {
        this.websocket.send(
          JSON.stringify({
            event: "send_message",
            chat_id: params.roomId,
            content: params.content,
            sender_id: this.currentUserId,
          })
        );
        this.message_to_send = "";
      }
    },
  },
}
</script>
