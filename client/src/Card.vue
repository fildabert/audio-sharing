<template>
    <div style="padding-top: 20px;">
        <div class="ui card" style="width: 100%">
            <div class="content">
                <div class="header">{{audioLink.userId.username}}</div>
                <div>{{formatDate}}</div>
                <div class="description">
                    <audio controls v-if="audioLink" style="width: 500px; background-color: blue;">
                    <source :src="audioLink.link" />
                    </audio>
                </div>
            </div>
            <div class="extra content">
                <span class="left floated like">
                   <a href="#"><i class="like icon"></i></a> 
                </span>
                <span class="center floated star">
                    <a href="#"><i class="star icon"></i></a>
                </span>
                <span class="right floated">
                    <a class="twitter-share-button"
  :href="sharelink">
Tweet</a>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment"

export default {
    name: 'Card',
    props:['list', 'audioLink'],
    data() {
        return {
            sharelink: `https://twitter.com/intent/tweet?text=My new Audio;url=${this.audioLink.link}`
        }
    },
    methods:{
        // addFav(id){
        //     axios({
        //         url:`http://localhost/audios/${id}`,
        //         method: "PUT",
        //         data: {
                    
        //         }
        //     })
        //     .then
        // }
    },
    computed: {
        formatDate: function() {
            return moment(new Date(this.audioLink.createdAt)).fromNow()
        }
    }
}
</script>

<style scoped>

</style>
