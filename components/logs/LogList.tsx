/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import FilterInputs from '../forms/FilterInputs';
import LogForm from '../forms/LogForm';
import { ILog } from '../../models/LogModel';
import styles from './styles/Logs.module.css';

const LogList: React.FC = () => {
  const [logs, setLogs] = useState<Array<ILog>>([]);
  const [message, setMessage] = useState<string | null>('Loading logs...');
  const [tagFilters, setTagFilters] = useState<Array<string>>([]);
  const [typeFilter, setTypeFilter] = useState<string | undefined>();
  const [logsUpdated, setLogsUpdated] = useState(false);

  // *** FUNCTIONS ***//

  // Get logs
  const getLogs = async () => {
    try {
      await fetch('/api/logs/')
        .then((res) => res.json())
        .then((logData) => {
          // If the collection is empty:
          if (logData.length === 0) {
            setMessage('No logs found');
          }
          // If collection is not empty:
          return setLogs(logData);
        });
    } catch (e: any) {
      setMessage('Could not load logs from database');
    }
  };

  // Filter logs by tags
  const applyTagFilter = (items: ILog[], filters: string[]) =>
    items.filter((item) =>
      filters.every((filter) => item?.tags?.includes(filter))
    );

  // Filter logs by string/type
  const applyTypeFilter = (items: ILog[], filter: string) =>
    items.filter((item) => item.type === filter);

  // Apply filters before showing logs
  const applyFilters = (
    items: ILog[],
    stringFilter?: string,
    arrayFilter?: string[]
  ) => {
    let filteredItems = [...items];
    if (stringFilter) {
      filteredItems = applyTypeFilter(filteredItems, stringFilter);
    }
    if (arrayFilter) {
      filteredItems = applyTagFilter(filteredItems, arrayFilter);
    }

    return filteredItems;
  };

  // *** EFFECTS *** //

  // Load logs when component mounts
  useEffect(() => {
    getLogs();
    setMessage(null);
  }, []);

  // Reload logs when logs are updated
  useEffect(() => {
    if (!logsUpdated) {
      return;
    }
    getLogs();
    setMessage(null);
    setLogsUpdated(false);
  }, [logsUpdated]);

  // *** RETURNS *** //

  // Display message on loading or error
  if (message) {
    return (
      <div className={styles.loglist}>
        <div className={styles.message}>
          <p>{message}</p>
        </div>
      </div>
    );
  }

  // Apply filters (if any) and return list of logs
  const logList = applyFilters(logs, typeFilter, tagFilters);
  return (
    <div className={styles.logList}>
      <h2>List of logs</h2>
      <FilterInputs
        arrayFilters={tagFilters}
        setTagFilters={setTagFilters}
        setTypeFilter={setTypeFilter}
      ></FilterInputs>
      {logList &&
        logList.map((log) => (
          <>
            <div key={JSON.stringify(log._id)} className={styles.grid}>
              <div className={styles.form}>
                <LogForm
                  type={'edit'}
                  log={log}
                  setLogsUpdated={setLogsUpdated}
                ></LogForm>
              </div>
            </div>
          </>
        ))}
    </div>
  );
};

export default LogList;
