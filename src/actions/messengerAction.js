import { messengerStore } from "../store/messengerStore";
import { variable } from "../contains/variable";
import axios from "axios";
class MessengerAction {
  setFriendId = (id) => {
    messengerStore.setFriendId(id);
  };
  toggleMessenger = () => {
    messengerStore.toggleMessenger();
  };
  getMessPartner = async (myId, friendId) => {
    const result = await axios.get(
      `${variable.url}/messenger?myId=${myId}&friendId=${friendId}`
    );
    const data = await result.data;
    messengerStore.setMessList(data);
  };
  closeMess = () => {
    messengerStore.closeMess();
  };
  handleSendMessenger = async (messenger, friendId, myId) => {
    const result = await axios.post(`${variable.url}/messenger`, {
      messenger,
      friendId,
      myId,
    });
    const data = await result.data;
    return data;
  };
  turnOnMess = () => {
    messengerStore.turnOnMess();
  };
  handSeenMess = async (id) => {
    const result = await axios.put(`${variable.url}/mess/update/${id}`);
    const data = await result.data;
    return data;
  };
  countMess = async (id) => {
    const result = await axios.get(`${variable.url}/count-mess/${+id}`);
    const data = await result.data;
    messengerStore.setCountMess(data);
  };
  handleUpdateAllMess = async ({ myId, friendId }) => {
    const result = await axios.put(
      `${variable.url}/update-all-mess/${myId}/${friendId}`
    );
    const data = await result.data;
    return data;
  };
}
export default new MessengerAction();
