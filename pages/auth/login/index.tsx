"use client";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import useCaptcha from "@/hooks/request/captcha";
import { useSend } from "@/hooks/use-send";
import { useMemo, useState } from "react";
import { account, password, captcha } from "~/schemas/login";
import { useToast } from "@/components/ui/use-toast";
import { ModeToggle } from "@/components/ModeToggle";
import { useUser } from "@/hooks/logged/use-user";
import { useJwt } from "@/hooks/logged/use-jwt";
import { usePermission } from "@/hooks/logged/use-permission";
import { useRouter } from "next/navigation";
import Head from "next/head";

const formSchema = z.object({
  account,
  password,
  captcha,
});

const Login = () => {
  const { toast } = useToast();
  const [isLoginLoading, setLoginLoading] = useState(false);
  const { data, isLoading, mutate, error } = useCaptcha();
  const [send] = useSend<UserResponse>("/api/user/login", 100000);
  const [_u, setUserInfo] = useUser();
  const [_j, setJwt] = useJwt();
  const [_p, setPerm] = usePermission();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const img = useMemo(() => {
    return data?.url || "验证码获取失败,请重试";
  }, [data]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoginLoading(true);
    try {
      const {
        state,
        message,
        data: resp,
      } = await send({
        account: values.account,
        password: values.password,
        captcha: {
          id: data?.id,
          value: values.captcha,
        },
      });

      if (!state) {
        toast({
          variant: "destructive",
          title: "🚨 登录失败",
          description: message,
        });
      } else {
        setUserInfo(resp);
        setJwt(resp.payload);
        setPerm(resp);
        toast({
          title: "🎉 登陆成功",
          description: `Hello ${resp.name}`,
        });

        // 跳去后台页面
        router.push("/admin");
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "登录失败",
        description: String(err),
      });
    } finally {
      setLoginLoading(false);
    }
  }

  return (
    <section className="w-full h-screen app-container flex min-w-300">
      <Head>
        <title>后台管理</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <div className="flex-1 h-full border-r border-stone-300 dark:border-gray-100/30">1</div>
      <div className="w-250 h-full flex items-center justify-center relative">
        <div className="flex justify-end absolute w-full top-10 right-10">
          <ModeToggle />
        </div>
        <div className="w-150 p-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="account"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>账号</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="请输入账号" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>密码</FormLabel>
                    <FormControl>
                      <Input type="password" autoComplete="password" placeholder="请输入密码" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="captcha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>验证码</FormLabel>
                    <FormControl>
                      <div className="w-full space-x-2 flex items-center">
                        <Input className="" type="captcha" placeholder="请输入验证码" {...field} />
                        <Popover>
                          <PopoverTrigger className="w-25 h-8.5 rounded-sm shrink-0 flex items-center cursor-pointer justify-center app-button text-primary-foreground">
                            <span className="">查看验证码</span>
                          </PopoverTrigger>
                          <PopoverContent className="px-3 w-56 cursor-pointer">
                            <div className="flex flex-col justify-center items-center" onClick={() => mutate()}>
                              {isLoading && !error ? (
                                <div>加载中</div>
                              ) : (
                                <div dangerouslySetInnerHTML={{ __html: img }}></div>
                              )}
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full space-x-2 flex items-center" type="submit">
                {isLoginLoading ? (
                  <div className="w-5 h-5 animate-spin i-tabler-brand-walmart" />
                ) : (
                  <div className="w-5 h-5 i-tabler-login" />
                )}
                <span>登录</span>
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Login;
