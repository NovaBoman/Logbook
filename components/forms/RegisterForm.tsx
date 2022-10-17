import { Formik, Form, Field } from 'formik';
import styles from './styles/Forms.module.css';

interface MyFormValues {
  firstName: string;
  email: string;
  pwd: string;
  confirmPwd: string;
}
const RegisterForm = () => {
  const initialValues: MyFormValues = {
    firstName: '',
    email: '',
    pwd: '',
    confirmPwd: '',
  };
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
          <label htmlFor="firstName">Username</label>
          <Field
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Username"
          />
          <label htmlFor="firstName">Email</label>
          <Field
            type="email"
            id="email"
            name="email"
            placeholder="user@example.com"
          />
          <label htmlFor="pwd">Password</label>
          <Field type="password" id="pwd" name="pwd" placeholder="Password" />
          <label htmlFor="pwd">Confirm Password</label>
          <Field
            type="password"
            id="confirm"
            name="confirmPwd"
            placeholder="Confirm Password"
          />
          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;
