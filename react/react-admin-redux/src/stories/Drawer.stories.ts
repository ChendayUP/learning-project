import type { Meta, StoryObj } from '@storybook/react';

import Drawer from './Drawer';

const meta = {
  title: 'Example/Drawer',
  component: Drawer,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  },
  args: {}
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {}
};

export const LoggedOut: Story = {};
