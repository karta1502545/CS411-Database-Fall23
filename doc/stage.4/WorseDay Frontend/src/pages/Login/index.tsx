import React, { useState } from "react";
import { Button } from '@material-ui/core';
import { Formik, Field, Form, ErrorMessage } from "formik";
import { NavigateFunction, useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router';
import * as Yup from "yup";
import { login } from "../../services/auth.service";
import Cookies from "js-cookie";
import './Login.scss';
// import { useAuth } from '../../context/auth';
// import { ROUTES } from '../../utils/constants';
// import fbNameLogo from '../../assets/fbNameLogo.png';
import worseDayLogo from '../../assets/worseDayIcon.png';
import axios from "axios";

type LoginProp = {
  setAuth: Function;
}

function Login({setAuth}: LoginProp): React.ReactElement {
  // const { signin } = useAuth();
  // const history = useHistory();
  let navigate: NavigateFunction = useNavigate();
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const initialValues: {
    username: string;
    password: string;
  } = {
    username: "",
    password: "",
  };

  const handleLogin = (formValue: { username: string; password: string }) => {
    const { username, password } = formValue;

    setMessage("");
    setLoading(true);

    login(username, password).then(
      async () => {
        Cookies.set("username", username);
        const response = await axios.get(`/auth/userid/${username}`).then((res) => {
          console.log(res.data[0].userID);
          Cookies.set("userID", res.data[0].userID);
        });
        console.log("Login successfully.")
        navigate("/home");
        window.location.reload();
        setAuth(true);
      },
      (error) => {
        console.log("Login failed.")
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <div className='login'>
      <div className='logo'>
        <img src={worseDayLogo} alt='name logo' />
        <h4>WorseDay made using Typescript and React.</h4>
      </div>
      <div className='loginCard'>
        <div className='card'>
          <span className='title'>Sign In</span>
          <p>Sign in with your Google account</p>
          <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
          >
          <Form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field name="username" type="text" className="form-control" />
              <ErrorMessage
                name="username"
                component="div"
                className="alert alert-danger"

              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="form-group">
              <Button className='button' type='submit'>
              {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
              )}
              SIGN IN
              </Button>
              {/* <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button> */}

            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
          </Form>
          </Formik>
          {/* <Button className='button' type='submit' onClick={onSignIn}>
            SIGN IN
          </Button> */}
        </div>
      </div>
    </div>
  );
}

export default Login;
