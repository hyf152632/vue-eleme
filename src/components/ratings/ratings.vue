<template>
    <div class="ratings">
        <div class="ratings-content">
          <div class="overview">
            <div class="overview-left">
              <h1 class="score">{{seller.score}}</h1>
              <div class="title">综合评分</div>
              <div class="rank">高于周边商家{{seller.rankRate}}%</div>
            </div>
            <div class="overview-right">
              <div class="score-wrapper">
                <span class="title">服务态度</span>
                <star :size='24' :score='seller.serviceScore'></star>
                <span class="score">{{seller.serviceScore}}</span>
              </div>
              <div class="score-wrapper">
                 <span class="title">商品评分</span>
                <star :size='24' :score='seller.foodScore'></star>
                <span class="score">{{seller.foodScore}}</span>
              </div>
              <div class="delivery-wrapper">
                <span class="title">送达时间</span>
                <span class="deliveryTime">{{seller.deliveryTime}}分钟</span>
              </div>
            </div>
          </div>
          <split></split>
          <ratingselect
            :selectType='selectType'
            :onlyContent='onlyContent'
            :desc='desc'
            :ratings='ratings'
            @contentToggle='toggleContent'
            @ratingtypeSelect='toSelectType'
            ></ratingselect>
          <div class="rating-wrapper">
            <ul>
              <li v-for="rating in ratings" class="rating-item border-1px" v-show="needShow(rating.rateType,rating.text)">
                <div class="avatar">
                  <img :src="rating.avatar" width="28" height="28">
                </div>
                <div class="content">
                  <h1 class="name">{{rating.username}}</h1>
                  <div class="star-wrapper">
                    <star :size='24' :score='rating.score'class='star'></star>
                    <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                  </div>
                  <p class="text">{{rating.text}}</p>
                  <div class="recommend" v-show="rating.recommend && rating.recommend.length !== 0">
                    <span class="icon-thumb_up"></span>
                    <span v-for="item in rating.recommend" class="item">{{item}}</span>
                  </div>
                  <div class="time">{{rating.rateTime | theFormatDate(rating.rateTime)}}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
    </div>
</template>
<script>
  import star from './../star/star';
  import split from './../split/split';
  import ratingselect from './../ratingselect/ratingselect';
  import {formatDate} from './../../assets/js/date';

  const ALL = 2;

    export default{
      props:{
        seller: {
          type:Object
        }
      },
      data() {
          return{
            ratings:[],
            selectType: ALL,
            onlyContent: true,
            desc: {
                all: '全部',
                positive: '推荐',
                negative: '吐槽'
              }
            }
      },
      created(){
        this.$http.get('/api/ratings').then((response) => {
          response = response.body;
          if(response.status == 0) {
            this.ratings = response.result;
          }
        });
      },
      methods: {
        toggleContent(onlyContent) {
          this.onlyContent = onlyContent;
        },
        toSelectType(type) {
          this.selectType = type;
        },
        needShow(type,text) {
          if(this.onlyContent && !text) {
            return false;
          }
          if(this.selectType === ALL) {
            return true;
          }else {
            return type === this.selectType;
          }
        },
      },
      filters: {
        theFormatDate(time) {
          let date = new Date(time);
          return formatDate(date,'yyyy-MM-dd hh:mm');
        }
      },
      components: {
        star,
        split,
        ratingselect
      }
    }
</script>
<style lang="scss" scoped>
@import './../../assets/css/mixin';

  .ratings {
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
      display: flex;
      padding: 18px 0;
      .overview-left {
        padding: 6px 0;
        flex: 0 0 137px;
        width: 137px;
        border-right: 1px solid rgba(7,17,27,0.1);
        text-align: center;
        .score {
          margin-bottom: 6px;
          line-height: 28px;
          font-size: 24px;
          color: rgb(255,153,0);
        }
        .title {
          margin-bottom: 8px;
          line-height: 12px;
          font-size: 12px;
          color: rgb(7,17,27);
        }
        .rank {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147,153,159);
        }
      }
      .overview-right {
        flex:1;
        padding-left: 24px;
        font-size: 0;
        .score-wrapper {
          margin-bottom: 8px;
          .title {
            display: inline-block;
            margin-right: 12px;
            line-height: 18px;
            vertical-align: top;
            font-size: 12px;
            color: rgb(7,17,27);
          }
          .star {
            display: inline-block;
            margin-right: 20px;
            vertical-align: top;
          }
          .score {
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
            line-height: 18px;
            color: rgb(255,153,0);
          }
        }
      .delivery-wrapper {
        font-size: 0;
         .title {
            line-height: 18px;
            margin-right: 12px;
            font-size: 12px;
            color: rgb(7,17,27);
          }
        .deliveryTime {
          font-size:  12px;
          line-height: 18px;
          color: rgb(147,153,159);
        }
      }
      }
    }
    .rating-wrapper {
      padding: 0 18px;
      .rating-item {
        display: flex;
        padding: 18px 0;
        @include border-1px(rgba(7,17,27,0.1));
       .avatar {
         flex: 0 0 28px;
        margin-right: 12px;
        width:28px;
        img {
          border-radius: 50%;
        }
      }
      .content {
        position: relative;
        width:100%;
        .name {
          line-height: 12px;
          font-size: 10px;
          color: rgb(1,17,27);
          margin-bottom: 4px;
        }
        .star-wrapper {
          margin-bottom: 6px;
          font-size: 0;
          .star {
            display: inline-block;
            margin-right: 10px;
          }
          .delivery {
            margin-left: 6px;
            line-height: 12px;
            font-size: 10px;
            font-weight: 200;
            color: rgb(147,153,159);
          }
        }
        .text {
          line-height: 18px;
          color:rgb(7,17,27);
          font-size: 12px;
          margin-bottom: 8px;
        }
        .recommend {
          line-height: 16px;
          font-size: 0;
          .icon-thumb_up,.item {
            display: inline-block;
            margin: 0 8px 4px 0;
            font-size: 9px;
          }
          .icon-thumb_up {
            color:rgb(0,160,220);
          }
          .item {
            padding-left: 6px;
            border: 1px solid rgba(7,17,27,0.1);
            border-radius: 2px;
            color: rgb(147,153,159);
            background: #fff;
          }
        }
        .time {
          position: absolute;
          top: 0;
          right: 0;
          line-height: 12px;
          font-size: 10px;
          font-weight: 200;
          color:rgb(147,153,159);
        }
      }
      }
    }
  }
</style>

