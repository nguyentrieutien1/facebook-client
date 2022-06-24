<script>
import commentAction from "../actions/commentAction";
import postAction from "../actions/postAction";
import { postStore } from "../store/postStore";
import socket from "./../socket.io.client/instanceSocket";
import Comment from "./Comment.vue";
import timeHuman from "./../helpers/humanized_time";
import likeAction from "../actions/likeAction";
export default {
  data() {
    return {
      postStore,
      account: JSON.parse(localStorage.getItem("account")),
      comment: "",
      className: "",
      val: "",
    };
  },
  created() {
    postAction.getAllPost();
  },
  computed: {
    postList() {
      return this.postStore.postList?.postList;
    },
    avatar() {
      return this.account.avatar;
    },
    accountId() {
      return this.account.id;
    },
    val() {
      return this.val;
    },
  },
  watch: {
    postList: {
      handler(newState, curState) {
        this.postStore.postList.postList = [...newState];
      },
      deep: false,
    },
  },
  methods: {
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
        postAction.getAllPost();
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
          postAction.getAllPost();
        });
      } else {
        target.classList.add("icon-color");
        likeAction.createLike(accountId, postId).then(() => {
          socket.emit("like_client");
          postAction.getAllPost();
        });
      }
    },
  },
  mounted() {
    socket.on("create_post_server", () => {
      postAction.getAllPost();
    });
    socket.on("handle_notify_server", ({ value, className }) => {
      const elementNotifi = document.getElementById(`${className}`);
      if (!value) {
        return (elementNotifi.style.display = "none");
      }
      return (elementNotifi.style.display = "block");
    });
    socket.on("handle_get_back_post_server", () => {
      postAction.getAllPost();
    });

    socket.on("like_server", () => {
      postAction.getAllPost();
    });

    socket.on("comment_children_server", () => {
      postAction.getAllPost();
    });
    socket.on("like_comment_server", () => {
      postAction.getAllPost();
    });
    socket.on("comment_like_child_server", () => {
      postAction.getAllPost();
    });
  },
  components: { Comment },
};
</script>
<template>
  <div>
    <div
      class="col-xs-12 col-sm-12 col-md-12 col-lg-12 post__list"
      v-for="(post, index) in postList"
    >
      <div class="card card-post" v-show="post.status === 'public'">
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
          <div class="card-content-img" v-if="post.images.length > 0">
            <div class="card-content-img-detail">
              <div class="img-class" v-for="img in post.images">
                <img :src="img" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div
          style="display: flex; justify-content: space-between; padding: 0 20px"
        >
          <a class="person-other" href="#">{{
            post?.likes?.findIndex((like) => like.accountId === accountId) !==
              -1 && post?.likes?.length > 1
              ? `Bạn và ${
                  post?.likes?.length - 1
                } người khác đã thích bài viết này`
              : post?.likes?.findIndex(
                  (like) => like.accountId === accountId
                ) !== -1 && post?.likes?.length === 1
              ? `Bạn đã thích bài viết này`
              : post?.likes?.findIndex(
                  (like) => like.accountId === accountId
                ) === -1 && post?.likes?.length > 1
              ? `${post?.likes[0].username}, và ${
                  post?.likes?.length - 1
                } khác đã thích bài này `
              : post?.likes?.findIndex(
                  (like) => like.accountId === accountId
                ) === -1 && post?.likes?.length === 1
              ? `${post?.likes[0].username} đã thích bài viết này `
              : ``
          }}</a>
          <div class="float-right">
            <h5 :class="[`count-${post.postId}`]"></h5>
          </div>
        </div>
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
                  <Comment
                    :comment="comment"
                    :count="post.cmt"
                    :index="post.postId"
                  />
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
.fa-solid,
.fa-comment {
  color: #655c5c;
}
.col-lg-4,
.col-md-12 {
  padding: 0;
}
.card-content-img-detail {
  display: flex;
  flex-wrap: wrap;
}
.card-content-img {
  padding: 0;
  margin: 0;
}
.img-class:hover img {
  transform: scale(1.1);
  border-radius: 100%;
}
.card-content-img-detail img {
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 6px;
  margin: 20px 20px 20px 0;
  transition: 0.5s ease;
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
  color: #1e91ec;
}
.card-body-name span {
  font-weight: 600;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-body-input {
  width: 100%;
}

.card-footer-comment {
  padding: 20px;
}
.card-footer {
  height: 60px;
}
.card {
  border-radius: 10px;
}

.icon-container .icon {
  cursor: pointer;
  line-height: 20px;
}
.icon-container i {
  font-size: 25px;
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
  color: rgba(18, 70, 212, 0.782);
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
