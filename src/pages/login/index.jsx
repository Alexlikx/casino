import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Header from "../../components/Header";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import styles from "../../../styles/Login.module.scss";
import error from "../../../public/error.svg";
import { getCsrfToken } from "next-auth/react";

export default function Component({ csrfToken }) {
  const redirect = useRouter();
  const { data: session } = useSession();
  if (session) {
    redirect.push("/cabinet");
  }

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   setError,
  //   formState: { errors },
  // } = useForm();

  // const onSubmit = async (data) => {
  //   const email = data.Email;
  //   const password = data.Password;

  //   const post = () => {};
  // };

  return (
    <>
      <Header />
      <div className={styles.form__wrapper}>
        <form
          className={styles.registration__form}
          method="post"
          action="/api/auth/callback/credentials"
        >
          <h1 className={styles.registration__title}>Вход</h1>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label htmlFor="email" className={styles.registration__label}>
            Эл. адрес *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.registration__input}
            // {...register("Email", {
            //   required: "Это обязательное поле",
            //   minLength: {
            //     value: 4,
            //     message: "Некоректная почта",
            //   },
            //   pattern: {
            //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            //     message: "Некоректная почта",
            //   },
            // })}
          />
          {/* {errors.Email ? (
            <div className={styles.registration__error_block}>
              <Image src={error} alt="error" />
              {errors?.Email && <p>{errors?.Email?.message || "Error"}</p>}
            </div>
          ) : (
            ""
          )} */}
          <label htmlFor="password" className={styles.registration__label}>
            Пароль *
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={styles.registration__input}
            // {...register("Password", {
            //   required: "Это обязательное поле",
            // })}
            placeholder="***********"
          />
          {/* {errors.Password ? (
            <div className={styles.registration__error_block}>
              <Image src={error} alt="error" />
              {errors?.Password && (
                <p>{errors?.Password?.message || "Error"}</p>
              )}
            </div>
          ) : (
            ""
          )} */}
          <button className={styles.registration__btn} type="submit">
            Войти
          </button>
        </form>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}
