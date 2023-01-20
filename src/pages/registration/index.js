import React, { useState } from 'react';
import Header from '../../components/Header';
import styles from '../../../styles/Registration.module.scss'
import { useForm } from 'react-hook-form';
import error from '../../../public/error.svg'
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import tip from '../../../public/check.svg'

const Registration = () => {

    const [Tip, setTip] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors },
    } = useForm();

    const router = useRouter();

    const onSubmit = async (data) => {
        const email = data.Email;
        const password = data.Password;
        const phoneNumber = data.Tel;
        const currency = data.Currency;

        const post = await fetch(`/api/user/registration`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password, phoneNumber: phoneNumber, currency: currency })
        })
        if (post.status === 200) {
            router.push('/login')
        } else if (post.status === 400) {
            let message = await post.json()
            if (message.tel) {
                setError("Tel", { type: "string", message: message.tel });
            } else if (message.email) {
                setError("Email", { type: "string", message: message.email });
            }
        }
    };
    return (
        <>
            <Header />
            <div className={styles.form__wrapper}>
                <form action="/send-data-here" method="post" className={styles.registration__form} onSubmit={handleSubmit(onSubmit)}>
                    <h1 className={styles.registration__title}>Регистрация</h1>
                    <label htmlFor="email" className={styles.registration__label}>Эл. адрес *</label>
                    <input type="email" id="email" name="email" className={styles.registration__input} {...register("Email", {
                        required: "Это обязательное поле",
                        minLength: {
                            value: 4,
                            message: "Некоректная почта",
                        },
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Некоректная почта",
                        },
                    })} />
                    {errors.Email ? (
                        <div className={styles.registration__error_block}>
                            <Image src={error} alt="error" />
                            {errors?.Email && (
                                <p>{errors?.Email?.message || "Error"}</p>
                            )}
                        </div>
                    ) : (
                        ""
                    )}
                    <label htmlFor="tel" className={styles.registration__label}>Номер телефона *</label>
                    <input type="tel" id="tel" name="tel" className={styles.registration__input} {...register("Tel", {
                        required: "Это обязательное поле",
                        minLength: {
                            value: 8,
                            message: "Некоректный номер",
                        },
                        pattern: {
                            value: /^\d+$/,
                            message: "Некоректный номер",
                        },
                    })} placeholder='357325933' />
                    {errors.Tel ? (
                        <div className={styles.registration__error_block}>
                            <Image src={error} alt="error" />
                            {errors?.Tel && (
                                <p>{errors?.Tel?.message || "Error"}</p>
                            )}
                        </div>
                    ) : (
                        ""
                    )}
                    <label htmlFor="password" className={styles.registration__label}>Пароль *</label>
                    <input type="password" id="password" name="password" className={styles.registration__input} {...register("Password", {
                        required: "Это обязательное поле",
                        minLength: {
                            value: 6,
                            message: "Пароль недостаточно надёжен",
                        },
                    })} placeholder='***********' />
                    {errors.Password ? (
                        <div className={styles.registration__error_block}>
                            <Image src={error} alt="error" />
                            {errors?.Password && (
                                <p>{errors?.Password?.message || "Error"}</p>
                            )}
                        </div>
                    ) : (
                        ""
                    )}
                    <div>
                        <div className={styles.registration__currency_block}>
                            <label htmlFor="currency" className={styles.registration__label}>Валюта *</label>
                            <select id="currency" name="currency" className={styles.registration__input} {...register("Currency", {
                            })} defaultValue='EUR'>
                                <option value="EUR">EUR</option>
                                <option value="USD">USD</option>
                                <option value="RUB">RUB</option>
                                <option value="UAH">UAH</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.registration__checkbox}>
                        <label className="form-control">
                            <input {...{
                                required: true
                            }} type='checkbox'
                                id="field-sun" className={styles.registration__checkbox_checkbox} name="checkbox" onChange={() => setTip(prev => !prev)} />
                            {Tip && <Image src={tip} alt='' className='checkbox__img' />}
                        </label>
                        <span className={styles.registration__checkbox_title}>Я согласен с <Link href="/rules" className={styles.registration__checkbox_link}>
                            Условиями и приложениями
                        </Link> и я подтверждаю, что мне есть 18 лет</span>
                    </div>
                    {errors.Checkbox ? (
                        <div className={styles.registration__error_block}>
                            <Image src={error} alt="error" />
                            {errors?.Checkbox && (
                                <p>Вы должны согласиться с условиями, а также подтверждаете, что вам исполнилось 18 лет</p>
                            )}
                        </div>
                    ) : (
                        ""
                    )}
                    <button className={styles.registration__btn}>Зарегистрироваться</button>
                    <div
                        style={{
                            margin: "10px auto",
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            textAlign: "center",
                        }}
                    >
                        <span>Есть аккаунт?</span>
                        <Link
                            href="/login"
                            style={{
                                marginTop: "15px",
                                textDecoration: "underline",
                                color: "#FFC400",
                            }}
                        >
                            Войти
                        </Link>
                    </div>
                </form>
            </div >
        </>
    );
}

export default Registration;
