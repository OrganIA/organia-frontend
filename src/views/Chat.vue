<template>
  <div class="main-container">
    <div class="chat-list">
      <div class="chat-room">
        Chat Room <button class="cypress-add" @click="windowSate('create')">+</button>
      </div>
      <div
        v-for="chat in chats"
        :key="chat"
        class="chat-el cypress-chat-room"
        @click="getMessagesChat(chat.chat_id)"
      >
        <div class="chat-el-sub">
          <div class="chat-el-icon">
            {{ chat.chat_id }}
          </div>
          <h2 class="chat-el-desc">
            <i class="fas fa-id-card"></i> {{ chat.chat_id }}
          </h2>
        </div>
      </div>
    </div>
    <div class="chat-right-box">
      <div v-if="state == 'select'" class="state-select">
        <div class="chat-msg" ref="chat-msg">
          <div
            v-for="msg in msgs"
            :key="msg"
            class="all-messages"
          >
            <div v-if="msg.sender_id == this.id" class="text-right">
              <div class="my-msg">
                {{ msg.content }}
              </div>
              <br />
              <div class="my-info">
                {{ getTime(msg.created_at) }} - {{ getEmail(msg.sender_id) }}
              </div>
            </div>
            <div v-else class="text-left">
              <div class="other-msg">
                {{ msg.content }}
              </div>
              <br />
              <div class="other-info">
                {{ getTime(msg.created_at) }} - {{ getEmail(msg.sender_id) }}
              </div>
            </div>
          </div>
        </div>
        <div class="chat-section">
          <input class="chat-bar cypress-chat-box" />
          <button @click="sendMessage()" class="fas fa-paper-plane button-send-msg cypress-send-msg"></button>
        </div>
      </div>
      <div v-if="state == 'create'" class="create-chat-section">
        <div class="create-chat-top-bar">
          Fenêtre de creation d'une salle de chat
          <button
            class="chat-exit-button"
            @click="windowSate('none')"
          >
            X
          </button>
        </div>
        <div class="create-chat-left-list">
          <div class="user-list">Liste des utilisateurs</div>
          <input
            @input="filter"
            v-model="filterText"
            class="user-list-filter"
          />
          <div class="user-can-be-add">
            <div
              v-for="user in users_not_added_filtered"
              :key="user"
              class="chat-el cypress-invite"
              @click="inviteUsers(user)"
            >
              <div class="chat-el-sub">
                <div class="chat-el-icon">
                  {{ user.email[0] }}
                </div>
                <h2 class="chat-el-desc">
                  <i class="fas fa-id-card"></i> {{ user.email }}
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div class="create-chat-right-list">
          <div class="user-list">Liste des utilisateurs ajouté</div>
          <input
            @input="filterAdd"
            v-model="filterTextAdd"
            class="user-list-filter"
          />
          <div class="user-add">
            <div
              v-for="user in users_added_filtered"
              :key="user"
              class="chat-el"
              @click="uninviteUsers(user)"
            >
              <div class="chat-el-sub">
                <div class="chat-el-icon">
                  {{ user.email[0] }}
                </div>
                <h2 class="chat-el-desc">
                  <i class="fas fa-id-card"></i> {{ user.email }}
                </h2>
              </div>
            </div>
          </div>
          <button
            class="chat-create-button cypress-create"
            @click="createChat"
          >
            Créer une salle de chat
          </button>
        </div>
      </div>
      <div v-else></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Chat",
  emits: ["login"],
  data() {
    return {
      id: 0,
      chats: [],
      filterText: "",
      filterTextAdd: "",
      msgs: [],
      state: "none",
      users_backup: [],
      users_not_added_filtered: [],
      users_not_added: [],
      users_added: [],
      users_added_filtered: [],
    };
  },
  created() {
    this.getChats();
    this.getUsers();
  },
  methods: {
    reset() {
      this.id = 0;
      this.chats = [];
      this.filterText = "";
      this.filterTextAdd = "";
      this.msgs = [];
      this.state = "none";
      this.users_backup = [];
      this.users_not_added_filtered = [];
      this.users_not_added = [];
      this.users_added = [];
      this.users_added_filtered = [];
      this.getChats();
      this.getUsers();
    },
    getChats() {
      this.$http
        .get("/chats")
        .then((response) => {
          this.chats = response.data;
          this.id = this.$store.getters.getID;
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
    getUsers() {
      this.$http
        .get("/users")
        .then((response) => {
          this.users_backup = response.data.filter((element) => {
            return element.id != this.id;
          });
          this.$toast.success("Recuperation des Utilisateurs !");
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
    getMessagesChat(id) {
      this.$http
        .get(`/chats/messages/${id}`)
        .then((response) => {
          this.windowSate("select");
          this.msgs = response.data;
          this.$toast.success("Recuperation des messages réussi !");
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
    getEmail(sender_id) {
      return this.users_backup.filter((element) => {
        return element.id == sender_id;
      }).email;
    },
    getTime(data) {
      let date = new Date(data);
      let m = date.getMinutes();
      let h = date.getHours();
      let day = date.getDate();
      let month = date.getMonth();

      return h + ":" + m + " - " + day + "/" + month;
    },
    windowSate(state) {
      this.state = state;
      this.users_not_added_filtered = this.users_backup;
      this.users_not_added = this.users_backup;
    },
    inviteUsers(user) {
      this.users_added.push(user);
      if (this.filterTextAdd == "") {
        this.users_added_filtered.push(user);
      }
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
      if (this.filterText == "") {
        this.users_not_added_filtered.push(user);
      }
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
    sendMessage() {
      this.scrollToEnd();
    },
    scrollToEnd () {
      var content = this.$refs.chat_msg;
      content.scrollTop = content.scrollHeight;
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