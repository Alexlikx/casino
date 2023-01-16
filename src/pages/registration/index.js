import React, { useState } from 'react';
import Header from '../../components/Header';
import styles from '../../../styles/Registration.module.scss'
import { useForm } from 'react-hook-form';
import error from '../../../public/error.svg'
import Image from 'next/image';

const Registration = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const email = data.Email;
        const password = data.Password;
        const phoneNumber = data.Tel;
        const currency = data.Currency;

        const post = await fetch(`http://localhost:3000/api/user/registration`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password, phoneNumber: phoneNumber, currency: currency })
        })
        console.log(post);
    };


    return (
        <>
            <Header />
            <div className={styles.form__wrapper}>
                <form action="/send-data-here" method="post" className={styles.registration__form} onSubmit={handleSubmit(onSubmit)}>
                    <h1 className={styles.registration__title}>Регистрация</h1>
                    <label for="email" className={styles.registration__label}>Эл. адрес *</label>
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
                    <label for="tel" className={styles.registration__label}>Номер телефона *</label>
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
                    <label for="password" className={styles.registration__label}>Пароль *</label>
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
                            <label for="currency" className={styles.registration__label}>Валюта *</label>
                            <select id="currency" name="currency" className={styles.registration__input} {...register("Currency", {
                            })} defaultValue='EUR'>
                                <option value="EUR">EUR</option>
                                <option value="USD">USD</option>
                                <option value="RUB">RUB</option>
                                <option value="UAH">UAH</option>
                            </select>
                        </div>
                    </div>
                    <button className={styles.registration__btn}>Submit</button>
                </form>
            </div>
        </>
    );
}

export default Registration;
