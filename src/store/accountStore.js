import { reactive } from "vue";
export const accountStore = reactive({
  isLoggin: JSON.parse(localStorage.getItem("account"))
    ? JSON.parse(localStorage.getItem("account"))
    : false,
  accounts: [{ name: "hehe" }],
  accountDetail: {},
  myAccount: JSON.parse(localStorage.getItem("account"))
    ? JSON.parse(localStorage.getItem("account"))
    : {},
  setMyAccount: function (account) {
    return (this.myAccount = { ...account });
  },
  setAccount: function (account) {
    localStorage.setItem("account", JSON.stringify(account));
    this.isLoggin = true;
  },
  accountList: function (acc) {
    const account = JSON.parse(localStorage.getItem("account"))
      ? JSON.parse(localStorage.getItem("account"))
      : [];
    const index = acc.findIndex((acc) => acc.id == account?.id);
    acc.splice(index, 1);
    this.accounts = acc;
  },
  setAccountDetail: function (account) {
    this.accountDetail = { ...account };
  },
  handleLogout: function () {
    this.isLoggin = false;
    localStorage.removeItem("account");
  },
});
