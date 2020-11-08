<template>
  <div>
    <Card>
      <h1>培训管理</h1>
      <br>
      <Form :label-width="80" :model="query" inline>
        <FormItem label="题目：" prop="name">
          <AutoComplete v-model="query.name_like" :data="trainingName"
                        style="width:180px"
                        @on-search="handleSearchTrainingName"></AutoComplete>
        </FormItem>
        <FormItem label="模块：" prop="model">
          <AutoComplete v-model="query.model" :data="trainingModel"
                        style="width:180px"
                        @on-search="handelSearchTrainingModel"></AutoComplete>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="onSearch">查询</Button>
        </FormItem>
        <FormItem>
          <Button type="primary">导入</Button>
        </FormItem>
      </Form>

      <ModifyTeachingPlan
        :show="showModifyTeaching"
        @onOK="onModifyOk"
        @onCanceal="onModifyCanceal"
      ></ModifyTeachingPlan>

      <Table border stripe :columns="columns" :data="data"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total" show-total :page-size="pages._per_page" :current="pages._page"
                @on-change="onPageChange1"></Page>
        </div>
      </div>

      <Button type="primary" @click="showModifyTeaching=true" v-role="['管理员']">修改教学研修计划</Button>

      <Button type="primary" v-role="['管理员']" style="margin-left: 20px;">上传附件</Button>
    </Card>
    <TrainingDetail></TrainingDetail>
  </div>


</template>

<script>
import ModifyTeachingPlan from "Views/TrainingManager/components/ModifyTeachingPlan";
import TrainingDetail from "Views/TrainingManager/components/TrainingDetail";
export default {
name: "index",
  components:{ModifyTeachingPlan, TrainingDetail},
data(){
  return {
    query:{
      name_like:'',
      model:''
    },
    data:[],
    total: 0,
    showModifyTeaching: false,
    trainingName:'',
    trainingModel: '',
    columns: [
      {
        title: '题目'
      },
      {
        title: '主讲人'
      },
      {
        title: '所属模块'
      },
      {
        title: '培训时间'
      },
      {
        title: '培训地点'
      },
      {
        title: '主办单位'
      },
      {
        title: '是否必修'
      },
      {
        title: '学识'
      },
      {
        title: '操作'
      }
    ],
    pages: {
      _page: 1,
      _per_page: 10
    }
  }
},
  methods:{
    handleSearchTrainingName(){

    },
    handelSearchTrainingModel(){

    },
    onSearch(){

    },
    onPageChange (page) {
      // 分页变化
      this.pages._page = page
      this.fetchData()
    },
    modifyTeachingPlan(){

    },
    onModifyOk(){},
    onModifyCanceal(){},
    fetchData(){},
    onPageChange1(page) {
      // 分页变化
      this.pages._page = page
      this.fetchData()
    }
  }
}
</script>

<style scoped>

</style>
