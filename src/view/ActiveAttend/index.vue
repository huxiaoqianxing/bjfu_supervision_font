<template>
  <div>
    <Card>
      <Tabs @on-click="onTypeTabClick">
        <TabPane label="可报名" name="可报名"></TabPane>
        <TabPane label="已报名" name="已报名"></TabPane>
      </Tabs>

      <template v-if="select_tag==='已报名'">
        <already-registered></already-registered>
      </template>
      <template v-else-if="select_tag==='可报名'">
        <can-register></can-register>
      </template>
    </Card>
<!--    <Card>-->
<!--      <Tabs @on-click="onTypeTabClick1">-->
<!--        <TabPane label="培训报名" name="培训报名"></TabPane>-->
<!--        <TabPane label="已完成培训" name="已完成培训"></TabPane>-->
<!--      </Tabs>-->

<!--      <template v-if="select_tag1==='培训报名'">-->
<!--        <can-register-training/>-->
<!--      </template>-->
<!--      <template v-else-if="select_tag1==='已完成培训'">-->
<!--        <already-completed-training/>-->
<!--      </template>-->
<!--    </Card>-->
  </div>

</template>

<script>
import alreadyRegistered from './components/alreadyRegistered'
import canRegister from './components/canRegister'
import alreadyCompletedTraining from "Views/TeachingResearch/components/alreadyCompletedTraining";
import canRegisterTraining from "Views/TeachingResearch/components/canRegisterTraining";

export default {
  components: {
    alreadyRegistered,
    canRegister,
    alreadyCompletedTraining,
    canRegisterTraining
  },
  data: function () {
    return {
      select_tag: '可报名',
      // select_tag1: '培训报名'
    }
  },
  computed: {
    currentPath: function () {
      return this.$route.path
    }
  },
  methods: {
    onTypeTabClick(value) {
      this.select_tag = value
    },
    // onTypeTabClick1(value) {
    //   this.select_tag1 = value
    // }
  }
}
</script>

<style scoped>

</style>
