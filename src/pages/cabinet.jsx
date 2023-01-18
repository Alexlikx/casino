import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import styles from "../../styles/Cabinet.module.scss";

const Cabinet = () => {
  const [User, setUser] = useState({});

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  const router = useRouter();

  const signout = () => {
    signOut();
  };

  useEffect(() => {
    if (status === "authenticated") {
      const GetBalance = async () => {
        const post = await fetch(`/api/user/get-balance`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: session.user.email,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            setUser(data);
          });
      };
      GetBalance();
    }
  }, [session, status]);

  if (status === "authenticated") {
    return (
      <>
        <Header />
        <div className={styles.cabinet__wrapper}>
          <div className={styles.cabinet__content}>
            <p>
              Signed in as <b>{session.user.email}</b>
            </p>
            <div onClick={() => signout()} className={styles.signOut__btn}>SignOut</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div></div>
    </>
  );
};

export default Cabinet;
