import Link from "next/link";
import { AuthCard } from "../../components/auth/auth-card";
import { AuthForm } from "../../components/auth/auth-form";

export default function RegisterPage() {
  return (
    <AuthCard
      description="Join an open community, or start your own."
      footer={
        <>
          Already have an account? <Link href="/login">Sign in</Link>
        </>
      }
      title="Create your account"
    >
      <AuthForm mode="register" />
    </AuthCard>
  );
}
