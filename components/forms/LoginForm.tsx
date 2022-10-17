import { Formik, Form, Field } from 'formik';
import styles from './styles/Forms.module.css';

interface MyFormValues {
  firstName: string;
  passWord: string;
}
const LoginForm = () => {
  const initialValues: MyFormValues = { firstName: '', passWord: '' };
  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log(values);
          actions.setSubmitting(false);
        }}
      >
        <Form className={styles.form}>
          <label htmlFor="firstName">First Name</label>
          <Field
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
          />
          <label htmlFor="passWord">Password</label>
          <Field
            type="password"
            id="passWord"
            name="passWord"
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
