import axios from "axios";
import { variable } from "./../contains/variable";
import { messListStore } from "./../store/messListStore";
class MessList {
  getMessList = async (accountId) => {
    const result = await axios.get(
      `${variable.url}/messenger-list/${accountId}`
    );
    const data = await result.data;
    const newData = [];
    for (const key in data) {
      newData.push(data[key]);
    }
    return newData.sort((a, b) => b.id - a.id);
  };
}
export default new MessList();
