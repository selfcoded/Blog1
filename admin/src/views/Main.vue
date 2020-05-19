<template>
  <el-container style="height: 100vh; ">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-openeds="['1', '3']" :default-active="$route.path">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>Content
          </template>
          <el-menu-item-group>
            <template slot="title">Catogory</template>
            <el-menu-item index="/categories/create">New Tag</el-menu-item>
            <el-menu-item index="/categories/list">Tag list</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">Things</template>
            <el-menu-item index="/things/create">New things</el-menu-item>
            <el-menu-item index="/things/list">Things list</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">Article</template>
            <el-menu-item index="/articles/create">New Article</el-menu-item>
            <el-menu-item index="/articles/list">Article list</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">Setting</template>
            <el-menu-item index="/admin_users/create">Manage Account</el-menu-item>
            <el-menu-item index="/admin_users/list">Accounts list</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container :data="items">
      

      <el-main>
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>



<script>
export default {
  data() {
    return {
      items:[],
    };
  },
  methods:{
    async fetch() {
      const res = await this.$http.get("rest/admin_users");
      this.items = res.data;
      
    }
  },
  created(){
    this.fetch()
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
