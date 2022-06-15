<script>
import postAction from "../actions/postAction";
import socket from "../socket.io.client/instanceSocket";
export default {
  data() {
    return {
      account: JSON.parse(localStorage.getItem("account")),
      status: "public",
      postContent: "",
      id: JSON.parse(localStorage.getItem("account"))?.id,
      picture: [],
      images: [],
    };
  },
  computed: {
    statusC() {
      return this.status;
    },
    postContentC() {
      return this.postContent;
    },
    idC() {
      return +this.id;
    },
  },
  methods: {
    handleCreatePost(e) {
      this.$toast.info(`Post is creating, please wait!`);
      postAction
        .createPost(
          this.statusC,
          this.postContentC,
          this.idC,
          this.picture,
          this.images
        )
        .then((data) => {
          if (data) {
            const { statusCode, message } = data;
            if (statusCode === 400) {
              return this.$toast.error(message);
            }
            this.status = "public";
            this.postContent = "";
            socket.emit("create_post_client");
            return this.$toast.success(message);
          }
        });
    },
    async handleUploadPicture(e) {
      const files = e.target.files;
      const form = new FormData();
      for (let i = 0; i < files.length; i++) {
        form.append("picture", files[i]);
        this.images.push(`http://localhost:8000/images/${files[i].name}`);
      }
      this.picture = form;
    },
  },
  mounted() {},
};
</script>
<template>
  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 post">
    <div class="card">
      <div class="card-body">
        <div class="card-container-post">
          <img class="img-thumbnail" :src="[account?.avatar]" alt="" />
          <div class="float-right">
            <input
              type="text"
              class="form-control"
              required="required"
              title=""
              :placeholder="[`${account?.username} ơi, bạn đang nghĩ gì thế?`]"
              data-toggle="modal"
              href="#modal-id"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade modal-xl" id="modal-id">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Create Post</h3>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-hidden="true"
            >
              &times;
            </button>
          </div>
          <div class="modal-body">
            <div class="card-container card-container-modal">
              <div class="card-container-modal-title">
                <img class="img-thumbnail" :src="[account?.avatar]" alt="" />
                <select id="my-select" class="form-control" v-model="status">
                  <option selected="true" value="public">public</option>
                  <option value="private">private</option>
                </select>
              </div>

              <textarea
                id="my-textarea"
                class="form-control"
                name=""
                rows="3"
                :placeholder="[`${account?.username} ơi, bạn đang nghĩ gì thế`]"
                v-model="postContent"
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <div class="modal-footer-img">
              <input
                type="file"
                name=""
                id=""
                multiple
                @change="handleUploadPicture"
              />
            </div>
            <button
              type="button"
              class="btn btn-default close-btn"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              @click="handleCreatePost"
              type="button"
              data-dismiss="modal"
              class="btn btn-primary"
            >
              Create Post
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-container-modal-title {
  align-items: center;
  width: 180px;
  justify-content: space-between;
  display: flex;
}

.card-container-modal-title select {
  width: 100px;
}

.float-right {
  width: 100%;
}

.float-right input {
  width: 100%;
  border-radius: 20px;
}

.card-container-post {
  display: flex;
  align-items: center;
}

.card-container-post img,
.card-container-modal img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 100%;
  margin-right: 10px;
}

.card-container-modal {
  display: flex;
  flex-direction: column;
}
</style>
