<template>
  <div>
    <h1>{{id ? 'Edit': 'Create'}} your category</h1>
    <el-form @submit.native.prevent="save" label-width="120px">
      <!-- <el-form-item label="Superior">
        <el-select v-model="model.parent" placeholder="Select">
            <el-option v-for="item in parents" :key="item._id"
            :label="item.name" :value="item._id"
            ></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item label="Name">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="Avatar">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers= "getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
      model: {}
    };
  },
  methods: {
    afterUpload(res){
      this.$set(this.model, 'icon', res.url)
    },
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/things/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/things", this.model);
      }
      this.$router.push("/things/list");
      this.$message({
        type: "success",
        message: "saved"
      });
      console.log(res);
    },
    async fetch() {
      const res = await this.$http.get(`rest/things/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>