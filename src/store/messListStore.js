import { reactive } from "vue";
export const messListStore = reactive({
  messList: [],
  newMessList: [],
  setMessList: function (data) {
    this.messList = data;
    this.newMessList = data;
  },
});
