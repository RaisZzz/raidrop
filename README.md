# Vue Drag-and-Drop List

![npm](https://img.shields.io/npm/v/raidrop?color=brightgreen) ![license](https://img.shields.io/npm/l/raidrop) ![downloads](https://img.shields.io/npm/dt/raidrop)

**RaiDrop** is a package for convenient drag-and-drop functionality in lists (vertical movement only). Fully supports Vue 3 and comes with TypeScript typings.

---

## 🛠 Installation

Install the package via npm or yarn:

```bash
npm install raidrop
# or
yarn add raidrop
```

---

## 🚀 Usage

### Basic Example

```vue
<template>
  <RaiDrop v-model="items">
    <template #builder="{ item }">
      <!-- Customize the list item -->
      <div class="list-item">{{ item.name }}</div>
    </template>
  </RaiDrop>
</template>

<script>
import { defineComponent, ref } from 'vue';
import RaiDrop from 'raidrop';

export default defineComponent({
  components: { RaiDrop },
  setup() {
    const items = ref([
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
    ]);

    return { items };
  },
});
</script>

<style>
.list-item {
  padding: 8px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  display: flex;
}
</style>
```

---

## 📚 API

### Component: `<RaiDrop />`

**Props:**
- `v-model` (array): The list of objects, updated when items are moved.

**Slots:**
- `#builder="{ item }"` — slot for customizing the appearance of list items.
  - `item` — an object from the array.

---

## 🌟 Examples

### Drag-and-Drop List
```vue
<template>
  <RaiDrop v-model="users">
    <template #builder="{ item }">
      <div>
        <div>{{ item.id }}</div>
        <div>{{ item.name }}</div>
        <td>{{ item.email }}</td>
      </div>
    </template>
  </RaiDrop>
</template>

<script>
import { defineComponent, ref } from 'vue';
import RaiDrop from 'raidrop';

export default defineComponent({
  components: { RaiDrop },
  setup() {
    const users = ref([
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
    ]);

    return { users };
  },
});
</script>
```

---

## 📝 License

This project is licensed under the [MIT License](./LICENSE).

---

## 💬 Feedback and Support

If you have any questions or suggestions:
- Create an [issue](https://github.com/your_project/issues)
- Contact me via telegram: `@raissound`

---
