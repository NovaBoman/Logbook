import React, { useState } from 'react';
import LogForm from '../forms/LogForm';
import logStyles from './styles/Logs.module.css';
import formStyles from '../forms/styles/Forms.module.css';

const NewLog: React.FC = () => {
  const [logsUpdated, setLogsUpdated] = useState(false);
  return (
    <div className={logStyles.loglist}>
      {!logsUpdated ? (
        <div>
          <h2>Add new log</h2>
          <LogForm type={'add'} setLogsUpdated={setLogsUpdated} />
        </div>
      ) : (
        <div>
          <h2>Log added</h2>

          <button
            className={formStyles.formButton}
            onClick={() => setLogsUpdated(false)}
          >
            Add new log
          </button>
        </div>
      )}
    </div>
  );
};

export default NewLog;
