import { variable } from "./../contains/variable";
import axios from "axios";
class Comment {
  handleSubmitComment = async (postId, accountId, comment) => {
    const result = await axios.post(`${variable.url}/comment`, {
      postId,
      accountId,
      comment,
    });
    const data = await result.data;
    return data;
  };
}
export default new Comment();
