<template>
  <div>
    <Modal
      :value="modal"
      title="增加一项活动"
      @on-ok="handleOK"
      @on-cancel="handleCancel"
      :loading="loading"
      style="width: 600px;"><!--:load="loading"-->
      <Form :label-width="100" style="width: 400px" ref="activity_form" :model="activity" :rules="ruleValidate">
        <form-item label="题目:" prop="title">
          <Row>
            <Col>
              <Input v-model="activity.title" placeholder="题目"></Input>
            </Col>
          </Row>
        </form-item>
        <form-item label="主讲人:" prop="presenter">
          <Row>
            <Col>
<!--              <Select v-model="activity.presenter" style="width:200px" filterable>-->
<!--                <Option v-for="(item,index) in users" :value="item.username" :key="item.username + index" @on-query-change="onSelectTeacherChange">-->
<!--                  {{item.name}}-->
<!--                </Option>-->
<!--              </Select>-->
              <Input v-model="activity.presenter" placeholder="主讲人"></Input>
            </Col>
          </Row>
        </form-item>
        <form-item label="所属模块:" prop="module">
          <Row>
            <Col>
              <Input v-model="activity.module" placeholder="请填写所属模块"></Input>
            </Col>
          </Row>
        </form-item>
        <form-item label="培训时间:" prop="start_time">
          <Row>
            <Col span="11">
              <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="培训日期" v-model="activity.start_time"></DatePicker>
            </Col>
<!--            <Col span="2" style="text-align: center">-</Col>-->
<!--            <Col span="11">-->
<!--              <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="结束日期" v-model="activity.inputtime.end_time"></DatePicker>-->
<!--            </Col>-->
          </Row>
        </form-item>
        <form-item label="培训地点:" prop="place">
          <Row>
            <Col>
              <Input v-model="activity.place" placeholder="请填写培训地点"></Input>
            </Col>
          </Row>
        </form-item>
        <form-item label="学时:" prop="period">
          <Row>
            <Col>
              <InputNumber v-model="activity.period"></InputNumber>
            </Col>
          </Row>
        </form-item>
        <form-item label="主办单位:" prop="organizer">
          <Row>
            <Col>
              <Input v-model="activity.organizer" placeholder="请填写主办单位"></Input>
            </Col>
          </Row>
        </form-item>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { queryUsers } from '../../../service/api/user'
import { queryTerms, getCurrentTerms } from '../../../service/api/term'
import { queryActives } from '../../../service/api/actives'
import { dateToString } from '@/libs/tools'
export default {
  name: 'ActiveAddModal',
  props: {
    modal: Boolean,
    onCancel: Function,
    onOK: Function
  },
  data () {
    return {
      loading: true,
      modal: false,
      // loading: true,
      date: new Date(),
      query: {}, // 查询用的参数
      terms: [],
      users: [],
      data: [],
      total: 0,
      activity: {
        title: '',
        module: '',
        organizer: '',
        presenter: '',
        period: 1,
        place: '',
        start_time: '',
        is_obligatory: Boolean
      },
      addActivity: {},
      ruleValidate: {
        title: [{ required: true, trigger: 'blur', message: '请填写活动名称' }],
        presenter: [{ required: true, trigger: 'blur', message: '请填写主讲人' }],
        module: [{ required: true, trigger: 'blur', message: '请填所属模块' }],
        // start_time: [{ required: true, trigger: 'change', message: '请选择日期'}],
        // inputtime: [{
        //   required: true,
        //   type: 'object',
        //   trigger: 'change',
        //   message: '请选择日期',
        //   fields: {
        //     start_time: { type: 'date', required: true, message: '请选择开始日期' },
        //     end_time: { type: 'date', required: true, message: '请选择结束日期' }
        //   }
        // }],
        period: [{ required: true, type: 'number', min: 1, trigger: 'change', message: '学时大于等于1' }],
        place: [{ required: true, trigger: 'blur', message: '请填写活动地点' }],
        organizer: [{ required: true, trigger: 'blur', message: '请填写活动地点' }]
      }
    }
  },
  methods: {
    changeLoading: function () {
      setTimeout(() => {
        this.loading = false
        this.$nextTick(() => {
          this.loading = true
        })
      }, 500)
    },
    handleOK: function () {
      this.changeLoading()
      this.$refs.activity_form.validate((valid) => {
        if (valid) {
          this.activity.start_time = dateToString(this.activity.start_time, 'yyyy-MM-dd hh:mm:ss')
          // this.loading= true;
          this.addActivity = {
            title: this.activity.title,
            presenter: this.activity.presenter,
            module: this.activity.module,
            period: this.activity.period,
            place: this.activity.place,
            // term: this.activity.term,
            start_time: this.activity.start_time,
            is_obligatory: false,
            organizer: this.activity.organizer
          }
          this.$emit('onOK', this.addActivity)
          this.activity = {}
          // this.inputtime = '';
          // this.activity.inputapplytime = '';
          // this.loading = false;
          this.modal = false
        } else {
          this.$Message.error('请填写完整信息!')
          /* setTimeout(() => {
            this.loading = false;
            this.$nextTick(() => {
              this.loading = true;
            });
          }, 2000); */
        }
      })
    },
    handleCancel: function () {
      this.$emit('onCancel')
    },
    onSelectTeacherChange: function (query) {
      this.queryUsers({ name_like: query }).then((resp) => {
        this.users = resp.data.users // 关键词编号重新加载 xxx_like 对 XXX模糊查
      })
    }
  },
  mounted: function () {
    let args = this.$route.query
    queryTerms().then((resp) => {
      this.terms = resp.data.terms
    })
    getCurrentTerms().then((termResp) => {
      this.query.term = termResp.data.term.name
      this.activity.term = termResp.data.term.name
    })
    queryUsers().then((resp) => {
      this.users = resp.data.users
    })
    queryActives(args).then((resp) => {
      this.data = resp.data.activities
      this.total = resp.data.total
    })
  }
}
</script>
