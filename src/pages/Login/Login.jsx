import React from 'react';
import { useLocation } from 'wouter';
import { useForm } from 'react-hook-form';
import { useTranslation } from "react-i18next";
import './login.scss';

export const Login = () => {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const [location, navigate] = useLocation();
  const { t } = useTranslation();

  function submitForm(data) {
    console.log(data);
    navigate("/dashboard");
  }
  
  return (
    <>
      <div className='login'>
        <h1>{t('login.title')}</h1>

        <form onSubmit={handleSubmit(submitForm)}>
          <input {...register('username', {required: false})} type="text" placeholder={t('login.username')}/>
          {errors.username && <small>* {t("common.form.required")}</small>}
    
          <input {...register('password', {required: false})} type="password" placeholder={t('login.password')}/>
          {errors.password && <small>* {t("common.form.required")}</small>}

          <input type="submit" value={t('login.action')} />
        </form>
      </div>
    </>
  )
}
