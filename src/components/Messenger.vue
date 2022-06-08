

<script>
import messengerAction from '../actions/messengerAction'
import messengerListAction from '../actions/messengerListAction'
import socket from '../socket.io.client/instanceSocket'
import { accountStore } from '../store/accountStore'
import { messengerStore } from '../store/messengerStore'
import { messListStore } from '../store/messListStore'

export default {
    props: ['friendIds'],
    data() {

        return {
            messengerStore,
            accountStore,
            text: "",
            account: JSON.parse(localStorage.getItem("account"))
        }

    },
    unmounted() {
        messengerAction.closeMess()
    },
    computed: {
        friendId() {
            return +this.messengerStore.friendId
        },
        myId() {
            return +this.account?.id
        },
        messengerList() {
            return [...this.messengerStore.messengerList]
        },
        accountDetail() {
            return this.accountStore?.accountDetail
        },
        textC() {
            return this.text
        },
    },
    watch: {
        messengerList: {
            handler(newState) {
                // this.messengerStore.messengerList = [...newState]
            },
            immediate: true
        }
    },
    methods: {
        getMessPartner() {
            messengerAction.getMessPartner(this.myId, this.friendId).then(() => {
                this.scrollToBottomMess()
            })
        },
        async handleSendMessenger() {
            const data = await messengerAction.handleSendMessenger(this.textC, this.friendId, this.myId)
            const { statusCode, message } = data;
            if (statusCode === 200) {
                const promise = new Promise(r => {
                    socket.emit("send_mess", { messenge: this.textC, friendId: this.friendId, myId: this.myId })
                    r('seen')
                })
                promise.then(() => {
                    this.getMessPartner()
                    messengerListAction.getMessList(this.myId).then(data => {
                        messListStore.setMessList(data)
                    })
                    this.text = ""
                })
            }
        },
        handleCloseMess() {
            messengerAction.closeMess()
        },
        scrollToBottomMess() {
            const cardBodyElement = document.querySelector(".card-body");
            cardBodyElement.scrollTo({
                top: (cardBodyElement.scrollHeight + 1000),
            })
        },
        handleEntering(e) {
            const value = e.target.value;
            socket.emit("handle_entering_client", {
                value,
                friendId: this.friendId
            })
        }
    },
    created() {
        this.getMessPartner();
        socket.on("revice_mess", () => {
            this.getMessPartner()
            const messElement = document.getElementById("mess")
            messElement.setAttribute("placeholder", "Enter messenger")
        })
        socket.on('handle_entering_server', ({ value }) => {
            const messElement = document.getElementById("mess")
            if (value) {
                messElement.setAttribute("placeholder", "Đối tượng đang nhập tin nhắn, vui lòng đợi")
                messElement.classList.add("input")
                return;
            }
            return messElement.setAttribute("placeholder", "Enter messenger")
        })
    },
    mounted() {
        this.scrollToBottomMess()
    },
}
</script>
<template>
    <div class="col-lg-5 message">
        <div class="card">
            <div class="card-header">
                <div class="card-info">
                    <div class="card-header-img">
                        <img :src="accountDetail.account?.avatar">
                    </div>
                    <div class="card-heade-name">
                        <h4>{{ myId === accountDetail.account?.id ? "Only Me" : accountDetail.account?.username }}</h4>
                    </div>
                </div>
                <div class="card-header-close">
                    <svg @click="handleCloseMess" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                        <path
                            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                    </svg>
                </div>
            </div>
            <div class="card-body card-content-messenger">
                <div v-for="(messager, index) in messengerList"
                    :class="[messager.username === this.accountDetail.account.username && myId !== accountDetail.account?.id ? 'left' : 'right', 'card-body-mess',]"
                    :name="messager.username">
                    <img :src="messager.avatar" alt="" v-if="messager.username === this.accountDetail.account.username">
                    <p :class="[`messenger-${index}`]">{{ messager.messenger }}</p>

                </div>
            </div>
            <div>
                <form @submit.prevent="handleSendMessenger" class="card-footer">
                    <input @keyup="handleEntering" class="form-control" type="text" id="mess"
                        placeholder="Enter Messenger" v-model="text">
                    <svg @click="handleSendMessenger" xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                        fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
                        <path
                            d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                    </svg>
                </form>
            </div>
        </div>
    </div>
</template>
<style scoped >
.message {
    position: fixed;
    bottom: 0;
    right: 200px;
    width: 500px;
}

.card-content-messenger {
    height: 400px;
    overflow: scroll;
    padding-bottom: 10px;
}

.card-footer {
    display: flex;
    align-items: center;
}

.card-info {
    display: flex;
    align-items: center;
}

.card-info h4 {
    margin-left: 10px;
}

p {
    word-break: break-all;
    padding: 10px 10px 0 10px;
}

.card-body-mess {
    display: flex;
    align-items: center;
    margin: 10px 0;
    border-radius: 20px;
    padding: 4px;
    color: white;
    width: 60%;
    height: max-content;
}

.right {
    position: relative;
    margin-left: 150px;
    background: #0084FF;
    float: right;
    margin-bottom: 20px;

}

.left {
    background: #E4E6EB;
    color: black
}

.card-info img,
.card-body-mess img {
    width: 50px !important;
    height: 50px !important;
    border-radius: 100%;
    background: red;
    object-fit: cover;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-header-close {
    cursor: pointer;
    color: #0084FF;
}

.input::placeholder {
    font-size: 1em;
    animation: input .8s linear infinite alternate;
}

.bi-send-fill {
    color: #0084FF;
    margin-left: 10px;
}


@keyframes input {
    from {
        opacity: 0;
        display: none;
    }

    to {
        opacity: 1;
        display: block;
    }
}
</style>