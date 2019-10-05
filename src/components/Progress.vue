<template>
    <div>
        <el-progress :percentage="50"></el-progress>
    </div>
</template>

<script>
  export default {
    methods: {
      format(percentage) {
        return percentage === 100 ? '满' : `${percentage}%`;
      }
    }
  };
</script>

<style scoped>

</style>