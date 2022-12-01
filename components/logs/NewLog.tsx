import React, { useState } from 'react';
import LogForm from '../forms/LogForm';

const NewLog: React.FC = () => {
  const [logsUpdated, setLogsUpdated] = useState(false);
  return (
    <div>
      {!logsUpdated ? (
        <div>
          <h2>Add new log</h2>
          <LogForm type={'add'} setLogsUpdated={setLogsUpdated} />
        </div>
      ) : (
        <div>
          <h2>Log added</h2>
          <button onClick={() => setLogsUpdated(false)}>Add new log</button>
        </div>
      )}
    </div>
  );
};

export default NewLog;
