import { client } from 'client';
import React, { useState } from 'react';

import styles from './LoginForm.module.scss';

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
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id='password'
        />
      </div>

      <div>
        <button type='submit'>Login</button>
      </div>
    </div>

    {errorMessage ? <p>Error: {errorMessage}</p> : null}
  </form>
}