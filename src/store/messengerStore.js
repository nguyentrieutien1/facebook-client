import { reactive } from "vue";
export const messengerStore = reactive({
  friendId: null,
  isToggleMessenger: false,
  messengerList: [],
  count: "...",
  myId: JSON.parse(localStorage.getItem("account"))?.id,
  setFriendId: function (id) {
    this.friendId = id;
  },
  setCountMess: function (number) {
    this.count = number;
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
  turnOnMess: function () {
    this.isToggleMessenger = false;
    setTimeout(() => {
      this.isToggleMessenger = true;
    }, 1);
  },
});
