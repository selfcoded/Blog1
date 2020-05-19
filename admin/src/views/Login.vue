<template>
  <div>
    <el-card header="Lets log-----in" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="Username:" >
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="Password:">
          <el-input v-model="model.password" ></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" native-type="submit">Login</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
    return {
      model: {}
    };
  },
    methods:{
      async login(){
        const res = await this.$http.post('login', this.model)
        localStorage.token = res.data.token
        this.$router.push('/')
        this.$message({
          type:'success',
          message: 'successfully logged in'
        })
        console.log(res.data);
        
      }
    }
    
  }
</script>

<style scoped>
.login-card{
  margin: 20rem auto;
  width: 25rem;
  text-align: center;
}

</style>