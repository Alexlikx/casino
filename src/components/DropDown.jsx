import React, { useState } from "react";
import styles from "../../styles/DropDown.module.scss";
import Image from "next/image";
import arrow from "../../public/arrow-white.svg";
import Link from "next/link";

const DropDown = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div style={{ width: "100%", margin: "10px auto" }}>
      <div className={`${styles.dropdown} `}>
        <button
          onClick={() => setIsActive((prev) => !prev)}
          className={`${styles.dropbtn}  ${isActive ? styles.active__top : ""}`}
        >
          <span>Счёт</span>
          <Image
            src={arrow}
            alt=""
            className={`${
              isActive ? styles.arrow_active : styles.not_active_arrow
            }`}
          />
        </button>
        <div
          id="myDropdown"
          className={`${styles.dropdown_content} ${
            isActive ? styles.show : ""
          }`}
        >
          <Link href="/deposit">Депозит</Link>
          <Link href="/withdraw">Вывод средств</Link>
          <Link href="/history">История транзакций</Link>
        </div>
      </div>
    </div>
  );
};

export default DropDown;
