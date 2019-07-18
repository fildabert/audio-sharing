<template>
    <div style="padding-top: 20px;">
        <div class="ui card" style="width: 100%">
            <div class="content">
                <div class="header">{{list.userId.username}}</div>
                <div class="description">
                    <p>{{list.link}}</p>
                </div>
            </div>
            <div class="extra content">
                <span class="left floated like">
                   <a href="#"><i class="like icon"></i></a> 
                </span>
                <span class="center floated star">
                    <a href="#" @click.prevent="addfav(list.id)"><i class="star icon"></i></a>
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
    props:['list'],
    methods:{
        addFav(id){
            axios({
                url:`http://localhost/audios/${id}`,
                method: "PUT",
                data: {
                    
                }
            })
            .then
        }
    }
}
</script>

<style scoped>

</style>
