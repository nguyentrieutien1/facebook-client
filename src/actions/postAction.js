import { variable } from "./../contains/variable";
import axios from "axios";
import { postStore } from "./../store/postStore";
class PostAction {
  createPost = async (status, postContent, accountId) => {
    const result = await axios.post(`${variable.url}/post/create`, {
      postContent,
      status,
      accountId,
    });
    const data = await result.data;
    return data;
  };
  getAllPost = async () => {
    const result = await axios.get(`${variable.url}/post`);
    const data = await result.data;
    postStore.getAllPost(data);
  };
}
export default new PostAction();
