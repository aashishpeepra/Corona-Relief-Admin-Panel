import Vue from 'vue';
import Vuex from 'vuex';
// import VueRouter from 'vue-router';
Vue.use(Vuex);

// Vue.use(VueRouter);

export const store=new Vuex.Store({
    state:{
        chartData:[],
        barData:[],
        barloaded:false,
        districtLoaded:false,
        districtData:{},
        hospitalLoad:false,
        hospitalData:[],
        initialload:false,
        initialData:{},
        advisoryload:false,
        advisoryData:{},
        loginDetails:{
            email:"random@gmail.com",
            id:Math.floor(Math.random()*1000)+"gov",
            choice:"chc"
        },
        open:false,
        idToken:null,
        userId:null,
        email:null,
        chcData:{},
        chcload:false,
        phcload:false,
        phcData:{},
        moData:{},
        moload:false,
        database:{},
        databaseload:false
    },
    getters:{
        getCovidInfo:state=>{
            return state.barData;
        },
        getDistrict:state=>{
            return state.districtData
        },
        getHospital:state=>{
            return state.hospitalData
        },
        getInitial:state=>{
            return state.initialData;
        },
        getAdvisory:state=>{
            return state.advisoryData;
        },
        getLogin:state=>{
            return state.loginDetails;
        },
        getChc:state=>{
            return state.chcData;
        },
        getPhc:state=>{
            return state.phcData;
        },
        getMo:state=>{
            return state.moData;
        },
        getDatabase:state=>{
            return state.database
        }
    },
    mutations:{
        setBarData:(state,payload)=>{
            state.barloaded=true;
            state.barData=payload;
        },
        setDistrict:(state,payload)=>{
            state.districtData=payload;
            state.districtLoaded=true;

        },
        setHospital:(state,payload)=>{
            state.hospitalData=payload;
            state.hospitalLoad=true;
        },
        setInitials:(state,payload)=>{
            state.initialData=payload["data"];
            state.initialload=true;
        },
        setAdvisory:(state,payload)=>{
            state.advisoryData=payload;
            state.advisoryload=true;
        },
        doLogin:(state,payload)=>{
            state.loginDetails=payload;
            state.open=true;
        },
        loadChc:(state,payload)=>{
            state.chcData=payload;
            state.chcload=true;
        },
        loadPhc:(state,payload)=>{
            state.phcData=payload;
            state.phcload=true;
        },
        loadMo:(state,payload)=>{
            state.moData=payload;
            state.moload=true;
        },
        loadUser:(state,payload)=>{
            state.database=payload;
            state.databaseload=true;
        }
    },
    actions:{
        loadUser:(context)=>{
            Vue.http.get(`users.json?auth=${context.state.idToken}`).then(res=>{
            return res.json()
            }).then(data=>{
                context.commit('loadUser',data);
            })
        },
        loadMo:(context,payload)=>{
            if(payload==null)
            payload="";
            Vue.http.get(`/gov/mo/${payload}.json?auth=${context.state.idToken}`).then(res=>{
            return res.json()
            }).then(data=>{
                context.commit('loadMo',data);
            })
        },
        loadChc:(context,payload)=>{
            if(payload==null)
            payload="";
            Vue.http.get(`/gov/chc/${payload}.json?auth=${context.state.idToken}`).then(res=>{
                return res.json()
            }).then(data=>{
                context.commit('loadChc',data);
            })
        },
        loadPhc:(context,payload)=>{
            if(payload==null)
            payload="";
            Vue.http.get(`/gov/phc/${payload}.json?auth=${context.state.idToken}`).then(res=>{
                return res.json()
            }).then(data=>{
                context.commit('loadPhc',data);
            })
        },
        loadCovidInfo:(context)=>{
         
            Vue.http.get("https://ironinfo.herokuapp.com/covidinfo?name=covid").then(res=>{
                return res.json()
            }).then(dt=>{
                context.commit("setBarData",dt);
            })
        },
        loadDistrict:(context)=>{
            Vue.http.get("https://api.covid19india.org/state_district_wise.json").then(res=>{
                return res.json()
            }).then(data=>{
                context.commit("setDistrict",data);
            })
        },
        loadHospital:(context)=>{
            Vue.http.get("https://ironinfo.herokuapp.com/covidinfo?name=hospital").then(res=>{
                return res.json();
            }).then(data=>{
                context.commit("setHospital",data);
            })
        },
        loadInitials:(context)=>{
            Vue.http.get("https://ironinfo.herokuapp.com/info").then(res=>{
                return res.json();
            }).then(data=>{
                context.commit("setInitials",data);
        })
        },
        loadAdvisory:(context)=>{
            Vue.http.get(`/advisory.json?auth=${context.state.idToken}`).then(res=>{
                return res.json();
            }).then(data=>{
                context.commit("setAdvisory",data);
            })
        },
        submitForm:(context,payload)=>{
            Vue.http.post(`/advisory.json?auth=${context.state.idToken}`,payload).then(res=>{
                context.dispatch("loadAdvisory");
                alert("Posted Update")
            })
        },
        deleteData:(context,payload)=>{
            Vue.http.delete(`/advisory/${payload}.json?auth=${context.state.idToken}`).then(res=>{
                context.dispatch("loadAdvisory");
                alert("Deleted")
            })
        },
        signup:(context,payload)=>{
            let globalToken=null;
            payload["userData"]["email"]=payload["sendData"]["email"];
            context.state.loginDetails.choice=payload["userData"]["choice"];
            Vue.http.post("",payload["sendData"]).then(res=>{
            if(res["ok"])
            {
                globalToken=res["body"];
                if(payload["userData"]["choice"]=="chc")
                {
                    payload["userData"]["address"]=payload["userData"]["common"];
                    delete payload["userData"]["common"];
                    payload["userData"]["id"]="c-"+Math.floor(Math.random()*1000000);
                    
                    Vue.http.post(`/gov/chc.json?auth=${res["body"]["idToken"]}`,payload["userData"]).then(res=>{    
                        context.state.loginDetails.email=globalToken["email"];
                        context.state.loginDetails.id=payload["userData"]["id"];
                    alert("Registered Succefully! Login with the details");

                    })
                }
                else if(payload["userData"]["choice"]=="phc")
                {
                    let token=null;
                    payload["userData"]["chcId"]=payload["userData"]["common"];
                    delete payload["userData"]["common"];
                    payload["userData"]["id"]="p-"+Math.floor(Math.random()*1000000);
                    
                    Vue.http.post(`/gov/phc.json?auth=${res["body"]["idToken"]}`,payload["userData"]).then(response=>{
                        if(response["ok"])
                        {   
                            token=response["body"]["idToken"];
                            Vue.http.get(`/gov/chc.json?auth=${globalToken["idToken"]}`).then(res=>{
                                return res.json()
                            }).then(data=>{
                                let keys=Object.keys(data);
                                let found=false;
                                for(let i=0;i<keys.length;i++)
                                {
                                    if(data[keys[i]]["id"]==payload["userData"]["chcId"])
                                    {
                                        found=true;
                                        let make=data[keys[i]];
                                        if(!("phcAllocated" in make))
                                        {
                                            make["phcAllocated"]=[payload["userData"]["id"]]
                                        }
                                        else{
                                            make["phcAllocated"]=[...make["phcAllocated"],payload["userData"]["id"]]

                                        }
                                        Vue.http.put(`/gov/chc/${keys[i]}.json?auth=${globalToken["idToken"]}`,make).then(res=>{
                                        context.state.idToken=globalToken["idToken"];
                                        context.state.userId=globalToken["userId"];
                                        context.state.loginDetails.email=globalToken["email"];
                                        context.state.loginDetails.id=payload["userData"]["id"];

                                        context.state.open=true;
                                        alert("Alloted to chc. Login with your details",data[keys[i]]["id"],"Log In with details");
                                            
                                        }).catch(e=>console.log(e));
                                        break;
                                    }
                                }
                                if(!found)
                                {
                                    alert("Incorrect CHC ID");
                                }
                            })
                        }
                        
                    })
                }
            }
            else{
                alert("User Exists")
            }  
            return res.json();
            }).then(data=>{
                context.state.idToken=data["idToken"];
                context.state.userId=data["localId"]
                // context.commit('doLogin',payload);
            }).catch(e=>{alert("User Exists");console.log(e)});
            // setTimeout(()=>context.commit('doLogin',payload),1000);
        },
        login:(context,payload)=>{
            Vue.http.post("",payload ).then(res=>{
                return res.json();
            }).then(data=>{
                context.state.idToken=data["idToken"];
                context.state.userId=data["localId"];
                context.state.loginDetails.email=data["email"];
                let chc=false;
                Vue.http.get(`https://covid-19-server.firebaseio.com/gov/chc.json?auth=${data['idToken']}`).then(res=>{
                    return res.json();
                }).then(data=>{
                    let keys=Object.keys(data);
                    for(let i=0;i<keys.length;i++)
                    {
                        if(data[keys[i]]["email"]==context.state.loginDetails.email && ("email" in data[keys[i]]))
                        {
                            context.state.loginDetails.choice="chc";
                            context.state.loginDetails.id=data[keys[i]]["id"];
                            chc=true;
                            break;
                        }
                    }
                });
                    if(!chc)
                {
                    Vue.http.get(`/gov/phc.json?auth=${data["idToken"]}`).then(res=>{
                        return res.json();
                    }).then(data=>{
                        let keys=Object.keys(data);
                    for(let i=0;i<keys.length;i++)
                    {
                        if(data[keys[i]]["email"]==context.state.loginDetails.email && ("email" in data[keys[i]]))
                        {
                            context.state.loginDetails.choice="phc";
                            context.state.loginDetails.id=data[keys[i]]["id"]
                            break;
                        }
                    }
                    })
                }
                
            }).catch(e=>{alert("Wrong Details");console.log("e")})
        }

    }
})
