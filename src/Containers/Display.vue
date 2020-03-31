<template>
  <div id="prompt">
    <div class="top-head">
      <h1>Welcome Admin</h1>
      <p>
        This admin panel is only for the authorized government officials.
        <br />Log in or Sign up to continue
      </p>
    </div>
    <div id="formInsert">
      <button
        type="button"
        :style="`${true?'margin-top:-80px':''}`"
        @click="active='login'"
        :class="`btn ${active=='login'?'btn-primary':''}`"
      >Already a User</button>
      <button
        type="button"
        @click="active='signup'"
        :style="`${true?'margin-top:-80px':''}`"
        :class="`btn ${active=='signup'?'btn-primary':''}`"
      >New Registration</button>
      <form v-if="active=='login'" style="margin-top:-20px">
        <fieldset>
          <label class="labeled" for="name">Login</label>
          <input type="email" id="name" placeholder="Login ID" required v-model="formData['email']" />
        </fieldset>
        <fieldset>
          <label class="labeled" for="password">Password</label>
          <input type="password" required placeholder="Password" autocomplete id="password" v-model="formData['password']" />
        </fieldset>
      </form>
      <form v-else style="margin-top:-20px">
        <div v-if="part==1">
           <fieldset>
          <label class="labeled" for="email">Email</label>
          <input type="text" id="email" v-model="registerData['sendData']['email']" required placeholder="Enter Email Address" />
        </fieldset>
        <fieldset>
          <label class="labeled" for="dtc">Password</label>
          <input type="text" v-model="registerData['sendData']['password']" id="dtc" required placeholder="Enter a Password" />
        </fieldset>
        </div>
       <div v-if="part==3">
          <fieldset>
          <label class="labeled" for="city">{{choice=='chc'?"Address":"CHC ID"}}</label>
          <input type="text" id="city" required :placeholder="choice=='chc'?'Include Complete State Name':'Enter ID'" v-model="registerData['userData']['common']" />
        </fieldset>
        <fieldset>
          <label class="labeled" for="beds">Beds</label>
          <input type="number" id="beds" required placeholder="Enter Beds" v-model="registerData['userData']['beds']" />
        </fieldset>
       </div>
       <div v-if="part==4">
          <fieldset>
          <label class="labeled" for="local">{{choice=="chc"?"Enter Doctor Name":"Enter Locality"}}</label>
          <input type="text" id="local" required :placeholder="choice=='chc'?`Enter Doctor Name`:'Enter Locality'"  v-model="registerData['userData']['local']" />
        </fieldset>
        <fieldset>
          <label class="labeled" for="number">Phone</label>
          <input type="number" id="number" required placeholder="Enter Phone Number" v-model="registerData['userData']['phone']" />
        </fieldset>
       </div>
        <div v-if="part==2" class="choicing">
          <button 
          type="button"
          @click="()=>{choice='chc';registerData['userData']['choice']='chc'}"
         :class="`btn btn-sm ${choice=='chc'?'btn-primary':''}`"
          >
            CHC
          </button>
          <button 
          type="button"
          @click="()=>{choice='phc';registerData['userData']['choice']='phc'}"
         :class="`btn btn-sm ${choice=='phc'?'btn-primary':''}`"
          >
            PHC
          </button>
        </div>
      </form>
    </div>
    <div id="selection">
      <button class="btn btn-primary" v-if="active=='signup'" @click="part>1?--part:null">Previous</button>

      <button type="button" v-if="active=='login'" class="btn btn-primary" @click="loginuser">Log In</button>
      <button type="button" v-else class="btn btn-primary" @click="part<=3?++part:signup()">{{part<=3?'Next':'Sign Up'}}</button>
    </div>
    <!-- <footer class="ft-display">
        <h3>Copyright gov of india</h3>
    </footer>-->
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      formData: {
        email: "",
        password: "",
        returnSecureToken:true
      },
      registerData:{
        sendData:{
          email:"",
        password:"",
        returnSecureToken:true
        },
        userData:{
          choice:"chc",
          local:"",
          phone:"",
          beds:"",
          common:""
        }
      },
      active: "login",
      choice:"chc",
      part:1
    };
  },
  computed: {
    valid() {
      if (this.$store.state.open) {
        this.$router.push("/dashboard");
      }
      return this.$store.state.open;
    }
  },
  methods: {
    loginuser() {
      this.$store.dispatch("login", this.formData);
      if (this.formData["email"] != "" && this.formData["password"] != "") {
        this.$store.dispatch("login", this.formData);
        setTimeout(() => this.$router.push("/dashboard"), 1000);
      } else {
        alert("Enter Valid Data");
      }
    },
    signup(){
      let a=this.registerData["sendData"]["email"]!="" && this.registerData["sendData"]["password"]!="";
      let b=this.registerData["userData"]["local"]!="" && this.registerData["userData"]["phone"]!="" && this.registerData["userData"]["common"]!="" && this.registerData["userData"]["beds"]!=""
      if(a&&b)
      {
       this.$store.dispatch("signup",this.registerData);
       setTimeout(()=>{
         if(this.$store.state.idToken)
         this.$router.push("/dashboard")
       },4000);
      // this.registerData["sendData"]["email"]="";
      // this.registerData["sendData"]["password"]="";
      // this.registerData["userData"]["doctor"]="";
      // this.registerData["userData"]["phone"]="";
      // this.registerData["userData"]["common"]="";
      // this.registerData["userData"]["beds"]=""
  this.part=1;
      }
       else
      alert("Fill All Details");
    },
    
  }
};
</script>

<style scoped>
.choicing{
  margin-top:50px;
  margin-bottom:30px;
}
.ft-display h3 {
  bottom: 0;
  position: absolute;
  font-size: 70%;
  height: 3em;
  color: #aaa;
}

#selection button {
  margin-top: 5vh;
  margin-left: 10px;
}

#prompt {
  box-shadow: 10px 20px 30px #004b73;
  padding: 10vh 0;
  text-align: center;
  margin: 5vh auto;
  height: 90vh;
  max-height: 100vh;
  width: 90vw;
  background-color: #fff;
  /* background: #0f0c29; fallback for old browsers */
  /* background: -webkit-linear-gradient(
    to right,
    #24243e,
    #302b63,
    #0f0c29
  ); /* Chrome 10-25, Safari 5.1-6 */
  /* background: linear-gradient(
    to right,
    #24243e,
    #302b63,
    #0f0c29 */
  /* ); W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.top-head p {
  font-size: 60%;
  color: #ababab;
  margin-bottom: 10vh;
}
#formInsert fieldset {
  width: 30vw;
  margin: auto;
}
.labeled {
  font-size: 50%;
  color: #222;
  float: left;
  position: absolute;
  margin: 10px 0px 0px 35px;
  display: block;
}

#formInsert input {
  margin-top: 40px;
  background-color: inherit;
  border: 0px;
  border-bottom: 2px solid #0082c8;
  font-size: 50%;
  width: 25vw;
  transition: all ease-in-out 0.5s;
}
#formInsert input:focus {
  outline: none;
  border-bottom: 2px solid #004b73;

  width: 30vw;
}
.formInsert {
  width: 50vw;
}
</style>