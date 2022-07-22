<script>
import commentChild from "../actions/commentChild";
import commentLikeAction from "../actions/commentLikeAction";
import postAction from "../actions/postAction";
import timeHuman from "./../helpers/humanized_time";
import socket from "./../socket.io.client/instanceSocket";
export default {
  props: ["comment", "index", "count"],
  data() {
    return {
      account: JSON.parse(localStorage.getItem("account")),
      commentChild: "",
      value: "",
      comment: this.comment.comment,
      idData: null,
    };
  },
  computed: {
    avatar() {
      return this.comment?.avatar;
    },
    comment() {
      return this.comment?.comment;
    },
    friendId() {
      return this.friendId;
    },
    accountId() {
      return this.account?.id;
    },
    id() {
      return this.comment.id;
    },
    username() {
      return this.comment?.username;
    },
    timeC() {
      return this.comment?.timeComment;
    },
    commentParentId() {
      return this.comment?.commentId;
    },
    avatarMain() {
      return this.account?.avatar;
    },
    commentChilC() {
      return this.commentChild;
    },
    commentChildList() {
      return this.comment?.commentChildList;
    },
    countLike() {
      return this.comment?.commentLikes;
    },
  },
  methods: {
    time(time) {
      try {
        return timeHuman(time);
      } catch (error) {
        console.log(error);
      }
    },
    handleCommentChild() {
      try {
        commentChild
          .createCommentChild(
            this.commentChilC,
            this.commentParentId,
            this.accountId
          )
          .then((data) => {
            const { statusCode, message } = data;
            if (statusCode === 200) {
              postAction.getAllPost().then(() => {
                this.value = "";
                socket.emit("comment_children_client");
                socket.emit("tag_comment", this.idData);
              });
              return this.$toast.success(message);
            }
            return this.$toast.error(message);
          });
      } catch (error) {
        console.log(error);
      }
    },
    handleComment(e) {
      try {
        return (this.commentChild = e.target.value);
      } catch (error) {}
    },
    handleLikeComment(e, commentParentId) {
      try {
        const target = e.target;
        if (target.classList.contains("color-text")) {
          target.classList.remove("color-text");
        } else {
          target.classList.add("color-text");
        }
        commentLikeAction
          .createCommentLike(this.accountId, commentParentId)
          .then((data) => {
            postAction.getAllPost().then(() => {
              socket.emit("like_comment_client");
            });
          });
      } catch (error) {
        console.log(error);
      }
    },
    handleLikeCommentChild(e, accountId, commentChildId) {
      try {
        const target = e.target;
        if (target.classList.contains("color-text")) {
          target.classList.remove("color-text");
        } else {
          target.classList.add("color-text");
        }
        commentLikeAction
          .createCommentLikeChild(accountId, commentChildId)
          .then(() => {
            socket.emit("comment_like_child");
          });
      } catch (error) {
        console.log(error);
      }
    },
    handleReplice(username, id) {
      try {
        this.value = `${username} `;
        this.idData = id;
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    socket.on("comment_children_server", () => {
      console.log("Nguyen Thanh Tung");
      console.log("Change");
      console.info("comment_children_server");
      console.log("Nguyen Thanh Tung");

      postAction.getAllPost();
    });
  },
};
</script>
<template>
  <div class="comment">
    <h5 class="comment-count"></h5>
    <div class="comment-avatar">
      <img :src="avatar" alt="img" srcset="" />
    </div>
    <div class="comment-text">
      <div class="comment-content">
        <h5>{{ username }}</h5>
        <br />
        <span class="comment-content-comment">{{ comment }}</span>
        <div class="count-like" v-if="countLike?.length > 0">
          <i class="icon-color fa-solid fa-thumbs-up" data-v-54c1ae8e=""></i>
          <span
            v-if="countLike?.length > 0"
            class="comment-content-comment-like"
            >{{ countLike?.length }}</span
          >
        </div>
      </div>
      <br />
      <div class="comment-option">
        <span
          :class="[
            countLike?.findIndex((like) => like.accountId === accountId) !== -1
              ? 'color-text'
              : '',
            `comment-content-like`,
          ]"
          @click="(e) => handleLikeComment(e, commentParentId)"
          >Like</span
        >
        <a>
          <span
            style="cursor: pointer"
            @click="handleReplice(username, id)"
            class="comment-content-relice"
            data-toggle="collapse"
            :data-target="[`#children-comment-${commentParentId}`]"
            >Replice</span
          ></a
        >
        <span>{{ time(timeC) }}</span>
      </div>
    </div>
    <br />
  </div>
  <div class="collapse col-lg-12" :id="[`children-comment-${commentParentId}`]">
    <div class="collapse-list">
      <ul class="collapse-list-item">
        <li class="item" v-for="(commentChild, index) in this.commentChildList">
          <div class="avatar">
            <img :src="commentChild?.avatar" alt="img" srcset="" />
          </div>
          <div class="content">
            <div class="content-option-info">
              <div class="username">
                <h5>{{ commentChild?.username }}</h5>
              </div>
              <div class="comment">
                <p>{{ commentChild?.commentChild }}</p>
              </div>
              <div
                class="count-like"
                v-if="commentChild?.commentLikeChildArr?.length > 0"
              >
                <i
                  class="icon-color fa-solid fa-thumbs-up"
                  data-v-54c1ae8e=""
                ></i>
                <span
                  v-if="commentChild?.commentLikeChildArr?.length > 0"
                  class="comment-content-comment-like"
                  >{{ commentChild?.commentLikeChildArr?.length }}</span
                >
              </div>
            </div>
            <ul class="content-option">
              <li
                style="cursor: pointer"
                @click="
                  (e) =>
                    handleLikeCommentChild(
                      e,
                      this.accountId,
                      commentChild.commentchildrensId
                    )
                "
                :class="[
                  commentChild?.commentLikeChildArr?.findIndex(
                    (commentChild) => commentChild.id === accountId
                  ) !== -1
                    ? 'color-text'
                    : '',
                  `comment-content-like`,
                ]"
              >
                Like
              </li>
              <li
                style="cursor: pointer"
                @click="handleReplice(commentChild.username, commentChild.id)"
              >
                Replice
              </li>
              <li>Share</li>
              <li>{{ time(commentChild?.timeChild) }}</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div class="collsapse-input">
      <img :src="avatarMain" alt="" />
      <div class="float-right">
        <form @submit.prevent="handleCommentChild">
          <input
            id="input-comment-child"
            placeholder="Enter your comment"
            class="form-control"
            type="text"
            name=""
            @keyup="handleComment"
            :value="value"
          />
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped>
.comment-count {
  position: absolute;
  right: 0;
  top: -120px;
}
.count-like-child {
  position: absolute;
  left: 0;
}
.count-like {
  display: flex;
  position: absolute;
  right: 10px;
  bottom: -5px;
  background: #ffffff;
  padding: 0 5px;
  border-radius: 6px;
  color: rgba(0, 0, 0, 0.671);
}
.content-option-info {
  background-color: #ccd0d58d;
  position: relative;
  padding: 10px 0 0 10px;
  border-radius: 20px;
}

.count-like i {
  margin-right: 5px;
}

.color-text {
  color: blue;
}

.collapse-list-item .item {
  margin-bottom: 30px;
}

.content-option {
  display: flex;
  padding: 0;
}

.content-option li {
  margin-right: 10px;
}

.collapse-list {
  margin-top: 30px;
}

li {
  list-style: none;
}

.item {
  display: flex;
  align-items: center;
}

.collsapse-input {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 40px;
}

.float-right {
  width: 100%;
}

.collsapse-input input {
  width: 100%;
  border-radius: 20px;
}

.collapse img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 100%;
  margin-right: 10px;
}

.comment {
  display: flex;
  align-items: center;
}

.comment img {
  margin: 0 10px 0px 0;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  object-fit: cover;
}

.comment-content {
  position: relative;
  align-items: center;
  background: #ccd0d58d;
  padding: 10px 20px;
  border-radius: 20px;
  line-height: 15px;
}

.comment-content p {
  color: #050505;
  margin: 0;
}

.comment-content h5,
h4,
h5 {
  font-size: 16px !important;
}

.comment-option span {
  margin-right: 20px;
}

.comment-content-like,
.content-option-like,
.comment-content-relice {
  cursor: pointer;
}
</style>
