import axios from "axios";
import { variable } from "../contains/variable";
class CommentChild {
  createCommentChild = async (comment, commentParentId, accountId) => {
    const result = await axios.post(`${variable.url}/comment-children`, {
      comment,
      commentParentId,
      accountId,
    });
    const data = await result.data;
    return data;
  };
}
export default new CommentChild();
