
<script>
export default {

}
</script>
<template>
    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 sidebar__right">
        <div class="sidebar__right-container">
            <div class="addfriend">
                <div class="card__add_friend">
                    <h5>Lời mời kết bạn</h5>
                </div>
                <div class="card__info">
                    <div class="card__info-avar">
                        <img src="https://1.bp.blogspot.com/-in5UajwJJNE/Xh_fz8bm1pI/AAAAAAAAU3U/NHuuBM0MbEAJL2qm2hAjH_sxsrUBjiMmQCLcBGAsYHQ/s1600/hinh-anh-trai-dep%253Ddau-nam-hot-boy-2k-Wap102%2B%25284%2529.jpg"
                            alt="" srcset="">
                    </div>
                    <div class="card__info-name">
                        <h5>Dụng Quang Nho</h5>
                        <div class="card__info-button">
                            <button class="btn btn-primary">Xác nhận</button>
                            <button class="btn btn-default">Xóa</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="contact">
                <h5>Người liên hệ</h5>
                <div class="contact__info">
                    <img src="https://iv.vnecdn.net/giaitri/images/web/2020/07/05/son-tung-m-tp-ra-mv-ve-tinh-yeu-1593965250_900x540.jpg"
                        alt="" srcset="">
                    <h5>Nguyễn Công Phượng</h5>
                </div>
                <div class="contact__info">
                    <img src="https://iv.vnecdn.net/giaitri/images/web/2020/07/05/son-tung-m-tp-ra-mv-ve-tinh-yeu-1593965250_900x540.jpg"
                        alt="" srcset="">
                    <h5>Nguyễn Công Phượng</h5>
                </div>
                <div class="contact__info">
                    <img src="https://iv.vnecdn.net/giaitri/images/web/2020/07/05/son-tung-m-tp-ra-mv-ve-tinh-yeu-1593965250_900x540.jpg"
                        alt="" srcset="">
                    <h5>Nguyễn Công Phượng</h5>
                </div>
                <div class="contact__info">
                    <img src="https://iv.vnecdn.net/giaitri/images/web/2020/07/05/son-tung-m-tp-ra-mv-ve-tinh-yeu-1593965250_900x540.jpg"
                        alt="" srcset="">
                    <h5>Nguyễn Công Phượng</h5>
                </div>
                <div class="contact__info">
                    <img src="https://iv.vnecdn.net/giaitri/images/web/2020/07/05/son-tung-m-tp-ra-mv-ve-tinh-yeu-1593965250_900x540.jpg"
                        alt="" srcset="">
                    <h5>Nguyễn Công Phượng</h5>
                </div>
                <div class="contact__info">
                    <img src="https://iv.vnecdn.net/giaitri/images/web/2020/07/05/son-tung-m-tp-ra-mv-ve-tinh-yeu-1593965250_900x540.jpg"
                        alt="" srcset="">
                    <h5>Nguyễn Công Phượng</h5>
                </div>
                <div class="contact__info">
                    <img src="https://iv.vnecdn.net/giaitri/images/web/2020/07/05/son-tung-m-tp-ra-mv-ve-tinh-yeu-1593965250_900x540.jpg"
                        alt="" srcset="">
                    <h5>Nguyễn Công Phượng</h5>
                </div>
                <div class="contact__info">
                    <img src="https://iv.vnecdn.net/giaitri/images/web/2020/07/05/son-tung-m-tp-ra-mv-ve-tinh-yeu-1593965250_900x540.jpg"
                        alt="" srcset="">
                    <h5>Nguyễn Công Phượng</h5>
                </div>
                <div class="contact__info">
                    <img src="https://iv.vnecdn.net/giaitri/images/web/2020/07/05/son-tung-m-tp-ra-mv-ve-tinh-yeu-1593965250_900x540.jpg"
                        alt="" srcset="">
                    <h5>Nguyễn Công Phượng</h5>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
h5 {
    font-size: 16px;
}

.sidebar__right-container {}

.contact__info {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 35px;
}

.contact__info::before {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background: rgb(38, 244, 6);
    bottom: 0px;
    left: 45px;

}

.contact {
    margin-top: 30px;
}

.btn-primary {
    margin-right: 10px;
}

.card__info-button {
    margin-top: 20px;
}

.addfriend {
    width: 100%;
    padding-bottom: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.261);
}

.card {
    width: 100%;
    margin: 0;
    padding: 0;
}

.card__info {
    display: flex;
    align-items: center;
}

.card__info-avar img,
.contact__info img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 100%;
    margin-right: 20px;
}

.sidebar__right {
    position: fixed;
    right: 0;
    height: 100%;
    top: 70px;
    margin: 0;
    width: 400px;
    padding-top: 40px;
    overflow-y: scroll;
    background: white;
}
</style>