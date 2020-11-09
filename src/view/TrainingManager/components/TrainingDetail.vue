<template>
  <div>
    <Card>
      <p slot="title">培训信息</p>
      <Form :label-width="80">
        <Row type="flex" justify="start" align="middle" class="code-row-bg">
          <Col span="6">
            <FormItem label="题目：">
              <Input style="width: 170px" type="text" v-model="training.name" placeholder="题目"/>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="主讲人：">
              <Input style="width: 170px" type="text" v-model="training.teacher" placeholder="主讲人">
              </Input>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="start" align="middle" class="code-row-bg">
          <Col span="6">
            <FormItem label="所属模块：">
              <Input style="width: 170px" type="text" v-model="training.model" placeholder="所属模块"/>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="培训时间：">
              <Input style="width: 170px" type="text" v-model="training.training_time" placeholder="培训时间"/>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="start" align="middle" class="code-row-bg">
          <Col span="6">
            <FormItem label="地点：">
              <Input style="width: 170px" type="text" v-model="training.place" placeholder="活动地点"/>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="主办单位：">
              <Input style="width: 170px" type="text" v-model="training.organization" placeholder="主办单位"/>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="start" align="middle" class="code-row-bg">
          <Col span="6">
            <FormItem label="学时：">
              <Input style="width: 170px" type="text" v-model="training.period" placeholder="学时"/>
            </FormItem>
          </Col>
        </Row>
        <FormItem>
          <Button type="primary" v-role="['管理员']">提交</Button>
        </FormItem>
      </Form>
    </Card>
    <Card>
      <p slot="title">报名信息</p>
      <Table border stripe :columns="columns" :data="data"></Table>
      <Button type="primary" v-role="['管理员']">批量导入</Button>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'TrainingDetail',
  data () {
    return {
      training: {
        name: '',
        teacher: '',
        model: '',
        training_time: '',
        place: '',
        organization: '',
        period: ''
      },
      data: [],
      columns: [
        {
          title: '教师姓名'
        },
        {
          title: '教师学院'
        },
        {
          title: '报名状态'
        },
        {
          title: '操作'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
