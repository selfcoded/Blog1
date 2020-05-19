<template>
  <div>
    <h1>{{id ? 'Edit': 'Create'}} Admin Users</h1>
    <el-form @submit.native.prevent="save" label-width="120px">
      <el-form-item label="Username">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
          res = await this.$http.put(`rest/admin_users/${this.id}`, this.model);
      } else {
        res = await this.$http.post('rest/admin_users', this.model);
      }
      this.$router.push("/admin_users/list");
      this.$message({
        type: "success",
        message: "saved"
      });
      console.log(res);
    },
    async fetch() {
      const res = await this.$http.get(`rest/admin_users/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>

<style scoped>
</style>