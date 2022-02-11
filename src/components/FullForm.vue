<script lang="ts">
export default {
  render() {
    const children = this.$slots.default()
    const elementCycle = useCycleList(children.map((child) => {
      return h(child)
    }))
    children.forEach((element, index) => {
      children[index].props = {}
      children[index].props.style = 'display: none'

      // children[index].onNext = () => {
      //   console.log('onnext')
      //   elementCycle.value.state.props.style = 'display: none'
      //   elementCycle.next()
      //   elementCycle.value.state.props.style = 'display: block'
      // }
    })
    // elementCycle.state.value.props.style = 'display: block'
    console.log(elementCycle.state.value)
    return h('div',
      { class: 'fixed z-10 inset-0 overflow-y-auto ff-container' },
      children,
    )
  },
}
</script>
<style>
.ff-container {  display: grid;
  grid-template-rows: 0.45fr 0.1fr 0.45fr;
  grid-auto-columns: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
}

.ff-field {
  justify-self: center;
  align-self: center;
  grid-area: 2 / 1 / 3 / 2;
}

</style>
