<template>
    <!-- d2-container 文档 https://doc.d2admin.fairyever.com/zh/sys-components/container.html -->
    <d2-container class="page-MovieList">
        <div class="movie-list">
            <movie></movie>
            <!--<div class="movie2">-->
                <!--<movie></movie>-->
            <!--</div>-->
        </div>

    </d2-container>
</template>

<script>
    // 组件
    import D2Crud from './components/D2Crud/index'
    import Movie from "./components/Movie/Movie";
    import {NextPage} from '@/api/movies/index'


    export default {
        name: 'MovieList',
        components: {
            Movie,
            D2Crud
        },
        // 数据
        data() {
            return {
                currentDate: new Date(),
                img_url: [],
                movie_name: [],
                rate: [],
                val: 1,
                p:3,
                pagination:{
                    currentPage:1
                }
            }
        },
        // 计算属性
        computed: {},
        // 侦听器
        watch: {},
        // 生命周期钩子
        beforeCreate() {
        },
        created() {
        },
        beforeMount() {
        },

        beforeUpdate() {
        },
        updated() {
        },
        activated() {
        },
        deactivated() {
        },
        beforeDestroy() {
        },
        destroyed() {
        },
        // 事件处理方法
        methods: {
            getData() {
                alert("你是sb吧2333")

            },

        }
    }
</script>

<style lang="scss">
    @import './MovieList.scss';

    .time {
        font-size: 13px;
        color: #999;
    }

    .movie-card > div :not(::first-line) {
        margin-top: 100px;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }


    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
    .movie-pagination {
        text-align: center;
    }
</style>
