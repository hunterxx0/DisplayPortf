import React, { useState } from 'react';
import PostSignupOrLogin from '../../apis/PostSignupOrLogin';
import SignUp from '../../assets/signUp.avif';
import SignIn from '../../assets/singnIn.avif';
import saveUserCookies from '../../Utils/saveUserCookies';
import Login from './FormContents/LoginContents';
import RegisterSeller from './FormContents/RegisterSellerFormContents';
import RegisterUser from './FormContents/RegisterUserFormContents';

const Auth = ({ showProfileDraw }) => {
  const [form, setForm] = useState({});
  const [mode, setMode] = useState('login');
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const user = await PostSignupOrLogin(form, mode);
      user && saveUserCookies(user);
      if (error) setIsError(false);
      window.location.reload();
    } catch (err) {
      setIsError(true);
      if (err?.response?.status === 403)
        setError("your account has been banned! :'(");
      else if (err?.response?.status === 401) {
        setError('wrong username/password!');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = (newMode = '') => {
    if (newMode.length) {
      setMode('signupSeller');
    } else setMode(mode === 'signup' ? 'login' : 'signup');
  };

  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          {mode === 'signup' && <p>Sign Up</p>}
          {mode === 'login' && <p>Sign In</p>}
          {mode === 'signupSeller' && <p>Sign Up as Seller</p>}
          <form onSubmit={handleSubmit} className="grid grid-cols-2">
            {mode === 'signupSeller' && (
              <RegisterSeller handleChange={handleChange} />
            )}
            {mode === 'signup' && <RegisterUser handleChange={handleChange} />}
            {mode === 'login' && <Login handleChange={handleChange} />}

            <div className="auth__form-container_fields-content_button">
              <button>
                {!isLoading ? (
                  mode === 'login' ? (
                    'Login'
                  ) : (
                    'Register'
                  )
                ) : (
                  <p className="!text-sm !text-white">loading...</p>
                )}
              </button>
            </div>
          </form>
          <div className="auth__form-container_fields-account flex flex-col gap-x-2">
            <p className="flex gap-x-2">
              {mode === 'signup' && 'Already have an account?'}
              {mode === 'login' && "Don't have an account?"}
              <span onClick={switchMode}>
                {mode === 'signup' ? 'login' : 'signup'}
              </span>
            </p>
            {mode !== 'signupSeller' && (
              <span
                className="pb-2 !text-sm"
                onClick={() => switchMode('signupSeller')}
              >
                signup as a seller
              </span>
            )}
          </div>
          {isError ? (
            <p className="text-center !font-sans !text-sm !text-red-600">
              {error}
            </p>
          ) : null}
        </div>
      </div>
      <div className="auth__form-container_image">
        <img src={mode === 'signup' ? SignUp : SignIn} alt="" />
      </div>
    </div>
  );
};

export default Auth;
