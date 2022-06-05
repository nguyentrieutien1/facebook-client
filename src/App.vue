<script >
import accountAction from './actions/accountAction';
import Home from './components/Home.vue';
import Login from "./components/Login.vue"
import socket from './socket.io.client/instanceSocket';
import { accountStore } from './store/accountStore';
import { messengerStore } from './store/messengerStore';
export default {
  data() {
    return {
      account: accountStore,
      prevRoute: null
    }
  },
  computed: {
    isLoggin() {
      return this.account.isLoggin
    },
    myId() {
      return messengerStore.myId
    },
    friendId() {
      return messengerStore.friendId
    }
  },
  components: {
    Home,
    Login
  },
  methods: {
    handleLogout() {
      accountAction.handleLogout()
      this.$router.push("/login")
    },
    handleBackToHome() {
      this.$router.push("/home")
    }
  },

  created() {
    if (window.history.state.current === '/') {

      return this.$router.push("/home")
    }
    return this.$router.push(window.history.state.current)
  },
  mounted() {
  },


}
</script>

<template >
  <div class="header">
    <header style="display: flex">
      <div class="logo">
        <img @click="handleBackToHome" style="width: 40px; height: 40px"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1365px-Facebook_f_logo_%282019%29.svg.png"
          alt="" srcset="">
        <h3>FACEBOOK</h3>
      </div>
      <div class="dropdown" v-if="this.isLoggin">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-dots"
            viewBox="0 0 15 15">
            <path
              d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
            <path
              d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z" />
          </svg>
        </div>
        <div class="icon"> <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
            class="bi bi-bell" viewBox="0 0 16 16">
            <path
              d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
          </svg></div>

        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
          class="icon dropdown-toggle bi bi-chevron-double-down" data-toggle="dropdown" viewBox="0 0 16 16">
          <path fill-rule="evenodd"
            d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
          <path fill-rule="evenodd"
            d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
        </svg>
        <ul class="dropdown-menu">
          <li @click="handleLogout"><a href="#">Logout</a></li>
        </ul>
      </div>
    </header>
  </div>
  <RouterView />
</template>
<style scoped>
.logo,
.dropdown {
  display: flex;
  align-items: center;
}

.logo h3 {
  margin: 10px;
}

header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid rgba(0, 0, 0, 0.128);
  z-index: 2;
  background: white;
  padding: 10px;
}

.header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
}

.logo img {
  cursor: pointer;
}

.bi {
  margin: 0 10px;
  cursor: pointer;
}

.bi {
  width: 50px;
  height: 50px;
  background: #E4E6EB;
  text-align: center;
  line-height: 50px;
  margin-left: 20px;
  border-radius: 100;
  padding: 15px;
  border-radius: 100%;
  color: #050505
}
</style>
