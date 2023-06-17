
import type { OAuthConfig, OAuthUserConfig } from 'next-auth/providers'

export interface Config {

}

export interface CMSProfile { }

export default function CreateCMSProvider(config?: OAuthUserConfig<Config>): OAuthConfig<CMSProfile> {

	const authorization = {
		url: new URL('admin/login', process.env.NEXTAUTH_URL).toString(),
		params: { scope: "email" }
	}

	return {
		id: "Z-CMS",
		name: "Z-CMS",
		type: "oauth",
		authorization,
		// token: "https://kauth.kakao.com/oauth/token",
		// userinfo: "https://kapi.kakao.com/v2/user/me",
		profile(profile: { sub: any; name: any; email: any; picture: any }) {
			return {
				id: profile.sub,
				name: profile.name,
				email: profile.email,
				image: profile.picture,
			}
		},
		options: config,
	}
}
