import axios from "axios";
import { variable } from "./../contains/variable";
class LikeAction {
  createLike = async (accountId, postId) => {
    const result = await axios.post(`${variable.url}/like`, {
      accountId,
      postId,
    });
    const data = await result.data;
    return data;
  };
}
export default new LikeAction();
