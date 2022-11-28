/* eslint-disable no-param-reassign */
/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
/* eslint-disable indent */
import { Formik, Form, Field } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { useSession } from 'next-auth/react';
import styles from './styles/Forms.module.css';
import { submitAddLog, submitEditLog } from './helpers/form.helpers';
import { ILog } from '../../models/LogModel';

const types = [
  "Hop'n'Pop",
  'Pond',
  'Belly',
  'RW',
  'FS',
  'Freefly',
  'Angle/Track',
  'Wingsuit',
  'AFF',
  'Tandem',
];

const altitudes = [4000, 1500, 1200];

type LogFormProps = {
  log?: ILog;
  type: 'add' | 'edit';
  setLogsUpdated: Dispatch<SetStateAction<boolean>>;
};

const LogForm: React.FC<LogFormProps> = ({ log, type, setLogsUpdated }) => {
  const session = useSession();
  const user = session.data?.user.name;

  /*
   *  The property "type" is only used to control inputs and to be able to
   *  store values from different types of input in the same array when submitting.
   */
  const initialValues = {
    date:
      log?.date ||
      new Date().toLocaleDateString('sv-SE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    user: log?.user || user,
    groupCount: log?.groupCount || 0,
    freefall: log?.freefall || 0,
    altitude: log?.altitude || 4000,
    location: log?.location,
    aircraft: log?.aircraft,
    canopy: log?.canopy,
    comment: log?.comment,
    tags: log?.tags || [],
    type: '',
  };

  const handleSubmit = async (values: ILog | object) => {
    if (type === 'edit') {
      await submitEditLog();
    }
    if (type === 'add') {
      await submitAddLog(values as ILog);
    }
    setLogsUpdated(true);
  };
  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          if (values.type) {
            values.tags.push(values.type);
            values.type = '';
          }
          console.log(values);
          handleSubmit(values);
          actions.resetForm();
          actions.setSubmitting(false);
        }}
      >
        {() => (
          <Form className={`${styles.form} ${styles.logform}`}>
            <label htmlFor="date">Date</label>

            {/* The initial value is todays date so logs cannot be created for future jumps */}
            <Field type="date" name="date" max={initialValues.date} />
            <label htmlFor="type">Type</label>
            <Field as="select" name="type">
              <option value="" disabled>
                Choose type...
              </option>
              {types.map((t) => {
                return (
                  <option key={t} value={t.toLowerCase()}>
                    {t}
                  </option>
                );
              })}
            </Field>

            <label htmlFor="altitude">Altitude</label>
            <Field as="select" name="altitude" placeholder="Choose altitude">
              {/* <option value="" disabled>
                Choose Altitude...
              </option> */}
              {altitudes.map((a) => {
                return (
                  <option key={a} value={a}>
                    {`${a}m`}
                  </option>
                );
              })}
            </Field>

            <label htmlFor="freefall">Freefall (min)</label>
            <Field type="number" min="0" max="3" step="0.5" name="freefall" />
            <label htmlFor="groupCount">
              Group count
              <Field type="number" min="0" name="groupCount" />
            </label>
            <label htmlFor="location">Location</label>
            <Field type="text" name="location" />
            <label htmlFor="aircraft">Aircraft</label>
            <Field type="text" name="aircraft" />
            <label htmlFor="canopy">Canopy</label>
            <Field type="text" name="canopy" />

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
            <button type="submit">Save</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LogForm;
