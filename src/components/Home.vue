<script>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import { accountStore } from '../store/accountStore';
import FriendList from './FriendList.vue';
import Post from './Post.vue';
import SidebarLeft from './SidebarLeft.vue';
import SidebarRight from './SidebarRight.vue';
import socket from '../socket.io.client/instanceSocket';
import { messengerStore } from '../store/messengerStore';
import PostList from './PostList.vue';
import messengerListAction from '../actions/messengerListAction';
import { messListStore } from '../store/messListStore';
import messengerAction from '../actions/messengerAction';
export default {
    data() {
        return {
            accountStore,
            messengerStore,
            account: JSON.parse(localStorage.getItem("account"))
        }
    },
    components: {
        Carousel,
        Slide,
        Pagination,
        Navigation,
        FriendList,
        Post,
        SidebarLeft,
        SidebarRight,
        PostList
    },
    computed: {
        isLoggin() {
            return accountStore.isLoggin;
        },
        myId() {
            return messengerStore.myId
        },
        accountId() {
            return this.account?.id
        }
    },
    mounted() {
        if (this.accountId) {
            messengerListAction.getMessList(this.accountId).then(data => {
                messListStore.setMessList(data)
            })
        }
    },
    created() {
        if (!this.isLoggin) {
            this.$router.push("/login")
        }

        socket.emit("join_my_room", this.myId)
    },
    unmounted() {
        messengerAction.closeMess()
    },
};
</script>
<template>
    <main>
        <div class="row">
            <SidebarLeft />
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 sidebar__center">
                <Post />
                <FriendList />
                <PostList />
            </div>
            <SidebarRight />
        </div>
    </main>
</template>
<style scoped>
.sidebar__center {
    margin: 100px auto;
}

.modal-body {
    margin: 10px 0;
}
</style>
