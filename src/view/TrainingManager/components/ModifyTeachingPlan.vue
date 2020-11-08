<template>
  <Modal
    :value="show"
    title="Title"
    @on-ok="handleOK"
    @on-cancel="handleCancel">
  </Modal>
</template>

<script>
export default {
  name: "ModifyTeachingPlan",
  props: {
    show: Boolean,
    onOK: Boolean,
    onConceal: Boolean
  },
  data(){
    return {

    }
  },
  methods: {
    handleOK() {
      this.$emit('onOK')
    },
    handleCancel() {
      this.$emit('onConceal')
    }
  }
}
</script>

<style scoped>

</style>
