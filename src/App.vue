<template>
  <div id="app">
    <nav-header :seller='seller'></nav-header>
    <div class="tab-list border-1px">
    <router-link to='/goods'  class="tab-item" >商品</router-link>
    <router-link to='/ratings'  class="tab-item" >评价</router-link>
    <router-link to='/seller' class="tab-item" >商家</router-link>
    </div>
    <div class="tab-content">
      <!-- 主要用于保留组件状态或避免重新渲染。 -->
      <keep-alive>
      <router-view :seller="seller"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import NavHeader from "./components/header/header";
import {urlParse} from './assets/js/util';

const STATUS_OK = 0;



export default {
  name: "app",
  data() {
    return {
      seller: {
        //解析url中的id的值
        id:(() => {
          let queryParam = urlParse();
          return queryParam.id;
        })()
      }
    };
  },
  created() {
    this.init();
    this.getSellerInfo();
  },
  methods: {
    init() {
      this.$router.push({ name: "goods" });
    },
    getSellerInfo() {
      //发起带id的请求
      //this.$http.get('/api/seller?id'+this.seller.id).then()...
      this.$http.get("/api/seller").then((response) => {
        let res = response.body;
        let data = res.result;
        if(res.status == STATUS_OK) {
          this.seller = Object.assign({},this.seller,data);
          //可以扩展this.seller的值而不是被覆盖
        }
      });
    }
  },
  components: {
    NavHeader
  }
};
</script>

<style lang="scss">
@import "./assets/css/mixin.scss";

.tab-list {
  display: flex;
  align-content: center;
  width: 100%;
  height: 40px;
  line-height: 40px;
  @include border-1px(rgba(7,17,27,0.1));
  .tab-item {
    flex: 1;
    align-self: center;
    text-align: center;
    font-size: 14px;
    color: rgb(77, 85, 93);
    line-height: 14px;
  }
}
.actived {
  color: rgb(240, 20, 20) !important;
}
</style>



