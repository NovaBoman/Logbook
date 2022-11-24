import * as Yup from 'yup';

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, 'Username must be at least 5 characters')
    .max(10, 'Username cannot be more than 10 characters')
    .matches(/^[a-zA-Z0-9]+$/, 'Cannot contain special characters or spaces')
    .required('Required'),
  email: Yup.string().email('Please enter a valid email').required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Required')
    .matches(/^[a-zA-Z0-9]+$/, 'Cannot contain special characters or spaces'),
});

export default RegisterSchema;
