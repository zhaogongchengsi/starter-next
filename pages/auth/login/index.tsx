"use client";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useMode from "@/hooks/use-mode";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import * as z from "zod";
// import useSWR from "swr";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useRequest } from "@/hooks/request/request";

const formSchema = z.object({
  account: z.string().min(5, { message: "账号长度不小于5位" }).max(15, { message: "账号长度不大于15位" }).trim(),
  password: z.string().min(6, { message: "密码不小于6位" }).max(16, { message: "密码不大于16位" }).trim(),
  captcha: z.string().length(4, { message: "验证码必填" }).trim(),
});

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Login = () => {
  const [md, smd] = useMode();
  const setMode = () => smd(!md);

  const { data, isLoading, mutate } = useRequest<{ id: string; url: string }>("/api/captcha", fetcher);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <section className="w-full h-screen app-container flex min-w-300">
      <div className="flex-1 h-full border-r border-stone-300 dark:border-gray-100/30">1</div>
      <div className="w-250 h-full flex items-center justify-center">
        <div className="flex justify-end absolute w-full top-10 right-10">
          <div onClick={setMode} className="w-8 h-8 i-tabler-sun dark:i-tabler-moon" />
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
                      <Input type="password" autoComplete="password" placeholder="请输入账号" {...field} />
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
                              {isLoading ? (
                                <div>加载中</div>
                              ) : (
                                <div dangerouslySetInnerHTML={{ __html: data.url }}></div>
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

              <Button className="w-full" type="submit">
                登录
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Login;
