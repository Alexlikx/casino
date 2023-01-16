import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../public/logo.svg";
import styles from "../../styles/Header.module.scss";
import cancelIcon from "../../public/cancel-icon.svg";
import iconBurger1 from "../../public/icon-for-burger-1.svg";
import purse from "../../public/purse.svg";
import chest from "../../public/chest.svg";
import person from "../../public/person.svg";

const Header = () => {
  function CloseMenu() {
    const elem = document.getElementById("menu__toggle");
    elem.checked = false;
  }

  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.header__nav}>
          <div className={styles.left__section}>
            <div className={styles.burger}>
              <div className="hamburger-menu">
                <input id="menu__toggle" type="checkbox" />
                <label className="menu__btn" htmlFor="menu__toggle">
                  <span></span>
                </label>

                <ul className="menu__box">
                  <div className={styles.burger__header}>
                    <p>Меню</p>
                    <p>
                      <Image src={cancelIcon} alt="logo" onClick={CloseMenu} />
                    </p>
                  </div>
                  <Link href="/">
                    <Image
                      src={logo}
                      alt="logo"
                      className={styles.burger__img}
                    />
                  </Link>
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
                  <li className="menu__item">
                    <Link
                      href="/"
                      className={`${styles.header__link__burger}`}
                      onClick={CloseMenu}
                    >
                      <Image src={iconBurger1} alt="" width={20} height={20} />
                      Слоты
                    </Link>
                  </li>
                  <li className="menu__item">
                    <Link
                      href="/"
                      className={`${styles.header__link__burger}`}
                      onClick={CloseMenu}
                    >
                      <Image src={purse} alt="" width={20} height={20} />
                      Пополнение
                    </Link>
                  </li>
                  <li className="menu__item">
                    <Link
                      href="/"
                      className={`${styles.header__link__burger}`}
                      onClick={CloseMenu}
                    >
                      <Image src={chest} alt="" width={20} height={20} />
                      Бонусы
                    </Link>
                  </li>
                  <li className="menu__item">
                    <Link
                      href="/"
                      className={`${styles.header__link__burger}`}
                      onClick={CloseMenu}
                    >
                      <Image src={person} alt="" width={20} height={20} />
                      Личный кабинет
                    </Link>
                  </li>
                  <p className={styles.copyrighting}>@Copyrighting Golden Slots 2016-2023</p>
                </ul>
              </div>
            </div>
            <Link href="/">
              <Image src={logo} alt="logo" />
            </Link>
            <div className={styles.nav__links}>
              <Link href="/" className={styles.header__link}>
                Слоты
              </Link>
              <Link href="/" className={styles.header__link}>
                Пополнение
              </Link>
              <Link href="/" className={styles.header__link}>
                Бонусы
              </Link>
              <Link href="/" className={styles.header__link}>
                Личный кабинет
              </Link>
            </div>
          </div>
          <div className={styles.right__section}>
            <Link href="/login" className={styles.login__btn}>
              ВХОД
            </Link>
            <Link href="/registration" className={styles.registration__btn}>
              РЕГИСТРАЦИЯ
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
