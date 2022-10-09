<template>
  <div class="app-navbar-container">
    <ApplicationNavbar></ApplicationNavbar>
  </div>
  <div class="columns">
    <div class="column sidebar-column">
      <SideBar></SideBar>
    </div>
    <div class="column page-container">
      <div class="page-content">
        <div class="window-container">
          <section class="modals">
            <chat-create-modal :users="users" :currentUserId="currentUser.id"
              :class="{ 'is-invisible': (state !== 'newChat'), 'is-active': (state === 'newChat') }"
              @closeModal="closeModal" />
            <chat-infos-modal :users="currentChat.users" :chat="currentChat"
              :class="{ 'is-invisible': (state !== 'chatInfos'), 'is-active': (state === 'chatInfos') }"
              @closeModal="closeModal" />
            <chat-edit-modal :users="users" :currentUserId="currentUser.id" :usersAdded="currentChat.users"
              :chatName="currentChat.chatName" :chatId="currentChat.chatId"
              :class="{ 'is-invisible': (state !== 'editChat'), 'is-active': (state === 'editChat') }"
              @closeModal="closeModal" />
          </section>
          <div class="chat-section">
            <div class="chat-container">
              <div class="row">
                <section class="discussions">
                  <div class="discussion message-active" v-for="chat in chats" :key="chat.chatId"
                    @click="selectChat(chat)">
                    <div class="photo">
                      {{chat.chatName.charAt(0).toUpperCase()}}
                    </div>
                    <div class="desc-contact">
                      <p class="name">{{chat.chatName}}</p>
                    </div>
                  </div>
                </section>
                <section v-if="Object.keys(currentChat).length !== 0" class="chat">
                  <div class="header-chat">
                    <p class="name">{{currentChat.chatName}}</p>
                    <div class="actions right">
                      <i class="icon clickable fas fa-plus-circle " @click="openModal('newChat')"></i>
                      <i class="icon clickable fas fa-info" aria-hidden="true" @click="openModal('chatInfos')"></i>
                      <i v-if="currentChat.creator.id == currentUser.id" class="icon clickable fas fa-edit"
                        aria-hidden="true" @click="openModal('editChat')"></i>
                    </div>
                  </div>
                  <div class="messages-chat">
                    <div class="message-list">
                      <div class="message-container" v-for="message in messages" :key="message">
                        <div v-if="message.senderId == currentUser.id" class="sent">
                          {{message.content}}
                        </div>
                        <div v-else class="received">
                          <div>
                            de: {{message.username}}
                          </div>
                          <div>
                            {{message.content}}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="footer-chat">
                    <i class="icon fa fa-smile-o clickable" style="font-size:25pt;" aria-hidden="true"></i>
                    <input type="text" class="write-message" placeholder="Type your message here" v-model="input" />
                    <i class="fas fa-paper-plane clickable" @click="sendMessage"></i>
                  </div>
                </section>
                <section v-else class="chat">
                  <div class="header-chat">
                    <p class="name">Aucune conversation selectionnée</p>
                    <i class="icon clickable fas fa-plus-circle right" aria-hidden="true"
                      @click="openModal('newChat')"></i>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChatCreateModal from '@/components/ChatModals/ChatCreateModal.vue'
import ChatInfosModal from '@/components/ChatModals/ChatInfosModal.vue'
import ChatEditModal from '@/components/ChatModals/ChatEditModal.vue'
import SideBar from '@/components/SideBar.vue'
import ApplicationNavbar from '@/components/ApplicationNavbar.vue'

export default {
  components: {
    ChatCreateModal,
    ChatInfosModal,
    ChatEditModal,
    SideBar,
    ApplicationNavbar
  },
  data() {
    return {
      chats: [],
      messages: [],
      currentUser: {},
      latest_messages: [],
      users: [],
      state: "",
      input: "",
      currentChat: {},
      websocket: null,
    }
  },
  async created() {
    await this.getMe()
    await this.getUsers()
    await this.getChats()
    await this.getLatestMessages()
  },
  methods: {
    async getMe() {
      await this.$http
        .get("/users/me")
        .then((response) => {
          this.currentUser = response.data;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    async getChats() {
      await this.$http
        .get("/chats")
        .then((response) => {
          const chats = [];
          response.data.forEach(chat => {
            const creator = this.users.find(user => user.id == chat.creator_id)
            const users = this.getUsersOfChat(chat.users_ids)
            chats.push({
              chatId: chat.chat_id,
              chatName: chat.chat_name,
              users: users,
              creator: creator
            })
          });
          this.chats = JSON.parse(JSON.stringify(chats));
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
          id: user,
          username: this.users.find(elem => elem.id == user).email
        })
      })
      return users
    },
    async getMessages() {
      if (this.currentChat.creator.id == this.currentUserId) {
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
      this.messages = []
      await this.$http
        .get(`/chats/${this.currentChat.chatId}/messages`)
        .then((response) => {
          const messages = []
          response.data.forEach(message => {
            const tmp_date = Date.parse(message.created_at)
            const date = new Date()
            date.setUTCSeconds(tmp_date)
            messages.push({
              id: message.id,
              content: message.content,
              senderId: message.sender_id,
              timestamp: date.toLocaleTimeString(),
              username: this.users.find(user => user.id == message.sender_id).email,
            })
          })
          this.messages = messages
        })
        .catch((error) => {
          console.log(error);
        });
      this.websocketSetup(this.currentChat.chatId)
    },
    async getLatestMessages() {
      const chats = JSON.parse(JSON.stringify(this.chats))
      await this.$http
        .get("/chats/messages/latest")
        .then((response) => {
          response.data.forEach(message => {
            const tmp_date = Date.parse(message.created_at)
            const date = new Date()
            date.setUTCSeconds(tmp_date)
            chats.find(chat => chat.chatId == message.chat_id).lastMessage = {
              id: message.id,
              content: message.content,
              senderId: message.sender_id,
              timestamp: date.toLocaleTimeString(),
              username: this.users.find(user => user.id == message.sender_id).email,
            }
          })
          this.chats = chats
        })
        .catch((error) => {
          console.log(error)
        })

    },
    async refreshChatList() {
      this.chats = []
      await this.getChats()
      await this.getLatestMessages()
    },
    selectChat(chat) {
      this.currentChat = chat
      this.getMessages(chat)
    },
    openModal(state) {
      console.log(this.currentChat)
      this.state = state
    },
    closeModal(refresh) {
      this.state = ""
      if (refresh)
        this.refreshChatList()
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
            document.querySelector(".message-list").scrollTo(0, document.querySelector(".message-list").scrollHeight);
          }
        };
      };
    },
    async sendMessage() {
      if (this.websocket != null && this.websocket.readyState == WebSocket.OPEN) {
        this.websocket.send(
          JSON.stringify({
            event: "send_message",
            chat_id: this.currentChat.chatId,
            content: this.input,
            sender_id: this.currentUser.id,
          })
        );
        this.input = "";
      }
    },
  },
}
</script>

<style scoped>
.message-list {
  height: 100%;
  overflow-y: scroll;
  max-height: 60vh;
  max-width: 150vh;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.sent {
  float: right;
  background-color: #4f6ebd;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  max-width: 50%;
  color: white;
}

.received {
  float: left;
  background-color: #e6e6e6;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  max-width: 50%;
  overflow-wrap: break-word;
}

.discussions {
  width: 20%;
  height: 700px;
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.20);
  overflow: hidden;
  background-color: #87a3ec;
  display: inline-block;
}

.discussions .discussion {
  width: 100%;
  height: 90px;
  margin: 10px;
  background-color: #FAFAFA;
  border-bottom: solid 1px #E0E0E0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.discussions .discussion .photo {
  margin-left: 20px;
  display: block;
  width: 45px;
  height: 45px;
  background: #E6E7ED;
  -moz-border-radius: 50px;
  -webkit-border-radius: 50px;
  border-radius: 50px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}

.desc-contact {
  height: 43px;
  width: 50%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.discussions .discussion .name {
  margin: 0 0 0 20px;
  font-family: 'Montserrat', sans-serif;
  font-size: 11pt;
  color: #515151;
}

.discussions .discussion .message {
  margin: 6px 0 0 20px;
  font-family: 'Montserrat', sans-serif;
  font-size: 9pt;
  color: #515151;
}

.chat {
  width: calc(65% - 85px);
  max-height: 60vh;
}

.header-chat {
  background-color: #FFF;
  height: 90px;
  box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.100);
  display: flex;
  align-items: center;
}

.chat .header-chat .icon {
  margin-left: 30px;
  color: #515151;
  font-size: 14pt;
}

.chat .header-chat .name {
  margin: 0 0 0 20px;
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;
  font-size: 13pt;
  color: #515151;
}

.chat .header-chat .right {
  position: absolute;
  right: 40px;
}

.footer-chat {
  width: calc(65% - 66px);
  height: 80px;
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  background-color: transparent;
  border-top: 2px solid #EEE;

}

.chat .footer-chat .icon {
  margin-left: 30px;
  color: #C0C0C0;
  font-size: 14pt;
}

.chat .footer-chat .send {
  color: #fff;
  background-color: #4f6ebd;
  position: absolute;
  right: 50px;
  padding: 12px 12px 12px 12px;
  border-radius: 50px;
  font-size: 14pt;
}

.chat .footer-chat .name {
  margin: 0 0 0 20px;
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;
  font-size: 13pt;
  color: #515151;
}

.chat .footer-chat .right {
  position: absolute;
  right: 40px;
}

.write-message {
  border: none !important;
  width: 60%;
  height: 50px;
  margin-left: 20px;
  padding: 10px;
}

.footer-chat *::-webkit-input-placeholder {
  color: #C0C0C0;
  font-size: 13pt;
}

.footer-chat input *:-moz-placeholder {
  color: #C0C0C0;
  font-size: 13pt;
}

.footer-chat input *::-moz-placeholder {
  color: #C0C0C0;
  font-size: 13pt;
  margin-left: 5px;
}

.footer-chat input *:-ms-input-placeholder {
  color: #C0C0C0;
  font-size: 13pt;
}

.clickable {
  cursor: pointer;
}

.icon {
  color: #4f6ebd
}
</style>