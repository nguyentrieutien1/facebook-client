import { accountStore } from "../store/accountStore";
import { variable } from "./../contains/variable";
import axios from "axios";
axios.defaults.withCredentials = true;
class AccountAction {
  setAccount = (account) => {
    accountStore.setAccount(account);
  };
  getAccount = async () => {
    const result = await axios.get(`${variable.url}/account`);
    const data = await result.data;
    accountStore.accountList(data.accounts);
  };
  getDetailAccount = async (id) => {
    console.log(id);
    const result = await axios.get(`${variable.url}/account/${id}`);
    const data = await result.data;
    accountStore.setAccountDetail(data);
  };
  handleLogout = async () => {
    accountStore.handleLogout();
  };
  setMyAccount(account) {
    console.log(account);
    accountStore.setMyAccount(account);
  }
}
export default new AccountAction();
