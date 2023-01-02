import { useState } from "react";
import { Formik } from 'formik';
import "./App.css";

export default function App() {
  const [values, setValues] = useState({
    email: '', password: '', confirmPassword: '', isRead: false,
  });

  const stringJson = JSON.stringify(values);
  return (
    <div className="container">
      <h1>Đăng ký</h1>
      <Formik
        initialValues={{ email: '', confirmPassword: '', password: '', isRead: false }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          }
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
          }
          if (!values.password) {
            errors.password = 'Required';
          }
          if (!values.confirmPassword) {
            errors.confirmPassword = 'Required';
          }
          if (values.confirmPassword !== values.password) {
            errors.confirmPassword = 'Confirm password is not match';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <p>nhập email:</p>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && <div className="error">{errors.email}</div>}
            <br />
            <p>nhập password:</p>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && <div className="error">{errors.password}</div>}
            <br />
            <p>nhập lại password:</p>
            <input
              type="confirmPassword"
              name="confirmPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
            />
            {errors.confirmPassword && touched.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
            <br />
            <br />
            <label>
              <input
                name="isRead"
                type="checkbox"
                checked={values.isRead}
                onChange={handleChange} />I read and accept the privacy policy:
            </label>
            <br />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
      <div className="show-json-string-setValues">{stringJson}</div>
    </div>
  );
}