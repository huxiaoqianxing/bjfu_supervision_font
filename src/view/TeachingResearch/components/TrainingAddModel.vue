<template>
  <div>
    <Modal
      :value="show"
      title="增加一项培训"
      @onOk="handleOk"
      @onCancel="handleCancel"
      style="width: 600px;">
      <Form :label-width="100" style="width: 400px" ref="training_form" :model="activity">
        <form-item label="培训项目名称:">
          <Row>
            <Col>
              <Input v-model="activity.name" placeholder="培训项目名称"></Input>
            </Col>
          </Row>
        </form-item>
        <form-item label="主讲人:">
          <Row>
            <Col>
              <Input v-model="activity.presenter" placeholder="主讲人姓名"></Input>
            </Col>
          </Row>
        </form-item>
        <form-item label="所属模块:">
          <Row>
            <Col>
              <Input v-model="activity.module" placeholder="所属模块"></Input>
            </Col>
          </Row>
        </form-item>
        <form-item label="活动时间:">
          <Row>
            <Col span="11">
              <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="开始日期"
                          v-model="activity.inputtime.start_time"></DatePicker>
            </Col>
            <Col span="2" style="text-align: center">-</Col>
            <Col span="11">
              <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="结束日期"
                          v-model="activity.inputtime.end_time"></DatePicker>
            </Col>
          </Row>
        </form-item>
        <form-item label="主办单位:">
          <Row>
            <Col>
              <Input v-model="activity.organizer" placeholder="主办单位名称"></Input>
            </Col>
          </Row>
        </form-item>
        <form-item label="是否必修:">
          <Row>
            <Col>
              <Select v-model="activity.is_obligatory" style="width:200px">
                <option v-for="item in this.selectList" :value="item.value" :key="item.value">{{ item.value }}</option>
              </Select>
<!--              <RadioGroup v-model="is_obligatory">-->
<!--                <Radio label="yes">-->
<!--                  <span>是</span>-->
<!--                </Radio>-->
<!--                <Radio label="no">-->
<!--                  <span>否</span>-->
<!--                </Radio>-->
<!--              </RadioGroup>-->
            </Col>
          </Row>
        </form-item>
        <form-item label="学时:">
          <Row>
            <Col>
              <Input v-model="activity.period" placeholder="学时"></Input>
            </Col>
          </Row>
        </form-item>
      </Form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "TrainingAddModel",
  props: {
    show: Boolean,
    onOk: Function,
    onCancel: Function
  },
  data() {
    return {
      activity: {
        name: '',
        presenter: '',
        is_obligatory: '',
        module: '',
        inputtime: {
          start_time: '',
          end_time: ''
        },
        inputapplytime: {
          apply_start_time: '',
          apply_end_time: ''
        },
        organizer: '',
        period: '',
        status: ''
      },

      ruleValidate: {
        name: [{ required: true, trigger: 'blur', message: '请填写培训项目名称' }],
        presenter: [{ required: true, trigger: 'blur', message: '请填写主讲人' }],
        module: [{ required: true, trigger: 'blur', message: '请填写所属模块' }],
        inputtime: [{
          required: true,
          type: 'object',
          trigger: 'change',
          message: '请选择日期',
          fields: {
            start_time: { type: 'date', required: true, message: '请选择开始日期' },
            end_time: { type: 'date', required: true, message: '请选择结束日期' }
          }
        }],
        organizer: [{ required: true, trigger: 'blur', message: '请填写主办单位名称' }],
        period: [{ required: true, type: 'number', min: 1, trigger: 'change', message: '学时必须大于等于1' }],
        inputapplytime: [{
          required: true,
          type: 'object',
          trigger: 'change',
          message: '请选择日期',
          fields: {
            apply_start_time: { type: 'date', required: true, message: '请选择起始日期' },
            apply_end_time: { type: 'date', required: true, message: '请选择截止日期' }
          }
        }]
      },
      selectList: [{value: 'yes', label: 'yes'}, {value: 'no', label: 'no'}],
      statusList: ['待审核', '已完成', '待提交']
    }
  },
  methods: {
    handleCancel: function () {
      this.$emit('onCancel')
    },
    handleOk() {
      this.$emit('onOk')
    }
  },
  mounted() {
    console.log(this.is_obligatory)
  }
}
</script>

<style scoped>

</style>
