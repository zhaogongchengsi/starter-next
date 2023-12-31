import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Post } from '@/lib/method'
import { z } from "zod";
import { account, captcha, password } from "~/schemas/login";
import { nextErrorResponse, nextResponseWithData } from "@/lib/error";
import { sendZodErrorMessage } from "@/lib/utils/sendZodError";
import prisma from '@/lib/prisma'
import { compareHashAndPassword } from "@/lib/password";
import { issueToken } from "@/lib/jwt";
import { Role, Permission, Api, Menu } from "@prisma/client";
import { verifyCaptcha } from "@/lib/captcha";
import omit from 'lodash/omit'

const loginForm = z.object({
	account,
	password,
	captcha: z.object({
		id: z.string().uuid({ message: "验证码 id 无效" }),
		value: captcha
	}),
}).required();

type Permissions = (Permission & {
	apis: Api[];
	menus: Menu[];
})[]

const login: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

	const result = await loginForm.spa(req.body)

	if (!result.success) {
		const err = (result as any).error
		const message = sendZodErrorMessage(err)
		res.send(nextErrorResponse(sendZodErrorMessage(err), new Error(message)))
		return
	}

	const { data } = result

	if (process.env.NODE_ENV === "production") {
		const isOk = await verifyCaptcha(data.captcha.id, data.captcha.value).catch(err => { res.send(nextErrorResponse("验证码验证失败", err)); return })
		if (!isOk) {
			res.send(nextErrorResponse("验证码无效"))
			return
		}
	}

	const user = await findFirstUser(data.account).catch(err => { res.send(nextErrorResponse("查找用户失败")); return })

	if (!user) {
		res.send(nextErrorResponse("用户不存在"))
		return
	}

	if (!compareHashAndPassword(user.password, data.password)) {
		res.send(nextErrorResponse("密码错误"))
		return
	}

	// 将数据简单整理一波
	const pureUser = omit(user, ['password', "Roles"])
	const roles: Role[] = []
	const permissionArr: Permissions = []
	user.Roles.forEach(r => {
		const { id, Pid, Title, createdAt, updatedAt, permissions } = r.role
		permissions.forEach(p => { permissionArr.push(p.permission); })
		roles.push({ id, Pid, Title, createdAt, updatedAt, })
	});

	const tokenInfo = issueToken({ user: pureUser, roles, permissions: permissionArr })

	const userResult = { ...pureUser, roles, permissions: permissionArr, payload: tokenInfo, profile: user.profile }


	res.json(nextResponseWithData(userResult, '登录成功'))

}

async function findFirstUser(account: string) {
	return await prisma.user.findFirst({
		where: {
			phone: account,
		},
		include: {
			profile: true,
			Roles: {
				include: {
					role: {
						include: {
							permissions: {
								include: {
									permission: {
										include: {
											apis: true,
											menus: true,
										}
									}
								}
							}
						}
					}
				}
			}
		}
	})
}



export default Post(login)