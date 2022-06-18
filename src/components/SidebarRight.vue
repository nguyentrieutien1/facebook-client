<script>
import axios from "axios";
import accountAction from "../actions/accountAction";
import messengerAction from "../actions/messengerAction";
import messengerListAction from "../actions/messengerListAction";
import { variable } from "../contains/variable";
import socket from "../socket.io.client/instanceSocket";

export default {
  data() {
    return {
      list: [],
      acp: [],
      online: [],
      id: JSON.parse(localStorage.getItem("account"))?.id,
    };
  },
  methods: {
    async getResultList() {
      const result = await axios.get(`${variable.url}/friend/${this.id}`);
      const data = await result.data;
      const { requestList } = data;
      this.list = [...requestList];
    },
    async getAcpList() {
      const result = await axios.get(`${variable.url}/accept/${this.id}`);
      const data = await result.data;
      const { acpList } = data;
      this.acp = [...acpList];
    },
    async handleAcpFriend(myId, friendId) {
      console.log(myId, friendId);
      const result = await axios.post(`${variable.url}/accept`, {
        myId,
        friendId,
      });
      const { statusCode } = await result.data;
      if (statusCode === 200) {
        socket.emit("handle_acp", myId);
        this.getResultList();
        this.getAcpList();
      }
    },
    handleToggleMess(friendId) {
      accountAction.getDetailAccount(+friendId).then(() => {
        messengerAction.setFriendId(friendId);
        messengerAction.turnOnMess();
        socket.emit("join_room", { myId: this.id, friendId });
        messengerAction.handSeenMess(idMess).then(() => {
          messengerListAction.getMessList(this.id);
          messengerAction.countMess(this.id);
        });
      });
    },
  },
  computed: {
    list() {
      return this.list;
    },
    acp() {
      return this.acp;
    },
  },
  async mounted() {
    this.getResultList();
    this.getAcpList();
    socket.on("request_addfriend", () => {
      this.$toast.warning("Bạn có 1 lời mời kết bạn mới !");
      this.getResultList();
    });
    socket.on("handle_acp", () => {
      this.getResultList();
      this.getAcpList();
    });
    socket.on("online", (id) => {
      this.online.push(id);
    });
    socket.emit("disconnect", 1);
  },
};
</script>
<template>
  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 sidebar__right">
    <div class="sidebar__right-container">
      <div class="addfriend">
        <div class="card__add_friend">
          <h5>Lời mời kết bạn</h5>
        </div>
        <div class="card__info" v-for="acc in list">
          <div class="card__info-avar">
            <img :src="acc?.avatar" alt="" srcset="" />
          </div>
          <div>
            <div class="card__info-name">
              <h5>{{ acc.username }}</h5>
              <div class="card__info-button">
                <button
                  class="btn btn-primary"
                  @click="handleAcpFriend(acc.myId, acc.friendId)"
                >
                  Xác nhận
                </button>
                <button class="btn btn-default">Xóa</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="contact">
        <h5>Người liên hệ</h5>
        <div
          class="contact__info"
          @click="handleToggleMess(acp.id)"
          v-for="acp in acp"
        >
          <img :src="acp.avatar" alt="" srcset="" />
          <h5>{{ acp.username }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
h5 {
  font-size: 16px;
}
.contact__info {
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 35px;
  cursor: pointer;
}

.contact__info::before {
  content: "";
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background: rgb(38, 244, 6);
  bottom: 0px;
  left: 45px;
}

.contact {
  margin-top: 30px;
}

.btn-primary {
  margin-right: 10px;
}

.card__info-button {
  margin-top: 20px;
}
.card__info {
  margin-top: 20px;
  cursor: pointer;
}

.addfriend {
  width: 100%;
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.261);
}

.card {
  width: 100%;
  margin: 0;
  padding: 0;
}

.card__info {
  display: flex;
  align-items: center;
  cursor: pointer;
  }

.card__info-avar img,
.contact__info img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 100%;
  margin-right: 20px;
}

.sidebar__right {
  position: fixed;
  right: 0;
  height: 100%;
  top: 70px;
  margin: 0;
  width: 400px;
  padding-top: 40px;
  overflow-y: scroll;
  background: white;
}
</style>
