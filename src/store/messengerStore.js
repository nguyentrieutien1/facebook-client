import { reactive } from "vue";
export const messengerStore = reactive({
  friendId: null,
  isToggleMessenger: false,
  messengerList: [],
  myId: JSON.parse(localStorage.getItem("account"))?.id,
  setFriendId: function (id) {
    this.friendId = id;
  },
  toggleMessenger: function () {
    this.isToggleMessenger = !this.isToggleMessenger;
  },
  setMessList: function (data) {
    this.messengerList = [...data];
  },
  closeMess: function () {
    this.isToggleMessenger = false;
  },
});
