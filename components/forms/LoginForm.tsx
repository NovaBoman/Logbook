import { Formik, Form, Field } from 'formik';
import styles from './styles/Forms.module.css';

const LoginForm = () => {
  const initialValues = { username: '', pwd: '' };
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
          <label htmlFor="username">Username</label>
          <Field
            type="text"
            id="username"
            name="username"
            placeholder="Username"
          />
          <label htmlFor="pwd">Password</label>
          <Field type="password" id="pwd" name="pwd" placeholder="Password" />
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
