import Image from "next/image";
import HomeIcon from "@mui/icons-material/Home";
import { Search } from "@mui/icons-material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Link from "next/link";
import { LoginButton } from "./loginbutton";
import TweetView from "./work/tweetview";
import PostButton from "./work/post";

export default function Home() {
  return (
    <main className="flex min-h-screen p-12">
      <LeftTabMenu />
      <div className="px-4 w-3/4">
        <TweetView />
      </div>
      <div className="fixed bottom-8 right-8">
        <PostButton />
      </div>
    </main>
  );
}

function LeftTabMenu() {
  return (
    <>
      <div className="flex flex-col gap-4 font-Noto w-1/4 justify-start pr-2 md:pr-8 items-end h-screen">
        <div className="flex flex-col gap-4 w-18 md:w-48">
          <div className="flex flex-col gap-4 w-full relative">
            <Image
              src="/logo.png"
              alt=""
              width={40}
              height={40}
              style={{ objectFit: "contain" }}
              className="min-w-[40px] max-w-[40px] mx-1"
            />
            <Link href="/">
              <h1 className="text-5xl font-bold font-Nunito text-black absolute top-0 text-transparent">
                Y
              </h1>
            </Link>
          </div>
          <h2 className="text-2xl font-bold font-Nunito text-black invisible md:visible items-center justify-center w-full">
            Welcome to Y
          </h2>

          <div className="flex gap-4 justify-left items-center rounded-full hover:bg-slate-100 p-2 px-6">
            <HomeIcon className="text-2xl" />
            <Link
              href="/"
              className="text-2xl font-bold font-Nunito text-black"
            >
              ホーム
            </Link>
          </div>

          <div className="flex gap-4 justify-left items-center rounded-full hover:bg-slate-100 p-2 px-6">
            <Search className="text-2xl" />
            <Link
              href="/"
              className="text-2xl font-bold font-Nunito text-black"
            >
              検索
            </Link>
          </div>

          <div className="flex gap-4 justify-left items-center rounded-full hover:bg-slate-100 p-2 px-6">
            <NotificationsIcon className="text-2xl" />
            <Link
              href="/"
              className="text-2xl font-bold font-Nunito text-black"
            >
              通知
            </Link>
          </div>

          <div className="flex gap-4 justify-left items-center rounded-full hover:bg-slate-100 p-2 px-6">
            <MailOutlineIcon className="text-2xl" />
            <Link
              href="/"
              className="text-2xl font-bold font-Nunito text-black"
            >
              Message
            </Link>
          </div>

          <div className="flex flex-col items-center gap-4 mt-6">
            <LoginButton />
          </div>
        </div>
      </div>
    </>
  );
}
