<template>
    <div style="padding-top: 20px;">
        <div class="ui card" style="width: 100%">
            <div class="content">
                <div class="header">User</div>
                <div>{{new Date(audioLink.createdAt).toString()}}</div>
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
                    <a href="http://twitter.com/share">Share with Twitter</a>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Card',
    props:['list', 'audioLink'],
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
    }
}
</script>

<style scoped>

</style>
