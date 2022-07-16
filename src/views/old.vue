<template>
  <div class="main-container-chat">
    <div class="chat-list">
      <div class="chat-room">
        <p>Salle de Tchat</p>
        <button class="add-chat-room cypress-add" @click="windowSate('create')"><i
            class="far fa-plus-square"></i></button>
      </div>
      <div v-for="chat in chats" :key="chat" class="chat-el cypress-chat-room" @click="getChatsByID(chat.chat_id)">
        <div class="chat-el-sub">
          <div class="chat-el-icon">
            {{ profilePicture(chat.chat_name) }}
          </div>
          <h2 class="chat-el-desc">
            <i class="fas fa-id-card"></i> {{ chat.chat_name }}
          </h2>
          <h2 class="chat-el-message">
            <i class="fas fa-comment"></i> {{ getLatestMessageById(chat.chat_id) }}
          </h2>
        </div>
      </div>
    </div>
    <div class="chat-right-box">
      <div v-if="state == 'select'" class="state-select">
        <div class="chat-room-name">
          <div class="chat-room-name-logo"> {{ profilePicture(this.selected_chat.chat_name) }} </div>
          <p class="chat-room-name-text"> {{ this.selected_chat.chat_name }} </p>
          <div v-if="selected_chat.creator_id == id">
            <button @click="windowSate('modif')" class="fas fa-cog button-setting"></button>
          </div>
          <div v-else>
            <button @click="windowSate('info')" class="fas fa-info-circle button-setting"></button>
          </div>
        </div>
        <div class="chat-msg" ref="chat-msg">
          <div v-for="msg in messages_list" :key="msg" class="all-messages">
            <div v-if="msg.sender_id == this.id" class="text-right cypress-message">
              <div class="my-msg">
                <p>{{ msg.content }}</p>
              </div>
              <br />
              <div class="my-info">
                <p>{{ getTime(msg.created_at) }}</p>
              </div>
            </div>
            <div v-else class="text-left cypress-message">
              <div class="other-profile">{{ profilePicture(getEmail(msg.sender_id)) }}</div>
              <div class="other-msg">
                <p>{{ msg.content }}</p>
              </div>
              <br />
              <div class="other-info">
                <p>{{ getTime(msg.created_at) }} - {{ getEmail(msg.sender_id) }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="chat-section">
          <input v-model="message_to_send" @keypress.enter="sendMessage" class="chat-bar cypress-chat-box"
            placeholder="Démarrer un nouveau message" />
          <button @click="sendMessage()" class="fa fa-paper-plane button-send-msg cypress-send-msg"></button>
        </div>
      </div>
      <div v-if="state == 'info'">
        <div class="chat-room-name">
          <div class="chat-room-name-logo"> {{ profilePicture(this.selected_chat.chat_name) }} </div>
          <p class="chat-room-name-text"> {{ this.selected_chat.chat_name }} </p>
          <button class="chat-exit-button-info" @click="windowSate('none')"><i class="fas fa-times"></i></button>
        </div>
        <h1>
          Administrateur du Tchat
          <br>
          {{ selected_chat_info.creator_id }}
        </h1>
        <div class="list-info">
          <div v-for="info_users in selected_chat_info.users" :key="info_users" class="chat-users-selection">
            <div class="chat-el-sub">
              <div class="chat-users-selection-icon">
                <p>{{ info_users[0] }}</p>
              </div>
              <h2 class="chat-users-selection-desc">
                <i class="fas fa-id-card"></i> {{ info_users }}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <!-- WINDOW: STATE = CREATE OR MODIF -->
      <div v-if="state == 'create' || state == 'modif'" class="create-chat-section">
        <div class="create-chat-top-bar">
          <p v-if="state == 'create'">Fenêtre de creation d'une salle de tchat</p>
          <p v-else>Fenêtre de modification d'une salle de tchat</p>
          <button class="chat-exit-button" @click="windowSate('none')"><i class="fas fa-times"></i></button>
          <div v-if="state == 'modif'" class="chat-remove-button-position">
            <button class="chat-remove-button" @click="removeChat"><i class="fas fa-trash-alt"></i></button>
          </div>
        </div>
        <div class="create-chat-left-list">
          <div class="user-list">Liste des utilisateurs</div>
          <input @input="filter" v-model="filterText" class="user-list-filter input mr-6"
            placeholder="Recherche d'utilisateurs" />
          <div class="user-can-be-add">
            <div v-for="user in users_not_added_filtered" :key="user" class="chat-users-selection cypress-invite"
              @click="inviteUsers(user)">
              <div class="chat-el-sub">
                <div class="chat-users-selection-icon">
                  <p>{{ user.email[0] }}</p>
                </div>
                <h2 class="chat-users-selection-desc">
                  <i class="fas fa-id-card"></i> {{ user.email }}
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div class="create-chat-right-list">
          <div class="user-list-r">Liste des utilisateurs ajouté</div>
          <input @input="filterAdd" v-model="filterTextAdd" class="user-list-filter-r input mr-6"
            placeholder="Recherche d'utilisateurs" />
          <div class="user-add">
            <div v-for="user in users_added_filtered" :key="user" class="chat-users-selection"
              @click="uninviteUsers(user)">
              <div class="chat-el-sub">
                <div class="chat-users-selection-icon">
                  {{ user.email[0] }}
                </div>
                <h2 class="chat-users-selection-desc">
                  <i class="fas fa-id-card"></i> {{ user.email }}
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div class="center-chat-creation-interaction">
          <input v-model="created_chat_name" class="create-chat-name input mr-6"
            placeholder="Nom de la salle de chat" />
          <button v-if="this.state == 'create'"
            class="chat-create-button button is-info cypress-to-add mb-6 cypress-create" @click="createChat">
            Créer une salle de tchat
          </button>
          <button v-else class="chat-create-button button is-info cypress-to-add mb-6 cypress-create"
            @click="changeChat">
            Modifier une salle de tchat
          </button>
        </div>
      </div>
      <!-- WINDOW: STATE = NONE -->
      <div v-if="state == 'none'">
        <!-- <h1>Créer un Groupe de discution</h1>
        <button class="add-chat-room-intro cypress-add" @click="windowSate('create')">+</button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "chat",
  emits: ["login"],
  data() {
    return {
      id: 0,
      chats: [],
      latest_messages: [],
      selected_chat: {},
      selected_chat_info: {},
      filterText: "",
      filterTextAdd: "",
      messages_list: [],
      message_to_send: "",
      state: "none",
      users_backup: [],
      users_not_added_filtered: [],
      users_not_added: [],
      users_added: [],
      users_added_filtered: [],
      created_chat_name: [],
      websocket: null,
    };
  },
  created() {
    this.getMe();
    this.getChats();
    this.getUsers();
  },
  updated() {
    if (this.state == "select") this.scrollToEnd();
  },
  methods: {
    reset() {
      this.getMe();
      this.chats = [];
      this.latest_messages = [];
      this.filterText = "";
      this.filterTextAdd = "";
      this.messages_list = [];
      this.message_to_send = "";
      this.state = "none";
      this.users_backup = [];
      this.users_not_added_filtered = [];
      this.users_not_added = [];
      this.users_added = [];
      this.users_added_filtered = [];
      this.getChats();
      this.getUsers();
    },
    async getChats() {
      this.$http
        .get("/chats")
        .then((response) => {
          this.chats = response.data;
          this.getLatestMessages();
          this.$toast.success("Recuperation de la messagerie réussite !");
          setTimeout(this.$toast.clear, 3000);
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
      this.$http
        .get("/chats/messages/latest")
        .then((response) => {
          this.latest_messages = response.data;
        })
        .catch((error) => {
          this.$toast.error(
            "Erreur lors de la connexion : " + error.response.data.detail
          );
          setTimeout(this.$toast.clear, 3000);
        })
    },
    getLatestMessageById(chat_id) {
      var tmp = this.latest_messages.find(element => element.chat_id == chat_id);
      if (tmp)
        return tmp.content
      return ""
    },
    async getChatsByID(id) {
      this.$http
        .get(`/chats/${id}`)
        .then((response) => {
          this.selected_chat = response.data;
          this.getMessagesChat(id);
        })
        .catch((error) => {
          this.$toast.error(
            "Erreur lors de la connexion : " + error.response.data.detail
          );
          setTimeout(this.$toast.clear, 3000);
        })
    },
    async getUsers() {
      this.$http
        .get("/users")
        .then((response) => {
          this.users_backup = response.data.filter((element) => {
            return element.id != this.id;
          });
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error(
            "Erreur lors de la connexion : " + error.response.data.detail
          );
          setTimeout(this.$toast.clear, 3000);
        });
    },
    async getMe() {
      this.$http
        .get("/users/me")
        .then((response) => {
          this.id = response.data.id;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    getMessagesChat(id) {
      this.message_to_send = "";
      this.$http
        .get(`/chats/${id}/messages`)
        .then((response) => {
          this.windowSate("select");
          this.messages_list = response.data;
          this.websocketSetup();
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error(
            "Erreur lors de la connexion : " + error.response.data.detail
          );
          setTimeout(this.$toast.clear, 3000);
        });
    },
    getEmail(sender_id) {
      let va = this.users_backup.find((element) => element.id == sender_id);
      if (va) {
        return va.email;
      } else {
        return this.$store.getters.getEmail;
      }
    },
    getTime(data) {
      let date = new Date(data);
      let m = date.getMinutes();
      let h = date.getHours();
      let day = date.getDate();
      let month = date.getMonth();
      return `${h}:${m} - ${day}/${month + 1}`;
    },
    windowSate(state) {
      if (state == "info") {
        var info_list_users = []
        this.selected_chat.users_ids.forEach((element_ids) => {
          if (element_ids != this.selected_chat.creator_id) {
            this.users_backup.forEach((element_b_ids) => {
              if (element_ids == element_b_ids.id) {
                info_list_users.push(element_b_ids.email);
              }
            })
          }
        })
        this.selected_chat_info.users = info_list_users
        this.users_backup.forEach((element_b_ids_s) => {
          if (element_b_ids_s.id == this.selected_chat.creator_id)
            this.selected_chat_info.creator_id = element_b_ids_s.email;
        })
        this.state = "info";
        return;
      }
      if (state == "modif") {
        this.users_not_added = this.users_backup.slice();
        this.users_added = [];
        this.users_not_added.forEach((element) => {
          this.selected_chat.users_ids.forEach((element_b) => {
            if (element.id == element_b)
              this.inviteUsers(element);
          })
        })
        this.users_not_added_filtered = this.users_not_added.slice();
        this.users_added_filtered = this.users_added.slice();
        this.created_chat_name = this.selected_chat.chat_name;
        this.state = "modif";
        return;
      } if (state == "create") {
        this.selected_chat.chat_id = 0;
        this.state = 'create';
        this.created_chat_name = "";
        this.users_not_added_filtered = this.users_backup.slice();
        this.users_not_added = this.users_backup.slice();
        this.users_added = [];
        this.users_added_filtered = [];
        return;
      } else {
        if (Object.keys(this.selected_chat).length === 0) {
          this.state = 'select';
        } else {
          this.state = state;
        }
        this.users_not_added_filtered = this.users_backup.slice();
        this.users_not_added = this.users_backup.slice();
        this.created_chat_name = "";
        this.users_added = [];
        this.users_added_filtered = [];
        this.selected_chat_info = {};
      }
    },
    inviteUsers(user) {
      this.users_added.push(user);
      if (this.filterTextAdd == "")
        this.users_added_filtered.push(user);
      this.users_not_added_filtered = this.users_not_added_filtered.filter(
        (element) => {
          return element != user;
        }
      );
      this.users_not_added = this.users_not_added.filter((element) => {
        return element != user;
      });
    },
    uninviteUsers(user) {
      this.users_not_added.push(user);
      if (this.filterText == "")
        this.users_not_added_filtered.push(user);
      this.users_added_filtered = this.users_added_filtered.filter(
        (element) => {
          return element != user;
        }
      );
      this.users_added = this.users_added.filter((element) => {
        return element != user;
      });
    },
    createChat() {
      if (this.users_added.length == 0) {
        this.$toast.error(
          "Erreur: vous n'avez ajouté aucun utilisateur a la conversation"
        );
      }
      let body = {
        users_ids: [],
      };
      body.users_ids.push({
        user_id: this.id,
      });
      this.users_added.forEach((element) => {
        body.users_ids.push({
          user_id: element.id,
        });
      });
      this.$http
        .post("/chats", {
          users_ids: body.users_ids,
          chat_name: this.created_chat_name,
          creator_id: this.id,
        })
        .then(() => {
          this.$toast.success("Creation de la salle de Chat réussi !");
          setTimeout(this.$toast.clear, 3000);
          this.reset();
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error(
            "Erreur lors de la connexion : " + error.response.data.detail
          );
          setTimeout(this.$toast.clear, 3000);
        });
    },
    changeChat() {
      if (this.users_added.length == 0) {
        this.$toast.error(
          "Erreur: vous n'avez ajouté aucun utilisateur a la conversation"
        );
      }
      let body = {
        users_ids: [],
      };
      body.users_ids.push({
        user_id: this.id,
      });
      this.users_added.forEach((element) => {
        body.users_ids.push({
          user_id: element.id,
        });
      });
      this.$http
        .post(`/chats/${this.selected_chat.chat_id}`, {
          users_ids: body.users_ids,
          chat_name: this.created_chat_name,
        })
        .then(() => {
          this.$toast.success("Modification de la salle de Chat réussi !");
          setTimeout(this.$toast.clear, 3000);
          this.reset();
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error(
            "Erreur lors de la connexion : " + error.response.data.detail
          );
          setTimeout(this.$toast.clear, 3000);
        });
    },
    removeChat() {
      this.$http
        .delete(`/chats/${this.selected_chat.chat_id}`)
        .then(() => {
          this.$toast.success("Suppression de la salle de Chat réussi !");
          setTimeout(this.$toast.clear, 3000);
          this.reset();
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error(
            "Erreur lors de la connexion : " + error.response.data.detail
          );
          setTimeout(this.$toast.clear, 3000);
        });
    },
    filter() {
      if (this.filterText == "") {
        this.users_not_added_filtered = this.users_not_added;
        return;
      }
      this.users_not_added_filtered = this.users_not_added.filter((el) => {
        return el.email.includes(this.filterText);
      });
    },
    filterAdd() {
      if (this.filterTextAdd == "") {
        this.users_added_filtered = this.users_added;
        return;
      }
      this.users_added_filtered = this.users_added.filter((el) => {
        return el.email.includes(this.filterTextAdd);
      });
    },
    websocketSetup() {
      // if you test the client with the back in local don't forget to replace 
      // "process.env.VUE_APP_WEBSOCKET_REMOTE_URL" in "process.env.VUE_APP_WEBSOCKET_LOCAL_URL"
      if (this.websocket == null) {
        this.websocket = new WebSocket(
          `${process.env.VUE_APP_WEBSOCKET_REMOTE_URL}/${this.selected_chat.chat_id}`
        );
      } else {
        this.websocket.close();
        this.websocket = new WebSocket(
          `${process.env.VUE_APP_WEBSOCKET_REMOTE_URL}/${this.selected_chat.chat_id}`
        );
      }
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
          switch (resp.event) {
            case "message_received":
              await this.messages_list.push(resp.data);
              this.scrollToEnd();
              break;
            case "message_sent":
              await this.messages_list.push(resp.data);
              this.scrollToEnd();
              break;
          }
        };
      };
    },
    async sendMessage() {
      if (
        this.message_to_send != "" &&
        this.websocket != null &&
        this.websocket.readyState == WebSocket.OPEN
      ) {
        this.websocket.send(
          JSON.stringify({
            event: "send_message",
            chat_id: this.selected_chat.chat_id,
            content: this.message_to_send,
            sender_id: this.id,
          })
        );
        this.message_to_send = "";
      }
    },
    async scrollToEnd() {
      var content = this.$refs["chat-msg"];
      content.scrollTop = content.scrollHeight;
    },
    profilePicture(username) {
      return (username.charAt(0).toUpperCase());
    },
  },
  watch: {
    filterText() {
      this.filter();
    },
    filterTextAdd() {
      this.filterAdd();
    },
  },
};
</script>

<style scoped>

.main-container-chat {
    display: flex;
    flex-direction: row;
    flex: 1;
    width: 100vw;
}

.chat-el {
    width: 100%;
    height: 100px;
    border-bottom: solid 1px #707070;
    cursor: pointer;
    background-image: none;
}

.chat-el:hover {
    width: 100%;
    height: 100px;
    border-bottom: solid 1px #707070;
    cursor: pointer;
    background-image: linear-gradient(to right, rgba(73, 138, 254, 0.6), rgba(37, 69, 127, 0));
}

.chat-list {
    z-index: 1;
    position: relative;
    left: 0px;
    top: 0px;
    height: 680px;
    width: 340px;
    border: solid 1px #707070;
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
    background-color: white;
}

.chat-list::-webkit-scrollbar {
    display: none;
}

.button-send-msg {
    position: relative;
    right: -20px;
    top: 1px;
    height: 25px;
    width: 30px;
    background: transparent;
    border: none;
    color: #071F49;
}

.button-send-msg:hover {
    position: relative;
    top: 1px;
    height: 25px;
    width: 30px;
    background: transparent;
    border: none;
    color: #071F49;
    cursor: pointer;
}

.chat-msg {
    position: relative;
    left: 0px;
    top: 0px;
    height: 590px;
    width: 100%;
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.chat-msg::-webkit-scrollbar {
    display: none;
    /* for Chrome, Safari, and Opera */
}

.user-can-be-add {
    position: absolute;
    left: 0px;
    top: 100px;
    height: 420px;
    width: 380px;
    overflow-y: scroll;
    overflow-x: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.user-can-be-add::-webkit-scrollbar {
    display: none;
    /* Safari and Chrome */
}

.user-add {
    position: absolute;
    right: 0px;
    top: 100px;
    height: 420px;
    width: 380px;
    overflow-y: scroll;
    overflow-x: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.user-add::-webkit-scrollbar {
    display: none;
    /* Safari and Chrome */
}

.chat-users-selection {
    position: relative;
    left: 20px;
    top: 0px;
    width: 340px;
    height: 30px;
    margin-top: 20px;
    border: solid 1px #707070;
    border-radius: 30px;
    cursor: pointer;
    background-image: none;
}

.chat-users-selection:hover {
    background-image: linear-gradient(to right, rgba(73, 138, 254, 0.6), rgba(37, 69, 127, 0));
}

.chat-users-selection-icon {
    position: relative;
    left: -1px;
    top: -1px;
    width: 30px;
    height: 30px;
    border: solid 1px #707070;
    background-color: #071f49;
    border-radius: 30px;
    font-family: TimesNewRoman;
    font-size: 22px;
    text-align: center;
    color: #fbfcff;
    line-height: 1.4;
    text-transform: uppercase;
}

.chat-users-selection-desc {
    position: relative;
    left: 40px;
    top: -27px;
    height: 20px;
    width: 240px;
    font-size: 15px;
}

.chat-room {
    position: relative;
    width: 340px;
    height: 60px;
    text-align: left;
    padding-left: 60px;
    border-bottom: solid 1px #707070;
    font-family: HelveticaNeue;
    font-size: 30px;
    background: white;
    font-weight: 600;
    line-height: 2;
}

.chat-el-sub {
    position: relative;
    left: 0px;
    top: 0px;
    width: 0px;
    height: 0px;
    text-align: left;
}

.chat-el-icon {
    position: relative;
    left: 20px;
    top: 15px;
    width: 70px;
    height: 70px;
    border: solid 1px #707070;
    background-color: #071f49;
    border-radius: 35px;
    font-family: TimesNewRoman;
    font-size: 52px;
    text-align: center;
    color: #fbfcff;
    line-height: 1.4;
    text-transform: uppercase;
}

.chat-el-desc {
    position: relative;
    left: 100px;
    top: -45px;
    height: 20px;
    width: 240px;
}

.chat-el-message {
    position: relative;
    left: 100px;
    top: -35px;
    height: 40px;
    width: 220px;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 240px;
    max-height: 39px;
    font-size: 12px;
    overflow: hidden;
}

.chat-right-box {
    z-index: 0;
    position: relative;
    left: -1px;
    top: 0px;
    height: 680px;
    width: 760px;
    border: solid 1px #707070;
    overflow: hidden;
}

.my-msg {
    display: inline-block;
    position: relative;
    top: 10px;
    right: 20px;
    background: #498AFE;
    color: white;
    border-radius: 4px;
    width: auto;
    min-width: 50px;
    max-width: 360px;
    margin-bottom: 20px;
    padding: 5px;
    text-align: left;
}

.my-info {
    display: inline-block;
    position: relative;
    top: -10px;
    right: 12px;
    color: #8e8e8e;
    font-size: 15px;
}

.other-msg {
    display: inline-block;
    position: relative;
    top: 10px;
    left: 10px;
    background: #8e8e8e;
    color: white;
    border-radius: 4px;
    width: auto;
    min-width: 50px;
    max-width: 360px;
    margin-bottom: 20px;
    padding: 5px;
    text-align: left;
}

.other-profile {
    display: inline-block;
    position: relative;
    top: 16px;
    right: -5px;
    background: #071f49;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-family: 'Times New Roman', Times, serif;
    color: white;
    text-align: center;
    font-weight: 600;
    font-size: 30px;
}

.other-info {
    display: inline-block;
    position: relative;
    top: -10px;
    left: 12px;
    color: #8e8e8e;
    font-size: 15px;
}

.chat-section {
    position: relative;
    left: -1px;
    top: 0px;
    height: 29px;
    width: 760px;
    border-top: solid 1px #707070;
    background: linear-gradient(to left, rgba(255, 255, 255, 0), rgba(7, 31, 73, 13%));
}

.chat-bar {
    position: relative;
    left: -18px;
    top: -1px;
    width: 90%;
    height: 30px;
    border: none;
    background: transparent;
}

.create-chat-section {
    z-index: 12;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    height: 600px;
}

.create-chat-top-bar {
    height: 50px;
    width: 100%;
    text-align: center;
    line-height: 50px;
}

.create-chat-left-list {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: absolute;
    left: -1px;
    top: 160px;
    width: 361px;
    height: 518px;
}

.user-list {
    width: 380px;
    height: 52px;
    text-align: center;
    line-height: 52px;
}

.user-list-r {
    width: 380px;
    height: 52px;
    text-align: center;
    line-height: 52px;
}

.user-list-filter {
    display: table-cell;
    position: absolute;
    left: 20px;
    top: 51px;
    width: 340px !important;
    height: 50px;
    vertical-align: middle;
    margin: 0px !important;
    padding: 5px;
    text-align: center;
}

.user-list-filter-r {
    display: table-cell;
    position: absolute;
    right: 20px;
    top: 51px;
    width: 340px;
    height: 50px;
    vertical-align: middle;
    margin: 0px !important;
    padding: 5px;
    text-align: center;
}

.create-chat-right-list {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: absolute;
    right: -1px;
    top: 160px;
}

.chat-create-button {
    text-align: center;
    margin-top: 15px;
}

.chat-exit-button {
    position: relative;
    right: -360px;
    top: -50px;
    height: 40px;
    width: 40px;
    background: white;
    font-size: 25px;
    border: none;
    cursor: pointer;
}

.chat-exit-button:hover {
    top: -48px;
}

.chat-remove-button {
    position: relative;
    right: 0px;
    top: 0px;
    height: 40px;
    width: 40px;
    background: white;
    font-size: 25px;
    border: none;
    cursor: pointer;
}

.chat-remove-button:hover {
    top: -2px;
}

.chat-remove-button-position {
    position: absolute;
    left: 10px;
    top: 10px;
    height: 40px;
    width: 40px;
}

.chat-exit-button-info {
    position: absolute;
    top: 20px;
    left: 710px;
    height: 20px;
    width: 30px;
    background: transparent;
    border: none;
    color: black;
    cursor: pointer;
}

.chat-exit-button-info:hover {
    top: 22px;
}

.all-messages {
    position: relative;
    top: 0px;
    left: 0px;
}

.state-select {
    z-index: 10;
}

.text-right {
    text-align: right;
}

.text-left {
    text-align: left;
}

.add-chat-room {
    position: absolute;
    right: 25px;
    top: 13px;
    height: 30px;
    width: 30px;
    background: transparent;
    font-weight: 600;
    font-size: 30px;
    border: none;
    cursor: pointer;
}

.add-chat-room:hover {
    top: 15px;
}

.add-chat-room-intro {
    position: absolute;
    right: 330px;
    top: 80px;
    height: 61px;
    width: 60px;
    background: white;
    border: 1px solid #707070;
    font-weight: 600;
    font-size: 30px;
}

.add-chat-room-intro:hover {
    background: linear-gradient(315deg, #498bfec4, #498bfe62, transparent);
    cursor: pointer;
}

.create-chat-name {
    text-align: center;
    display: inline-block;
    width: 600px;
    margin: 0px !important;
    padding: 5px;
}

.center-chat-creation-interaction {
    position: absolute;
    left: 0px;
    top: 50px;
    height: 100px;
    width: 758px;
    text-align: center;
}

.chat-room-name {
    z-index: 4;
    display: flex;
    flex-direction: row;
    position: relative;
    left: 0px;
    top: 0px;
    height: 59px;
    width: 100%;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.5);
    text-align: left;
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(3px);
}

.chat-room-name-logo {
    position: relative;
    left: 20px;
    top: 10px;
    height: 40px;
    width: 40px;
    font-weight: 600;
    font-size: 30px;
    color: #fbfcff;
    background: #071f49;
    border-radius: 35px;
    font-family: TimesNewRoman;
    text-align: center;
    line-height: 1.4;
}

.chat-room-name-text {
    position: relative;
    left: 40px;
    top: 7px;
    font-weight: 600;
    font-size: 30px;
}

.button-setting {
    position: absolute;
    top: 20px;
    left: 710px;
    height: 20px;
    width: 30px;
    background: transparent;
    border: none;
    color: black;
}

.button-setting:hover {
    position: absolute;
    top: 22px;
    left: 710px;
    height: 20px;
    width: 30px;
    background: transparent;
    border: none;
    cursor: pointer;
}

.list-info {
    position: absolute;
    left: 200px;
    top: 200px;
    height: 460px;
    width: 400px;
    border: 1px solid #707070;
    overflow-y: scroll;
}

</style>
