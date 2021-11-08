<template>
  <h1></h1>
  <div class="main-container">
    <div class="chat_list">
        <div style="position:relative;width: 340px;height: 60px;text-align:center;border-bottom: solid 1px #707070;padding-top: 2px;font-family: HelveticaNeue;font-size: 34px;background:white;">
            Chat Room
        </div>
        <div v-for="chat in chats" :key="chat" class="chat_el" @click="getMessagesChat(chat.id)">
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
        </div>
        <div class="chat_el"></div>
        <div class="chat_el"></div>
        <div class="chat_el"></div>
        <div class="chat_el"></div>
        <div class="chat_el"></div>
        <div class="chat_el"></div>
        <div class="chat_el"></div>
        <div class="chat_el"></div>
        <div class="chat_el"></div>
        <div class="chat_el"></div>
        <div class="chat_el"></div>
        <div class="chat_el"></div>
    </div>
    <div style="position:relative;left:0px;top:0px;height:100%;width:660px;border: solid 1px #707070;overflow:hidden">
      <div v-if="this.selected == true">
        <div class="chat_msg">
          <div v-for="msg in msgs" :key="msg" style="position:relative;top:0px;left:0px;">
            <div v-if="msg.sender_id == this.id" style="text-align:right;">
              <div style="display:inline-block;position:relative;top:10px;right:10px;background:#3e8ed0;color:white;border-radius:4px;width:auto;min-width:50px;max-width:360px;margin-bottom:20px;padding:5px;text-align:left;">
                {{ msg.content }}
              </div>
              <br>
              <div style="display:inline-block;position:relative;top:-10px;right:12px;color:#8E8E8E;font-size:15px;">
                21:36 - saber@saber.com
              </div>
            </div>
            <div v-else style="text-align:left;">
              <div style="display:inline-block;position:relative;top:10px;left:10px;background:#8E8E8E;color:white;border-radius:4px;width:auto;min-width:50px;max-width:360px;margin-bottom:20px;padding:5px;text-align:left;">
                {{ msg.content }}
              </div>
              <br>
              <div style="display:inline-block;position:relative;top:-10px;left:12px;color:#8E8E8E;font-size:15px;">
                18:17 - wow@test.com
              </div>
            </div>
          </div>
        </div>
        <div style="position:relative;left:0px;top:0px;height:30px;width:100%;border-top: solid 1px #707070;">
          <input @input="msgSend" v-model="filterText" style="position:relative;left:-7px;top:5px;width:90%;height:26px;border-radius:10px;border: solid 1px #707070;" />
          <button class="fas fa-paper-plane button_send_msg"></button>
        </div>
        <div>

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
      chat: {},
      selected: false,
      msgs: {},
      msg: {},
      msgSend: [],
    };
  },
  created() {
    this.getChats();
  },
  methods: {
    getChats() {
      this.$http
        .get("/chats")
        .then((response) => {
        //   response.data.forEach((element) => {
        //     element.created_at = new Date(element.created_at).toDateString();
        //   });
          console.log(response.data);
          console.log(this.$store.getters.getEmail);
          this.chats = response.data;
          if (this.chats[0].user_a.email == this.$store.getters.getEmail)
            this.id = this.chats[0].user_a.id;
          else
            this.id = this.chats[0].user_b.id;
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
    getSymbol(str) {
      return (str[0]);
    },
    getMessagesChat(id) {
      this.$http
        .get(`/chats/messages/${id}`)
        .then((response) => {
          this.selected = true;
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
  },
};
</script>

<style scoped>
</style>