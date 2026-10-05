import Link from "next/link";
import { AuthCard } from "../../components/auth/auth-card";
import { AuthForm } from "../../components/auth/auth-form";

export default function LoginPage() {
  return (
    <AuthCard
      description="Sign in to your Noctra account."
      footer={
        <>
          New to Noctra? <Link href="/register">Create an account</Link>
        </>
      }
      title="Welcome back"
    >
      <AuthForm mode="login" />
    </AuthCard>
  );
}
