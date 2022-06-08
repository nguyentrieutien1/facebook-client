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
    messengerStore.turnOnMess()
  }
}
export default new MessengerAction();
