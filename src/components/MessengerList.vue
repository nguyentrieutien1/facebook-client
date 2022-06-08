

<script>
import accountAction from '../actions/accountAction';
import messengerAction from '../actions/messengerAction';
import { messListStore } from '../store/messListStore'
import humanized_time from "./../helpers/humanized_time"


export default {
    props: ['messList'],
    data() {
        return {
            messListStore,
            accountId: JSON.parse(localStorage.getItem("account"))?.id
        }
    },

    computed: {
        accountId() {
            return this.accountId
        }
    },
    methods: {
        handleToggleMess(friendId) {
            accountAction.getDetailAccount(+friendId).then(() => {
                messengerAction.setFriendId(friendId)
                messengerAction.turnOnMess()
            })
        },
        timeMess(time) {
            return humanized_time(time)
        }
    },
    mounted() {
        console.log(this.messList);
    },
}
</script>
<template>
    <div>
        <div class="mess__list-container">
            <div class="mess__list-title">
                <h3>Chat</h3>
            </div>
            <div class="mess__list-search">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder="Tìm kiếm trên Messenger">
            </div>
            <div class="mess_list" v-for="(mess, index) in messList" @click="handleToggleMess(mess?.account?.id)">
                <div class="mess__list-info">
                    <div class="mess__list-info--avatar">
                        <img :src="mess?.account?.avatar" alt="" srcset="">
                    </div>
                    <div class="mess__list-content">
                        <div class="mess__list-content-info">
                            <div class="mess__list-content--username">
                                <h5>{{ accountId === mess?.account?.id ? "Only Me" : mess?.account?.username }}</h5>
                            </div>
                            <div class="mess__list-content--messenger">
                                <span>{{ accountId === mess?.myId ? `You : ${mess.messenger.slice(0, 20)}` :
                                        `${mess.messenger.slice(0, 20)}`
                                }}</span>
                            </div>
                        </div>
                        <div class="mess__list-content-info-time">
                            {{ timeMess(mess?.time) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style  scoped>
.mess_list {
    cursor: pointer;
}

.mess__list-info {
    display: flex;
    margin: 30px 0;
}

.mess__list-info img {
    width: 60px;
    height: 60px;
    border-radius: 100%;
    object-fit: cover;
    margin-right: 20px;
}

.mess__list-container {
    width: 100%;
    padding: 20px;
}

.mess__list-title {
    text-align: left;
}

.mess__list-search {
    position: relative;
    height: 40px;
}

.mess__list-search i {
    position: absolute;
    left: 20px;
    color: #4c4f5263;
    font-size: 20px;
    line-height: 40px;
}

.mess__list-search input {
    padding-left: 50px;
    border-radius: 20px;
    border: none;
    outline: none;
    background: #bec3c963;
    width: 100%;
    height: 100%;
}

.mess__list-content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
}

.mess__list-content-info-time {
    font-size: 14px;
    white-space: nowrap;
    margin-left: 10px;
}
</style>