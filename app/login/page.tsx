"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Smartphone, Mail, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Phone login state
  const [phone, setPhone] = useState("")
  const [verifyCode, setVerifyCode] = useState("")
  const [codeSent, setCodeSent] = useState(false)
  const [countdown, setCountdown] = useState(0)

  // Email login state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleSendCode() {
    if (!phone || phone.length < 10) {
      toast.error("请输入有效的手机号")
      return
    }
    setCodeSent(true)
    setCountdown(60)
    toast.success("验证码已发送", {
      description: "请查看您的短信",
    })

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  function handlePhoneLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!phone || !verifyCode) {
      toast.error("请填写完整信息")
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast.success("登录成功")
      router.push("/")
    }, 1000)
  }

  function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) {
      toast.error("请填写完整信息")
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast.success("登录成功")
      router.push("/")
    }, 1000)
  }

  function handleSocialLogin(provider: string) {
    setIsLoading(true)
    toast.success(`正在跳转到${provider}登录...`)
    setTimeout(() => {
      setIsLoading(false)
      router.push("/")
    }, 1500)
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center gap-3 bg-background/95 px-4 py-3 backdrop-blur-md">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary transition-colors hover:bg-accent"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-semibold">登录</h1>
      </div>

      <div className="flex-1 px-6 py-4">
        {/* Logo & Welcome */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
            <span className="text-2xl font-bold text-primary-foreground">闲</span>
          </div>
          <h2 className="text-xl font-semibold text-foreground">欢迎回到闲置帮</h2>
          <p className="mt-1 text-sm text-muted-foreground">留学生专属二手交易平台</p>
        </div>

        {/* Login Tabs */}
        <Tabs defaultValue="phone" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="phone" className="gap-1.5">
              <Smartphone className="h-4 w-4" />
              手机登录
            </TabsTrigger>
            <TabsTrigger value="email" className="gap-1.5">
              <Mail className="h-4 w-4" />
              邮箱登录
            </TabsTrigger>
          </TabsList>

          {/* Phone Login */}
          <TabsContent value="phone" className="mt-6">
            <form onSubmit={handlePhoneLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">手机号</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="请输入手机号"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">验证码</Label>
                <div className="flex gap-3">
                  <Input
                    id="code"
                    type="text"
                    placeholder="请输入验证码"
                    maxLength={6}
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value)}
                    className="h-12 flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleSendCode}
                    disabled={countdown > 0}
                    className="h-12 shrink-0 px-4"
                  >
                    {countdown > 0 ? `${countdown}s` : codeSent ? "重新发送" : "获取验证码"}
                  </Button>
                </div>
              </div>
              <Button
                type="submit"
                className="h-12 w-full rounded-full text-base"
                disabled={isLoading}
              >
                {isLoading ? "登录中..." : "登录"}
              </Button>
            </form>
          </TabsContent>

          {/* Email Login */}
          <TabsContent value="email" className="mt-6">
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">邮箱地址</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="请输入邮箱地址"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">密码</Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-primary hover:underline"
                  >
                    忘记密码?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="请输入密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                className="h-12 w-full rounded-full text-base"
                disabled={isLoading}
              >
                {isLoading ? "登录中..." : "登录"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">或使用以下方式登录</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Social Login */}
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            className="h-12 flex-1 gap-2"
            onClick={() => handleSocialLogin("微信")}
            disabled={isLoading}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.045c.134 0 .24-.11.24-.245 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89l-.016-.033h-.39zm-2.503 2.804c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.908 0c.535 0 .969.44.969.982a.976.976 0 0 1-.97.983.976.976 0 0 1-.968-.983c0-.542.434-.982.969-.982z" fill="#07C160"/>
            </svg>
            微信登录
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-12 flex-1 gap-2"
            onClick={() => handleSocialLogin("Google")}
            disabled={isLoading}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </Button>
        </div>

        {/* Register Link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            还没有账号?{" "}
            <Link href="/register" className="font-medium text-primary hover:underline">
              立即注册
            </Link>
          </p>
        </div>

        {/* Terms */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          登录即表示您同意闲置帮的{" "}
          <Link href="/terms" className="text-primary hover:underline">
            服务条款
          </Link>{" "}
          和{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            隐私政策
          </Link>
        </p>
      </div>
    </div>
  )
}
