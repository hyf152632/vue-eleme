<template>
    <div class="seller">
      <div class="seller-content">
        <div class="overview">
          <h1 class="title">{{seller.name}}</h1>
          <div class="desc border-1px">
            <star :size='36' :score='seller.score' ></star>
            <span class="text">({{seller.ratingCount}})</span>
            <span class="text">月售{{seller.sellCount}}单</span>
          </div>
          <ul class="remark">
            <li class="block">
              <h2>起送价</h2>
              <div class="content">
                <span class="stress">{{seller.minPrice}}</span>元
              </div>
            </li>
            <li class="block">
              <h2>商家配送</h2>
              <div class="content">
                <span class="stress">{{seller.deliveryPrice}}</span>元
              </div>
            </li>
            <li class="block">
              <h2>平均配送时间</h2>
              <div class="content">
                <span class="stress">{{seller.deliveryTime}}</span>分钟
              </div>
            </li>
          </ul>
          <div class="favorite" @click="toggleFavorite">
            <span class="icon-favorite" :class="{'active':favorite}"></span>
            <span class="text">{{favoriteText}}</span>
          </div>
        </div>
        <split></split>
        <div class="bulletin">
          <h1 class="title">公告与活动</h1>
          <div class="content-wrapper border-1px">
            <p class="content">{{seller.bulletin}}</p>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item border-1px" v-for="(item,index) in seller.supports">
              <span class="icon" :class='classMap[seller.supports[index].type]'></span>
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
        </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper">
          <ul class="pic-list">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width='120' height="96" >
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li class="info-item" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
      </div>
    </div>
</template>

<script>
  import star from './../star/star';
  import split from './../split/split';
    export default{
        props: {
          seller: {
            type:Object
          }
        },
        data() {
            return{
                favorite:false
              }
        },
        computed:{
          favoriteText() {
            return this.favorite? '已收藏' : '收藏';
          }
        },
        created(){
        this.classMap = ['decrease','discount','special','invoice','guarantee'];
      },
        methods: {
          toggleFavorite() {
            this.favorite = !this.favorite;
          }
        },
        components: {
          star,
          split
        }
    }
</script>
<style lang="scss" scoped>
@import './../../assets/css/mixin';

  .seller {
    position: absolute;
    top:174px;
    bottom: 0;
    width:100%;
    left: 0;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    .overview {
      position: relative;
      padding: 18px;
      .title {
        margin-bottom: 8px;
        line-height: 14px;
        font-size: 14px;
        color:rgb(7, 17, 27);
      }
      .desc {
        margin-bottom: 18px;
        font-size: 0;
        @include border-1px(rgba(7,17,27,0.1));
        padding-bottom: 18px;
        .star {
          display: inline-block;
          vertical-align: top;
        }
        .text {
          margin-left: 12px;
          line-height: 18px;
          font-size: 10px;
          color: rgb(7, 17, 27);
        }
      }
      .remark {
        display: flex;
        padding-top: 18px;
        .block {
          flex: 1;
          text-align: center;
          border-right: 1px solid rgba(7,17,27,0.1);
          &:last-child {
            border-right:none;
          }
          h2 {
            margin-bottom: 4px;
            line-height: 10px;
            font-size: 10px;
            color: rgb(147,153,159);
          }
          .content {
            line-height: 24px;
            font-size: 10px;
            color: rgb(7, 17, 27);
            .stress {
              font-size: 24px;
            }
          }
        }
      }
      .favorite {
        position: absolute;
        width:50px;
        right: 11px;
        top:18px;
        text-align: center;
        .icon-favorite {
          display: block;
          margin-bottom: 4px;
          line-height: 24px;
          font-size: 24px;
          color:#d4d6d9;
          &.active {
            color: rgb(240,20,20);
          }
        }
        .text {
          line-height: 10px;
          font-size: 10px;
          color:rgb(77,85,93);
        }
      }
    }
    .bulletin {
      padding: 18px 18px 0;
      .title {
         margin-bottom: 8px;
        line-height: 14px;
        font-size: 14px;
        color:rgb(7, 17, 27);
      }
      .content-wrapper {
        padding: 0 12px 16px;
         @include border-1px(rgba(7,17,27,0.1));
        .content {
          line-height: 24px;
          font-size: 12px;
          font-weight: 200;
          color:rgb(240,20,20);
        }
      }
      .supports {
        .support-item {
        padding: 16px 12px;
         @include border-1px(rgba(7,17,27,0.1));
         font-size: 0;
           .icon {
          display: inline-block;
          vertical-align: top;
          width:16px;
          height: 16px;
          margin-right: 6px;
          background-size: 16px 16px;
          background-repeat: no-repeat;
          &.decrease {
            @include bg-image('decrease_4');
          }
          &.discount {
            @include bg-image('discount_4');
          }
          &.guarantee {
            @include bg-image('guarantee_4');
          }
          &.invoice {
            @include bg-image('invoice_4');
          }
          &.special {
            @include bg-image('special_4');
          }
         }
         .text {
           line-height: 16px;
           font-size: 12px;
           font-weight: 200;
           color:rgb(7, 17, 27);
         }
        }

      }

    }
    .pics {
      padding: 18px;
      .title {
        margin-bottom: 12px;
        line-height: 14px;
        font-size: 14px;
        color:rgb(7, 17, 27);
      }
      .pic-wrapper {
        width:100%;
        overflow: hidden;
        white-space: nowrap;
        .pic-list {
          font-size: 0;
          overflow-x: auto;
          &::-webkit-scrollbar {
            display: none;
          }
          .pic-item {
          display: inline-block;
          margin-right: 6px;
          width: 120px;
          height: 90px;
          &:last-child {
            margin-right: 0;
          }
          }
        }
      }
    }
    .info {
      padding: 18px 18px 0;
      .title {
        padding-bottom: 8px;
        line-height: 14px;
        font-size: 14px;
        color:rgb(7, 17, 27);
        @include border-1px(rgba(7,17,27,0.1));
      }
      .info-item {
        padding: 16px 12px;
        line-height: 16px;
        border-bottom: 1px solid rgba(7,17,27,0.1);
        font-size: 12px;
        font-weight: 200;
        color: rgb(7, 17, 27);
      }
    }
  }
</style>
