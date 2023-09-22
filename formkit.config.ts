import { defineFormKitConfig } from "@formkit/vue";
import type { FormKitTypeDefinition } from "@formkit/core";
import { generateClasses } from "@formkit/themes";
import {
  outer,
  inner,
  wrapper,
  label,
  help,
  prefix,
  suffix,
  createSection,
} from "@formkit/inputs";
import Combobox from "~/components/Combobox.vue";

let totalNumberOfSchemaComponentsCreated = 0;

export default defineFormKitConfig({
  inputs: {
    combobox: (() => {
      const schemaComponentName = `SchemaComponent${++totalNumberOfSchemaComponentsCreated}`;

      const formKitTypeDefinition: FormKitTypeDefinition = {
        type: "input",
        schema: outer(
          wrapper(
            label("$label"),
            inner(
              prefix(),
              createSection("combobox", () => ({
                $cmp: schemaComponentName,
                props: {
                  context: "$node.context",
                },
              }))(),
              suffix()
            )
          ),
          help("$help")
        ),
        library: {
          [schemaComponentName]: markRaw(Combobox),
        },
        schemaMemoKey: String(Math.random()),
        props: ["options", "getInputLabel", "filteringMode", "disabled"],
      };

      return formKitTypeDefinition;
    })(),
  },
  config: {
    rootClasses: false,
    classes: generateClasses({
      combobox: {
        wrapper: "flex flex-col gap-1",
        label: "font-bold capsize text-xs lg:text-base",
        inner: "relative flex",
        combobox: "w-full",
        comboboxInputWrapper:
          "flex justify-between items-stretch relative h-12 w-full border-0 border-b-2 border-red-200 bg-transparent focus:border-red-200 after:absolute after:inset-x-1/2 after:-bottom-0.5 after:h-0.5 after:bg-yellow-500 after:duration-300 after:ease-out focus-within:after:inset-x-0",
        comboboxInput:
          "w-full border-0 bg-transparent focus:ring-0 placeholder:text-gray-700 formkit-disabled:placeholder:text-gray-700 p-4 capsize outline-none text-sm lg:text-base",
        comboboxButton: "flex flex-none justify-center items-center w-12",
        comboboxButtonIcon: "fill-red-200 duration-150 ui-open:rotate-180 w-4",
        comboboxOptions:
          "bg-white absolute max-h-[16.5rem] overflow-auto w-full shadow z-[1]",
        comboboxOption:
          "min-h-[3rem] flex items-center hover:bg-red-200 hover:duration-150 group p-4 cursor-pointer ui-active:bg-red-200 ui-active:duration-150",
        comboboxOptionText:
          "font-light text-xs lg:text-base capsize group-hover:text-white ui-active:text-white",
        comboboxNoOptionsHighlightedInputText: "font-bold",
      },
    }),
  },
});
