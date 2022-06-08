import { reactive } from "vue";
export const messListStore = reactive({
  messList: [],
  setMessList: function (data) {
    console.log(data);
    this.messList = data;
  },
});
