import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../styles/Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useContextFunc } from "../context/JobContext";
import { searchUsers } from "../api/api";

export default function SignIn() {
  const { users, login } = useContextFunc();
  const [isTrue, setIsTrue] = useState(false);

  const navigate = useNavigate();

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const findWorker = users.find(
      (item) => item.email === data.email && item.password === data.password,
    );

    if (!findWorker) {
      setIsTrue(true);
      return;
    } else {
      setIsTrue(false);
    }
    
    login(findWorker);

    reset();
    navigate("/");
  };

  return (
    <section className="container">
      <div className="caseAuth">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="form-authen">
          <div className="authen-inputs">
            <input
              name="username"
              placeholder="Enter email"
              {...register("email", {
                required: "Please, enter your email",
                minLength: {
                  value: 2,
                  message: "Please, enter minimum 2 charakter",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@(gmail\.com|mail\.ru)$/,
                  message: "Plase, set @gmail or @mail.ru ",
                },
              })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}

            <input
              name="password"
              placeholder="Enter password"
              {...register("password", {
                required: "Please, enter your password",
                minLength: {
                  value: 8,
                  message: "Please, enter minimum 8 charakter",
                },
                maxLength: {
                  value: 20,
                  message: "Please, enter maximum 20 charakter",
                },
              })}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </div>
          {isTrue && <p className="error"> Wrong Email or Password</p>}
          <div className="authBtn-case">
            <button type="submit">Sign In</button>
          </div>
        </form>
      </div>
    </section>
  );
}
