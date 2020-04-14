<template>
  <div class="findByGoods">
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
<!--                <p>-->
<!--                  <router-link to='/goodsDetails'> 详情</router-link>-->
<!--                </p>-->
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
    name: "findByGoods",
    data(){
      return {
        pageSize:1,
        total:12,
        listGoods: [
        ],
        goodsName:this.$route.params.name
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
      let url = 'http://localhost:8082/findGoodsLike/' + this.goodsName
      this.$axios.get(url).then(resp => {
        this.listGoods = resp.data.content
      }).catch(error=>{
        this.$router.push({
          path: '/',
        })
      })
    }
  }
</script>

<style scoped>

</style>
