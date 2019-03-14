<template>
    <div class="movie-carousel">
        <el-carousel :interval="4000" type="card" height="180px">
            <el-carousel-item v-for="item in 6" :key="item">
                <h3>{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>
        <div class="movie-info">
            <el-col :span="3" v-for="(o, index) in 12" :key="o" :offset="1">
                <div class="movie-info">
                    <div :class="sst[index]">
                        <el-card :body-style="{ padding: '0px' }">
                            <img :src="getImages(img_url[o-1])" class="image"@click="getData(movie_id[o-1])">
                            <div style="padding: 14px;">
                                <span>{{movie_name[o-1]}}</span>
                                <div class="bottom clearfix">
                                    <time class="time">豆瓣评分: {{ rate[o-1] }} 分</time>
                                    <el-button type="text" class="button" @click="getData" style="margin-left: 22px">马上观看</el-button>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </div>
            </el-col>
        </div>
        <div class="movie-pagination">
            <div class="movie-block">
                <span class="demonstration">请选择分页</span>
                <el-pagination
                        background
                        :page-size="12"
                        :current-page.sync="nowPage"
                        @current-change="next_page"
                        :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import {MovieList} from '@/api/movies/index'
    import axios from 'axios'
    export default {
        name: "Movie",
        // prpos:['img_url', 'movie_name', 'rate'],
        data() {
            return {
                currentDate: new Date(),
                img_url: [],
                movie_name: [],
                rate: [],
                movie_id: [],
                movie: "movie",
                currentPage1: 1,
                sst: [
                    "s1", "s1", "s1", "s1", "s1", "s1",
                    "s2", "s2", "s2", "s2", "s2", "s2",
                ],
                nowPage: 1,
                total: 1,
            }
        },
        mounted() {
            var _this = this;
            console.log("sdasda");
            MovieList().then(function (res) {
                console.log(res.data.results)
                // 取到后台返回的全部数据
                _this.total = res.data.count
                for (var i = 0; i < res.data.results.length; i++) {
                    // 循环将数据填入对应的数组中
                    _this.img_url.push(res.data.results[i].cover);
                    _this.movie_name.push(res.data.results[i].title)
                    _this.rate.push(res.data.results[i].movie_rate)
                    _this.movie_id.push(res.data.results[i].movie_id)
                }
                console.log(_this.movie_id)
            }).catch(function (error) {
                // 打印错误
                console.log(error)
            })
        },
        methods: {
            getData(val) {
                console.log(val);
                // 跳转到电影详情页面
                this.$router.push({path:'/IceworksPreviewPage',query:{id:val}})

            },
            // 解决403图片缓存问题
            getImages( _url ){
                if( _url !== undefined ){
                    let _u = _url.substring( 7 );
                    return 'https://images.weserv.nl/?url=' + _u;
                }
            },
            clearArrary(list){
                // 利用pop函数清空数组
                for (var i = 0; i <list.length ; i++) {
                    list.pop()
                }
            },
            next_page() {
                var _this = this;
                axios.get('movies/data',{
                    params:{
                        // 请求参数
                        p:_this.nowPage
                    }
                }).then(function (res) {
                    console.log(res)
                    _this.clearArrary(_this.img_url)
                    _this.clearArrary(_this.movie_name)
                    _this.clearArrary(_this.rate)
                    _this.clearArrary(_this.movie_id)
                    for (var i = 0; i < res.data.results.length; i++) {
                        // 清空数组完成后将新数据一个个填入数组中
                        _this.img_url[i]=res.data.results[i].cover;
                        _this.movie_name[i]=res.data.results[i].title;
                        _this.rate[i] = res.data.results[i].movie_rate;
                        _this.movie_id[i] = res.data.results[i].movie_id;
                    }
                    console.log(_this.nowPage)
                }).catch(function (error) {
                    console.log(error)
                })

            }
        }
    }
</script>

<style>
    el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 180px;
        margin: 0;
    }
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    .image {
        width: 100%;
        max-height: 284px;
        /*display: block;*/
    }
    .s2 {
       margin-top: 20px;
    }

</style>
