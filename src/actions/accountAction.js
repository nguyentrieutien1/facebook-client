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
    const result = await axios.get(`${variable.url}/account/${id}`);
    const data = await result.data;
    accountStore.setAccountDetail(data);
  };
  handleLogout = async () => {
    accountStore.handleLogout();
  };
}
export default new AccountAction();
