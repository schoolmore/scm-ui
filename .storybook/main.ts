import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [    {
      name: "addon-storybook-sync",
      options: {
        port: Number(process.env.WEBSTORM_ADDON_STORYBOOK_SYNC_PORT) || undefined,
      },
    },
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  "framework": "@storybook/react-vite",
  staticDirs : ["../public"],
};
export default config;