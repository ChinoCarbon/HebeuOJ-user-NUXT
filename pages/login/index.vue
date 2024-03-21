<template>
  <div class="login-box">
    <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="80px">
      <h1 class="login-title">欢迎登陆</h1>
      <el-form-item label="用户名" size="medium" prop="username">
        <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" size="medium" prop="password">
        <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="验证码" size="medium" prop="verification">
        <el-input v-model="ruleForm.verification" placeholder="请输入验证码" style="width: 215px"></el-input>
        <img :src="checkCodeSrc" style="width: 90px; height: 35px; margin-left: 5px; vertical-align: top"
             @click="getVerification" alt="点击获取验证码">
      </el-form-item>
      <el-form-item size="medium" align="center">
        <el-button class="submit" type="primary" size="medium" @click="submitForm('ruleForm')">登录</el-button>
        <el-button class="info" type="primary" size="medium" @click="$router.push('/register')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
import nuxtConfig from "@/nuxt.config";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "index",
  data() {
    var validateUserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'));
      } else if(!value.match(/^[a-zA-Z0-9\u4e00-\u9fa5-_]{2,10}$/))
      {
        return callback(new Error('用户名在2-10位，可以由汉字，数字，英文字母，_，-组成'));
      } else
      {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      }
      else if(!value.match(/^[a-zA-Z0-9]{6,16}$/))
      {
        return callback(new Error('密码在6-16位，可以由数字，英文字母组成'));
      }
      else {
        callback();
      }
    };
    var validateVerification = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'));
      }
      else if(!value.match(/^[a-zA-Z0-9]{4}$/))
      {
        return callback(new Error('验证码是4位数字或字符组成的字符串'));
      }
      else {
        callback();
      }
    };
    return {
      checkCodeSrc: '',
      ruleForm: {
        username: '',
        password: '',
        verification: '',
      },
      localhostPath: '',
      rules: {
        verification: [
          {validator: validateVerification, trigger: 'blur'}
        ],
        password: [
          {validator: validatePassword, trigger: 'blur'}
        ],
        username: [
          {validator: validateUserName, trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    //登录
    submitForm(formName) {
      console.log(this)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.doAxios();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //获取验证码
    getVerification() {
      this.checkCodeSrc =  nuxtConfig.axios.baseURL + "/auth/checkCode?checkCodeType=1&enb=" + new Date();
    },
    //Axios请求
    doAxios() {
      this.$axios.$post(
        'auth/checkLogIn',
        {
          userName: this.ruleForm.username,//用户名
          userPassword: this.ruleForm.password,//当前页数
          checkCode: this.ruleForm.verification,//当前页数
        }
      ).then((response) => {
        console.log(response)
        if(response.code === 20000) {
          localStorage.setItem("token", response.message)
          localStorage.setItem('user', JSON.stringify(response.data.user))
          this.$router.push("/")
        } else
        {
          this.$message.error(response.message)
        }

        this.getVerification();
      })
    }
  },created() {
    let wPath = window.document.location.href;
    // 获取当前页面主机地址之后的目录，如：/admin/index
    let pathName =  this.$route.path;
    let pos = wPath.indexOf(pathName);
    // 获取主机地址，如：http://localhost:8080
    this.localhostPath = wPath.substring(0, pos);
  },
  //钩子
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      vm.getVerification();
    });
  },
}
</script>

<style scoped>
.login-box {
  width: 400px;
  height: 350px;
  /*边框设置*/
  border: 1px solid #DCDFE6;
  /*标签位置*/
  margin: 150px auto;
  /*内部边距*/
  padding: 20px 50px 20px 30px;
  /*边框弧度*/
  border-radius: 20px;
  /*阴影设置*/
  box-shadow: 0px 0px 20px #DCDFE6;
}

.login-title {
  /*文本布局*/
  text-align: center;
  /*底部间距*/
  margin-bottom: 40px;
}

.submit {
  margin-right: 80px;
}

.verfication {
  font-size: 26px;
  font-family: Gabriola;
  border: none;
  color: white;
  width: 100px;
  height: 40px;
  background: chocolate;
}
</style>
