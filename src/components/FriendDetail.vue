

<script>
import accountAction from '../actions/accountAction'
import messengerAction from '../actions/messengerAction'
import socket from '../socket.io.client/instanceSocket'
import { accountStore } from '../store/accountStore'
import { messengerStore } from '../store/messengerStore'
import Messenger from './Messenger.vue'
import PostList from "./PostList.vue"
export default {
    data() {
        return {
            id: this.$route.params.id,
            accountStore,
            messengerStore,
            messList: []
        };
    },
    components: { PostList },
    computed: {
        accountStoreF() {
            return this.accountStore.accountDetail;
        },
        myId() {
            return this.messengerStore.myId;
        },
        friendId() {
            return this.messengerStore.friendId;
        },
        isToggleMessenger() {
            return this.messengerStore.isToggleMessenger
        },
        isLoggin() {
            return this.accountStore.isLoggin;
        }
    },
    created() {
        accountAction.getDetailAccount(this.id);
    },
    methods: {
        handleJoinRoom() {
            messengerAction.setFriendId(this.id);
            messengerAction.toggleMessenger()
            socket.emit('join_room', { myId: this.myId, friendId: this.friendId })
        }
    },
    mounted() {
        socket.emit("join_my_room", this.myId)
    },
    components: { Messenger }
}
</script>
<template>
    <div class="row friend-detail">
        <PostList />
        <div class="col-lg-6">
            <div class="card">
                <div class="card-body-detail">
                    <img :src="accountStoreF.account?.avatar" alt="" srcset="">
                    <h5 class="card-title">{{ accountStoreF.account?.username }}</h5>
                    <h3 class="card-title">{{ accountStoreF.account?.sex }}</h3>
                    <button @click="handleJoinRoom" class="btn btn-primary"
                        :id="accountStoreF.account?.id">Message</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.card-body-detail img {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    object-fit: cover;
}

.friend-detail {
    position: relative;
    top: 100px
}
</style>