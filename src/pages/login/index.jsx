import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Header from "../../components/Header";
import { useRouter } from "next/router";
import styles from "../../../styles/Login.module.scss";
import { getCsrfToken } from "next-auth/react";
import Link from "next/link";

export default function Component({ csrfToken }) {
  const redirect = useRouter();
  const { data: session } = useSession();
  if (session) {
    redirect.push("/");
  }

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
          />
          <label htmlFor="password" className={styles.registration__label}>
            Пароль *
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={styles.registration__input}
            placeholder="***********"
          />
          <button className={styles.registration__btn} type="submit">
            Войти
          </button>
          <div
            style={{
              margin: "20px auto",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <span>Нету аккаунта?</span>
            <Link
              href="/registration"
              style={{
                marginTop: "15px",
                textDecoration: "underline",
                color: "#FFC400",
              }}
            >
              Зарегестрироваться
            </Link>
          </div>
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
