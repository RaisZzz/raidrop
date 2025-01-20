<script setup lang="ts" generic="T">
import { onMounted, ref, Ref, watch } from 'vue'

const props = defineProps<{ modelValue?: T[] }>()
const emit = defineEmits(['update:modelValue'])

const itemClassName = 'raidrop-item'
const movingClassName = 'raidrop-moving'
const hiddenClassName = 'raidrop-hidden'
const grabbingClassName = 'raidrop-grabbing'

const movingItem: Ref<T | undefined> = ref()
let movingItemOffset: number = 0
const wrapper = ref<HTMLElement>()
const items = ref<HTMLElement[]>()
const initialItems: Ref<HtmlElement[]> = ref([])

function getInitialItems() {
  initialItems.value = []
  items.value?.forEach((item) => {
    initialItems.value.push(item.cloneNode(true))
  })
}

onMounted(() => {
  getInitialItems()
  document.querySelectorAll(`.${itemClassName}`).forEach((item) => {
    item.addEventListener('mousedown', (e: MouseEvent) => onItemClick(e))
    item.addEventListener('mousemove', (e: MouseEvent) => onItemMove(e))
    document.addEventListener('mouseup', onItemUp)
  })
})

watch(props, getInitialItems, { deep: true })

function onItemClick(event: MouseEvent) {
  if (!props.modelValue) return

  const index: number | undefined = items.value?.indexOf(event.currentTarget)
  if (typeof index !== 'number' || index < 0) return

  const cloneItem = event.currentTarget?.cloneNode(true)
  movingItem.value = props.modelValue[index]
  wrapper.value?.classList.add(movingClassName)
  event.currentTarget?.classList.add(hiddenClassName)

  document.body.append(cloneItem)
  cloneItem.classList.add(grabbingClassName)
  cloneItem.addEventListener('mousemove', (e: MouseEvent) => onItemMove(e))

  const rect = event.currentTarget.getBoundingClientRect()
  movingItemOffset = event.offsetY
  cloneItem.style = `
    top: ${event.clientY - movingItemOffset}px;
    left: ${rect.left}px;
    width: ${rect.width}px;
  `
}

function onItemMove(event: MouseEvent) {
  if (!movingItem.value) return

  const cloneItem = document.querySelector(`.${grabbingClassName}`)
  if (!cloneItem) return

  const cloneRect: DOMRect = event.currentTarget.getBoundingClientRect()
  cloneItem.style = `
    top: ${event.clientY - movingItemOffset}px;
    left: ${cloneRect.left}px;
    width: ${cloneRect.width}px;
  `

  const underItem: HTMLElement | undefined = items.value?.find((item: HTMLElement) => {
    const rect: DOMRect = item.getBoundingClientRect()
    return (
      Math.abs(cloneRect.y - rect.y) < 100 ||
      Math.abs(cloneRect.y + cloneRect.height - (rect.y + rect.height)) < 100
    )
  })
  if (!underItem) return

  items.value?.forEach((item: HTMLElement, index) => {
    item.innerHTML = initialItems.value[index].innerHTML
    item.classList.remove(hiddenClassName)
  })

  underItem.innerHTML = cloneItem.innerHTML
  underItem.classList.add(hiddenClassName)

  const movingItemIndex: number = props.modelValue.indexOf(movingItem.value)
  const underItemIndex: number =
    items.value?.findIndex((item: HTMLElement) => item === underItem) ?? 0

  const newItems: HTMLElement[] = [...initialItems.value]
  newItems.splice(movingItemIndex, 1)
  newItems.forEach((item: HTMLElement, index: number) => {
    items.value[index >= underItemIndex ? index + 1 : index].innerHTML = item.innerHTML
  })
}

function onItemUp() {
  const cloneItem = document.querySelector(`.${grabbingClassName}`)

  items.value?.forEach((el: HTMLElement, index: number) => {
    el.classList.remove(hiddenClassName)
    el.classList.remove(grabbingClassName)
  })

  movingItem.value = undefined
  cloneItem?.remove()
  wrapper.value?.classList.remove(movingClassName)

  const initialHtml = initialItems.value?.map((item: HTMLElement) => item.innerHTML)

  const newItems: T[] = items.value?.map((item: HTMLElement) => {
    const index: number = initialHtml?.findIndex((html) => item.innerHTML === html)
    return props.modelValue[index]
  })

  emit('update:modelValue', newItems)
}
</script>

<template>
  <div class="raidrop-wrapper" ref="wrapper">
    <div
      :class="itemClassName"
      v-for="(item, index) in modelValue"
      :key="index"
      ref="items"
      :data-index="index"
    >
      <slot name="builder" :item="item">
        <div>{{ item }}</div>
      </slot>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.raidrop-wrapper.raidrop-moving *
  user-select: none
  cursor: grabbing

.raidrop-item
  &.raidrop-hidden
    opacity: 0

  &.raidrop-grabbing
    position: fixed
    z-index: 999
    user-select: none
    cursor: grabbing
    box-shadow: 0 0 10px 1px rgba(0,0,0,0.1)
</style>
