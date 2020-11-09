<template>
  <div>
    <h1>报名信息</h1>
    <br>
    <Form :label-width="80" :model="query" inline>
      <FormItem label="题目：" prop="training">
        <AutoComplete v-model="query.title_like" :data="trainingName"
                      style="width:180px"
                      @on-search="searchTrainingTitle"></AutoComplete>
      </FormItem>
      <FormItem label="模块：" prop="training"></FormItem>
      <AutoComplete v-model="query.model_like" :data="trainingModelName"
                    style="width:180px"
                    @on-search="searchModel"></AutoComplete>
      <FormItem>
        <Button type="primary" @click=" onSearch">查询</Button>
      </FormItem>
    </Form>
    <Table border stripe :columns="columns" :data="data"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" show-total :page-size="pages._per_page" :current="pages._page"
              @on-change="onPageChange"></Page>
      </div>
    </div>

  </div>

</template>

<script>
import { getCurrentTerms, queryTerms } from '@/service/api/term'
import { queryCurrentuserActives } from '@/service/api/actives'

export default {
  name: 'canRegisterTraining',
  data: function () {
    return {
      query: {
        state: 'canTraining',
        term: undefined
      },
      total: 0,
      data: [{
        training: {},
        training_user: {}
      }],
      trainingName: [],
      trainingModelName: [],
      term: [],
      selected_training_id: '',
      pages: {
        _page: 1,
        _per_page: 10
      },
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
          title: '学识'
        },
        {
          title: '主办单位'

        },
        {
          title: '是否必修'
        },
        {
          title: '操作'
        }
      ]
    }
  },
  methods: {
    fetchData () {
      // 数据表发生变化请求数据
      let args = { ...this.query, ...this.pages }
      return queryCurrentuserActives(args).then((resp) => {
        this.data = resp.data.trainings
        this.total = resp.data.total
      })
    },
    onPageChange (page) {
      // 分页变化
      this.pages._page = page
      this.fetchData()
    },
    searchTrainingTitle () {

    },
    searchModel () {

    },
    onSearch () {

    }
  }
}
</script>

<style scoped>

</style>
