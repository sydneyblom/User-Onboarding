import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";



const UserForm = ({ values, errors, touched, status }) => {
    const [info, setInfo] = useState([]);
    useEffect(() => {
      if (status) {
        setInfo([...info, status]);
      }
    }, [status]);
  
    return (
      <div className="user-form">
        <Form>
          <Field type="text" name="name" placeholder="Name" />
          {touched.name && errors.name && (
            <p className="error">{errors.name}</p>
          )}
  
          <Field type="text" name="email" placeholder="Email" />
          {touched.email && errors.email && <p className="error">{errors.email}</p>}

          <Field type="password" name="password" placeholder="Password" />
          {touched.password && errors.password && <p className="error">{errors.password}</p>}


          <Field component="select" className="food-select" name="role">
            <option>Please Choose a Role</option>
            <option value="user">User</option>
            <option value="professional">Professional</option>
            <option value="other">Other</option>
          </Field>
          <label>
            Terms of Service
            <Field
              type="checkbox"
              name="tos"
              checked={values.tos}
            />

          </label>
          <button>Submit!</button>
        </Form>
        {info.map( information => (
          <ul key={information.id}>
            <li>Name:{information.name}</li>
            <li>Email: {information.email}</li>
            <li>Password: {information.password}</li>
            <li>Role: {information.role}</li>
          </ul>
        ))}
      </div>
    );
  };
  const FormikUserForm= withFormik({
    mapPropsToValues({ name, email, password, role, tos }) {
      return {
        name: name || "",
        email: email || "",
        password: password || "",
        role: role || "",
        tos: tos || false,
 
      };
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("You must enter a valid email address"),
      password: Yup.string().min(7, 'Password is too short - should be 7 chars minimum.')
    }),
    //You can use this to see the values
    handleSubmit(values, { setStatus }) {
      axios
        .post("https://reqres.in/api/users/", values)
        .then(res => {
          setStatus(res.data);
        })
        .catch(err => console.log(err.res));
    }
  })(UserForm);
  console.log("This is the HOC", FormikUserForm);
  export default FormikUserForm;