<script>
import axios from "axios";
import accountAction from "../actions/accountAction";
import { variable } from "../contains/variable";

export default {
  data() {
    return {
      acc: JSON.parse(localStorage.getItem("account")),
    };
  },
  computed: {
    account() {
      return this.acc;
    },
  },
  methods: {
    async handleChangeAvt() {
      const file = this.$refs.myFiles.files[0];
      const form = new FormData();
      form.append("images", file);
      axios
        .put(`${variable.url}/account/upload/avatar/${this.acc.id}`, form)
        .then((r) => r.data)
        .then(() => {
          this.getAccount().then((d) => {
            localStorage.setItem("account", JSON.stringify(d));
            window.location.reload();
          });
        });
    },
    async getAccount() {
      const result = await axios.get(`${variable.url}/account/${this.acc?.id}`);
      const data = await result.data;
      this.acc = { ...data?.account };
      return data?.account;
    },
    async handleUpdateAccount() {
      let { username, password, sex, address } = this.$refs;
      username = username.textContent;
      password = password.value;
      address = address.textContent;
      sex = sex.value;
      const email = this.acc?.email;
      axios
        .patch(`${variable.url}/account/update`, {
          username,
          password,
          sex,
          address,
          email,
        })
        .then((r) => r.data)
        .then((d) => {
          const { statusCode, message } = d;
          const account = JSON.parse(localStorage.getItem("account"));
          let { username, password, sex, address } = this.$refs;
          account.username = username.textContent;
          account.address = address.textContent;
          account.sex = sex.value;
          localStorage.setItem("account", JSON.stringify(account));
          this.$toast.success(message);
          window.location.reload();
        });
    },
  },
  mounted() {
    this.getAccount();
    if (!this.acc) {
      window.location.href = "/login";
    }
  },
};
</script>
<template>
  <div style="margin-top: 100px">
    <div class="row">
      <div class="col-lg-3 account">
        <form action="" method="POST" role="form">
          <legend>Account Infomation</legend>
          <div class="form-group avt">
            <img :src="[account?.avatar]" alt="" srcset="" />
            <div class="form-check">
              <input
                style="display: none"
                id="my-input"
                class="form-check-input"
                type="file"
                @change="handleChangeAvt"
                ref="myFiles"
              />
              <label for="my-input" class="form-check-label"
                ><i class="fa-solid fa-camera"></i
              ></label>
            </div>
          </div>
          <div class="form-group">
            <h5>Username</h5>
            <p ref="username" contenteditable="true">{{ account?.username }}</p>
          </div>
          <div class="form-group">
            <h5>Sex</h5>
            <select
              ref="sex"
              id="my-select"
              class="form-control"
              :value="account?.sex"
            >
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div class="form-group">
            <h5>Address</h5>
            <p ref="address" contenteditable="true">{{ account?.address }}</p>
          </div>
          <div class="form-group">
            <h5>Password</h5>
            <input
              class="form-control"
              placeholder="enter to change password"
              ref="password"
              type="password"
            />
          </div>
          <button
            type="button"
            @click="handleUpdateAccount"
            class="btn btn-primary"
          >
            Update Account
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped>
.fa-camera {
  position: absolute;
  bottom: 30px;
  left: 40px;
  font-size: 20px;
  color: white;
  cursor: pointer;
}
.form-group {
  margin-top: 40px;
}
.avt {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  position: relative;
}
.avt img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 100%;
}
.btn {
  float: right;
}
.account {
  margin: 0 auto;
  padding: 10px;
  border-radius: 9px;
  box-shadow: 4px 4px 4px #0069d9;
  border: 1px solid #0069d9;
}
</style>
