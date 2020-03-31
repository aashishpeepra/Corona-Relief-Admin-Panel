<template>
    <div id="404">
        <h2>Welcome</h2>
        <h3>
            Oh Hey! Finally you found me I have been stuck at this wrong url for a long time.
        </h3>
        <h4>You have 2 options now</h4>
        <router-link to="/" tag="button" class="btn btn-primary"><a>Leave me here</a></router-link>        
        <router-link to="/dashboard" tag="button" class="btn btn-primary"><a>Visit my home</a></router-link>
    </div>
</template>

<script>
export default {
    
}
</script>
<style scoped>
#404{
    height:100vh;
    width:100vw;
    background-color:#fff;
    color:#000;
}
h1,h2,h3{
    color:#aaa;
}
</style>