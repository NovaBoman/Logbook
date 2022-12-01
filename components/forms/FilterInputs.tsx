import { Field, Form, Formik } from 'formik';
import React from 'react';
import { TYPES } from '../../utils/constants';

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
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          handleSubmit(values);
          actions.setSubmitting(false);
        }}
      >
        {(props) => (
          <Form onChange={props.submitForm}>
            <label htmlFor="type">
              Type
              <Field as="select" name="typeFilter">
                <option value="">Choose type...</option>
                {TYPES.map((t) => (
                  <option key={t} value={t.toLowerCase()}>
                    {t}
                  </option>
                ))}
              </Field>
            </label>
            <div>
              <label>
                Accuracy 5m
                <Field type="checkbox" value="5m" name="tagFilters" />
              </label>
              <label>
                15m
                <Field type="checkbox" value="15m" name="tagFilters" />
              </label>
            </div>
            <div>
              <label>
                Malfunction
                <Field type="checkbox" value="malfunction" name="tagFilters" />
              </label>
              <label>
                Cutaway
                <Field type="checkbox" value="cutaway" name="tagFilters" />
              </label>
              <label>
                Inhopp
                <Field type="checkbox" value="inhopp" name="tagFilters" />
              </label>
              <label>
                Landed out
                <Field type="checkbox" value="offDZ" name="tagFilters" />
              </label>
            </div>

            <button
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
