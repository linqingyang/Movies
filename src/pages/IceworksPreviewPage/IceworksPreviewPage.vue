<template>
    <div class="movie-info">
        <div class="panel-heading">
            <h2 class="panel-title">{{movie.title}}</h2>
        </div>
        <div class="panel-body">
            <el-row>
                <el-col :span="4">
                    <div class="movie-img">
                        <img :src="getImages(movie.images.large)" :alt="movie.title">
                    </div>
                </el-col>
                <el-col :span="8" :offset="2">
                    <div class="movie-actor" id="movie-actor">
                        <p>
                            <strong>导演:</strong>
                            <span  v-for="(item,index) in movie.directors">{{item.name}}<i v-if="(index+1) != movie.directors.length">/</i></span>
                        </p>
                        <p>
                            <strong>类型:</strong>
                            <span v-for="(item,index) in movie.genres">{{item}}<i v-if="(index+1) != movie.genres.length">/</i></span>
                        </p>
                        <p>
                            <strong>主演:</strong>
                            <span v-for="(item,index) in movie.casts">{{item.name}}<i v-if="(index+1) != movie.casts.length">/</i></span>
                        </p>
                    </div>
                </el-col>
                <el-col :span="8" :offset="2">
                    <div class="movie-dt">
                        <p>
                            <strong>评分:</strong>
                            <span>{{movie.rating.average}}分</span>
                        </p>
                        <p>
                            <strong>时间:</strong>
                            <span>{{movie.year}}</span>
                        </p>
                        <p>
                            <strong>国家:</strong>
                            <span v-for="(item,index) in movie.countries">{{item}}<i v-if="(index+1) != movie.countries.length">/</i></span>
                        </p>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="summary">
            <h3>剧情简介</h3>
            <p class="movie-summary">{{movie.summary}}</p>
        </div>
        <div class="actors">
            <h3>演员列表</h3>
            <div class="actor-item" v-for="item in movie.casts">
                <img :src="getImages(item.avatars.small)"  referrerpolicy ="never" :alt="item.name">
                <p>{{item.name}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    // 组件
    import DataDisplay from './blocks/DataDisplay/index'
    import axios from 'axios'
    // 请删除下面代码中你不需要的部分
    export default {
        name: 'IceworksPreviewPage',
        components: {
            DataDisplay
        },
        // 数据
        data() {
            return {
                movie: {images: {large: ''}, directors: [], rating: {average: []}, genres: [], aka: [], casts: []}
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
        mounted() {
            var _this = this;
            // 直接请求豆瓣api
            axios.get('subject/' + _this.$route.query.id).then(function (res) {
                if (res.status == 200) {
                    console.log(res.data)
                    // 将数据装入变量movie中
                    _this.movie = res.data
                }
            });
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
            getInfo() {
                console.log('123123123')
            },
            // 解决403图片缓存问题
            getImages( _url ){
                if( _url !== undefined ){
                    let _u = _url.substring( 7 );
                    return 'https://images.weserv.nl/?url=' + _u;
                }
            },
        }
    }
</script>

<style lang="scss">
    @import './IceworksPreviewPage.scss';

    .movie-info .panel-heading {
        color: #31708f;
        background-color: #d9edf7;
        border-color: #bce8f1;
    }

    .panel-heading {
        padding: 10px 15px;
        border-bottom: 1px solid transparent;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
    }

    .movie-img {
        float: left;
        width: 210px;
    }

    .movie-img img {
        width: 100%;
        cursor: pointer;
    }

    .actor-item {
        float: left;
        margin-right: 20px;
    }

    .actor-item img {
        width: 140px;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 5px
    }
    .actor-item p {
        margin-top: 0px;
        text-align: center;
    }

    .summary {
        margin-top: -10px;
    }

    .movie-summary {
        color: #676767;
        line-height: 25px;
        letter-spacing: 3px;
    }

    .movie-actor p:not(first-child) {
        margin-bottom: 80px;
    }

    .movie-actor p {
        font-size: 20px;
    }

    .movie-actor p span {
        font-size: 18px;
    }

    .movie-dt p {
        font-size: 20px;
    }

    .movie-dt p span {
        font-size: 18px;
    }

    .movie-dt p:not(first-child) {
        margin-bottom: 80px;
    }
</style>
