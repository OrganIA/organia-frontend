<template>
  <h1></h1>
  <div class="main-container">
    <div class="chat_list">
      <div class="chat_room">
        Chat Room <button @click="WindowChatRoom(true)">+</button>
      </div>
      <!-- <div v-for="chat in chats" :key="chat" class="chat_el" @click="getMessagesChat(chat.id)">
            <div v-if="this.$store.getters.getEmail == chat.user_a.email" style="position:relative;left:0px;top:0px;width:0px;height:0px;text-align:left;">
                <div style="position:relative;left:20px;top:15px;width: 70px;height: 70px;border: solid 1px #707070;background-color: #071f49;border-radius: 35px;font-family: TimesNewRoman;font-size: 52px;text-align: center;color: #fbfcff;line-height: 1.4;text-transform: uppercase;">
                   {{ getSymbol(chat.user_b.email) }}
                </div>
                <h2 style="position:relative;left:100px;top:-50px;height:20px;width:240px;"><i class="fas fa-id-card"></i> {{ chat.user_b.email }}</h2>
            </div> 
            <div v-else style="position:relative;left:0px;top:0px;width:0px;height:0px;text-align:left;">
                <div style="position:relative;left:20px;top:15px;width: 70px;height: 70px;border: solid 1px #707070;background-color: #071f49;border-radius: 35px;font-family: TimesNewRoman;font-size: 52px;text-align: center;color: #fbfcff;line-height: 1.4;text-transform: uppercase;">
                   {{ getSymbol(chat.user_a.email) }}
                </div>
                <h2 style="position:relative;left:100px;top:-50px;height:20px;width:240px;"><i class="fas fa-id-card"></i> {{ chat.user_a.email }}</h2>
            </div>
        </div> -->
      <div
        v-for="chat in chats"
        :key="chat"
        class="chat_el"
        @click="getMessagesChat(chat.chat_id)"
      >
        <div class="chat_el_sub">
          <div class="chat_el_icon">
            {{ chat.chat_id }}
          </div>
          <h2 class="chat_el_desc">
            <i class="fas fa-id-card"></i> {{ chat.chat_id }}
          </h2>
        </div>
      </div>
    </div>
    <div class="chat_right_box">
      <div v-if="this.selected == true" style="z-index: 10">
        <div class="chat_msg">
          <div
            v-for="msg in msgs"
            :key="msg"
            style="position: relative; top: 0px; left: 0px"
          >
            <div v-if="msg.sender_id == this.id" style="text-align: right">
              <div class="my_msg">
                {{ msg.content }}
              </div>
              <br />
              <div class="my_info">
                {{ getTime(msg.created_at) }} - {{ getEmail(msg.sender_id) }}
              </div>
            </div>
            <div v-else style="text-align: left">
              <div class="other_msg">
                {{ msg.content }}
              </div>
              <br />
              <div class="other_info">
                {{ getTime(msg.created_at) }} - {{ getEmail(msg.sender_id) }}
              </div>
            </div>
          </div>
        </div>
        <div class="chat_section">
          <input
            @input="msgSend"
            v-model="filterText"
            class="chat_bar"
          />
          <button class="fas fa-paper-plane button_send_msg"></button>
        </div>
      </div>
        <div v-if="this.create == true" class="create_chat_section">
            <div class="create_chat_top_bar">
                Fenêtre de creation d'une salle de chat
                <button
                  style="position: relative; right: -160px; top: 0px"
                  @click="WindowChatRoom(false)"
                >
                  X
                </button>
            </div>
        <div class="create_chat_left_list">
            <div class="user_list">
              Liste des utilisateurs
            </div>
        <input @input="filter" v-model="filterText" class="user_list_filter"/>
          <!-- -->
        
        <div class="user_can_be_add">
          <div
            v-for="(user, index) in users"
            :key="user"
            class="chat_el"
            @click="inviteUsers(user, index)"
          >
            <div class="chat_el_sub">
              <div class="chat_el_icon">
                {{ getSymbol(user.email) }}
              </div>
              <h2 class="chat_el_desc">
                <i class="fas fa-id-card"></i> {{ user.email }}
              </h2>
            </div>
          </div>
        </div>
        </div>

        <div class="create_chat_right_list">
        <div class="user_list">
          Liste des utilisateurs ajouté
        </div>
        <input @input="filterAdd" v-model="filterTextAdd" class="user_list_filter"/>

        <!---->
        
        <div class="user_add">
          <div
            v-for="(add_user, index) in add_users"
            :key="add_user"
            class="chat_el"
            @click="uninviteUsers(add_user, index)"
          >
            <div class="chat_el_sub">
              <div class="chat_el_icon">
                {{ getSymbol(add_user.email) }}
              </div>
              <h2 class="chat_el_desc">
                <i class="fas fa-id-card"></i> {{ add_user.email }}
              </h2>
            </div>
          </div>
        </div>

        
        <!-- -->
        <button
          style="position: absolute; left: -110px; top: 480px"
          @click="createChat"
        >
          Créer une salle de chat
        </button> 
        <!-- -->
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Chat",
  data() {
    return {
      id: 0,
      chats: {},
      user_backups: {},
      users_list: [],
      add_users_list: [],
      users: {},
      add_users: [],
      all_users: {},
      selected: false,
      create: false,
      msgs: {},
      msgSend: [],
      filterText: "",
      filterTextAdd: "",
    };
  },
  created() {
    this.getChats();
    this.getUsers();
  },
  methods: {
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
          this.users = response.data;
          this.all_users = response.data.map(all_user => Object.assign({}, all_user));
          let i = 0;

          for (i; i < this.users.length; i++) {
            if (this.id == this.users[i].id) break;
          }
          this.users.splice(i, 1);
          this.user_backups = this.users.map(user_backup => Object.assign({}, user_backup));
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
    getEmail(sender_id) {
      for (let i in this.all_users) {
        if (this.all_users[i].id == sender_id) {
          return (this.all_users[i].email);
        }
      }
      return (null);
    },
    getSymbol(str) {
      return str[0];
    },
    getTime(data) {
        let date = new Date(data);
        let m = date.getMinutes();
        let h = date.getHours();
        let day = date.getDate();
        let month = date.getMonth();

        return(h + ":" + m + " - " + day + "/" + month);
    },
    WindowChatRoom(state) {
        this.create = state;
        if (state == true) {
            this.selected = false;
            this.users = this.user_backups.map(user_backup => Object.assign({}, user_backup));
        } else {
            this.selected = true;
            this.filterText = "";
            this.filterTextAdd = "";
            this.users_list = {};
            this.add_users_list = {};
            this.add_users = [];
            this.users = this.user_backups.map(user_backup => Object.assign({}, user_backup));
        }
    },
    inviteUsers(user, index) {
      this.add_users.push(user);
      this.users.splice(index, 1);
      this.users_list = this.users;
      this.add_users_list = this.add_users;
    },
    uninviteUsers(user, index) {
      this.users.push(user);
      this.add_users.splice(index, 1);
      this.users_list = this.users;
      this.add_users_list = this.add_users;
    },
    createChat() {
      if (this.add_users.length == 0) return;
      let body = {
          users_ids: []
      };
      body.users_ids.push({
            user_id: this.id
        });
      this.add_users.forEach((element) => {
        body.users_ids.push({
            user_id: element.id
        });
      })
      this.$http
        .post("/chats", {
            users_ids: body.users_ids
        })
        .then(() => {
            this.create = false;
            this.add_users = {};
            this.$toast.success("Creation de la salle de Chat réussi !");
            setTimeout(this.$toast.clear, 3000);
            this.getChats();
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
          this.selected = true;
          if (this.create == true) {
            this.create = false;
            this.filterText = "";
            this.filterTextAdd = "";
            this.users_list = {};
            this.add_users_list = {};
            this.add_users = [];
            this.users = this.user_backups.map(user_backup => Object.assign({}, user_backup));
          }
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
    filter() {
        if (this.filterText == "") {
          this.users = this.users_list;
          return;
        }
        this.users = this.users_list.filter((el) => {
            return el.email.includes(this.filterText);
        });
    },
    filterAdd() {
        if (this.filterTextAdd == "") {
          this.add_users = this.add_users_list;
          return;
        }
        this.add_users = this.add_users_list.filter((el) => {
            return el.email.includes(this.filterTextAdd);
        });
    },
    watch: {
        filterText() {
            console.log(this.users_list);
            this.filter();
        },
        filterTextAdd() {
            this.filterAdd();
        },
  },
  },
};
</script>

<style scoped>
</style>