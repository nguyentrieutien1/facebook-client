import { reactive } from "vue";
export const accountStore = reactive({
  isLoggin: JSON.parse(localStorage.getItem("account")) || false,
  accounts: [{ name: "hehe" }],
  accountDetail: {},

  setAccount: function (account) {
    localStorage.setItem("account", JSON.stringify(account));
    this.isLoggin = true;
  },
  accountList: function (acc) {
    this.accounts = acc;
  },
  setAccountDetail: function (account) {
    this.accountDetail = { ...account };
  },
  handleLogout: function () {
    this.isLoggin = false;
    console.log(this.isLoggin);
    localStorage.removeItem("account");
  },
});
