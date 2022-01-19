<template>
    <div class="profile-page">
        <div class="user-info">
            <div class="container">
                <div class="row">

                    <div class="col-xs-12 col-md-10 offset-md-1">
                        <img :src="user.image" class="user-img"/>
                        <h4>{{user.username}}</h4>
                        <p>
                            {{user.bio}}
                        </p>
                        <button class="btn btn-sm btn-outline-secondary action-btn" @click="onEditSettings">
                            <i class="ion-gear-a"></i>
                            &nbsp;
                            Edit Profile Settings
                        </button>
                    </div>

                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">

                <div class="col-xs-12 col-md-10 offset-md-1">
                    <div class="articles-toggle">
                        <ul class="nav nav-pills outline-active">
                            <li class="nav-item">
                                <a class="nav-link" :class="{active:tab === 'my'}" href="" @click.prevent="tabChange('my')">My Articles</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" :class="{active:tab === 'favorite'}" href="" @click.prevent="tabChange('favorite')">Favorited Articles</a>
                            </li>
                        </ul>
                    </div>
                    <div class="article-preview" v-for="article in tab === 'my' ? articles : favoritedArticles" :key="article.slug">
                        <div class="article-meta">
                            <nuxt-link :to="{
                                name:'profile',
                                params:{
                                    username:article.author.username
                                }
                            }">
                                <img :src="article.author.image"/>
                            </nuxt-link>
                            <div class="info">
                                <nuxt-link :to="{
                                    name:'profile',
                                    params:{
                                        username:article.author.username
                                    }
                                }" class="author">
                                    {{article.author.username}}
                                </nuxt-link>
                                <span class="date">{{article.createdAt | date}}</span>
                            </div>
                            <button class="btn btn-outline-primary btn-sm pull-xs-right" :class="{
                                active:article.favorited
                            }" @click="onFavorite(article)"
                            :disabled="article.favoriteDisabled"
                            >
                                <i class="ion-heart"></i> {{article.favoritesCount}}
                            </button>
                        </div>
                        <nuxt-link :to="{
                            name:'article',
                            params:{
                                slug:article.slug
                            }
                        }" class="preview-link">
                            <h1>{{article.title}}</h1>
                            <p>{{article.description}}</p>
                            <span>Read more...</span>
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getArticles,addFavorite,deleteFavorite} from '@/api/article.js' 
import {mapState} from 'vuex'

export default {
    name:'UserProfile',
    data(){
        return {
            tab:'my'
        }
    },
    async asyncData ({store}){
        const {data} = await getArticles({
            author:store.state.user.username
        })
        const {articles} = data
        const {data:favoritedData} = await getArticles({
            favorited:store.state.user.username
        })
        const {articles:favoritedArticles} = favoritedData
        return {
            articles,
            favoritedArticles,
        }
    },
    computed:{
        ...mapState(['user']),
    },
    methods:{
        onEditSettings(){
            this.$router.push('/settings')
        },
        tabChange(tab){
            this.tab = tab
        },
        async onFavorite(article){
            article.favoriteDisabled = true
            if(article.favorited){
                await deleteFavorite(article.slug)
                article.favorited = false
                article.favoritesCount -= 1
            }else{
                await addFavorite(article.slug)
                article.favorited = true
                article.favoritesCount += 1
            }
            article.favoriteDisabled = false
        }
    }
}
</script>

<style>

</style>