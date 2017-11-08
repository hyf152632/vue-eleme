<template>
    <div class="cartcontrol">
        <transition name="slidedot">
        <div
        class="cart-decrease icon-remove_circle_outline"
        v-show="food.count>0"
        @click.stop.prevent="decreaseCart"
        ref="minus"
        ></div>
        </transition>
        <div class="cart-count"  v-show="food.count>0" >{{food.count}}</div>
        <div
        class="cart-add icon-add_circle"
        @click.stop.prevent="addCart"
        ref="add"
        ></div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';

    export default{
      props: {
        food: {
          type: Object
        }
      },
      computed:{
        count:function() {
          return this.food.count? this.food.count : 0
        }
      },
      methods: {
        addCart() {
          if(!this.food.count) {
            Vue.set(this.food,'count',1);
          }else {
            this.food.count++;
          }
        },
        decreaseCart() {
          if(this.food.count) {
            this.food.count--;
          }
        }
      },
      watch: {
        count: function(newValue,oldValue) {
          if(newValue > oldValue) {
            this.$refs.add.classList.add('pop');
            clearTimeout(this.timer);
            let _this = this;
            this.timer = setTimeout(function(){
              _this.$refs.add.classList.remove('pop');
            },150);
          }else{
            if(oldValue === 1) {
              return
            }
            this.$refs.minus.classList.add('pop');
            clearTimeout(this.timer);
            let _this = this;
            this.timer = setTimeout(function(){
              _this.$refs.minus.classList.remove('pop');
            },150);
          }
        }
      }
    }
</script>
<style lang="scss" scoped>
  .cartcontrol {
    font-size: 0;
    .cart-decrease, .cart-add {
      display: inline-block;
      padding: 6px;
       font-size: 24px;
      line-height: 24px;
    }
    .cart-decrease {
      transition: all 0.3s linear;
    }
    .cart-count {
      display: inline-block;
      vertical-align: top;
      width:12px;
      padding-top: 6px;
      line-height: 24px;
      text-align: center;
      font-size: 10px;
      color: rgb(147,153,159);
      transition: all 0.3s linear;
    }
    .cart-add, .cart-decrease {
      color:rgb(0, 160, 220);
      transition: all 0.3s linear;
    }
  }
  .slidedot-enter-active,
  .slidedot-leave-active {
    transition: all .3s
  }
  .slidedot-enter,
  .slidedot-leave-to {
    transform: translate3d(30px,0,0) rotate(360deg);
  }
  .pop {
    transform: scale(1.3);
  }
</style>
