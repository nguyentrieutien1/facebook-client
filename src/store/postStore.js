import { reactive } from "vue";
export const postStore = reactive({
  postList: [],
  getAllPost: function (data) {
    this.postList = data;
  },
});
