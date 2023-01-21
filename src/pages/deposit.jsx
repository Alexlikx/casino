import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import GooglePayButton from "@google-pay/button-react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import styles from "../../styles/Deposit.module.scss";

const Deposit = () => {
  const router = useRouter();

  const [User, setUser] = useState({});
  const [amount, setAmount] = useState();

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
            onChange={(e) => setAmount(e.target.value)}
            placeholder={`${
              User.currency === "EUR" || User.currency === "USD"
                ? "10-800"
                : "400-10000"
            } ${User.currency}`}
            className={styles.deposit__input}
            id="deposit"
            required
          />
          <GooglePayButton
            environment="TEST"
            paymentRequest={{
              apiVersion: 2,
              apiVersionMinor: 0,
              allowedPaymentMethods: [
                {
                  type: "CARD",
                  parameters: {
                    allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                    allowedCardNetworks: ["MASTERCARD", "VISA"],
                  },
                  tokenizationSpecification: {
                    type: "PAYMENT_GATEWAY",
                    parameters: {
                      gateway: "example",
                      gatewayMerchantId: "exampleGatewayMerchantId",
                    },
                  },
                },
              ],
              merchantInfo: {
                merchantId: "12345678901234567890",
                merchantName: "Golden Slots",
              },
              transactionInfo: {
                totalPriceStatus: "ESTIMATED",
                totalPriceLabel: "Total",
                totalPrice: "100",
                currencyCode: "UAH",
                countryCode: "UA",
              },
            }}
            onLoadPaymentData={(paymentRequest) => {
              router.push(
                `/success?amount=${amount}&currency=${User.currency}`
              );
            }}
            style={{ margin: "0 auto" }}
            buttonType="short"
          />
        </div>
      </div>
    </>
  );
};

export default Deposit;
