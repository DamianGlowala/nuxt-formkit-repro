<template>
  <div class="p-40 bg-gray-200 flex flex-col gap-20">
    <FormKit type="form" :actions="false" no-validate>
      <FormKit
        v-model="selectedOption1"
        placeholder="Select option..."
        type="combobox"
        :options="options"
        @update:model-value="onModelValueUpdate"
      />

      <FormKit
        v-if="!!selectedOption1"
        v-model="selectedOption2"
        placeholder="Select option..."
        type="combobox"
        :options="options"
        @update:model-value="onModelValueUpdate2"
      />
    </FormKit>
  </div>
</template>

<script setup lang="ts">
const options = ref<
  {
    label: string;
    value: any;
  }[]
>([
  {
    label: "Option 1",
    value: 1,
  },
  {
    label: "Option 2",
    value: 2,
  },
]);

const selectedOption1 = ref(null);
const selectedOption2 = ref(null);

function onModelValueUpdate() {
  console.log("model value updated");
}

function onModelValueUpdate2() {
  console.log("model value updated");
}

watch(selectedOption1, (selectedOption) => {
  console.log("selected option updated");

  console.log(selectedOption);
});

watch(selectedOption2, (selectedOption2) => {
  console.log("selected option 2 updated");

  console.log(selectedOption2);
});
</script>
