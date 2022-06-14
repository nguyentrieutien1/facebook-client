import { reactive } from "vue";
export const postStore = reactive({
  postList: [],
  profile: {},
  getAllPost: function (data) {
    this.postList = data;
  },
  setProfile: function (data) {
    console.info(data.postList);
    this.profile = data.postList;
  },
});
