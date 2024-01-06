import React, { useContext } from "react";
import Style from "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserContext } from "./../../Context/userContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    let { isLoading, setIsLoading, Login, setUserToken } =
        useContext(UserContext);
    const navigate = useNavigate();

    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string()
            .matches(
                passwordRegex,
                "Password must contains capital letter, small letter, numbers and special characters, minimum length 8"
            )
            .required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: async function submitLogin(values) {
            setIsLoading(true);
            let { data } = await Login(values);
            setIsLoading(false);
            // console.log(data);
            if (data.msg === "done") {
                setIsLoading(false);
                localStorage.setItem("userToken", `3b8ny__${data.token}`);
                setUserToken(data.token);
                navigate("/");
            }
        },
    });
    return (
        <>
            <section className={Style.loginSection}>
                <div className={Style.loginFormBox}>
                    <div className="form-value">
                        <form onSubmit={formik.handleSubmit}>
                            <h2 className={Style.head}>Login</h2>
                            <p className={Style.start}>
                                Welcome Back{" "}
                                <i
                                    className={`fa-solid fa-heart ms-0 text-main ${Style.icon}`}
                                ></i>
                            </p>
                            <p className={Style.qoute}>
                                Thanks for returning! Please sign in to access your account.
                            </p>
                            <div className="inputBox">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    required
                                />
                                <label htmlFor="email">Email</label>
                                {formik.errors.email && formik.touched.email ? (
                                    <ion-icon name="mail-outline">{formik.errors.email}</ion-icon>
                                ) : null}
                            </div>
                            <div className="inputBox">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    required
                                />
                                <label htmlFor="password">Password</label>
                                {formik.errors.password && formik.touched.password ? (
                                    <ion-icon name="lock-closed-outline">
                                        {formik.errors.password}
                                    </ion-icon>
                                ) : null}
                            </div>
                            <div className="forget mb-3">
                                <label>
                                    <input type="checkbox" /> Remember me
                                </label>
                                <label>
                                    <a href="#">Forgot password?</a>
                                </label>
                            </div>
                            {isLoading ? (
                                <button type="button" className={`bn29 ${Style.button}`}>
                                    <div className={Style.ldsDualRing}></div>
                                </button>
                            ) : (
                                <button type="submit" className={`bn29 ${Style.button}`}>
                                    Login
                                </button>
                            )}
                            <div className="forget d-flex">
                                <label>
                                    <p>
                                        Don't have account yet?{" "}
                                        <Link to="/register" className="fw-bold">
                                            Signup..
                                        </Link>
                                    </p>
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
