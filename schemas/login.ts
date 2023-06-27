import * as z from "zod";

export const account = z.string().min(5, { message: "账号长度不小于5位" }).max(15, { message: "账号长度不大于15位" }).trim(),
	password = z.string().min(6, { message: "密码不小于6位" }).max(16, { message: "密码不大于16位" }).trim(),
	captcha = z.string().length(4, { message: "验证码必填" }).trim()
