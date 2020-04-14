<template>
<div class="regist">
  <el-form :model="User" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="姓名" prop="userName">
      <el-input v-model="User.userName"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="userPassword">
      <el-input type="password" v-model="User.userPassword" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="User.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="userEmail">
      <el-input v-model="User.userEmail"></el-input>
    </el-form-item>


    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>


</div>
</template>

<script>
    export default {
      name: "Regist",
      data() {
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.User.checkPass !== '') {
              this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.User.userPassword) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        return {
          User: {
            userName: '',
            userPassword: '',
            checkPass: '',
            userEmail: ''
          },
          rules: {
            userName: [
              { required: true, message: '请输入姓名', trigger: 'focus' },
              { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
            ],
            userPassword: [
              { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
              { validator: validatePass2, trigger: 'blur' }
            ],
            userEmail:[
              { required: true, message: '请输入邮箱地址', trigger: 'blur' },
              { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
            ]
          }
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              console.log(this.qs.stringify(this.User)),
              this.$axios.post('http://localhost:8082/userRegist',this.qs.stringify(this.User)).then(resp=>{
                console.log(resp.data)
                if(resp.data == "success"){
                  window.sessionStorage.setItem("exituser",this.User.userName)
                  this.$router.push('/')
                }else{
                  alert('注册错误')
                  this.$router.push('/regist')
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
  .regist{
    width: 40%;
    text-align:center;
    margin:0 auto;
  }
</style>
