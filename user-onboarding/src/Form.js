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
          <Field type="text" name="species" placeholder="Species" />
          {touched.species && errors.species && (
            <p className="error">{errors.species}</p>
          )}
  
          <Field type="text" name="size" placeholder="Size" />
          {touched.size && errors.size && <p className="error">{errors.size}</p>}
          <Field component="select" className="food-select" name="diet">
            <option>Please Choose an Option</option>
            <option value="herbivore">Herbivore</option>
            <option value="carnivore">Carnivore</option>
            <option value="omnivore">Omnivore</option>
          </Field>
          <label>
            vaccinations
            <Field
              type="checkbox"
              name="vaccinations"
              checked={values.vaccinations}
            />
            <Field
              component="textarea"
              type="text"
              name="notes"
              placeholder="Notes"
            />
          </label>
          <button>Submit!</button>
        </Form>
        {info.map( information => (
          <ul key={information.id}>
            <li>Species:{information.species}</li>
            <li>Size: {information.size}</li>
            <li>Diet: {information.diet}</li>
          </ul>
        ))}
      </div>
    );
  };
  const FormikUserForm= withFormik({
    mapPropsToValues({ species, size, diet, vaccinations, notes }) {
      return {
        species: species || "",
        size: size || "",
        diet: diet || "",
        vaccinations: vaccinations || false,
        notes: notes || ""
      };
    },
    validationSchema: Yup.object().shape({
      species: Yup.string().required("You must put a species"),
      size: Yup.string().required()
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