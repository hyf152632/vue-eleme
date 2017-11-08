<template>
    <div class="star"  :class="starType">
      <div v-for="itemClass in itemClasses" :class="itemClass" class="star-item"  >
      </div>
    </div>
</template>
<script>
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';

    export default{
        props:{
          size:{
            type:Number
          },
          score:{
            type:Number
          }
        },
        computed:{
          starType() {
            return 'star-' + this.size;
          },
          itemClasses() {
            let result = [];
            let score = Math.floor(this.score * 2) /2;
            let hasDecimal = score % 1 !== 0;
            let integer = Math.floor(score);
            for(let i=0; i<integer;i++) {
              result.push(CLS_ON);
            }
            if(hasDecimal) {
              result.push(CLS_HALF);
            }
            while(result.length < LENGTH) {
              result.push(CLS_OFF);
            }
            return result;
          }
        }
    }
</script>
<style lang="scss" scoped>
@import "./../../assets/css/mixin.scss";

.star-48 {
  .star-item  {
    display: inline-block;
    background-repeat: no-repeat;
    width: 20px;
    height: 20px;
    margin-right: 22px;
    background-size: 20px 20px;
  }
 .star-item:last-child {
  margin-right: 0;
}
 .on {
  @include bg-image('star48_on');
}
.half {
  @include bg-image('star48_half');
}
.off {
  @include bg-image('star48_off');
}
.off:last-child {
  margin-right: 0;
}
}

.star-36 {
  .star-item  {
    display: inline-block;
    background-repeat: no-repeat;
    width: 15px;
    height: 15px;
    margin-right: 12px;
    background-size: 15px 15px;
  }
 .star-item:last-child {
  margin-right: 0;
}
 .on {
  @include bg-image('star36_on');
}
.half {
  @include bg-image('star36_half');
}
.off {
  @include bg-image('star36_off');
}
.off:last-child {
  margin-right: 0;
}
}
.star-24 {
  .star-item  {
    display: inline-block;
    background-repeat: no-repeat;
    width: 10px;
    height: 10px;
    margin-right: 6px;
    background-size: 10px 10px;
  }
 .star-item:last-child {
  margin-right: 0;
}
 .on {
  @include bg-image('star24_on');
}
.half {
  @include bg-image('star24_half');
}
.off {
  @include bg-image('star24_off');
}
.off:last-child {
  margin-right: 0;
}
}

</style>


