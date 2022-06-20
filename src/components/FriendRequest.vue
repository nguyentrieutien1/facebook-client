<script>
import { variable } from "../contains/variable";
import axios from "axios";
import socket from "../socket.io.client/instanceSocket";
export default {
  data() {
    return {
      id: JSON.parse(localStorage.getItem("account"))?.id,
      list: [],
    };
  },
  methods: {
    async getResultList() {
      const result = await axios.get(`${variable.url}/friend/${this.id}`);
      const data = await result.data;
      const { requestList } = data;
      return requestList;
    },
    async handleAcpFriend(myId, friendId) {
      console.log(myId, friendId);
      const result = await axios.post(`${variable.url}/accept`, {
        myId,
        friendId,
      });
      const { statusCode } = await result.data;
      if (statusCode === 200) {
        socket.emit("handle_acp", myId);
        this.getResultList().then((d) => {
          this.list = d;
        });
      }
    },
    async handleDeleteRequest(myId, friendId) {
      const result = await axios.delete(
        `${variable.url}/request/delete/${myId}/${friendId}`
      );
      const { statusCode } = await result.data;
      if (statusCode === 200) {
        this.getResultList().then((d) => {
          this.list = d;
        });
        socket.emit("delete_request", myId);
      }
    },
  },
  mounted() {
    this.getResultList().then((d) => {
      this.list = d;
    });
  },
};
</script>
<template>
  <div>
    <div class="request-container">
      <div class="row">
        <div class="col-lg-3 request_sidebar">
          <div class="request_sidebar-icon">
            <i class="fa-solid fa-user-group"></i>
            <span>Lời mời kết bạn ({{ `+${list.length}` }})</span>
          </div>
        </div>
        <div class="col-lg-9 request_center">
          <div class="row">
            <div class="col-lg-2 card-friend" v-for="list in list">
              <div class="card">
                <div class="card-body">
                  <img :src="list.avatar" alt="" srcset="" />
                  <div class="body-content">
                    <h5 class="card-title">{{ list.username }}</h5>
                    <div class="card-body-btn">
                      <button
                        class="btn btn-primary"
                        @click="handleAcpFriend(list.myId, list.friendId)"
                      >
                        Xác nhận</button
                      ><br />
                      <button
                        class="btn btn-default"
                        @click="handleDeleteRequest(list.myId, list.friendId)"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border-radius: 6px;
  height: 400px !important;
  margin: 20px 0;
}
.body-content {
  padding: 10px;
}
.card-body-btn button {
  width: 100%;
  margin: 5px 0;
}
.card-body {
  padding: 0;
}
.card-body img {
  width: 100%;
  object-fit: cover;
  margin-bottom: 10px;
  height: 60%;
  border-radius: 6px;
}
.fa-user-group {
  background-color: #1877f2;
  border-radius: 100%;
  height: 50px;
  width: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: white;
  margin-right: 10px;
}
.request-container {
  margin-top: 100px;
  height: 300px;
  padding: 10px;
}
.request_sidebar {
  height: 100%;
}
.request_center {
}
</style>
