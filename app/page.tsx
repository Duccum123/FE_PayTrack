import { redirect } from "next/navigation"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
      <div className="max-w-xl w-full text-center space-y-6">
        <h1 className="text-4xl font-bold text-blue-700">PayTrack - Hệ thống quản lý nhân sự & lương hiện đại</h1>
        <p className="text-lg text-gray-700">
          Quản lý nhân viên, chấm công, tính lương và nhiều tính năng khác dành cho doanh nghiệp hiện đại. Đơn giản, bảo mật, dễ sử dụng.
        </p>
        <div className="flex justify-center gap-4 mt-8">
          <Link href="/login">
            <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Đăng nhập</button>
          </Link>
          <Link href="/login">
            <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition">Đăng ký</button>
          </Link>
        </div>
      </div>
    </main>
  )
}