<script>
import accountAction from "../actions/accountAction";
import messengerAction from "../actions/messengerAction";
import messengerListAction from "../actions/messengerListAction";
import { accountStore } from "../store/accountStore";
import { messListStore } from "../store/messListStore";
import humanized_time from "./../helpers/humanized_time";
import socket from "./../socket.io.client/instanceSocket";
export default {
  props: ["messList"],
  data() {
    return {
      messListStore,
      account: accountStore,
    };
  },

  computed: {
    accountId() {
      return this.account.myAccount?.id;
    },
    messList() {
      return this.messListStore.messList;
    },
    messArr() {
      return [...this.messListStore.newMessList];
    },
  },
  methods: {
    handleToggleMess(friendId, idMess) {
      accountAction.getDetailAccount(+friendId).then(() => {
        messengerAction.setFriendId(friendId);
        messengerAction.turnOnMess();
        socket.emit("join_room", { myId: this.accountId, friendId });
        messengerAction.handSeenMess(idMess).then(() => {
          messengerListAction.getMessList(this.accountId);
          messengerAction.countMess(this.accountId);
        });
        const mess = document.querySelector(".mess-child");
        if (mess.classList.contains("color-text")) {
        } else {
        }
      });
    },
    timeMess(time) {
      return humanized_time(time);
    },
    handleSearchMessenger(e) {
      const value = e.target.value;
      if (value) {
        return (this.messListStore.messList = this.messArr.filter((e) => {
          return e.account.username.toLowerCase().includes(value.toLowerCase());
        }));
      }
      return (this.messListStore.messList = this.messArr);
    },
  },
  mounted() {},
};
</script>
<template>
  <div>
    <div class="">
      <div class="mess__list-title">
        <h3>Chat</h3>
      </div>
      <div class="mess__list-search">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="Tìm kiếm trên Messenger"
          @keyup="handleSearchMessenger"
        />
      </div>
      <div
        class="mess_list"
        v-for="(mess, index) in messList"
        @click="handleToggleMess(mess?.account?.id, mess.id)"
      >
        <div class="mess__list-info">
          <div class="mess__list-info--avatar">
            <img :src="mess?.account?.avatar" alt="" srcset="" />
          </div>
          <div class="mess__list-content">
            <div class="mess__list-content-info">
              <div class="mess__list-content--username">
                <h5>
                  {{
                    accountId === mess?.account?.id
                      ? "Only Me"
                      : mess?.account?.username
                  }}
                </h5>
              </div>
              <div class="mess__list-content--messenger">
                <span
                  :class="[
                    accountId !== mess?.myId && !mess.seen ? 'color-text' : '',
                    'mess-child',
                  ]"
                  >{{
                    accountId === mess?.myId
                      ? `You :
                                                                    ${mess.messenger.slice(
                                                                      0,
                                                                      20
                                                                    )}`
                      : `${mess.messenger.slice(0, 20)}`
                  }}</span
                >
              </div>
            </div>
            <div class="mess__list-content-info-time">
              {{ timeMess(mess?.time) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.mess__list-info {
  transition: 0.3s ease;
  border-radius: 20px;
  padding: 10px 3px;
}
.color-text {
  color: #1770e6;
}

h5 {
  font-size: 16px;
}
.mess_list:hover .mess__list-info {
  background: #d8dadf;
}
.mess_list {
  cursor: pointer;
  border-radius: 20px;
  margin-top: 30px;
}

.mess__list-info {
  display: flex;
  margin: 10px 0;
}

.mess__list-info img {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  object-fit: cover;
  margin-right: 20px;
}

.mess__list-container {
  width: 100%;
  padding: 20px;
}

.mess__list-title {
  text-align: left;
}

.mess__list-search {
  position: relative;
  height: 40px;
}

.mess__list-search i {
  position: absolute;
  left: 20px;
  color: #4c4f5263;
  font-size: 20px;
  line-height: 40px;
}

.mess__list-search input {
  padding-left: 50px;
  border-radius: 20px;
  border: none;
  outline: none;
  background: #bec3c963;
  width: 100%;
  height: 100%;
}

.mess__list-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.mess__list-content-info-time {
  font-size: 14px;
  white-space: nowrap;
  margin-left: 10px;
}
</style>
