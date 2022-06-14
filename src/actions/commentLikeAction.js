import axios from "axios";
import { variable } from "./../contains/variable";
class CommentLike {
  createCommentLike = async (accountId, commentId) => {
    const result = await axios.post(`${variable.url}/comment-like`, {
      accountId,
      commentId,
    });
    const data = await result.data;
    return data;
  };
  createCommentLikeChild = async (accountId, commentChildId) => {
    const result = await axios.post(`${variable.url}/comment-like-child`, {
      accountId,
      commentChildId,
    });
    const data = await result.data;
    return data;
  };
}
export default new CommentLike();
