import * as z from "zod";

export const account = z.string({ required_error: "请填写账号" }).min(5, { message: "账号长度不小于5位" }).max(15, { message: "账号长度不大于15位" }).trim()
export const password = z.string({ required_error: "请填写密码" }).min(6, { message: "密码不小于6位" }).max(16, { message: "密码不大于16位" }).trim()
export const captcha = z.string({ required_error: "请填写验证码" }).length(4, { message: "验证码必填且长度为4位" }).trim()
