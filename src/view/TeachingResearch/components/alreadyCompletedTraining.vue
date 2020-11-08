<template>
  <div>
    <h1>报名信息</h1>
    <br>
    <Form :label-width="80" :model="query" inline>
      <FormItem label="题目：" >
        <AutoComplete v-model="query.name_like" :data="trainingName"
                      style="width:180px"
                      @on-search="searchTrainingTitle"></AutoComplete>
      </FormItem>
      <FormItem label="模块："></FormItem>
      <AutoComplete v-model="query.model_like" :data="trainingModelName"
                    style="width:180px"
                    @on-search="searchModel"></AutoComplete>
      <FormItem label="状态：" ></FormItem>
      <AutoComplete v-model="query.status_like" :data="trainingStateName"
                    style="width:180px"
                    @on-search="searchStatus"></AutoComplete>
      <FormItem>
        <Button type="primary" @click="onSearch">查询</Button>
      </FormItem>
    </Form>
        <TrainingAddModel
          :show="showTrainingAddModel"
          @onOK="onAddTrainingOK"
          @onCancel="onAddTrainingCancel"
        ></TrainingAddModel>
    <Table border stripe :columns="columns" :data="data"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" show-total :page-size="pages._per_page" :current="pages._page"
              @on-change="onPageChange"></Page>
      </div>
    </div>

    <Button type="primary" @click="()=>{this.showTrainingAddModel=true}">新增</Button>
  </div>

</template>

<script>
import {queryCurrentuserActives} from "@/service/api/actives";
import TrainingAddModel from "Views/TeachingResearch/components/TrainingAddModel";
import {getCurrentTerms, queryTerms} from "@/service/api/term";

export default {
  name: "alreadyCompletedTraining",
  components: {TrainingAddModel},
  data: function () {
    return {
      query: {
        state: 'hasTraining',
        term: undefined,
        model_like:'',
        name_like:'',
      },
      terms:[],
      showTrainingAddModel: false,
      total: 0,
      data: [{
        activity: {},
        activity_user: {}
      }],
      trainingName: [],
      trainingModelName: [],
      trainingStateName: [],
      pages: {
        _page: 1,
        _per_page: 10
      },
      inputapplytime: {
        apply_start_time: '',
        apply_end_time: ''
      },
      columns: [
        {
          title: '题目',
          render:function (h, params) {
            return (< span >{params.row.activity.title}< /span >)
          }
        },
        {
          title: '主讲人',
          render: function(h, params){
          return (< span >{params.row.activity.presenter}< /span >)
        }

        },
        {
          title: '所属模块',
          render:function(h, params){
            return (< span >{params.row.activity.module}< /span >)
        }
        },
        {
          title: '培训时间',
          render:function (h, params){
            return (< span >{params.row.activity.start_time}< /span >)
        }
        },
        {
          title: '培训地点',
          render: function (h, params){
            return (< span >{params.row.activity.place}< /span >)
        }
        },
        {
          title: '主办单位',
          render:function (h, params){
            return (< span >{params.row.activity.organizer}< /span >)
        }
        },
        {
          title: '是否必修',
          render: function (h, params){
            return (< span >{params.row.activity.is_obligatory}< /span >)
        }
        },
        {
          title: '学识',
          render: function (h, params){
            return (< span >{params.row.activity.period}< /span >)
        }

        },
        {
          title: '状态',
          render: function(h, params){
            return (< span >{params.row.activity.apply_state}< /span >)
        }
        }
      ]
    }
  },
  methods: {
    searchTrainingTitle() {

    },
    searchModel() {

    },
    searchStatus() {

    },
    onSearch() {
      this.pages._page = 1
      this.fetchData()
    },
    onAddTrainingOK() {
      this.showTrainingAddModel = false
    },
    onAddTrainingCancel() {
      this.showTrainingAddModel = false
    },
    fetchData() {
      // 数据表发生变化请求数据
      let args = {...this.query, ...this.pages}
      return queryCurrentuserActives(args).then((resp) => {
        this.data = resp.data.activities
        this.total = resp.data.total
      })
    },
    onPageChange(page) {
      // 分页变化
      this.pages._page = page
      this.fetchData()
    }
  },
  mounted() {
    this.query.state = 'hasAttended'
    queryTerms().then((resp)=>{
      this.terms = resp.data.terms
      getCurrentTerms().then((termResp)=>{
        this.query.term = termResp.data.term.name
        queryCurrentuserActives({...this.query, ...this.pages}).then((resp)=>{
          this.data = resp.data.activities
          this.total = resp.data.total
        })
      })
    })

  }
}
</script>

<style scoped>

</style>
