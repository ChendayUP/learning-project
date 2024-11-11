import React, { useState } from 'react';
import { Button, Drawer } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const titleContent = (
    <div style={{ color: 'red' }}>
      <div>title content</div>
      <div>title content3333</div>
    </div>
  );

  return (
    <>
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
    </>
  );
};

export default App;
