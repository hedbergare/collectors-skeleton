<template>
<div id="bottleWrapper">
    <img :src="'/images/bottles/' + color + '_bottle.png'"/>

</div>
    
</template>
<script>
export default {
    
  name: "CollectorsBottle",
  props: {
    color: String,
}
}
</script>

<style scoped>
#bottleWrapper{
    width:60%;
    margin:0 auto;
    margin-top:10%;
    border:2px solid black;
}

#bottleWrapper img{
    max-width:100%;
}

</style>
