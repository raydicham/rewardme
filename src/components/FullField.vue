<script lang="ts">import { nodeName } from 'cypress/types/jquery'
import { withModifiers } from 'vue'

export default {
  emits: ['next'],
  render() {
    return h('div', {
      class: 'ff-field',
    }, [...this.$slots.default(), h('button', {
      onClick: withModifiers(() => {
        this.$emit('next')
      }, ['stop', 'prevent']),
    }, 'Next')])
  },
}
</script>
