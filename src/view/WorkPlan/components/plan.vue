<template>
  <div style="text-align: center">
    <Row>
      <Col style="position:relative;padding-left: 100px" :span="20" >
        <Table stripe :columns="columns" :data="work_plans"></Table>
      </Col>
    </Row>
    <div style="position:relative;padding-top: 100px">
      <Button type="primary" @click="handlePlanAdd(term.name)" v-role="['管理员']">新增</Button>
    </div>
    <planModify :plan="select_plan"
                :show="show_plan_modify_modal"
                @onModifyCancel="show_plan_modify_modal = false"
                @noModifyOK="handlePlanModifyOK"
    ></planModify>
    <PlanAddModal  :term_name="term"
                   :show="show_plan_add_modal"
                   @onCancel="show_plan_add_modal= false"
                   @onOK="handlePlanAddOK"
    ></PlanAddModal>
  </div>
</template>

<script>
import planModify from './planModify'
import PlanAddModal from './planAdd'
import { postWorkPlan, queryWorkPlan, putWorkPlan, deleteWorkPlan } from '@/service/api/work_plan'
import UserMixin from "@/mixins/UserMixin.js"
export default {
  components: { planModify, PlanAddModal },
  name: 'plan',
  mixins: [UserMixin],
  props: {
    term: String
  },
  data: function () {
    return {
      select_plan: {},
      show_plan_modify_modal: false,
      show_plan_add_modal: false,
      work_plans: [],
      columns: [{
        title: '计划评价体系名',
        key: 'form_meta_name'
      }, {
        title: '课程属性',
        key: 'lesson_attribute'
      },
      // {
      //   title: '使用状态',
      //   render: (h, params) => {
      //     if (params.row.status) {
      //       return h('Tag', {
      //         props: {
      //           color: 'blue'
      //         }
      //       }, '使用')
      //     } else {
      //       return h('Tag', {
      //         props: {
      //           color: 'red'
      //         }
      //       }, '停用')
      //     }
      //   }
      // },
      {
        title: '操作',
        align: 'center',
        render: (h, params) => {
          return h('div', [
            h('Button', {
              props: {
                type: 'primary',
                size: 'small',
                disabled:this.current_role!=='管理员'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.show_plan_modify_modal = true
                  this.select_plan = params.row
                }
              }
            }, '编辑'),
            h('Button', {
              props: {
                type: 'error',
                size: 'small',
                disabled:this.current_role!=='管理员'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.$Modal.confirm({
                    title: '是否确认删除?',
                    onOk: () => {
                      deleteWorkPlan(params.row.id).then(() => {
                        this.fetchData()
                      })
                    },
                    onCancel:()=>{}
                  })
                }
              }
            }, '删除')
          ])
        }
      }
      ]
    }
  },
  methods: {
    fetchData () {
      return queryWorkPlan({ term: this.term }).then((resp) => {
        this.work_plans = resp.data.work_plans
      })
    },
    handlePlanAdd (term_name) {
      this.show_plan_add_modal = true
    },
    handlePlanAddOK (plan) {
      postWorkPlan(plan).then((resp) => {
        this.fetchData()
      })
      this.show_plan_add_modal = false
    },
    handlePlanModifyOK (plan) {
      putWorkPlan(plan.id, plan).then((resp) => {
        this.fetchData()
      })
      this.show_plan_modify_modal = false
    }
  },

  created: function () {
    this.fetchData()
  }

}
</script>

<style scoped>
 .work_plan{
 }
</style>
