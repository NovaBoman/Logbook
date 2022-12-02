import { Field, Form, Formik } from 'formik';
import React from 'react';
import { TYPES } from '../../utils/constants';
import styles from './styles/Forms.module.css';

interface FilterInputProps {
  arrayFilters: string[];
  setTypeFilter: React.Dispatch<React.SetStateAction<string | undefined>>;
  setTagFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

type FilterValues = {
  typeFilter: string | undefined;
  tagFilters: string[];
};

const FilterInputs: React.FC<FilterInputProps> = ({
  arrayFilters,
  setTagFilters,
  setTypeFilter,
}) => {
  const initialValues = {
    typeFilter: '',
    tagFilters: arrayFilters,
  };

  // *** FUNCTIONS *** //

  // Handle submit
  const handleSubmit = (values: FilterValues) => {
    setTagFilters(values.tagFilters);
    setTypeFilter(values.typeFilter);
  };

  // *** RETURN *** //
  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          handleSubmit(values);
          actions.setSubmitting(false);
        }}
      >
        {(props) => (
          <Form
            className={`${styles.form} ${styles.dashboardForm}`}
            onChange={props.submitForm}
          >
            <h3>Type</h3>
            <Field as="select" name="typeFilter">
              <option value="">Choose type...</option>
              {TYPES.map((t) => (
                <option key={t} value={t.toLowerCase()}>
                  {t}
                </option>
              ))}
            </Field>

            <div className={styles.checkboxContainer}>
              <h3>Tags</h3>
              <label className={styles.checkboxWrapperLabel}>
                <Field
                  className={styles.checkbox}
                  type="checkbox"
                  value="5m"
                  name="tagFilters"
                />
                <span>5m</span>
              </label>
              <label className={styles.checkboxWrapperLabel}>
                <Field
                  className={styles.checkbox}
                  type="checkbox"
                  value="15m"
                  name="tagFilters"
                />
                <span>15m</span>
              </label>
              <label className={styles.checkboxWrapperLabel}>
                <Field
                  className={styles.checkbox}
                  type="checkbox"
                  value="malfunction"
                  name="tagFilters"
                />
                <span>Malfunction</span>
              </label>
              <label className={styles.checkboxWrapperLabel}>
                <Field
                  className={styles.checkbox}
                  type="checkbox"
                  value="cutaway"
                  name="tagFilters"
                />
                <span>Cutaway</span>
              </label>
              <label className={styles.checkboxWrapperLabel}>
                <Field
                  className={styles.checkbox}
                  type="checkbox"
                  value="inhopp"
                  name="tagFilters"
                />
                <span>Inhopp</span>
              </label>
              <label className={styles.checkboxWrapperLabel}>
                <Field
                  className={styles.checkbox}
                  type="checkbox"
                  value="offDZ"
                  name="tagFilters"
                />
                <span>Landed out</span>
              </label>
            </div>

            <button
              className={styles.smallButton}
              type="button"
              onClick={() => {
                props.resetForm();
                props.submitForm();
              }}
            >
              Clear filters
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FilterInputs;
