import React, { useContext } from "react";
import Style from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserContext } from "../../Context/userContext";
export default function Register() {
    let { isLoading, setIsLoading, createAccount } = useContext(UserContext);
    const navigate = useNavigate();

    let nameRegex = /^[A-Z][a-z A-z 0-9]{3,20}$/;
    let phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,8}$/;
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    const validationSchema = Yup.object({
        name: Yup.string()
            .matches(
                nameRegex,
                "Please enter any character from a to z or A to Z start with capital letter and containing any number from 0 to 9 with minlength 3 and maxlength 20"
            )
            .required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string()
            .matches(
                passwordRegex,
                "Password must contains capital letter, small letter, numbers and special characters, minimum length 8"
            )
            .required("Password is required"),
        age: Yup.number()
            .min(18, "You must be at least 18 Years old")
            .max(60, "You can't be more than 60")
            .required("Age is required"),
        phone: Yup.string()
            .matches(phoneRegex, "Please enter a valid egyptian number")
            .required("Phone number is required"),
    });
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            age: "",
            phone: "",
        },
        validationSchema,
        onSubmit: async function submitRegister(values) {
            setIsLoading(true);
            let { data } = await createAccount(values);
            setIsLoading(false);
            // console.log(data);
            if (data.msg === "done") {
                setIsLoading(false);
                navigate('/login');
            }
        },
    });

    return (
        <>
            <section className={Style.registerSection}>
                <div className={Style.registrationFormBox}>
                    <div className="form-value">
                        <form onSubmit={formik.handleSubmit}>
                            <h2 className={Style.head}>Create an account</h2>
                            <p className={Style.start}>Let's get started for free</p>
                            <div className="inputBox">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    required
                                />
                                <label htmlFor="name">User Name</label>
                                {formik.errors.name && formik.touched.name ? (
                                    <ion-icon name="name-outline">{formik.errors.name}</ion-icon>
                                ) : null}
                            </div>
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
                            <div className="inputBox">
                                <input
                                    type="text"
                                    name="age"
                                    id="age"
                                    inputMode="numeric"
                                    value={formik.values.age}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    required
                                />
                                <label htmlFor="age">Age</label>
                                {formik.errors.age && formik.touched.age ? (
                                    <ion-icon name="age-outline">{formik.errors.age}</ion-icon>
                                ) : null}
                            </div>
                            <div className="inputBox">
                                <input
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    inputMode="numeric"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    required
                                />
                                <label htmlFor="phone">Phone</label>
                                {formik.errors.phone && formik.touched.phone ? (
                                    <ion-icon name="phone-outline">
                                        {formik.errors.phone}
                                    </ion-icon>
                                ) : null}
                            </div>
                            {isLoading ? (
                                <button type="button" className={`bn29 ${Style.button}`}>
                                    <div className={Style.ldsDualRing}></div>
                                </button>
                            ) : (
                                <button type="submit" className={`bn29 ${Style.button}`}>
                                    Create account
                                </button>
                            )}
                            <div className="forget d-flex">
                                <label>
                                    <p>
                                        Already have account? <Link to="/login" className="fw-bold">Login..</Link>
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
