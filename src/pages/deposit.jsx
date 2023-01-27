import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import styles from "../../styles/Deposit.module.scss";

const Deposit = () => {
  const router = useRouter();

  const [User, setUser] = useState({});
  const [amount, setAmount] = useState();
  const [isCorrect, setIsCorrect] = useState(true);

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

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
    if (User.currency === "EUR" || User.currency === "USD") {
      setAmount(10);
    } else {
      setAmount(400);
    }
  }, [session, status, User.currency]);

  function CloseMenu() {
    const elem = document.getElementById("menu__toggle");
    if (elem) {
      elem.checked = false;
    }
    const elem2 = document.getElementById("menu__toggle_profile");
    if (elem2) {
      elem2.checked = false;
    }
  }

  return (
    <>
      <Header />
      <div className="wrapper-content" onClick={() => CloseMenu()}>
        <div className={styles.deposit__form}>
          <h1 className={styles.deposit__title}>Пополнить счёт</h1>
          <label htmlFor="deposit" className={styles.deposit__label}>
            Введите сумму пополнения *
          </label>
          <input
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              if (e.target.value.replace(/[^0-9,\s]/g, "") !== "") {
                setIsCorrect(true);
                setAmount(e.target.value.replace(/[^0-9,\s]/g, ""));
              } else {
                setAmount("");
                setIsCorrect(false);
              }
            }}
            placeholder={`${
              User.currency === "EUR" || User.currency === "USD"
                ? "10-300"
                : "200-3000"
            } ${User.currency}`}
            className={styles.deposit__input}
            id="deposit"
            required
          />
          {!isCorrect && (
            <div className={styles.label__error}>
              Неверно задана сумма пополнения
            </div>
          )}
          {status == "authenticated" &&
            (isCorrect ? (
              <a
                href={`https://g-24.pro/wid/c2w/?lang=ru&callbackUrl=https:%2F%2Fcasino-navy.vercel.app/api/payments/success&cardAmount=${
                  amount * 100
                }&quittanceDest=${session.user.email}&email=${
                  session.user.email
                }&walletId=35365381359940&blocked=1&type=w2w`}
                className={styles.pay__link}
              >
                Пополнить {amount} {User.currency}
              </a>
            ) : (
              <div className={styles.pay__link} style={{ opacity: 0.6 }}>
                Пополнить {amount} {User.currency}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Deposit;
