"use client";
import { useState, useEffect } from "react";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const login = async () => {
    if (!username) {
      setError("ユーザ名を入力してください");
      return;
    }

    if (!password) {
      setError("パスワードを入力してください");
      return;
    }
    try {
      const res = await fetch("/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (res.status === 200) {
        sessionStorage.setItem("username", username);
        window.location.href = "/";
      } else {
        setError("ログインに失敗しました");
      }
    } catch (e) {
      setError("ログインに失敗しました");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 font-Noto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // login()という関数を呼び出してみましょう！
        }}
        className="flex flex-col items-center gap-4"
        id="login-form"
      >
        <input
          type="text"
          placeholder="ユーザーネーム"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-80"
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-80"
        />
      </form>
      <button
        type="submit"
        form="login-form"
        className="p-2 px-6 bg-primary-default hover:bg-primary-dark text-2xl text-white rounded-full mt-4 font-semibold"
      >
        ログイン
      </button>
      <p className="text-black p-2 rounded-lg">{error}</p>
    </div>
  );
}
