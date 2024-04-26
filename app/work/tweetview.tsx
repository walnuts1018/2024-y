"use client";
import { useState, useEffect } from "react";

type post = {
  id: number;
  content: string;
  user_id: number;
  created_at: string;
};

type resp = {
  message: string;
  posts: post[];
};

// 1秒
const fetchInterval = 1 * 1000;

export default function TweetView() {
  const [tweets, setTweets] = useState<post[]>([]);

  useEffect(() => {
    async function fetchPost() {
      const res = await fetch("/api/v1/post/list");
      const data: resp = await res.json();
      console.log(data);
      setTweets(data.posts);
    }
    fetchPost();
    setInterval(async () => {
      fetchPost();
    }, fetchInterval);
    return () => {
      clearInterval(fetchInterval);
    };
  }, []);

  if (tweets === undefined || tweets.length === 0) {
    return (
      <div className="flex justify-center items-center w-full h-full p-8">
        loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col w-3/4">
      <div className="flex flex-col gap-4">
        {tweets.map((tweet) => (
          <div
            key={tweet.id}
            className="flex flex-col gap-4 p-4 border-b-2 border-gray-300"
          >
            <p className="text-2xl font-bold font-Nunito text-black">
              {tweet.user_id}
            </p>
            <p className="text-2xl font-bold font-Nunito text-black">
              {tweet.content}
            </p>
            <p className="text-2xl font-bold font-Nunito text-black">
              {tweet.created_at}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
