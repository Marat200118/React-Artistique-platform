import { authenticate } from '../../services/auth';
import formstyles from '../../styles/forms.module.css';
import ErrorField from '../../components/ErrorField';
import { Form, redirect, useLocation, useNavigation, useActionData } from 'react-router-dom';

const action = async ({ request }) => {
  const formData = await request.formData();
  const { email, password } = Object.fromEntries(formData);

  if (!email) {
    return {
      error: { email: "You must provide a email to log in" },
    };
  }

  if (!password) {
    return {
      error: { password: "You must provide a password to log in" },
    };
  }

  try {
    await authenticate(email, password);
  } catch (error) {
    return {
      error: { general: error.message },
    };
  }

  let redirectTo = formData.get("redirectTo");
  return redirect(redirectTo || "/");
};


const Login = () => {
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let from = params.get("from") || "/";

  let navigation = useNavigation();
  let isLoggingIn = navigation.formData?.get("email") != null;

  let actionData = useActionData();
  return (
    <section className={formstyles.loginSection}>
      <hgroup className={formstyles.header}>
        <h2>Welcome<br></br> Back!</h2>
        <p>Get access to all the features</p>
      </hgroup>
      <Form method="post" className={formstyles.formBlock}>
        <input type="hidden" name="redirectTo" value={from} />
        <div className={formstyles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="e-mail"
            autoComplete="email"
            defaultValue="marat.samigullin1@gmail.com"
          />
          <ErrorField data={actionData} field="email" />
        </div>
        <div className={formstyles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            autoComplete="current-password"
            defaultValue="iammarats"
          />
          <ErrorField data={actionData} field="password" />
        </div>
        <div className={formstyles.formGroup}>
          <button
            type="submit"
            disabled={isLoggingIn}
            className={actionData && actionData.error ? formstyles.shake : null}
          >
            {isLoggingIn ? "Logging in..." : "Login"}
          </button>
          <ErrorField data={actionData} field="general" />
        </div>
      </Form>
    </section>
  );
};


Login.action = action;

export default Login