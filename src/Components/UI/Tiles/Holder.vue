<template>
    <div class="holder">
        <div id="heading">
            <slot class="headSlot" name="heading"></slot>
        </div>
        <div id="content">
            <slot name="content"></slot>
        </div>
        <slot></slot>
    </div>    
</template>

<script>
export default {
    
}
</script>

<style scoped>
.alert-data{
    font-size:80%;
}
#heading{
    text-align: left;
    margin-bottom: 15px;
    color:#444;
}
.holder{
    padding: 10px 20px 10px 20px;
    box-sizing: border-box;
    border-radius: 20px;
    box-shadow: 10px 10px 20px #ddd;
    display: block;
    margin-bottom:40px;
    max-height: 500px;
    overflow:auto;
    min-height: 160px;
    font-size: 80%;
}


</style>