"use client";
import Modal from "react-modal";
import { useState } from "react";

export default function PostButton() {
  const [tweetWindowIsOpen, setTweetWindowIsOpen] = useState(false);
  const username = sessionStorage.getItem("username");
  const [content, setContent] = useState("");

  Modal.setAppElement("body");
  return (
    <>
      <button
        type="button"
        className="p-2 px-6 bg-primary-default hover:bg-primary-dark text-2xl text-white rounded-full font-semibold"
        //--- 👇 ---
        onClick={() => setTweetWindowIsOpen(true)}
      >
        投稿する
      </button>
      <Modal
        isOpen={tweetWindowIsOpen}
        className="flex justify-center items-center w-1/2 h-1/2 relative border-2 border-gray-300 bg-white rounded-lg m-auto mt-16"
      >
        <button
          type="button"
          className="p-2 bg-white hover:bg-gray-100 text-2xl text-primary-default rounded-full font-semibold absolute top-2 right-4"
          onClick={() => setTweetWindowIsOpen(false)}
        >
          閉じる
        </button>
        <div className="flex flex-col gap-4 p-4 justify-between items-center w-2/3 h-5/6">
          <textarea
            placeholder="いまどうしてる？"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full h-2/3"
          ></textarea>

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
        </div>
      </Modal>
    </>
  );
}
