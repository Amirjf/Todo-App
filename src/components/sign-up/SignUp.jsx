import React, { useEffect } from "react";
import Button from "../button/Button";
import Input from "../input/Input";
import Logo from "../../assets/images/mylogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  registerWithEmailAndPassword,
} from "../../firebase/firebase.config";
import "./_signup.scss";
import { useForm } from "react-hook-form";
import Form from "../form/Form";

const SignUn = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/");
  }, [user, loading]);

  const onSubmit = (data) => {
    const { email, password, name } = data;
    registerWithEmailAndPassword(name, email, password);
  };

  return (
    <div className="auth-container">
      <div className="sign-in-container">
        <div className="logo-container">
          <img src={Logo} alt="logo" />
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            {...register("name")}
            placeholder="Example : Amirmasoud "
          />
          <label>Email</label>
          <input
            type="text"
            name="email"
            {...register("email")}
            placeholder="Example : Amirmasoud@gmail.com"
          />
          <label>Password</label>
          <input
            type="password"
            {...register("password")}
            name="password"
            placeholder="type a password"
          />
          <Button block>Sign Up Now !</Button>
        </Form>
      </div>
    </div>
  );
};

export default SignUn;
