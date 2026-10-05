"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "../ui/icon";
import { TextInput } from "../ui/text-input";
import { Button } from "../ui/button";

type AuthFormProps = { mode: "login" | "register" };

export function AuthForm({ mode }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState("");
  const register = mode === "register";

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("Authentication is not connected in this prototype.");
  }

  return (
    <form className="auth-form" onSubmit={submit}>
      {register && (
        <TextInput
          autoComplete="username"
          icon={<Icon name="user" />}
          label="Username"
          maxLength={32}
          minLength={3}
          name="username"
          placeholder="Your username"
          required
        />
      )}
      <TextInput
        autoComplete="email"
        icon={<Icon name="mail" />}
        label="Email"
        name="email"
        placeholder="you@example.com"
        required
        type="email"
      />
      <TextInput
        autoComplete={register ? "new-password" : "current-password"}
        icon={<Icon name="lock" />}
        label="Password"
        minLength={8}
        name="password"
        placeholder={register ? "At least 8 characters" : "Your password"}
        required
        trailing={
          <button
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="password-toggle"
            onClick={() => setShowPassword((current) => !current)}
            title={showPassword ? "Hide password" : "Show password"}
            type="button"
          >
            <Icon name={showPassword ? "eye-off" : "eye"} />
          </button>
        }
        type={showPassword ? "text" : "password"}
      />
      {!register && (
        <div className="forgot-row">
          <a href="#forgot-password">Forgot password?</a>
        </div>
      )}
      <Button className="auth-submit" type="submit" variant="primary">
        {register ? "Create account" : "Sign in"}
        <Icon name="arrow-right" />
      </Button>
      {notice && (
        <p aria-live="polite" className="form-notice">
          {notice}
        </p>
      )}
      <div aria-hidden="true" className="auth-divider">
        <span>OR</span>
      </div>
      <Button
        className="github-button"
        onClick={() => setNotice("GitHub sign-in will be available in a later phase.")}
        type="button"
      >
        <Icon name="github" />
        Continue with GitHub
      </Button>
    </form>
  );
}
