<template>
  <HeadlessCombobox
    as="div"
    :by="context.by"
    :model-value="context._value"
    :class="context.classes.combobox"
    :disabled="context.disabled"
    @update:model-value="context.node.input"
  >
    <div :class="context.classes.comboboxInputWrapper">
      <HeadlessComboboxInput
        :display-value="getDisplayValue"
        :placeholder="context.attrs.placeholder"
        :class="context.classes.comboboxInput"
        autocomplete="off"
        @change="query = $event.target.value"
      />
    </div>

    <Transition
      enter-from-class="scale-95 opacity-0"
      enter-active-class="duration-150 origin-top will-change-transform"
      leave-active-class="duration-150 origin-top will-change-transform"
      leave-to-class="scale-95 opacity-0"
    >
      <HeadlessComboboxOptions :class="context.classes.comboboxOptions">
        <HeadlessComboboxOption
          v-for="(
            filteredInternalOption, filteredInternalOptionIndex
          ) in filteredInternalOptions"
          :key="filteredInternalOptionIndex"
          :class="context.classes.comboboxOption"
          :value="filteredInternalOption.option"
        >
          <span :class="context.classes.comboboxOptionText">
            {{
              typeof filteredInternalOption.option === "string"
                ? filteredInternalOption.option
                : filteredInternalOption.option.label
            }}
          </span>
        </HeadlessComboboxOption>

        <HeadlessComboboxOption
          v-if="filteredInternalOptions.length === 0"
          disabled
          :class="context.classes.comboboxOption"
        >
          <span :class="context.classes.comboboxOptionText">
            <template v-if="query">
              Brak wyników dla
              <span
                :class="context.classes.comboboxNoOptionsHighlightedInputText"
              >
                {{ `'${query}'` }}
              </span>
            </template>

            <template v-else> Brak wyników </template>
          </span>
        </HeadlessComboboxOption>
      </HeadlessComboboxOptions>
    </Transition>
  </HeadlessCombobox>
</template>

<script
  setup
  lang="ts"
  generic="T extends string | { label: string; value: any }"
>
import type { Component } from "vue";
import { FormKitFrameworkContext } from "@formkit/core";

type OptionFilterType = "startsWith" | "includes";

const props = defineProps<{
  context: FormKitFrameworkContext & {
    options: T[];
    by?: keyof T | ((a: T, z: T) => boolean);
    slots: {
      suffixIcon: Component;
    };
    filteringMode?: OptionFilterType;
    disabled?: boolean;
    getInputLabel?: (option: T) => string;
  };
}>();

const internalOptions = computed(() =>
  props.context.options.map((option) => ({
    option,
    normalisedLabel: (typeof option === "string" ? option : option.label)
      .toLowerCase()
      .replace(/\s+/g, ""),
  }))
);

const query = ref(getDisplayValue(props.context._value));

const normalisedQuery = computed(() =>
  query.value.toLowerCase().replace(/\s+/g, "")
);

const normalisedLabelFilter = computed(() => {
  const optionFilterTypeToFnMap: Record<
    OptionFilterType,
    (normalisedLabel: string, normalisedQuery: string) => boolean
  > = {
    includes: (normalisedLabel, normalisedQuery) =>
      normalisedLabel.includes(normalisedQuery),
    startsWith: (normalisedLabel, normalisedQuery) =>
      normalisedLabel.startsWith(normalisedQuery),
  };

  return optionFilterTypeToFnMap[props.context.filteringMode || "includes"];
});

const filteredInternalOptions = computed(() =>
  query.value
    ? internalOptions.value.filter((internalOption) =>
        normalisedLabelFilter.value(
          internalOption.normalisedLabel,
          normalisedQuery.value
        )
      )
    : internalOptions.value
);

function getDisplayValue(option: T) {
  return option
    ? typeof option === "string"
      ? props.context.getInputLabel
        ? props.context.getInputLabel(option)
        : option
      : props.context.getInputLabel
      ? props.context.getInputLabel(option)
      : option.label
    : "";
}
</script>
