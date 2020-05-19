<template>
  <div>
    <h1>Lists</h1>
    <el-table :data="items">
      <el-table-column prop="name" label="Things Name"></el-table-column>
      <el-table-column prop="icon" label="Avatar">
        <template slot-scope="scope">
          <img :src="scope.row.icon" style="height:3rem">
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Setting" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="$router.push(`/things/edit/${scope.row._id}`)">Edit</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/things");
      this.items = res.data;
    },
    async remove(row){
        this.$confirm(`Do you really want to delete "${row.name}"?`, 'Notice', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(async () => {
             await this.$http.delete(`rest/things/${row._id}`)
          this.$message({
            type: 'success',
            message: 'Well done!'
          });
          this.fetch()
        })
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style scoped>
</style>