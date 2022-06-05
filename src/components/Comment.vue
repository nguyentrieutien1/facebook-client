

<script>
import timeHuman from "./../helpers/humanized_time"
export default {
    props: ['comment'],
    computed: {
        avatar() {
            return this.comment?.avatar
        },
        comment() {
            return this.comment?.comment
        },
        username() {
            return this.comment?.username
        },
        timeC() {
            return this.comment?.timeComment
        }

    },
    methods: {
        time(time) {
            return timeHuman(time)
        }
    },
    mounted() {
    },
}
</script>
<template>
    <div class="comment">
        <div class="comment-avatar">
            <img :src="avatar" alt="img" srcset="">
        </div>
        <div class="comment-text">
            <div class="comment-content">
                <h5>{{ username }}</h5>
                <br>
                <span>{{ comment }}</span>
            </div><br>
            <div class="comment-option">
                <span>Like</span>
                <span>Replice</span>
                <span>{{ time(timeC) }}</span>
            </div>
        </div>
    </div>

</template>
<style  scoped>
.comment {
    display: flex;
    align-items: center;
}

.comment img {
    margin: 0 10px 0px 0;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    object-fit: cover;
}

.comment-content {
    align-items: center;
    background: #ccd0d58d;
    padding: 10px 20px;
    border-radius: 20px;
    line-height: 15px;
}

.comment-content p {
    color: #050505;
    margin: 0
}

.comment-content h5 {
    font-size: 16px !important;

}

.comment-option span {
    margin-right: 20px
}
</style>