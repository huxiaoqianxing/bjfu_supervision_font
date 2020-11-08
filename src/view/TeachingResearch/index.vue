<template>
  <Card>
    <Tabs @on-click="onTypeTabClick">
      <TabPane label="培训报名" name="培训报名"></TabPane>
      <TabPane label="已完成培训" name="已完成培训"></TabPane>
    </Tabs>

    <template v-if="select_tag==='培训报名'">
      <can-register-training></can-register-training>
    </template>
    <template v-else-if="select_tag==='已完成培训'">
      <already-completed-training></already-completed-training>
    </template>
  </Card>
</template>

<script>
import alreadyCompletedTraining from "Views/TeachingResearch/components/alreadyCompletedTraining";
import canRegisterTraining from "Views/TeachingResearch/components/canRegisterTraining";
import AlreadyCompletedTraining from "Views/TeachingResearch/components/alreadyCompletedTraining";
import CanRegisterTraining from "Views/TeachingResearch/components/canRegisterTraining";
export default {
  components: {CanRegisterTraining, AlreadyCompletedTraining},
  comments:{
    alreadyCompletedTraining,
    canRegisterTraining
  },
  data:function (){
    return {
      select_tag: '培训报名'
    }
  },
  computed:{
    currentPath:function (){
      return this.$route.path
    }
  },
  methods:{
    onTypeTabClick(value){
      this.select_tag = value
    }
  }
}
</script>

<style scoped>

</style>
