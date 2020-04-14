<template>
  <div class="main">
    <div class="container">
      <div class="row" >
          <div class="col-xs-6 col-sm-4 col-md-3 col-lg-3" v-for="(item, i) in listGoods">
            <div class="thumbnail thumbnail-border" style="width:240px;height:360px;text-align:center">
              <div style="width:200px;height:150px">
                <div v-for="(img, i) in item.imgs">
                  <img :src="'http://localhost:8082/img/'+img.imgUrl"
                     alt="通用的占位符缩略图"  width="150px" height="180px" v-if="i == 0">
                </div>
                <br>
                <div class="caption">
                  <h3 >{{item.goodsName}}</h3>
                  <p >{{item.goodsPrice}}元</p>
                  <p >注册时间：{{item.goodsModifiedTime}}</p>
<!--                  <p>-->
<!--                    <router-link to='/goodsDetails'> 详情</router-link>-->
<!--                  </p>-->
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>

    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="total"
      @current-change="page">
    </el-pagination>
  </div>
</template>

<script>
    export default {
      name: "Main",
      data() {
        return {
          pageSize:1,
          total:12,
          listGoods: [
            {
            "goodsId": 38,
            "imgs": [{"imgId": 52, "imgUrl": "582271a9ae31c.jpg"}],
            "goodsComments": [],
            "goodsName": "计算器",
            "goodsPrice": 10.00,
            "goodsDesc": "10",
            "goodsModifiedTime": "2019-06-01",
            "belong": 13
          },
            {
            "goodsId": 36,
            "imgs": [{"imgId": 49, "imgUrl": "5821b6e474f95.jpg"}, {"imgId": 48, "imgUrl": "58206dcd43620.jpg"}],
            "goodsComments": [],
            "goodsName": "电风扇",
            "goodsPrice": 10.00,
            "goodsDesc": "10",
            "goodsModifiedTime": "2019-06-01",
            "belong": 13
          }
          ],
          nextPage:''
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
        }
      },
      created() {
        this.$axios.get('http://localhost:8082/index').then(resp => {
          this.listGoods = resp.data.content,
          this.pageSize = resp.data.size
          this.total = resp.data.totalElements
        }).catch(error=>{
          console.log(error)
        })
    }
  }
</script>

<style scoped>

</style>
