
<script>
export default {
    data() {
        return {
            account: JSON.parse(localStorage.getItem('account'))
        }
    },
    computed: {
        account() {
            return this.account
        }
    },
    mounted() {
    },
}
</script>
<template>

    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 sidebar__left">
        <div class="sidebar__left-container">
            <div class="sidebar__left-item sidebar__left-account">
                <div class="sidebar__left-item sidebar__left-account-avatar">
                    <img :src="account?.avatar" alt="" srcset="">
                </div>
                <div class="sidebar__left-item sidebar__left-username">
                    <h5>{{ account?.username }}</h5>
                </div>
            </div>
            <div class="sidebar__left-item sidebar__left-friend">
                <i class="fa-solid fa-user-group"></i>
                <h5>Bạn bè</h5>
            </div>
            <div class="sidebar__left-item sidebar__left-memory">
                <i class="fa-solid fa-clock"></i>
                <h5>Kỉ niệm</h5>
            </div>
            <div class="sidebar__left-item sidebar__left-game">
                <i class="fa-solid fa-gamepad"></i>
                <h5>Chơi game</h5>
            </div>
            <div class="sidebar__left-item sidebar__left-group"><i class="fa-solid fa-users-line"></i>
                <h5>Nhóm</h5>
            </div>
            <div class="sidebar__left-item sidebar__left-maketplace">
                <i class="fa-brands fa-cc-amazon-pay"></i>
                <h5>Chợ</h5>
            </div>
            <div class="sidebar__left-item sidebar__left-more">
                <i class="fa-solid fa-chevron-down"></i>
                <h5>Xem thêm</h5>
            </div>
        </div>
        <div class="sidebar__left-footer">
            <div class="sidebar__left-footer-title">
                <h5>Lối tắt của bạn</h5>
            </div>
        </div>
        <div class="sidebar__left-footer-item sidebar__left-footer-titile">
            <img src="https://media.kasperskydaily.com/wp-content/uploads/sites/92/2020/02/17105257/game-ratings-featured.jpg"
                alt="" sizes="" srcset="">
            <h5>Game 1</h5>
        </div>
        <div class="sidebar__left-footer-item sidebar__left-footer-titile">
            <img src="https://media.kasperskydaily.com/wp-content/uploads/sites/92/2020/02/17105257/game-ratings-featured.jpg"
                alt="" sizes="" srcset="">
            <h5>Game 1</h5>
        </div>
        <div class="sidebar__left-footer-item sidebar__left-footer-titile">
            <img src="https://media.kasperskydaily.com/wp-content/uploads/sites/92/2020/02/17105257/game-ratings-featured.jpg"
                alt="" sizes="" srcset="">
            <h5>Game 1</h5>
        </div>
    </div>
</template>
<style scoped>
.sidebar__left-footer-item img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 20px;
}

.sidebar__left-footer-item {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
}

.sidebar__left-footer-title h5 {
    margin-top: 20px;
    color: #75777B;
    font-size: 18px;
}

.sidebar__left-container {
    padding-bottom: 40px;
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.243);
}

.sidebar__left-more i {
    border-radius: 100%;
    background: #D8DADF;
    color: black;
    height: 40px;
    width: 40px;
    text-align: center;
    line-height: 40px;
}

.sidebar__left-item h5 {
    color: black;
    font-size: 16px !important;
    margin-top: 7px;
}

.sidebar__left-item i {
    margin-right: 10px;
}

.sidebar__left-item {
    cursor: pointer;
    font-size: 25px;
    color: #1E91EC
}

.sidebar__left-item {
    display: flex;
    align-items: center;
    margin-top: 20px;
}

.sidebar__left-account-avatar img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 100%;
    margin-right: 20px;

}

.sidebar__left {
    position: fixed;
    left: 0;
    height: 100%;
    top: 80px;
    overflow-y: scroll;
}

.sidebar__left-account {
    margin: 0
}
</style>