import { LoginForm } from "./loginform";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="p-12 flex justify-center items-center h-screen bg-gray-100">
      <div className="flex flex-col gap-4 justify-center items-center h-5/6 w-1/3 border-0 rounded-2xl shadow-md bg-white">
        <Image src="/logo.png" width={100} height={100} alt="Y" />
        <div className="flex flex-col gap-4 mt-16">
          <LoginForm />
          <a
            className="p-2 rounded-full shadow-lg px-8 text-xl bg-white hover:bg-gray-100 text-primary-default font-bold border-2 border-primary-default"
            href="/register"
          >
            ユーザー登録がまだの方はこちら
          </a>
        </div>
      </div>
    </main>
  );
}
