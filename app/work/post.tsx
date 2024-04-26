"use client";
import Modal from "react-modal";
import { use, useState } from "react";

export default function PostButton() {
  const [tweetWindowIsOpen, setTweetWindowIsOpen] = useState(false);

  const username = sessionStorage.getItem("username");

  const [content, setContent] = useState("");

  Modal.setAppElement("body");
  return (
    <>
      <button
        type="button"
        className="p-2 rounded-full shadow-lg px-8 text-2xl font-bold bg-primary-default hover:bg-primary-dark text-white"
        onClick={() => setTweetWindowIsOpen(true)}
      >
        投稿する
      </button>
      <Modal
        isOpen={tweetWindowIsOpen}
        className="flex justify-center items-center t-0 l-0 w-full h-full relative"
      >
        <button
          type="button"
          className="p-2 px-6 bg-white hover:bg-gray-100 text-2xl text-primary-default rounded-full font-semibold absolute top-4 right-4"
          onClick={() => setTweetWindowIsOpen(false)}
        >
          閉じる
        </button>

        <input
          type="text"
          placeholder="内容"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-80"
        />

        <button
          type="submit"
          className="p-2 px-6 bg-primary-default hover:bg-primary-dark text-2xl text-white rounded-full mt-4 font-semibold"
          onClick={async () => {
            const res = await fetch("/api/v1/post/create", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ content, username }),
            });
            if (res.status === 200) {
              setTweetWindowIsOpen(false);
            } else {
              console.error("投稿に失敗しました");
            }
          }}
        >
          投稿する
        </button>
      </Modal>
    </>
  );
}
