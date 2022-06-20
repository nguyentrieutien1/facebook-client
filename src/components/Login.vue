<script>
import accountAction from "../actions/accountAction";
import axios from "axios";
axios.defaults.withCredentials = true;
import { variable } from "./../contains/variable";
export default {
  data() {
    return {
      accountInfoRegister: {
        username: "",
        email: "",
        password: "",
        repassword: "",
        sex: "",
        address: "",
      },
      accountInfoLogin: {
        emailLogin: "",
        passwordLogin: "",
      },
    };
  },
  methods: {
    async handleRegisterAccount(e) {
      const result = await axios.post(
        `${variable.url}/register`,
        this.accountInfoRegister,
        { withCredentials: true }
      );
      const data = await result.data;
      const { statusCode, message } = data;
      if (statusCode === 400) {
        return this.$toast.error(message);
      }
      this.$toast.success(message);
      return window.location.reload();
    },
    async handleLoginAccount(e) {
      const result = await axios.post(`${variable.url}/login`, {
        email: this.accountInfoLogin.emailLogin,
        password: this.accountInfoLogin.passwordLogin,
      });
      const data = await result.data;
      const { statusCode, message } = data;
      if (statusCode === 400) {
        return this.$toast.error(message);
      }
      const { account } = data;
      accountAction.setAccount(account);
      accountAction.setMyAccount(account);
      window.location.href = "/";
    },
  },
  updated() {},
  mounted() {
    ityped.init(document.querySelector(".txt"), {
      showCursor: false,
      strings: ["Hello, My Name Trieu Tien Nguyen", "Wellcome to my app !"],
    });
  },
};
</script>
<template>
  <div class="row">
    <div class="col-lg-3 col-md-3 login-form">
      <div class="bgr-img">
        <div class="txt"></div>
        <div class="icon">
          <i class="fa-brands fa-facebook-f"></i
          ><i class="fa-brands fa-instagram"></i
          ><i class="fa-brands fa-github"></i>
          <i class="fa-brands fa-twitter"></i>
        </div>
      </div>
      <form
        action=""
        method="POST"
        role="form"
        @submit.prevent="handleLoginAccount"
      >
        <legend style="color: #007bff">Login Form</legend>
        <div class="form-group">
          <label for="">Username</label>
          <input
            type="text"
            class="form-control"
            id=""
            placeholder="Enter Username"
            v-model="accountInfoLogin.emailLogin"
          />
        </div>
        <div class="form-group">
          <label for="">Passowrd</label>
          <input
            type="password"
            class="form-control"
            id=""
            placeholder="Enter Password"
            v-model="accountInfoLogin.passwordLogin"
          />
        </div>
        <button
          @click="handleLoginAccount"
          type="button"
          class="btn btn-primary"
        >
          Login
        </button>
      </form>
      <a data-toggle="modal" href="#register" class="register-btn btn btn-info"
        >Register</a
      >
      <div class="modal fade" id="register">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
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
              <form action="" method="POST" role="form">
                <legend>Register Form</legend>
                <div class="form-group">
                  <label for="username">Username</label>
                  <input
                    type="text"
                    class="form-control"
                    id="username"
                    placeholder="Enter Username"
                    v-model="accountInfoRegister.username"
                  />
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <input
                    type="text"
                    class="form-control"
                    id="email"
                    placeholder="Enter Email"
                    v-model="accountInfoRegister.email"
                  />
                </div>
                <div class="form-group">
                  <label for="password">Passowrd</label>
                  <input
                    type="text"
                    class="form-control"
                    id="password"
                    placeholder="Enter Password"
                    v-model="accountInfoRegister.password"
                  />
                </div>
                <div class="form-group">
                  <label for="repassword">Re-password</label>
                  <input
                    type="text"
                    class="form-control"
                    id="repassword"
                    placeholder="Enter re-password"
                    v-model="accountInfoRegister.repassword"
                  />
                </div>
                <div class="form-group">
                  <label for="">Address</label>
                  <input
                    type="text"
                    class="form-control"
                    id=""
                    placeholder="Enter Address"
                    v-model="accountInfoRegister.address"
                  />
                </div>
                <div class="form-group">
                  <label for="sex">Sex</label>
                  <div class="radio">
                    <label>
                      <input
                        type="radio"
                        name="Sex"
                        id="Male"
                        value="Male"
                        v-model="accountInfoRegister.sex"
                      />
                      Male </label
                    ><br />
                    <label>
                      <input
                        type="radio"
                        name="Sex"
                        id="FeMale"
                        value="FeMale"
                        v-model="accountInfoRegister.sex"
                      />
                      FeMale
                    </label>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                @click="handleRegisterAccount"
                type="button"
                class="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.icon {
  position: absolute;
  bottom: 10px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  left: 20%;
}
.fa-brands {
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  margin-right: 30px;
  border-radius: 100%;
  border: 1px solid white;
  cursor: pointer;
  position: relative;
  transition: 0.7s ease;
}
.fa-facebook-f {
  animation: icon 1s ease-in;
  animation-delay: 1s;
}
.fa-facebook-f:hover {
  background-color: white;
  color: #0069d9;
}
.fa-instagram {
  animation: icon 2s ease-in;
  animation-delay: 2s;
}
.fa-instagram:hover {
  background-color: white;
  color: #ed4c52;
}
.fa-github {
  animation: icon 3s ease-in;
  animation-delay: 3s;
}
.fa-github:hover {
  color: black;
  background-color: white;
}
.fa-twitter {
  animation: icon 4s ease-in;
  animation-delay: 4s;
}
.fa-twitter:hover {
  color: #1da1f2;
  background-color: white;
}
@keyframes icon {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.bgr-img {
  position: absolute;
  border-radius: 6px;
  width: 400px;
  height: 500px;
  background-image: linear-gradient(to right, rgba(20, 5, 5, 0.138), #0069d9),
    url("./../assets/bgr.jpg");
  left: -380px;
  top: -200px;
  z-index: -100;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 4px 4px 10px #0069d9;
  animation: run 0.7s ease-in;
}
.txt {
  color: white;
  font-size: 25px;
  text-align: center;
}
.icon {
  color: white;
}
input {
  border: none;
  outline: none;
  border-bottom: 1px solid #0069d9;
}
.login-form {
  margin: 300px auto;
  padding: 40px 20px;
  border-radius: 10px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.201);
  background: white;
  position: absolute;
  left: 45%;
}
@keyframes run {
  0% {
    opacity: 0;
    top: -300px;
  }
  100% {
    opacity: 1;
    top: -200px;
  }
}
.btn-primary {
  width: 100%;
}
.register-btn {
  width: 100%;
  text-align: center;
  margin-top: 10px;
}
.btn-primary,
.register-btn {
  float: right;
}
</style>
