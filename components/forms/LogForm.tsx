/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable no-param-reassign */
/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
/* eslint-disable indent */
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useSession } from 'next-auth/react';
import { ObjectId } from 'mongoose';
import {
  dateToValidFormat,
  newDateWithFormat,
  submitAddLog,
  submitEditLog,
} from './helpers/form.helpers';
import { ALTITUDES, TYPES } from '../../utils/constants';
import { ILog } from '../../models/LogModel';
import styles from './styles/Forms.module.css';

type LogFormProps = {
  log?: ILog;
  type: 'add' | 'edit';
  setLogsUpdated: Dispatch<SetStateAction<boolean>>;
};

const LogForm: React.FC<LogFormProps> = ({ log, type, setLogsUpdated }) => {
  const [isDisabled, setIsDisabled] = useState(type === 'edit');

  const session = useSession();
  const user = session.data?.user.name;

  const initialValues = {
    logId: log?._id,
    user: log?.user || user,
    date: log?.date ? dateToValidFormat(log.date) : newDateWithFormat(),
    type: log?.type || '',
    freefall: log?.freefall || 0,
    groupCount: log?.groupCount || 0,
    altitude: log?.altitude || 4000,
    location: log?.location || '',
    aircraft: log?.aircraft || '',
    canopy: log?.canopy || '',
    comment: log?.comment || '',
    tags: log?.tags || [],
  };

  // *** FUNCTIONS *** //

  const handleSubmit = async (values: ILog | object) => {
    if (type === 'edit') {
      await submitEditLog(log?._id, values);
    }
    if (type === 'add') {
      await submitAddLog(values as ILog);
    }
    setIsDisabled(true);
    setLogsUpdated(true);
  };

  const handleDelete = async (logId: ObjectId | undefined) => {
    if (confirm('Do you really want to delete this log?') === true) {
      try {
        await fetch(`/api/logs/${logId}`, {
          method: 'DELETE',
        });
      } catch (e) {
        console.error(e);
      }
    }
    setLogsUpdated(true);
  };

  // *** RETURN *** //

  return (
    <div className={styles.logContainer}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          if (values.freefall! >= 0) {
            values.freefall = 0;
          }
          handleSubmit(values);
          actions.resetForm();
          actions.setSubmitting(false);
        }}
      >
        {(values) => (
          <Form className={`${styles.logform} ${styles.form}`}>
            <fieldset
              disabled={isDisabled}
              onClick={() => setIsDisabled(false)}
            >
              {/* The initial value is todays date so logs cannot be created for future jumps */}
              <Field
                className={styles.logformDate}
                type="date"
                name="date"
                max={initialValues.date}
              />

              <label htmlFor="type">
                Type
                <Field as="select" name="type">
                  <option value="" disabled>
                    Choose type...
                  </option>
                  {TYPES.map((t) => {
                    return (
                      <option key={t} value={t.toLowerCase()}>
                        {t}
                      </option>
                    );
                  })}
                </Field>
              </label>

              <label htmlFor="altitude">
                Altitude
                <Field
                  as="select"
                  name="altitude"
                  placeholder="Choose altitude"
                >
                  {ALTITUDES.map((a) => {
                    return (
                      <option key={a} value={a}>
                        {`${a}m`}
                      </option>
                    );
                  })}
                </Field>
              </label>

              <label htmlFor="freefall">
                Freefall
                {isDisabled ? (
                  <p>{log?.freefall}sec</p>
                ) : (
                  <Field type="number" min="0" max="180" name="freefall" />
                )}
              </label>
              <label htmlFor="groupCount">
                Group count
                <Field type="number" min="0" name="groupCount" />
              </label>
              <label htmlFor="location" placeholder="Add location">
                Location
                <Field type="text" name="location" />
              </label>
              <label htmlFor="aircraft">
                Aircraft
                <Field type="text" name="aircraft" />
              </label>
              <label htmlFor="canopy">
                Canopy
                <Field type="text" name="canopy" />
              </label>

              <p>Accuracy</p>
              <div className={styles.checkboxContainer}>
                <label>
                  5m
                  <Field type="checkbox" value="5m" name="tags" />
                </label>
                <label>
                  15m
                  <Field type="checkbox" value="15m" name="tags" />
                </label>
              </div>
              <p>Tags</p>

              <div className={styles.checkboxContainer}>
                <label>
                  Malfunction
                  <Field type="checkbox" value="malfunction" name="tags" />
                </label>
                <label>
                  Cutaway
                  <Field type="checkbox" value="cutaway" name="tags" />
                </label>
                <label>
                  Inhopp
                  <Field type="checkbox" value="inhopp" name="tags" />
                </label>
                <label>
                  Landed out
                  <Field type="checkbox" value="offDZ" name="tags" />
                </label>
              </div>

              <label htmlFor="comment">Comment</label>
              <Field type="" name="comment" />
              {type === 'add' && (
                <button
                  className={styles.formButton}
                  type="submit"
                  hidden={isDisabled}
                >
                  Save
                </button>
              )}
            </fieldset>

            {type === 'edit' && (
              <div>
                {isDisabled ? (
                  <button
                    className={styles.logformSmallButton}
                    type={'button'}
                    onClick={() => setIsDisabled(false)}
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    className={styles.logformSmallButton}
                    type={'button'}
                    onClick={() => handleSubmit(values)}
                  >
                    Save
                  </button>
                )}

                <button
                  className={styles.logformSmallButton}
                  type={'button'}
                  onClick={() => handleDelete(initialValues?.logId)}
                >
                  Delete
                </button>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LogForm;
