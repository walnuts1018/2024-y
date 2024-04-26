"use client";

import Link from "next/link";

export function LoginButton() {
  const username = sessionStorage.getItem("username");
  return (
    <>
      {username == null ? (
        <Link
          href="/login"
          className="p-2 rounded-full shadow-lg px-8 text-2xl font-bold bg-primary-default hover:bg-primary-dark text-white"
        >
          ログインする
        </Link>
      ) : (
        <div className="flex gap-4 justify-center items-center rounded-full p-2 px-6 border-2 border-primary-default">
          <p className="text-2xl font-bold text-primary-default">
            User: {username}
          </p>
        </div>
      )}
    </>
  );
}
