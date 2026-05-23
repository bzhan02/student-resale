"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

export default function AuthPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // 登录表单
  const [loginEmail,    setLoginEmail]    = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  // 注册表单
  const [registerName,     setRegisterName]     = useState("")
  const [registerSchool,   setRegisterSchool]   = useState("")
  const [registerEmail,    setRegisterEmail]    = useState("")
  const [registerPassword, setRegisterPassword] = useState("")

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    })
    setIsLoading(false)
    if (error) {
      toast.error("登录失败", { description: error.message })
    } else {
      toast.success("登录成功！")
      router.push("/")
      router.refresh()
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    if (!registerName.trim()) {
      toast.error("请填写昵称")
      return
    }
    if (registerPassword.length < 8) {
      toast.error("密码至少需要 8 位")
      return
    }
    setIsLoading(true)
    const { error } = await supabase.auth.signUp({
      email: registerEmail,
      password: registerPassword,
      options: {
        data: {
          name:   registerName.trim(),
          school: registerSchool.trim(),
        },
      },
    })
    setIsLoading(false)
    if (error) {
      toast.error("注册失败", { description: error.message })
    } else {
      toast.success("注册成功！请查收验证邮件", {
        description: "验证邮箱后即可登录",
        duration: 6000,
      })
    }
  }

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 py-10">
      {/* Logo */}
      <div className="mb-8 flex flex-col items-center gap-2 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
          <GraduationCap className="h-7 w-7" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">闲置帮</h1>
        <p className="text-sm text-muted-foreground">留学生二手交易平台</p>
      </div>

      <div className="w-full max-w-sm">
        <Tabs defaultValue="login">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">登录</TabsTrigger>
            <TabsTrigger value="register">注册</TabsTrigger>
          </TabsList>

          {/* 登录 */}
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="mt-4 flex flex-col gap-4">
              <div>
                <Label htmlFor="login-email">邮箱</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="your@email.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="mt-1.5"
                  required
                  autoComplete="email"
                />
              </div>
              <div>
                <Label htmlFor="login-password">密码</Label>
                <div className="relative mt-1.5">
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="请输入密码"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full rounded-full" disabled={isLoading}>
                {isLoading ? "登录中..." : "登录"}
              </Button>
            </form>
          </TabsContent>

          {/* 注册 */}
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="mt-4 flex flex-col gap-4">
              <div>
                <Label htmlFor="reg-name">昵称 <span className="text-destructive">*</span></Label>
                <Input
                  id="reg-name"
                  placeholder="怎么称呼你？"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  className="mt-1.5"
                  required
                  maxLength={20}
                />
              </div>
              <div>
                <Label htmlFor="reg-school">学校</Label>
                <Input
                  id="reg-school"
                  placeholder="例如: UCLA、NYU"
                  value={registerSchool}
                  onChange={(e) => setRegisterSchool(e.target.value)}
                  className="mt-1.5"
                  maxLength={50}
                />
              </div>
              <div>
                <Label htmlFor="reg-email">邮箱 <span className="text-destructive">*</span></Label>
                <Input
                  id="reg-email"
                  type="email"
                  placeholder="your@email.com"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="mt-1.5"
                  required
                  autoComplete="email"
                />
              </div>
              <div>
                <Label htmlFor="reg-password">密码 <span className="text-destructive">*</span></Label>
                <div className="relative mt-1.5">
                  <Input
                    id="reg-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="至少 8 位"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full rounded-full" disabled={isLoading}>
                {isLoading ? "注册中..." : "创建账号"}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                注册即代表你同意我们的服务条款和隐私政策
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
