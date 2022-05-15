import { client } from 'client';
import React, { useState } from 'react';

import styles from './LoginForm.module.scss';

/* TODO: 재사용 필요할 경우 별도 컴포넌트 분리 */
function MessageBox({ message, status }) {
  return <p className={status} dangerouslySetInnerHTML={{ __html: message }}></p>;
}

/**
 * 
 * @returns {React.ReactElement} LoginForm Component.
 */
export default function LoginForm() {
  const { useLogin } = client.auth;
  const [usernameEmail, setUserNameEmail] = useState('');
  const [password, setPassword] = useState('');


  const { login, isLoading, data, error } = useLogin();

  const errorMessage = data?.error || error?.message;

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <form
    className={styles.form}
    onSubmit={(e) => {
      e.preventDefault();

      login(usernameEmail, password);
    }}
  >
    <div>
      <div>
        <label htmlFor='usernameEmail'>Username or Email</label>
      </div>
      <div>
        <input
          className={styles[`input-field`]}
          type='text'
          value={usernameEmail}
          onChange={(e) => setUserNameEmail(e.target.value)}
          id='usernameEmail'
        />
      </div>

      <div>
        <label htmlFor='password'>Password</label>
      </div>
      <div>
        <input
          className={styles[`input-field`]}
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id='password'
        />
      </div>

      <div>
        <button className={styles[`btn-submit`]}
          type='submit'>Login</button>
      </div>
    </div>

    {errorMessage && <MessageBox message={errorMessage} status="error"></MessageBox>}
  </form>
}