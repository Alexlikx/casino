import React from "react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import SuccessIcon from "../../../public/success.svg";
import Image from "next/image";
import Link from "next/link";

const Amount = () => {
  const params = useRouter();

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
      <div
        onClick={() => CloseMenu()}
        style={{
          width: "100vw",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#0e4609",
          textAlign: "center",
        }}
      >
        <Image
          src={SuccessIcon}
          alt="Успешное пополнение"
          width={80}
          height={80}
          style={{ marginBottom: "20px" }}
        />
        <h1 style={{ marginBottom: "10px" }}>Успешное пополнение</h1>
        <h2>
          Вы пополнили свой счёт на {params.query.amount}{" "}
          {params.query.currency}
        </h2>
        <Link
          href="/"
          style={{
            marginTop: "15px",
            color: "#fff",
            fontSize: "20px",
            textDecoration: "underline",
          }}
        >
          На главную
        </Link>
      </div>
    </>
  );
};

export default Amount;
