<template>
  <div class="article-meta">
    <nuxt-link :to="{
        name:'profile',
        params:{
            username:article.author.username
        }
    }"><img :src="article.author.image"/></nuxt-link>
    <div class="info">
        <nuxt-link to="" class="author">{{article.author.username}}</nuxt-link>
        <span class="date">{{article.createdAt | date}}</span>
    </div>
    <button 
        class="btn btn-sm btn-outline-secondary"
        :class="{
            active:article.author.following
        }"
        @click="onEdit"
    >
        <i class="ion-edit"></i>
        &nbsp;
        Edit Article <span class="counter"></span>
    </button>
    &nbsp;&nbsp;
    <button 
        class="btn btn-sm btn-outline-danger"
        :class="{
            active:article.favorited
        }"
        :disabled="loading"
        @click="onDelete"
    >
        <i class="ion-trash-a"></i>
        &nbsp;
        Delete Article <span class="counter"></span>
    </button>
  </div>
</template>

<script>
import {deleteArticle} from '@/api/article.js'

export default {
    name:'ArticleMeta',
    data(){
      return {
        loading:false
      }
    },
    props:{
        article:{
            type: Object,
            required: true
        }
    },
    head() {
      return {
        title: `${this.article.title} - RealWorld`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.article.description
          }
        ]
      }
    },
    methods:{
      onEdit(){
        this.$router.push({
          name:'editor',
          query:{
              slug:this.article.slug
          }
        })
      },
      async onDelete(){
        try{
          this.loading = true
          const {data} = deleteArticle(this.article.slug)
          console.log(data)
          this.$router.push('/')
        } catch(err){
          console.log(err)
        }
      }
    }
}
</script>

<style>

</style>