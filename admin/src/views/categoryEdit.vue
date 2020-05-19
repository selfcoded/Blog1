<template>
  <div>
    <h1>{{id ? 'Edit': 'Create'}} your category</h1>
    <el-form @submit.native.prevent="save" label-width="120px">
        <el-form-item label="Tag">
        <el-select v-model="model.parents" placeholder="Select">
            <el-option v-for="item in parents" :key="item._id"
            :label="item.name" :value="item._id"
            ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Name">
        <el-input v-model="model.name"></el-input>
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
      parents:[]
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
          res = await this.$http.put(`rest/categories/${this.id}`, this.model);
      } else {
        res = await this.$http.post('rest/categories', this.model);
      }
      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: "saved"
      });
      console.log(res);
    },
    async fetch() {
      const res = await this.$http.get(`rest/categories/${this.id}`);
      this.model = res.data;
    },
    async fetchParents() {
      const res = await this.$http.get(`rest/categories`);
      this.parents = res.data;
    }
  },
  created() {
      this.fetchParents(),
    this.id && this.fetch();
  }
};
</script>

<style scoped>
</style>