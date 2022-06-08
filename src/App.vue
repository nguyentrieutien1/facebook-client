<script >
import accountAction from './actions/accountAction';
import Home from './components/Home.vue';
import Login from "./components/Login.vue"
import socket from './socket.io.client/instanceSocket';
import { accountStore } from './store/accountStore';
import { messengerStore } from './store/messengerStore';
import MessengerList from './components/MessengerList.vue';
import { messListStore } from "./store/messListStore"
import messengerListAction from './actions/messengerListAction';
import Messenger from "./components/Messenger.vue"
export default {
  data() {
    return {
      account: accountStore,
      prevRoute: null,
      messListStore,
      accountId: JSON.parse(localStorage.getItem("account"))?.id,
      messengerStore,
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
    },
    messList() {
      return this.messListStore?.messList
    },
    accountId() {
      return this.accountId
    },
    isToggleMessenger() {
      return this.messengerStore.isToggleMessenger

    },
    myAccount() {
      return this.account.myAccount
    }
  },
  components: {
    Home,
    Login,
    MessengerList,
    Messenger
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
    if (this.accountId) {
      messengerListAction.getMessList(this.accountId).then(data => {
        messListStore.setMessList(data)
      })
      socket.on("mess_list_server", () => {
        messengerListAction.getMessList(this.accountId).then(data => {
          messListStore.setMessList(data)
        })
      })
    }

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
        <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
          <div class="btn-group">
            <div class="icon icon__img"> <img :src="myAccount?.avatar" alt="" srcset="">
              <!-- <h5>{{ myAccount?.username.slice(0, 5) }}</h5> -->

            </div>
            <div class="icon" data-toggle="dropdown">
              <i class="fa-brands fa-facebook-messenger"></i>
            </div>
            <div class="dropdown-menu dropdown-menu-messenger">
              <MessengerList :messList="messList" />
            </div>
          </div>
          <div class=" icon"> <i class="fa-solid fa-bell"></i>
          </div>
          <div class="btn-group">
            <div class="icon" data-toggle="dropdown"><i class="fa-solid fa-caret-down"></i></div>
            <div class="dropdown-menu">
              <a class="dropdown-item" @click="handleLogout" href="#">Logout</a>
            </div>
          </div>
        </div>
      </div>
    </header>

    <Messenger v-if="isToggleMessenger" />
  </div>
  <RouterView />
</template>
<style scoped>
.icon img {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  object-fit: cover;
}

.dropdown-menu-messenger {
  width: 400px;
  margin-left: -200px;
  overflow-y: scroll;
  height: 800px;
}

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

.icon i {
  font-size: 20px;
}

.icon {
  margin-left: 30px;
  height: 50px;
  width: 50px;
  text-align: center;
  line-height: 50px;
  border-radius: 100%;
  border: 1px solid #0084FF;
  color: #0084FF;
  cursor: pointer
}

.icon__img {
  border: none;
  outline: none;
}
</style>
