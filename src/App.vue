<template>
  <div id="app" class="container-fluid">
    <transition 
        appear
        enter-class=""
        enter-active-class="animated fadeInDown"
        leave-class=""
        leave-active-class="animated fadeOutUp"
        mode="out-in"
    >
        <router-view></router-view>
    </transition>
    
  </div>
</template>

<script>
import Display from './Containers/Display';
export default {
 components:{
   govDisplay:Display
 }
}
</script>

<style>
/* .container-fluid{
    padding:0;
} */
body{
  font-size:30px;
  text-align: center;
  color:#000;
background: #667db6;  /* fallback for old browsers */
background: -webkit-linear-gradient(to bottom, #667db6, #0082c8, #0082c8, #667db6);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to bottom, #667db6, #0082c8, #0082c8, #667db6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

element {
    border:none;
    background-image:none;
    background-color:transparent;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
}
h1,h2,h3{
  color:#444;
}



</style>
