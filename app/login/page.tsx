'use client'

import { Suspense, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  Zap,
  ArrowLeft,
  Mail,
  Lock,
  User,
  ShieldCheck,
  Eye,
  EyeOff,
  Check,
  Sparkles,
  ArrowRight,
  KeyRound,
  GraduationCap,
  Users
} from 'lucide-react'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'signin'

  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState<'Member' | 'Instructor' | 'Admin'>('Member')
  const [rememberMe, setRememberMe] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  useEffect(() => {
    const urlMode = searchParams.get('mode')
    if (urlMode === 'signup' || urlMode === 'signin') {
      setMode(urlMode)
    }
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatusMessage(null)

    setTimeout(() => {
      setIsLoading(false)
      setStatusMessage(
        mode === 'signin'
          ? `Đăng nhập thành công với vai trò ${role}! Đang chuyển hướng...`
          : 'Đăng ký tài khoản thành công! Đang chuyển hướng...'
      )
      setTimeout(() => {
        router.push('/')
      }, 1000)
    }, 700)
  }

  const fillQuickDemo = (demoRole: 'Member' | 'Instructor' | 'Admin') => {
    setRole(demoRole)
    if (demoRole === 'Member') {
      setEmail('member.alex@awscommunity.vn')
      setPassword('awsMember2026@')
      setName('Alex Le (Thành viên)')
    } else if (demoRole === 'Instructor') {
      setEmail('instructor.maya@awscommunity.vn')
      setPassword('awsInstructor2026@')
      setName('Maya Chen (Giảng viên)')
    } else {
      setEmail('admin.sarah@awscommunity.vn')
      setPassword('awsAdmin2026@')
      setName('Sarah Kim (Quản trị viên)')
    }
    setMode('signin')
  }

  return (
    <div className="relative w-full max-w-md">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#ff9900]/20 via-[#315f78]/20 to-[#ff9900]/10 blur-xl opacity-70" />

      <div className="relative rounded-2xl border border-white/10 bg-[#101722]/95 p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
        {/* Header Tab Switcher */}
        <div className="mb-6 flex rounded-xl border border-white/10 bg-white/[0.03] p-1">
          <button
            type="button"
            onClick={() => {
              setMode('signin')
              setStatusMessage(null)
            }}
            className={`flex-1 rounded-lg py-2 text-xs font-semibold transition ${
              mode === 'signin'
                ? 'bg-[#ff9900] text-[#17110a] shadow-md'
                : 'text-[#8993a6] hover:text-white'
            }`}
          >
            Đăng nhập
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup')
              setStatusMessage(null)
            }}
            className={`flex-1 rounded-lg py-2 text-xs font-semibold transition ${
              mode === 'signup'
                ? 'bg-[#ff9900] text-[#17110a] shadow-md'
                : 'text-[#8993a6] hover:text-white'
            }`}
          >
            Đăng ký tài khoản
          </button>
        </div>

        {/* Title & Description */}
        <div className="mb-6 text-center">
          <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            {mode === 'signin'
              ? 'Chào mừng bạn trở lại'
              : 'Gia nhập cộng đồng AWS'}
          </h1>
          <p className="mt-1.5 text-xs text-[#8993a6]">
            {mode === 'signin'
              ? 'Đăng nhập để quản lý sự kiện và kết nối cùng cộng đồng Cloud'
              : 'Tạo tài khoản để tham gia các buổi workshop, đào tạo và sự kiện'}
          </p>
        </div>

        {/* Quick Demo Credentials */}
        <div className="mb-6 rounded-xl border border-white/[0.08] bg-white/[0.025] p-3">
          <div className="mb-2 flex items-center justify-between text-[11px] font-medium text-[#ffad3e]">
            <span className="flex items-center gap-1.5">
              <Sparkles className="size-3" />
              Đăng nhập nhanh (Tài khoản mẫu)
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => fillQuickDemo('Member')}
              className={`flex flex-col items-center justify-center rounded-lg border p-1.5 text-[11px] transition ${
                role === 'Member' && mode === 'signin'
                  ? 'border-[#ff9900] bg-[#ff9900]/10 text-[#ffb340]'
                  : 'border-white/10 bg-white/[0.03] text-[#8993a6] hover:text-white'
              }`}
            >
              <Users className="mb-1 size-3.5" />
              <span>Member</span>
            </button>
            <button
              type="button"
              onClick={() => fillQuickDemo('Instructor')}
              className={`flex flex-col items-center justify-center rounded-lg border p-1.5 text-[11px] transition ${
                role === 'Instructor' && mode === 'signin'
                  ? 'border-[#ff9900] bg-[#ff9900]/10 text-[#ffb340]'
                  : 'border-white/10 bg-white/[0.03] text-[#8993a6] hover:text-white'
              }`}
            >
              <GraduationCap className="mb-1 size-3.5" />
              <span>Instructor</span>
            </button>
            <button
              type="button"
              onClick={() => fillQuickDemo('Admin')}
              className={`flex flex-col items-center justify-center rounded-lg border p-1.5 text-[11px] transition ${
                role === 'Admin' && mode === 'signin'
                  ? 'border-[#ff9900] bg-[#ff9900]/10 text-[#ffb340]'
                  : 'border-white/10 bg-white/[0.03] text-[#8993a6] hover:text-white'
              }`}
            >
              <ShieldCheck className="mb-1 size-3.5" />
              <span>Admin</span>
            </button>
          </div>
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-[#2d7759]/40 bg-[#163a2f]/80 p-3 text-xs text-[#75d4ad]">
            <Check className="size-4 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#c5cfdd]">
                Họ và tên
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#697386]" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className="h-10 w-full rounded-lg border border-white/10 bg-white/[0.04] pl-9 pr-3 text-sm text-white placeholder:text-[#697386] outline-none transition focus:border-[#ff9900]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#c5cfdd]">
              Email công việc / AWS Builder ID
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#697386]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@example.com"
                className="h-10 w-full rounded-lg border border-white/10 bg-white/[0.04] pl-9 pr-3 text-sm text-white placeholder:text-[#697386] outline-none transition focus:border-[#ff9900]"
              />
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-xs font-medium text-[#c5cfdd]">
                Mật khẩu
              </label>
              {mode === 'signin' && (
                <button
                  type="button"
                  onClick={() => alert('Vui lòng kiểm tra email để đặt lại mật khẩu.')}
                  className="text-[11px] text-[#ffad3e] hover:underline"
                >
                  Quên mật khẩu?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#697386]" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-10 w-full rounded-lg border border-white/10 bg-white/[0.04] pl-9 pr-10 text-sm text-white placeholder:text-[#697386] outline-none transition focus:border-[#ff9900]"
              />
              <button
                type="button"
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#697386] hover:text-white"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {mode === 'signup' && (
            <>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#c5cfdd]">
                  Xác nhận mật khẩu
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#697386]" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="h-10 w-full rounded-lg border border-white/10 bg-white/[0.04] pl-9 pr-3 text-sm text-white placeholder:text-[#697386] outline-none transition focus:border-[#ff9900]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#c5cfdd]">
                  Vai trò mong muốn
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('Member')}
                    className={`flex items-center gap-2 rounded-lg border p-2.5 text-xs transition ${
                      role === 'Member'
                        ? 'border-[#ff9900] bg-[#ff9900]/10 text-white'
                        : 'border-white/10 bg-white/[0.03] text-[#8993a6] hover:text-white'
                    }`}
                  >
                    <Users className="size-3.5 text-[#ff9900]" />
                    <span>Member (Học viên)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('Instructor')}
                    className={`flex items-center gap-2 rounded-lg border p-2.5 text-xs transition ${
                      role === 'Instructor'
                        ? 'border-[#ff9900] bg-[#ff9900]/10 text-white'
                        : 'border-white/10 bg-white/[0.03] text-[#8993a6] hover:text-white'
                    }`}
                  >
                    <GraduationCap className="size-3.5 text-[#ff9900]" />
                    <span>Instructor (Giảng viên)</span>
                  </button>
                </div>
              </div>
            </>
          )}

          {mode === 'signin' && (
            <div className="flex items-center">
              <label className="flex cursor-pointer items-center gap-2 text-xs text-[#8993a6]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="size-3.5 rounded border-white/20 bg-white/5 text-[#ff9900] focus:ring-[#ff9900]"
                />
                <span>Duy trì đăng nhập trên thiết bị này</span>
              </label>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#ff9900] text-sm font-semibold text-[#17110a] shadow-lg transition hover:bg-[#ffad3e] active:scale-[0.99] disabled:opacity-70"
          >
            {isLoading ? (
              <span className="size-4 animate-spin rounded-full border-2 border-[#17110a] border-t-transparent" />
            ) : (
              <>
                <span>{mode === 'signin' ? 'Đăng nhập ngay' : 'Tạo tài khoản'}</span>
                <ArrowRight className="size-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/[0.08]" />
          </div>
          <span className="relative bg-[#101722] px-3 text-[11px] text-[#697386]">
            Hoặc tiếp tục với
          </span>
        </div>

        {/* AWS Builder ID button */}
        <button
          type="button"
          onClick={() => fillQuickDemo('Member')}
          className="flex h-10 w-full items-center justify-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.04] text-xs font-medium text-white transition hover:border-[#ff9900]/50 hover:bg-white/[0.08]"
        >
          <div className="grid size-5 place-items-center rounded bg-[#ff9900] text-[#111827]">
            <Zap className="size-3 fill-current" />
          </div>
          <span>Đăng nhập với AWS Builder ID</span>
        </button>

        {/* Bottom Switch Link */}
        <div className="mt-6 text-center text-xs text-[#8993a6]">
          {mode === 'signin' ? (
            <p>
              Chưa có tài khoản?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="font-medium text-[#ffad3e] hover:underline"
              >
                Đăng ký thành viên mới
              </button>
            </p>
          ) : (
            <p>
              Đã có tài khoản?{' '}
              <button
                type="button"
                onClick={() => setMode('signin')}
                className="font-medium text-[#ffad3e] hover:underline"
              >
                Đăng nhập tại đây
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="relative min-h-screen bg-[#090d16] text-[#f4f6fb]">
      {/* Top Navigation */}
      <header className="border-b border-white/[0.08] bg-[#090d16]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-5 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="grid size-8 place-items-center rounded-lg bg-[#ff9900] text-[#111827]">
              <Zap className="size-4 fill-current" />
            </div>
            <span className="text-[15px] font-semibold tracking-tight text-white">
              aws<span className="text-[#ff9900]">//</span>community
            </span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.035] px-3.5 py-1.5 text-xs font-medium text-[#ccd4e1] transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
          >
            <ArrowLeft className="size-3.5" />
            <span>Về trang chủ</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex min-h-[calc(100vh-68px)] items-center justify-center p-5 py-12">
        <Suspense
          fallback={
            <div className="flex h-64 items-center justify-center text-sm text-[#8993a6]">
              Đang tải biểu mẫu...
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </main>
    </div>
  )
}
