import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styles from './styles/Forms.module.css';

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, 'Username must be at least 5 characters')
    .max(10, 'Username cannot be more than 10 characters')
    .matches(/^[a-zA-Z0-9]+$/, 'Cannot contain special characters or spaces')
    .required('Required'),
  email: Yup.string().email('Please enter a valid email').required('Required'),
  pwd: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password cannot be more than 20 characters')
    .required('Required')
    .matches(/^[a-zA-Z0-9]+$/, 'Cannot contain special characters or spaces'),
});

const RegisterForm = () => {
  const initialValues = {
    username: '',
    email: '',
    pwd: '',
  };
  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={(values, actions) => {
          console.log(values);
          actions.setSubmitting(false);
        }}
      >
        {({ errors, touched }) => (
          <Form className={styles.form}>
            <label htmlFor="username">Username</label>
            <Field
              type="text"
              id="username"
              name="username"
              placeholder="Username"
            />
            {errors.username && touched.username && <p>{errors.username}</p>}
            <label htmlFor="email">Email</label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="user@example.com"
            />
            {errors.email && touched.email && <p>{errors.email}</p>}
            <label htmlFor="pwd">Password</label>
            <Field type="password" id="pwd" name="pwd" placeholder="Password" />
            {errors.pwd && touched.pwd && <p>{errors.pwd}</p>}
            <button type="submit">Register</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
