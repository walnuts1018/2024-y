"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const LoginButton = () => {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <>
      {isLoginPage ? (
        <div />
      ) : (
        <Link
          href="/login"
          className="bg-primary-default hover:bg-primary-dark rounded-full  text-white px-4 py-1 border-primary-default border-2 hover:border-primary-dark font-Noto font-semibold text-xl"
          style={{ marginRight: 10 }}
        >
          ログイン / 新規登録
        </Link>
      )}
    </>
  );
};
