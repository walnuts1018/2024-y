import { LoginForm } from "./loginform";

export default function LoginPage() {
  return (
    <main className="flex justify-center items-center h-screen">
      <LoginForm />
      <a
        className="p-2 rounded-full shadow-lg px-8 bg-white hover:bg-gray-100"
        href="/register"
      >
        ユーザー登録がまだの方はこちら
      </a>
    </main>
  );
}
