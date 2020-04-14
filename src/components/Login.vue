<template>
<div class="Login">
  <el-form :model="User" status-icon :rules="rules" ref="User" label-width="100px" class="demo-ruleForm">
    <el-form-item label="姓名" prop="userName">
      <el-input v-model="User.userName"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="userPassword">
      <el-input type="password" v-model="User.userPassword" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('User')">提交</el-button>
      <el-button @click="resetForm('User')">重置</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
    export default {
        name: "Login",
      data() {
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.User.checkPass !== '') {
              this.$refs.User.validateField('checkPass');
            }
            callback();
          }
        };
        return {
          User: {
            userName: '',
            userPassword: '',
          },
          rules: {
            userName: [
              { required: true, message: '请输入姓名', trigger: 'blur' }
            ],
            userPassword: [
              { validator: validatePass, trigger: 'blur' }
            ],
          }
        };
      },
      methods: {
        submitForm(formName) {
          const _this = this
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$axios.post(
                'http://localhost:8082/userLogin',this.qs.stringify(this.User)).then(resp=>{
                console.log(resp.data)
                if(resp.data == "success"){
                  window.sessionStorage.setItem("exituser",this.User.userName)
                  this.$router.push('/')
                }else{
                  alert('用户不存在或密码错误')
                  this.$router.push('/Login')
                }
              }).catch(error=>{
                console.log(error)
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      }
    }
</script>

<style scoped>
.Login{
  width: 40%;
  text-align:center;
  margin:0 auto;
}
</style>
