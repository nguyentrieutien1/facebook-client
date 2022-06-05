

<script>
import { accountStore } from '../store/accountStore';
import accountAction from "./../actions/accountAction"
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import PostList from './PostList.vue';
export default {
    data() {
        return {
            accountStore
        }
    },
    components: {
        Carousel,
        Slide,
        Pagination,
        Navigation,
        PostList
    },
    created() {
        accountAction.getAccount();
    },
}
</script>
<template>
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div class="slide">
            <carousel :items-to-show="4" :transition="500" :wrap-around="true">
                <slide class="slide__item" v-for="account of accountStore.accounts" :key="slide">
                    <router-link :to="`/account/${account.id}`">
                        <img :src="account.avatar" alt="" srcset="">
                        <p>{{ account.username }}</p>
                        <button class="btn btn-primary addfri__btn">Add Friend</button>
                    </router-link>
                </slide>
                <template #addons>
                    <Navigation />
                </template>
            </carousel>
        </div>
    </div>

</template>
<style >
.slide {
    margin-top: 20px;
}

.carousel__next,
.carousel__prev {
    background-color: black;
}

.carousel__slide {
    height: 300px;
    border-radius: 8px;
}

.slide__item img {
    width: 180px;
    height: 180px;
    object-fit: cover;
    border-radius: 8px;
}

.slide__item {
    display: flex;
    flex-direction: column;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.318);
}

.carousel__next,
.carousel__prev {
    background: #0084FF;
}
</style>