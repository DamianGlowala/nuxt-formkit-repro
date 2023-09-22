import type { Config } from "tailwindcss";
import formKitTailwindPlugin from "@formkit/themes/tailwindcss";

export default <Partial<Config>>{
  content: ["./formkit.config.ts"],
  plugins: [
    require('@headlessui/tailwindcss'),
    formKitTailwindPlugin,
  ],
};
