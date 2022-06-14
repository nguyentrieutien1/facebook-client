import { accountStore } from "../store/accountStore";
import { variable } from "./../contains/variable";
import axios from "axios";
import { postStore } from "./../store/postStore";
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
    const result = await axios.get(`${variable.url}/account/${id}`);
    const data = await result.data;
    accountStore.setAccountDetail(data);
    postStore.setProfile(data);
  };
  handleLogout = async () => {
    accountStore.handleLogout();
  };
  setMyAccount(account) {
    accountStore.setMyAccount(account);
  }
}
export default new AccountAction();
