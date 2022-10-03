import { Alert } from 'antd';
import React from 'react';

const onClose = (e) => {
  console.log(e, 'I was closed.');
};

const Alert = () => (
  <>
    <Alert
      message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
      type="warning"
      closable
      onClose={onClose}
    />
    <Alert
      message="Error Text"
      description="Error Description Error Description Error Description Error Description Error Description Error Description"
      type="error"
      closable
      onClose={onClose}
    />
  </>
);
// если ок то 
export default App;