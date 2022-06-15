<script>
import accountAction from "../actions/accountAction";
import messengerAction from "../actions/messengerAction";
import messengerListAction from "../actions/messengerListAction";
import socket from "../socket.io.client/instanceSocket";
import { accountStore } from "../store/accountStore";
import { messengerStore } from "../store/messengerStore";
import { messListStore } from "../store/messListStore";
import { postStore } from "../store/postStore";
import Messenger from "./Messenger.vue";
import PostList from "./PostList.vue";
import timeHuman from "./../helpers/humanized_time";
import commentAction from "../actions/commentAction";
import likeAction from "../actions/likeAction";
import Comment from "./../components/Comment.vue";
import axios from "axios";
import { variable } from "../contains/variable";
export default {
  data() {
    return {
      id: this.$route.params.id,
      accountStore,
      messengerStore,
      messList: [],
      postStore,
      account: JSON.parse(localStorage.getItem("account")),
      avt: JSON.parse(localStorage.getItem("account")).avatar,
      comment: "",
      className: "",
      val: "",
    };
  },
  computed: {
    accountStoreF() {
      return this.accountStore.accountDetail;
    },
    myId() {
      return this.accountStore.myAccount.id;
    },
    friendId() {
      return this.messengerStore.friendId;
    },
    isToggleMessenger() {
      return this.messengerStore.isToggleMessenger;
    },
    isLoggin() {
      return this.accountStore.isLoggin;
    },
    postList() {
      return postStore?.profile;
    },
    avatar() {
      return this.avt;
    },
    accountId() {
      return this.account.id;
    },
    val() {
      return this.val;
    },
  },
  methods: {
    handleJoinRoom() {
      messengerAction.setFriendId(this.id);
      messengerAction.toggleMessenger();
      socket.emit("join_room", { myId: this.myId, friendId: this.friendId });
    },
    time(time) {
      return timeHuman(time);
    },
    async handleSubmitComment(postId) {
      this.$toast.info("Commenting . . .");
      const result = await commentAction.handleSubmitComment(
        postId,
        this.accountId,
        this.comment
      );
      const { statusCode, message } = result;
      if (statusCode === 200) {
        this.$toast.success(message);
        accountAction.getDetailAccount(this.id);
        socket.emit("handle_notify_client", {
          value: "",
          className: this.className,
        });
        socket.emit("handle_get_back_post");
        document.getElementById("send-comment").value = "";
        return (this.val = "");
      }
      return this.$toast.error(message);
    },
    handleNotify(e) {
      const className = e.target.nextElementSibling.id;
      this.comment = e.target.value;
      this.className = className;
      socket.emit("handle_notify_client", {
        value: this.comment,
        className,
      });
    },
    time(time) {
      return timeHuman(time);
    },
    handleLike(e, accountId, postId) {
      const target = e.target;
      if (target.classList.contains("icon-color")) {
        target.classList.remove("icon-color");
        likeAction.createLike(accountId, postId).then(() => {
          socket.emit("like_client");
          accountAction.getDetailAccount(this.id);
        });
      } else {
        target.classList.add("icon-color");
        likeAction.createLike(accountId, postId).then(() => {
          socket.emit("like_client");
          accountAction.getDetailAccount(this.id);
        });
      }
    },
    async handleChangeAvt() {
      const file = this.$refs.myFiles.files[0];
      const form = new FormData();
      form.append("images", file);
      axios
        .put(
          `${variable.url}/account/upload/avatar/${this.accountStoreF.account.id}`,
          form
        )
        .then((r) => r.data)
        .then(() => {
          accountAction.getDetailAccount(this.id);
          const account = JSON.parse(localStorage.getItem("account"));
          account.avatar = `http://localhost:8000/images/${file.name}`;
          localStorage.setItem("account", JSON.stringify(account));
          window.location.reload()
        });
    },
    watch: {
      accountStoreF: {
        handler(newState) {
          console.info(newState);
        },
        deep: true,
      },
    },
  },
  created() {
    socket.emit("join_my_room", this.myId);
    socket.on("revice_mess", () => {
      messengerListAction.getMessList(this.myId).then((data) => {
        messListStore.setMessList(data);
      });
    });
    socket.on("create_post_server", () => {
      accountAction.getDetailAccount(this.id);
    });
    socket.on("handle_notify_server", ({ value, className }) => {
      const elementNotifi = document.getElementById(`${className}`);
      if (!value) {
        return (elementNotifi.style.display = "none");
      }
      return (elementNotifi.style.display = "block");
    });
    socket.on("handle_get_back_post_server", () => {
      accountAction.getDetailAccount(this.id);
    });

    socket.on("like_server", () => {
      accountAction.getDetailAccount(this.id);
    });

    socket.on("comment_children_server", () => {
      accountAction.getDetailAccount(this.id);
    });
    socket.on("like_comment_server", () => {
      accountAction.getDetailAccount(this.id);
    });
    socket.on("comment_like_child_server", () => {
      accountAction.getDetailAccount(this.id);
    });
  },
  mounted() {
    accountAction.getDetailAccount(this.id);
  },
  components: { Messenger, PostList, Comment },
};
</script>
<template>
  <div class="row friend-detail">
    <div class="col-lg-12">
      <div class="profile-container">
        <div class="profile-container-bgr">
          <img :src="accountStoreF?.account?.avatar" />
        </div>
        <div class="profile-container__main">
          <div class="profile-container-info">
            <div class="profile-container-info--avt">
              <img :src="accountStoreF?.account?.avatar" />
              <div class="form-check">
                <input
                  type="file"
                  id="file"
                  ref="myFiles"
                  style="display: none"
                  @change="handleChangeAvt"
                />
                <label for="file" class="form-check-label"
                  >Change Img Here</label
                >
              </div>
            </div>
            <div class="profile-container-info--username">
              <h4>{{ accountStoreF?.account?.username }}</h4>
            </div>
          </div>
          <div class="profile-container-info__option">
            <div class="friend__button">
              <button class="btn btn-default">Thêm bạn bè</button>
            </div>
            <div class="messenger">
              <button
                @click="handleJoinRoom"
                class="btn btn-primary"
                :id="accountStoreF.account?.id"
              >
                Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div
      class="col-xs-7 col-sm-7 col-md-7 col-lg-7 post__list"
      v-for="(post, index) in postList"
    >
      <div class="card card-post">
        <div class="card-header-info">
          <div class="card-body-avatar">
            <img :src="post?.avatar" :alt="post?.avatar" srcset="" />
          </div>
          <div class="card-body-name">
            <h5>{{ post?.username }}</h5>
            <br />
            <span>
              <span>{{ time(post.time) }}</span>
            </span>
          </div>
        </div>
        <div class="card-body card-content-post">
          {{ post?.postContent }}
        </div>
        <a class="person-other" href="#">{{
          post?.likes?.findIndex((like) => like.accountId === accountId) !==
            -1 && post?.likes?.length > 1
            ? `Bạn và ${
                post?.likes?.length - 1
              } người khác đã thích bài viết này`
            : post?.likes?.findIndex((like) => like.accountId === accountId) !==
                -1 && post?.likes?.length === 1
            ? `Bạn đã thích bài viết này`
            : post?.likes?.findIndex((like) => like.accountId === accountId) ===
                -1 && post?.likes?.length > 1
            ? `${post?.likes[0].username}, và ${
                post?.likes?.length - 1
              } khác đã thích bài này `
            : post?.likes?.findIndex((like) => like.accountId === accountId) ===
                -1 && post?.likes?.length === 1
            ? `${post?.likes[0].username} đã thích bài viết này `
            : ``
        }}</a>
        <div class="card-footer">
          <div class="icon-container">
            <div class="icon icon-like">
              <i
                :class="[
                  post?.likes?.findIndex(
                    (like) => like.accountId === accountId
                  ) !== -1
                    ? 'icon-color fa-solid fa-thumbs-up'
                    : 'fa-solid fa-thumbs-up',
                ]"
                @click="(e) => handleLike(e, accountId, post.postId)"
              ></i>
            </div>
            <div
              class="icon icon-cmt btn btn-link collapsed"
              data-toggle="collapse"
              :data-target="[`#id-${index}`]"
              aria-expanded="false"
            >
              <i class="fa-solid fa-comment"></i>
            </div>
            <div class="icon icon-share">
              <i class="fa-solid fa-share"></i>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div
                :id="[`id-${index}`]"
                class="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordion"
              >
                <div class="card-body">
                  <div class="card-body-user">
                    <div class="card-body-avatar">
                      <img :src="avatar" alt="" sizes="" srcset="" />
                    </div>
                    <div class="card-body-input">
                      <form @submit.prevent="handleSubmitComment(post?.postId)">
                        <input
                          id="send-comment"
                          class="form-control"
                          type="text"
                          name=""
                          :value="val"
                          @keyup="(e) => handleNotify(e)"
                          placeholder="Enter you comment"
                        />
                        <span
                          class="notifi"
                          :id="[`notifi - ${index} `]"
                          style="display: none"
                          >Có người đang bình luận bài viết này . . .</span
                        >
                      </form>
                    </div>
                    <br />
                  </div>
                </div>
                <div
                  class="card-footer-comment"
                  v-for="(comment, index) in post.comments"
                >
                  <Comment :comment="comment" />
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
.post__list {
  margin: 0 auto;
}
.col-lg-6 {
  background-color: blue;
  margin: 0 auto;
}
.post {
  width: inherit;
  margin: 100px auto;
  position: absolute;
}
.profile-container-info__option {
  float: right;
  display: flex;
  position: relative;
}
.profile-container__main {
  width: inherit;
  padding: 0 50px;
  align-items: center;
  padding-top: 50px;
}
.profile-container {
  position: relative;
  padding: 0 200px;
  width: 1500px;
}
.profile-container-bgr img {
  width: 1500px;
  height: 500px;
  object-fit: cover;
  margin: 0 auto;
  border-radius: 9px;
}
.card-body-detail img {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  object-fit: cover;
}
.profile-container-info {
  position: absolute;
  width: 200px;
  height: 200px;
  width: inherit;
  bottom: -100px;
}
.profile-container-info img {
  width: 200px;
  height: 200px;
  border-radius: 100%;
  object-fit: cover;
}

.friend-detail {
  margin-top: 100px;
  position: relative;
  width: 1500px;
}
input {
  border-radius: 20px;
}

.card-post {
  margin-top: 100px;
}

.icon-container {
  display: flex !important;
  width: 100%;
  justify-content: space-between;
  padding: 0 50px;
}

.card-header-info {
  display: flex;
  align-items: center;
  padding: 30px;
}

.person-other {
  display: block;
  padding: 0 30px;
}

.card-header-info img {
  width: 60px;
  height: 60px;
  border-radius: 100%;
  object-fit: cover;
  margin-right: 30px;
}

.card-body-name h5 {
  float: left;
  width: 200px;
}

.card-body-user {
  display: flex;
  align-items: center;
}

.card-body-user img {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  object-fit: cover;
  margin-right: 20px;
}

.card-content-post {
  padding: 10px 30px;
}

.card-body-input {
  width: 100%;
}

.card-footer-comment {
  padding: 20px;
}

.card {
  border-radius: 10px;
}

.icon-container .icon {
  cursor: pointer;
}

.notifi {
  display: block;
  margin: 10px 0 0 0;
  animation: notifi 0.8s linear infinite alternate;
}

@keyframes notifi {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.skeleton {
  animation: skeleton-loading 1s linear infinite alternate;
}

.icon-color {
  color: blue;
}

.icon-container .icon {
  font-size: 30px;
}

@keyframes skeleton-loading {
  0% {
    background-color: hsl(200, 20%, 80%);
  }

  100% {
    background-color: hsl(200, 20%, 95%);
  }
}

.icon-like {
  color: rgb(101, 92, 92);
}
</style>
