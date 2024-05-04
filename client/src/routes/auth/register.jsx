import {
  Form,
  redirect,
  useActionData,
  useLocation,
  useNavigation,
} from "react-router-dom";
import ErrorField from "../../components/ErrorField";
import { register } from "../../services/auth";
import formstyles from "../../styles/forms.module.css";

const action = async ({ request }) => {
  const formData = await request.formData();
  const { email, password, username, picture } = Object.fromEntries(formData);

  if (!username) {
    return {
      error: { username: "You must provide a username" },
    };
  }

  if (!email) {
    return {
      error: { email: "You must provide a email to sign up" },
    };
  }

  if (!password) {
    return {
      error: { password: "You must provide a password" },
    };
  }

  try {
    await register(username, password, email, picture);
  } catch (error) {
    return {
      error: { general: error.message },
    };
  }

  let redirectTo = formData.get("redirectTo") | null;
  return redirect(redirectTo || "/");
};

const Register = () => {
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let from = params.get("from") || "/";

  let navigation = useNavigation();
  let isLoggingIn = navigation.formData?.get("email") != null;

  let actionData = useActionData();

  return (
    <section className={formstyles.loginSection}>
      <hgroup className={formstyles.header}>
        <h2>Hello!<br></br>Register now</h2>
        <p>Get access to all the features</p>
      </hgroup>
      <Form method="post" className={formstyles.formBlock} encType="multipart/form-data">
        <input type="hidden" name="redirectTo" value={from} />
        <div className={formstyles.formGroup}>
          <label htmlFor="email">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Your username"
            autoComplete="username"
          />
          <ErrorField data={actionData} field="username" />
        </div>
        <div className={formstyles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your e-mail"
            autoComplete="email"
          />
          <ErrorField data={actionData} field="email" />
        </div>
        <div className={formstyles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your password"
            autoComplete="current-password"
          />
          <ErrorField data={actionData} field="password" />
        </div>
        <div className={formstyles.formGroup}>
          <label htmlFor="picture">Profile Picture</label>
          <input
            type="file"
            name="picture"
            id="picture"
            accept="image/*"
          />
          <ErrorField data={actionData} field="picture" />
        </div>
        <div className={formstyles.formGroup}>
          <ErrorField data={actionData} field="general" />
          <button
            type="submit"
            disabled={isLoggingIn}
            className={actionData && actionData.error ? style.shake : null}
          >
            {isLoggingIn ? "Sending..." : "Sign up"}
          </button>
        </div>
        <p className={formstyles.alreadyHave}>
          Already have an account? Then <a href="/auth/login">login</a>
        </p>
      </Form>
    </section>
  );
};

Register.action = action;

export default Register;
