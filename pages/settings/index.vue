<template>
    <div class="settings-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">Your Settings</h1>
                    <form>
                        <fieldset>
                            <fieldset class="form-group">
                                <input :disabled="loading" v-model="userInfo.image" class="form-control" type="text" placeholder="URL of profile picture">
                            </fieldset>
                            <fieldset class="form-group">
                                <input :disabled="loading" v-model="userInfo.username" class="form-control form-control-lg" type="text" placeholder="Your Name">
                            </fieldset>
                            <fieldset class="form-group">
                                <textarea :disabled="loading" v-model="userInfo.bio" class="form-control form-control-lg" rows="8"
                                        placeholder="Short bio about you"></textarea>
                            </fieldset>
                            <fieldset class="form-group">
                                <input :disabled="loading" v-model="userInfo.email" class="form-control form-control-lg" type="text" placeholder="Email">
                            </fieldset>
                            <!-- <fieldset class="form-group">
                                <input v-model="user.image" class="form-control form-control-lg" type="password" placeholder="Password">
                            </fieldset> -->
                            <button class="btn btn-lg btn-primary pull-xs-right" @click="onUpdate" :disabled="loading">
                                Update Settings
                            </button>
                        </fieldset>
                    </form>
                    <hr>
                    <button class="btn btn-outline-danger" @click="onLogOut">
                        Or click here to logout.
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import {updateUser} from '@/api/user.js'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
    name:'SettingsIndex',
    data(){
        return {
            loading:false,
            userInfo:{...this.$store.state.user}
        }
    },
    computed:{
        ...mapState(['user']),
    },
    methods:{
        ...mapMutations(['setUser']),
        async onUpdate(){
            try{
                this.loading = true
                const {bio,email,image,username} = this.userInfo
                const {data} = await updateUser({
                    user:{
                        email,
                        bio,
                        image,
                        username,
                    }
                })
                console.log(data)
                Cookie.set('user',data.user)
                this.loading = false
            } catch(err){
                console.dir(err)
            }
        },
        onLogOut(){
            Cookie.set('user',null)
            this.setUser(null)
            this.$nextTick(()=>{
                this.$router.push('/login')
            })
            
        }
    }
}
</script>

<style>

</style>