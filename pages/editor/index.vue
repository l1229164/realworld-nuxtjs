<template>
<div class="editor-page">
    <div class="container page">
        <div class="row">
            <div class="col-md-10 offset-md-1 col-xs-12">
                <form>
                    <fieldset>
                        <fieldset class="form-group">
                            <input v-model="article.title" :disabled="loading" type="text" class="form-control form-control-lg" placeholder="Article Title">
                        </fieldset>
                        <fieldset class="form-group">
                            <input v-model="article.description" :disabled="loading" type="text" class="form-control" placeholder="What's this article about?">
                        </fieldset>
                        <fieldset class="form-group">
                            <textarea v-model="article.body" :disabled="loading" class="form-control" rows="8"
                                      placeholder="Write your article (in markdown)"></textarea>
                        </fieldset>
                        <fieldset class="form-group">
                            <input type="text" :disabled="loading" class="form-control" placeholder="Enter tags">
                            <div class="tag-list"></div>
                        </fieldset>
                        <button class="btn btn-lg pull-xs-right btn-primary" type="button" @click="onPublish" :disabled="loading">
                            Publish Article
                        </button>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {createArticle,getArticle,updateArticle} from '@/api/article.js'

export default {
    middleware:'authenticated',
    name:'EditorIndex',
    async created(){
        const {slug} = this.$route.query
        if(slug){
            const {data} = await getArticle(slug)
            const {article} = data
            const {title,description,body} = article
            this.article = {
                title,
                description,
                body
            }
        }
    },
    data(){
        return {
            loading:false,
            article:{
                title:null,
                description:null,
                body:null
            }
        }
    },
    methods:{
        async onPublish(){
            const {slug} = this.$route.query
            try{
                this.loading = true
                let article = null
                if(slug){
                    const {data} = await updateArticle(slug,{
                        article:this.article
                    })
                    article = data.article
                }else{
                    const {data} = await createArticle({
                        article:this.article
                    })
                    article = data.article
                }
                this.$router.push({
                    name:'article',
                    params:{
                        slug:article.slug
                    }
                })
                this.loading = false
            } catch(err){
                console.log(err)
            }
        }
    }
}
</script>

<style>

</style>