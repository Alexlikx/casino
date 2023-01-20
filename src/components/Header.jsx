import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import logo from "../../public/logo.svg";
import styles from "../../styles/Header.module.scss";
import { useSession, signOut } from "next-auth/react";
import cancelIcon from "../../public/cancel-icon.svg";
import iconBurger1 from "../../public/icon-for-burger-1.svg";
import purse from "../../public/purse.svg";
import chest from "../../public/chest.svg";
import exit from "../../public/exit.svg";
import person from "../../public/person.svg";
import DropDown from "./DropDown";
import DropDown2 from "./DropDown2";
import DropDown3 from "./DropDown3";

const Header = () => {
  const [User, setUser] = useState({});

  function CloseMenu() {
    const elem = document.getElementById("menu__toggle");
    elem.checked = false;
  }

  function CloseMenuProfile() {
    const elem = document.getElementById("menu__toggle_profile");
    elem.checked = false;
  }

  const signout = () => {
    signOut();
  };

  const { status, data: session } = useSession();

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

  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.header__nav}>
          <div className={styles.left__section}>
            <div className={styles.burger}>
              <div className="hamburger-menu">
                <input id="menu__toggle" type="checkbox" />
                <label
                  className="menu__btn"
                  htmlFor="menu__toggle"
                  onClick={() => {
                    const elem = document.getElementById(
                      "menu__toggle_profile"
                    );
                    if (elem) {
                      elem.checked = false;
                    }
                  }}
                >
                  <span></span>
                </label>

                <ul className="menu__box">
                  <div className={styles.burger__header}>
                    <p>Меню</p>
                    <p>
                      <Image src={cancelIcon} alt="logo" onClick={CloseMenu} />
                    </p>
                  </div>
                  <Link
                    href="/"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Image
                      src={logo}
                      alt="logo"
                      className={styles.burger__img}
                      width={100}
                    />
                  </Link>
                  {status === "unauthenticated" ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                        paddingBottom: "30px",
                        paddingTop: "20px",
                      }}
                    >
                      <Link href="/login" className={styles.login__btn}>
                        ВХОД
                      </Link>
                      <Link
                        href="/registration"
                        className={styles.registration__btn}
                      >
                        РЕГИСТРАЦИЯ
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}
                  <li className="menu__item">
                    <Link
                      href="/#slots"
                      className={`${styles.header__link__burger}`}
                      onClick={CloseMenu}
                    >
                      <Image src={iconBurger1} alt="" width={20} height={20} />
                      Слоты
                    </Link>
                  </li>
                  <li className="menu__item">
                    <Link
                      href="/deposit"
                      className={`${styles.header__link__burger}`}
                      onClick={CloseMenu}
                    >
                      <Image src={purse} alt="" width={20} height={20} />
                      Пополнение
                    </Link>
                  </li>
                  <li className="menu__item">
                    <Link
                      href="/bonuses"
                      className={`${styles.header__link__burger}`}
                      onClick={CloseMenu}
                    >
                      <Image src={chest} alt="" width={20} height={20} />
                      Бонусы
                    </Link>
                  </li>
                  <p className={styles.copyrighting}>
                    @Copyrighting Golden Slots 2016-2023
                  </p>
                </ul>
              </div>
            </div>
            <Link href="/">
              <Image src={logo} alt="logo" className={styles.header__logo} />
            </Link>
            <div className={styles.nav__links}>
              <Link href="/#slots" className={styles.header__link}>
                Слоты
              </Link>
              <Link href="/deposit" className={styles.header__link}>
                Пополнить
              </Link>
              <Link href="/bonuses" className={styles.header__link}>
                Бонусы
              </Link>
            </div>
            {status === "authenticated" ? (
              <div className={styles.header__user_auth}>
                <Link className={styles.header__user_dep} href="/deposit">
                  Пополнить
                </Link>

                <div></div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className={styles.right__section}>
            {status === "authenticated" ? (
              <div className={styles.header__user}>
                <span className={styles.header__user_balance}>
                  Баланс:{" "}
                  <b>
                    {parseInt(User.balance) / 100}
                    {User.currency === "EUR"
                      ? "€"
                      : User.currency === "UAH"
                      ? "₴"
                      : User.currency === "RUB"
                      ? "₽"
                      : "$"}
                  </b>
                </span>
                <div className="hamburger-menu">
                  <input
                    id="menu__toggle_profile"
                    type="checkbox"
                    style={{ opacity: 0 }}
                  />
                  <label
                    className="menu__btn"
                    htmlFor="menu__toggle_profile"
                    onClick={() => {
                      const elem = document.getElementById("menu__toggle");
                      elem.checked = false;
                    }}
                  >
                    <div className={styles.person__link}>
                      <Image src={person} alt="" />
                    </div>
                  </label>

                  <ul className="menu__box_profile" style={{ zIndex: 30 }}>
                    <div className={styles.burger__header}>
                      <p>Профиль</p>
                      <p>
                        <Image
                          src={cancelIcon}
                          alt="logo"
                          onClick={CloseMenuProfile}
                        />
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                        paddingBottom: "30px",
                        paddingTop: "0px",
                      }}
                    >
                      {status === "unauthenticated" ? (
                        <>
                          <Link href="/login" className={styles.login__btn}>
                            ВХОД
                          </Link>
                          <Link
                            href="/registration"
                            className={styles.registration__btn}
                          >
                            РЕГИСТРАЦИЯ
                          </Link>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    <li className={styles.person__header}>
                      <p className={styles.person__menu__email}>
                        <div>
                          <Image src={person} alt="" />
                        </div>{" "}
                        <b>{session.user.email}</b>
                      </p>
                      <div
                        onClick={() => signOut()}
                        style={{ cursor: "pointer" }}
                      >
                        <Image src={exit} alt="Выйти" />
                      </div>
                    </li>
                    <li className={styles.burger__balance}>
                      <div>
                        <span>Баланс: </span>
                        <b>
                          {Math.floor(User.balance) / 100}
                          {User.currency === "EUR"
                            ? "€"
                            : User.currency === "UAH"
                            ? "₴"
                            : User.currency === "RUB"
                            ? "₽"
                            : "$"}
                        </b>
                      </div>
                    </li>
                    <li className={styles.profile__link_wrapper}>
                      <Link
                        href="/deposit"
                        className={`${styles.profile__depo}`}
                        onClick={CloseMenuProfile}
                      >
                        Пополнить
                      </Link>
                    </li>
                    <li className={styles.profile__link_wrapper_without_top}>
                      <Link
                        href="/bonuses"
                        className={`${styles.profile__bonuses_link}`}
                        onClick={CloseMenuProfile}
                      >
                        Бонусы
                      </Link>
                    </li>
                    <li
                      className={styles.profile__link_wrapper_without_top}
                      style={{
                        zIndex: 4,
                        position: "relative",
                      }}
                    >
                      <DropDown />
                    </li>
                    <li
                      className={styles.profile__link_wrapper_without_top}
                      style={{
                        marginTop: "-10px",
                        zIndex: 2,
                        position: "relative",
                      }}
                    >
                      <DropDown2 />
                    </li>
                    <li
                      className={styles.profile__link_wrapper_without_top}
                      style={{
                        marginTop: "-10px",
                        zIndex: 1,
                        position: "relative",
                      }}
                    >
                      <DropDown3 />
                    </li>
                    <li>
                      <div
                        onClick={() => signout()}
                        className={styles.signOut__btn}
                      >
                        Выйти
                      </div>
                    </li>
                    <p className={styles.copyrighting}>
                      @Copyrighting Golden Slots 2016-2023
                    </p>
                  </ul>
                </div>
              </div>
            ) : (
              <>
                <div className={styles.unauth_header_div}>
                  <Link href="/login" className={styles.login__btn}>
                    ВХОД
                  </Link>
                  <Link
                    href="/registration"
                    className={styles.registration__btn}
                  >
                    РЕГИСТРАЦИЯ
                  </Link>
                </div>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
