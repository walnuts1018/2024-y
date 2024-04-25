import Image from "next/image";
import HomeIcon from "@mui/icons-material/Home";
import { Search } from "@mui/icons-material";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function Home() {
  return (
    <main className="flex min-h-screen p-12">
      <div className="flex flex-col gap-4 font-Noto w-1/4  border-r-zinc-600 border-r-2 justify-start pr-2 md:pr-8 items-end">
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
            <h1 className="text-5xl font-bold font-Nunito text-black absolute top-0 text-transparent">
              Y
            </h1>
          </div>
          <h2 className="text-2xl font-bold font-Nunito text-black invisible md:visible">
            Welcome to Y
          </h2>

          <div className="flex gap-4 justify-left items-center rounded-full hover:bg-slate-100 p-2 px-6">
            <HomeIcon className="text-2xl" />
            <a href="/" className="text-2xl font-bold font-Nunito text-black">
              ホーム
            </a>
          </div>

          <div className="flex gap-4 justify-left items-center rounded-full hover:bg-slate-100 p-2 px-6">
            <Search className="text-2xl" />
            <a href="/" className="text-2xl font-bold font-Nunito text-black">
              検索
            </a>
          </div>

          <div className="flex gap-4 justify-left items-center rounded-full hover:bg-slate-100 p-2 px-6">
            <NotificationsIcon className="text-2xl" />
            <a href="/" className="text-2xl font-bold font-Nunito text-black">
              通知
            </a>
          </div>

          <div className="flex flex-col items-center gap-4">
            <a
              href="/login"
              className="p-2 rounded-full shadow-lg px-8 bg-white hover:bg-gray-100"
            >
              Login
            </a>
            <a
              href="/register"
              className="p-2 rounded-full shadow-lg px-8 bg-white hover:bg-gray-100"
            >
              Register
            </a>
          </div>
        </div>
      </div>

      <div className="w-3/4"></div>
    </main>
  );
}
