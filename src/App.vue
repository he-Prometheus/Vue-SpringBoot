<template>
  <div id="app">
    <nav class="navbar navbar-default" role="navigation"  >
      <div class="container-fluid">
        <div class="navbar-header">
          <li class="navbar-brand"><router-link to='/'>首页</router-link></li>
        </div>
        <div>
          <ul class="nav navbar-nav">
            <li ><router-link to='/Category/1'>书籍文具</router-link></li>
            <li ><router-link to='/Category/2'>鞋服配饰</router-link></li>
            <li ><router-link to='/Category/3'>电器用品</router-link></li>
            <li ><router-link to='/Category/4'>运动音乐</router-link></li>
            <li ><router-link to='/Category/5'>其他</router-link></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <form class="navbar-form navbar-left" role="search" href="#" >
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Search" v-model:goodsName="goodsName">
              </div>
              <button type="submit" class="btn btn-default" @click="findByGoods()">查找</button>
            </form>
            <li id="before1" v-if='flag'><router-link to='/regist'><span class="glyphicon glyphicon-user"></span> 注册</router-link></li>
            <li id="before2" v-if='flag'><router-link to='/login'><span class="glyphicon glyphicon-log-in"></span> 登录</router-link></li>
            <li id="after1" v-if='flag1'><router-link to='/goodsmanager'><span class="glyphicon glyphicon-user"></span>个人中心</router-link></li>
            <li id="after2" v-if='flag1'><a href="#" @click="exitUser()"><span class="glyphicon glyphicon-user" ></span> 退出登录</a></li>
            <li><a href="#"><span class="glyphicon glyphicon-asterisk" ></span></a></li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
  export default {
  name: 'App',
  data () {
    return {
      flag:true,
      flag1:false,
      goodsName:'',
      username:'',
      listGoods:[]
    }
  },
    methods:{
      findByGoods() {
        this.$router.push({
          name: 'findByGoods',
          params:{
            name:this.goodsName
          }
        })
      },
      exitUser(){
        console.log(123)
        this.$axios.get('http://localhost:8082/userExit').then(resp=>{
          console.log(resp)
          if(resp.data=="exit"){
            window.sessionStorage.removeItem('exituser'),
            this.$router.go(0);    //刷新页面
            this.$router.push('/')
          }
        }).catch(error =>{
          alert('退出失败')
        })
      }
    },
    created() {
      let username=window.sessionStorage.getItem("exituser")
      if(username!=null&&username.trim().length>0){
        this.flag = !this.flag,
        this.flag1 = !this.flag1
      }else{
        this.flag = true,
        this.flag1 = false
      }
    },
    watch:{
      $route(){
        this.$router.go(0);
        this.username= window.sessionStorage.getItem("exituser")
      },
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
