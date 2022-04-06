<!--
 * @Descripttion: 
 * @Author: hanb
 * @Date: 2022-04-02 14:43:48
 * @LastEditors: hanb
 * @LastEditTime: 2022-04-02 14:43:49
-->
<template>
</template>

<script>
export default {
  props: ['slot-key'],
  mounted () {
      this.$page.lastUpdated = "2022/1/6 下午2:00:00";
  }
};
</script>