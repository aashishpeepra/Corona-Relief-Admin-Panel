<template>
    <div id="advisoryForm">
        <h1 style="margin:30px 0px 50px 0">
            Fill The form to add Advisory
        </h1>
        <gov-holder>
            <div slot="heading">
                <h2>@Corona-Free-India</h2>
            </div>
            <div class="formFeed">
                <form>
                    <fieldset >
                        <label for="title">Title</label>
                    <input type="text" id="title" v-model="formData['title']" name="titleForAdvisory" placeholder="Enter Title"/>
                    </fieldset>
                    <fieldset >
                        <label for="id">ID</label>
                    <input type="text" id="id" v-model="formData['id']" name="idForAdvisory" placeholder="Enter ID"/>
                    </fieldset>
                    <fieldset >
                        <label for="file">Add Image</label>
                    <input type="text" id="file" name="fileForAdvisory" v-model="formData['url']"  placeholder="Enter FILE"/>
                    </fieldset>
                    <fieldset >
                        <label for="content">Content</label>
                    <textarea type="text" id="content" name="contentForAdvisory" v-model="formData['desc']" placeholder="Enter Content"/>
                    </fieldset>
                    
                    <button type="button" class="btn btn-primary" @click="$store.dispatch('submitForm',formData)">
                        Submit Advisory
                    </button>
                </form>
            </div>
        </gov-holder>
        <gov-holder>
            <div slot="heading">
                    <h2>
                        Recent Advisory
                    </h2>
                </div>
                <div v-if="loading">
                    <gov-alerts  v-for="i in refineData()" :data="i" :key="i['id']">
                     </gov-alerts>
                </div>
                <div v-else>
                    <h3>Fetching Advisory..</h3>
                </div>
            
        </gov-holder>
    </div>
</template>

<script>
import Holder from '../../UI/Tiles/Holder';
import Alerts from './Alerts2';
export default {
    data:function(){
        return {
            formData:{
                title:"",
                timestamp:(new Date()).getTime(),
                desc:"",
                url:"",
                id:Math.floor(Math.random()*10000)+"gov"
            }
        }
    },
    components:{
        govHolder:Holder,
        govAlerts:Alerts
    },
    computed:{
        loading(){
            return this.$store.state.advisoryload;
        }
    },
    beforeMount:function(){
        this.$store.dispatch("loadAdvisory");
    },
    methods:{
        refineData(){
            let data=this.$store.getters.getAdvisory;
            let result=[];
            let names=Object.keys(data);
            for(let i=0;i<names.length;i++)
            {
                let temp=new Date(data[names[i]]["timestamp"])
                result.push({
                    id:names[i],
                    content:data[names[i]]["desc"],
                    time:temp.getDate()+"/" +(temp.getMonth()+1)+"/"+temp.getFullYear(),
                    title:data[names[i]]["title"],
                    url:data[names[i]]["url"]
                })
            }
            return result
        }
    }
}
</script>

<style scoped>
#advisoryForm h1{
    text-transform: capitalize;
}
.formFeed fieldset{
    width:30vw;
    margin:auto;
    margin-top:10px;
}
.formFeed label{
    font-size:60%;
    color: #222;
    float: left;
    position: absolute;
    margin:10px 0px 0px 35px;
    display:block;
}
.formFeed input[type="text"]{
    margin-top:40px;
    background-color: inherit;
    border:0px;
    border-bottom:2px solid #0082c8;
    font-size:70%;
    width:25vw;
    transition: all ease-in-out 0.5s;
}
.formFeed input:focus{
    outline: none;
    border-bottom:2px solid #004b73;
    width:30vw;
}
.formFeed textarea:focus{
    outline: none;
    border-bottom:2px solid #004b73;
    width:30vw;
}
.formFeed textarea{
    margin-top:40px;
    background-color: inherit;
    border:0px;
    border-bottom:2px solid #0082c8;
    font-size:70%;
    width:25vw;
    transition: all ease-in-out 0.5s;
}
.formFeed{
    width:75vw;
}
.formFeed button{
    margin: 20px 0;
}
.formFeed input[type="file"]{
    font-size: 60%;
    /* background-color: inherit; */
     border:0px;
    font-size:70%;
    width:25vw;
    transition: all ease-in-out 0.5s;
}
</style>