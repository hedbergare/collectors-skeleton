<template>

    <img :src="'/images/bottles/' + color + '_bottle.png'"/>


    
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
img{
    max-width:60%;
    max-height:100%;
}

</style>
