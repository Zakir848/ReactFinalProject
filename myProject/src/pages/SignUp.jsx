import React, { useEffect, useState } from "react";
import "../styles/Auth.css";
import { useForm } from "react-hook-form";
// import Alert from "@mui/material/Alert";
// import AlertTitle from "@mui/material/AlertTitle";
// import Stack from "@mui/material/Stack";
import { useContextFunc } from "../context/JobContext";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const { addUser, users } = useContextFunc();
  const [isCompany, setIsCompany] = useState(false);
  const [has, setHas] = useState(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    reset,
    register,
    watch,
    unregister,
    formState: { errors },
  } = useForm();

  const currentDate = new Date().toISOString().split("T")[0];

  const today = new Date();
  const startBirthday = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate(),
  )
    .toISOString()
    .split("T")[0];

  const endBirdhday = new Date(
    today.getFullYear() - 64,
    today.getMonth(),
    today.getDate(),
  )
    .toISOString()
    .split("T")[0];

  const onSubmit = (data) => {
    data.role = isCompany ? "Employer" : "Worker";

    const existingUser = users.find(
      (user) =>
        (user.email === data.email && user.role === data.role) ||
        (user.email === data.email &&
          user.role === data.role &&
          user.voen === data.voen),
    );

    if (existingUser) {
      setHas(true);
      return;
    }

    setHas(false);

    data.age = today.getFullYear() - data.birthday.slice(0, 4);

    delete data.repeadPassword;

    if (data.role === "Employer") {
      (delete data.name,
        delete data.surname,
        delete data.username,
        delete data.age,
        delete data.gender,
        delete data.birthday);
    }

    addUser(data);
    reset();

    navigate("/");
  };

  const handleChangeStatus = (e) => {
    const select = e.target.value;
    setIsCompany(select === "Employer");
    unregister(["email", "password", "repeadPassword", "name", "surname"]);
  };

  return (
    <section className="container">
      <div className="caseAuth">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="form-authen">
          <div className="authen-inputs">
            <select onChange={handleChangeStatus}>
              <option value="Worker">Worker</option>
              <option value="Employer">Employer</option>
            </select>

            {isCompany ? (
              <>
                <React.Fragment key="employer">
                  <input
                    name="email"
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
                  {errors.email && (
                    <p className="error">{errors.email.message}</p>
                  )}
                  {has && (
                    <p className="error">
                      This email address is already in use. Please try a
                      different one.
                    </p>
                  )}

                  <input
                    name="password"
                    placeholder="Enter password"
                    type="password"
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
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
                        message:
                          "Minimum 1 upper letter, 1 little letter, 1 Symbol, 1 digit",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="error">{errors.password.message}</p>
                  )}

                  <input
                    name="repeadPassword"
                    type="password"
                    placeholder="Password"
                    {...register("repeadPassword", {
                      required: "Please, enter your password",
                      minLength: {
                        value: 8,
                        message: "Please, enter minimum 8 charakter",
                      },
                      maxLength: {
                        value: 16,
                        message: "Please, enter maximum 20 charakter",
                      },
                    })}
                  />
                  {errors.repeadPassword && (
                    <p className="error">{errors.repeadPassword.message}</p>
                  )}

                  <input
                    name="company"
                    placeholder="Company Name"
                    {...register("companyName", {
                      required: "Please enter company name",
                    })}
                  />
                  {errors.companyName && (
                    <p className="error">{errors.companyName.message}</p>
                  )}

                  <input
                    name="voen"
                    placeholder="Company Tax ID / VÖEN"
                    {...register("voen", { required: "Please enter VÖEN" })}
                  />
                  {errors.voen && (
                    <p className="error">{errors.voen.message}</p>
                  )}

                  <input
                    name="foundingDate"
                    type="date"
                    {...register("foundingDate", {
                      required: "Please, select your company founding day",
                    })}
                    max={currentDate}
                  />
                  {errors.foundingDate ? (
                    <p className="error">{errors.foundingDate.message}</p>
                  ) : (
                    <label style={{ color: "gray" }}>
                      Enter the company's founding date.
                    </label>
                  )}
                </React.Fragment>
              </>
            ) : (
              <>
                <React.Fragment key="worker">
                  <input
                    name="name"
                    placeholder="Enter name"
                    {...register("name", {
                      required: "Please, enter name",
                      minLength: {
                        value: 2,
                        message: "Minimum 2 character",
                      },
                      pattern: {
                        value: /^[a-zA-ZçÇğĞıİöÖşŞüÜəƏ]+$/,
                        message: "Only letters",
                      },
                    })}
                  />
                  {errors.name && (
                    <p className="error">{errors.name.message}</p>
                  )}

                  <input
                    name="surname"
                    placeholder="Enter surname"
                    {...register("surname", {
                      required: "Please, enter surname",
                      minLength: {
                        value: 3,
                        message: "Minimum 3 characker",
                      },
                      pattern: {
                        value: /^[a-zA-ZçÇğĞıİöÖşŞüÜəƏ]+$/,
                        message: "Only letters",
                      },
                    })}
                  />
                  {errors.surname && (
                    <p className="error">{errors.surname.message}</p>
                  )}

                  <input
                    name="username"
                    placeholder="Enter username"
                    {...register("username", {
                      required: "Please, enter your username",
                      pattern: {
                        value: /^[a-zA-Z][a-zA-Z0-9_]{3,20}$/,
                        message:
                          "Username must start with a letter and contain only letters, numbers, and underscores (3-20 characters).",
                      },
                    })}
                  />
                  {errors.username && (
                    <p className="error">{errors.username.message}</p>
                  )}
                  {has && (
                    <p className="error">
                      This email address is already in use. Please try a
                      different one.
                    </p>
                  )}

                  <input
                    name="email"
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
                  {errors.email && (
                    <p className="error">{errors.email.message}</p>
                  )}
                  {has && (
                    <p className="error">
                      This email address is already in use. Please try a
                      different one.
                    </p>
                  )}

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
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
                        message:
                          "Minimum 1 upper and little letter, 1 Symbol, 1 digit",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="error">{errors.password.message}</p>
                  )}

                  <input
                    name="repeadPassword"
                    placeholder="Repead password"
                    {...register("repeadPassword", {
                      required: "Please, enter your password",
                      validate: (value) => {
                        return (
                          value === watch("password") ||
                          "Passwords do not match!"
                        );
                      },
                    })}
                  />
                  {errors.repeadPassword && (
                    <p className="error">{errors.repeadPassword.message}</p>
                  )}

                  <input
                    name="birthday"
                    type="date"
                    placeholder="Enter Repead Password"
                    {...register("birthday", {
                      required: "Please, select your birtday",
                      min: {
                        value: { startBirthday },
                        message: `Minimum 18 age`,
                      },
                      max: {
                        value: { endBirdhday },
                        message: `Minimum 64 age`,
                      },
                    })}
                    min={endBirdhday}
                    max={startBirthday}
                  />
                  {errors.birthday && (
                    <p className="error">{errors.birthday.message}</p>
                  )}

                  <select
                    {...register("gender", {
                      required: "Please, choose your gender",
                    })}
                  >
                    <option value="">Other</option>
                    <option value="Male">Male</option>
                    <option value="Famale">Famale</option>
                  </select>
                  {errors.gender && (
                    <p className="error">{errors.gender.message}</p>
                  )}
                </React.Fragment>
              </>
            )}
            <div className="authBtn-case">
              <button type="submit">Sign Up</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
