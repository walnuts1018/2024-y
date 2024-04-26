import { LoginForm } from "./registerform";

export default function RegisterPage() {
  return (
    <main className="flex justify-center items-center h-screen">
      <LoginForm />
      <a
        className="p-2 rounded-full shadow-lg px-8 bg-white hover:bg-gray-100"
        href="/login"
      >
        ユーザー登録済みの方はこちら
      </a>
    </main>
  );
}
