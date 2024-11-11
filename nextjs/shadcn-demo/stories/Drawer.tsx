import React, { useState } from 'react';
import { Button, Drawer, ConfigProvider } from 'antd';

const App = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const titleContent = <div style={{ color: 'red' }}>
    <div>title content</div>
    <div>title content3333</div>
  </div>

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token，影响范围大
            colorPrimary: '#00b96b',
            borderRadius: 2,

            // 派生变量，影响范围小
            colorBgContainer: '#f6ffed',
          },
        }}
      >
        <Button
          type="primary"
          onClick={showDrawer}
        >
          Open
        </Button>
        <Drawer
          title={titleContent}
          onClose={onClose}
          open={open}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </ConfigProvider>
    </>
  );
};

export default App;
