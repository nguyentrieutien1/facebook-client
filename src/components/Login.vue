
<script>
import accountAction from '../actions/accountAction'
import axios from "axios"
axios.defaults.withCredentials = true
import { variable } from "./../contains/variable"
export default {
    data() {
        return {
            accountInfoRegister: {
                username: "",
                email: "",
                password: "",
                repassword: "",
                sex: "",
                address: ""
            },
            accountInfoLogin: {
                emailLogin: "",
                passwordLogin: ""
            }
        }
    },
    methods: {
        async handleRegisterAccount(e) {
            const result = await axios.post(`${variable.url}/register`, this.accountInfoRegister, { withCredentials: true })
            const data = await result.data;
            const { statusCode, message } = data;
            if (statusCode === 400) {
                return this.$toast.error(message)
            }
            this.$toast.success(message)
        },
        async handleLoginAccount(e) {
            const result = await axios.post(`${variable.url}/login`, { email: this.accountInfoLogin.emailLogin, password: this.accountInfoLogin.passwordLogin })
            const data = await result.data;
            const { statusCode, message } = data;
            if (statusCode === 400) {
                return this.$toast.error(message)
            }
            const { account } = data;
            accountAction.setAccount(account)
            accountAction.setMyAccount(account)
            this.$toast.success(message)
            return this.$router.push("/home")
        }
    },
    updated() {
    },
}
</script>
<template>
    <div class="row">
        <div class="col-lg-6">
            <form action="" method="POST" role="form" @submit.prevent="handleLoginAccount">
                <legend>Login title</legend>
                <div class="form-group">
                    <label for="">Username</label>
                    <input type="text" class="form-control" id="" placeholder="Enter Username"
                        v-model="accountInfoLogin.emailLogin" />
                </div>
                <div class="form-group">
                    <label for="">Passowrd</label>
                    <input type="text" class="form-control" id="" placeholder="Enter Password"
                        v-model="accountInfoLogin.passwordLogin" />
                </div>
                <button @click="handleLoginAccount" type="button" class="btn btn-primary">Submit</button>
            </form>
            <a data-toggle="modal" href="#register">register</a>
            <div class="modal fade" id="register">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                &times;
                            </button>
                        </div>
                        <div class="modal-body">
                            <form action="" method="POST" role="form">
                                <legend>Register Form</legend>
                                <div class="form-group">
                                    <label for="username">Username</label>
                                    <input type="text" class="form-control" id="username" placeholder="Enter Username"
                                        v-model="accountInfoRegister.username" />
                                </div>
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="text" class="form-control" id="email" placeholder="Enter Email"
                                        v-model="accountInfoRegister.email" />
                                </div>
                                <div class="form-group">
                                    <label for="password">Passowrd</label>
                                    <input type="text" class="form-control" id="password" placeholder="Enter Password"
                                        v-model="accountInfoRegister.password" />
                                </div>
                                <div class="form-group">
                                    <label for="repassword">Re-password</label>
                                    <input type="text" class="form-control" id="repassword"
                                        placeholder="Enter re-password" v-model="accountInfoRegister.repassword" />
                                </div>
                                <div class="form-group">
                                    <label for="">Address</label>
                                    <input type="text" class="form-control" id="" placeholder="Enter Address"
                                        v-model="accountInfoRegister.address" />
                                </div>
                                <div class="form-group">
                                    <label for="sex">Sex</label>
                                    <div class="radio">
                                        <label>
                                            <input type="radio" name="Sex" id="Male" value="Male"
                                                v-model="accountInfoRegister.sex" />
                                            Male
                                        </label><br>
                                        <label>
                                            <input type="radio" name="Sex" id="FeMale" value="FeMale"
                                                v-model="accountInfoRegister.sex" />
                                            FeMale
                                        </label>
                                    </div>
                                </div>

                            </form>
                        </div>
                        <div class="modal-footer">
                            <button @click="handleRegisterAccount" type="button" class="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style  scoped>
.col-lg-6 {
    margin-top: 100px;
}
</style>