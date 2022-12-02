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
    <div className={`${styles.container} ${styles.logformContainer}`}>
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
          <Form className={`${styles.form} ${styles.dashboardForm}`}>
            <fieldset
              className={styles.fieldsetGrid}
              disabled={isDisabled}
              onClick={() => setIsDisabled(false)}
            >
              {/* The initial value is todays date so logs cannot be created for future jumps */}

              <label className={styles.date} htmlFor="date">
                Date:
                <Field type="date" name="date" max={initialValues.date} />
              </label>
              <label className={styles.location} htmlFor="location">
                Location:
                <Field type="text" name="location" placeholder="Add location" />
              </label>
              <label className={styles.group} htmlFor="groupCount">
                Group #:
                <Field
                  type="number"
                  min="0"
                  name="groupCount"
                  placeholder="nr"
                />
              </label>

              <label className={styles.type} htmlFor="type">
                Type:
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

              <label className={styles.altitude} htmlFor="altitude">
                Altitude:
                <Field as="select" name="altitude">
                  {ALTITUDES.map((a) => {
                    return (
                      <option key={a} value={a}>
                        {`${a}m`}
                      </option>
                    );
                  })}
                </Field>
              </label>

              <label className={styles.freefall} htmlFor="freefall">
                Freefall:
                <Field
                  type="number"
                  min="0"
                  max="180"
                  name="freefall"
                  placeholder="sec."
                />
              </label>

              <label className={styles.aircraft} htmlFor="aircraft">
                Aircraft:
                <Field type="text" name="aircraft" placeholder="Add aircraft" />
              </label>
              <label className={styles.canopy} htmlFor="canopy">
                Canopy:
                <Field type="text" name="canopy" placeholder="Add canopy" />
              </label>

              <label className={styles.comment} htmlFor="comment">
                Comment:
                <Field type="text" name="comment" placeholder="Add comment" />
              </label>

              <section className={styles.accuracy}>
                <h3>Accuracy</h3>
                <div className={styles.checkboxContainer}>
                  <label className={styles.checkboxWrapperLabel}>
                    <Field
                      className={styles.checkbox}
                      type="checkbox"
                      value="5m"
                      name="tags"
                    />
                    <span>5m</span>
                  </label>
                  <label className={styles.checkboxWrapperLabel}>
                    <Field
                      className={styles.checkbox}
                      type="checkbox"
                      value="15m"
                      name="tags"
                    />
                    <span>15m</span>
                  </label>
                </div>
              </section>

              <section className={styles.other}>
                <h3>Other</h3>
                <div className={styles.checkboxContainer}>
                  <label className={styles.checkboxWrapperLabel}>
                    <Field
                      className={styles.checkbox}
                      type="checkbox"
                      value="malfunction"
                      name="tags"
                    />
                    <span>Malfunction</span>
                  </label>
                  <label className={styles.checkboxWrapperLabel}>
                    <Field
                      className={styles.checkbox}
                      type="checkbox"
                      value="cutaway"
                      name="tags"
                    />
                    <span>Cutaway</span>
                  </label>
                  <label className={styles.checkboxWrapperLabel}>
                    <Field
                      className={styles.checkbox}
                      type="checkbox"
                      value="inhopp"
                      name="tags"
                    />
                    <span>Inhopp</span>
                  </label>
                  <label className={styles.checkboxWrapperLabel}>
                    <Field
                      className={styles.checkbox}
                      type="checkbox"
                      value="offDZ"
                      name="tags"
                    />
                    <span>Landed out</span>
                  </label>
                </div>
              </section>
              <div className={styles.buttons}>
                {type === 'add' && (
                  <div className={styles.buttonContainer}>
                    <button
                      className={styles.formButton}
                      type="submit"
                      hidden={isDisabled}
                    >
                      Save
                    </button>
                  </div>
                )}

                {type === 'edit' && (
                  <div className={styles.buttonsContainer}>
                    {isDisabled ? (
                      <p
                        className={styles.smallButton}
                        onClick={() => setIsDisabled(false)}
                      >
                        Edit
                      </p>
                    ) : (
                      <p
                        className={styles.smallButton}
                        onClick={() => handleSubmit(values.values)}
                      >
                        Save
                      </p>
                    )}

                    <p
                      className={styles.smallButton}
                      onClick={() => handleDelete(initialValues?.logId)}
                    >
                      Delete
                    </p>
                  </div>
                )}
              </div>
            </fieldset>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LogForm;
