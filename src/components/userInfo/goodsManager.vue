<template>
<div class="goodsManager">
  <el-container style="height: 600px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">

      <el-menu router >
        <el-submenu>
          <template slot="title">管理界面</template>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main>
      <table class="table table-bordered">
        <caption><router-link to="/goodsadd" tag="button">添加商品</router-link></caption>
        <thead>
        <tr>
          <th>id</th>
          <th>名字</th>
          <th>价格</th>
          <th>描述</th>
          <th>编辑</th>
        </tr>
        </thead>
        <tbody >
        <tr v-for="(item, i) in listGoods">
          <td>{{item.goodsId}}</td>
          <td>{{item.goodsName}}</td>
          <td>{{item.goodsPrice}}</td>
          <td>{{item.goodsDesc}}</td>
          <td>
            <!--        <router-link :to="'/goodsupdate/'+item.goodsId">修改</router-link>-->
            <el-button @click="edit(item.goodsId)" type="text" size="medium">修改</el-button>
            <el-button @click="deleteBook(item.goodsId)" type="text" size="medium">删除</el-button>
          </td>
        </tr>
        </tbody>
      </table>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="total"
        @current-change="page">
      </el-pagination>
    </el-main>
  </el-container>






</div>
</template>

<script>
    export default {
      name: "goodsManager",
      data() {
        return {
          pageSize:1,
          total:12,
          listGoods: [{
            goodsId: 1,
            goodsName: '解忧杂货店',
            goodsComments: '解忧杂货店',
            goodsPrice: '解忧杂货店',
            goodsDesc: '东野圭吾'
          }, {
            goodsId: 2,
            goodsName: '解忧杂货店',
            goodsComments: '追风筝的人',
            goodsPrice: '解忧杂货店',
            goodsDesc: '卡勒德·胡赛尼'
          }, {
            goodsId: 3,
            goodsName: '解忧杂货店',
            goodsComments: '追风筝的人',
            goodsPrice: '解忧杂货店',
            goodsDesc: '太宰治'
          }]
        }
      },
      methods:{
        page(currentPage){
          console.log('http://localhost:8082/showGoods/'+(currentPage-1)+'/12')
          this.$axios.get('http://localhost:8082/showGoods/'+(currentPage-1)+'/12').then(resp=>{
            console.log(resp)
            this.listGoods = resp.data.content,
              this.pageSize = resp.data.size
            this.total = resp.data.totalElements
          })
        },
        edit(goodsid) {
          alert(goodsid)
          this.$router.push({
            name: 'goodsupdate',
            params: {
              goodsid: goodsid
            }
          })
        },
        deleteBook(goodsid){
          this.$axios.delete('http://localhost:8082/deleteGoods/'+goodsid).then(resp=>{
            alert("删除成功")
            this.$router.go(0)
          }).catch(error=>{
            alert("删除失败")
          })
        }
      },
      created() {
        this.$axios.get('http://localhost:8082/showGoods/0/12').then(resp=>{
          this.listGoods = resp.data.content,
          this.pageSize = resp.data.size
          this.total = resp.data.totalElements
        })
      }
    }
</script>

<style scoped>
  .goodsManager{
    width: 90%;
    text-align:center;
    margin:0 auto;
  }
</style>
