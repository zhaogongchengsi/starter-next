interface UserResponse {
	avatar: null;
	createdAt: string;
	id: string;
	name: string;
	payload: Payload;
	permissions: Permission[];
	phone: string;
	profile: null;
	roles: Role[];
	updatedAt: string;
}

interface UserPayload {
	/**
	 * 过期时间 精确为秒 不为毫秒
	 */
	expiresIn: number;
	token: string;
}

interface Permission {
	apis?: string[];
	description?: null;
	id?: number;
	name?: string;
	menus?: Menu[];
	parentId?: null;
}

interface Menu {
	description?: string;
	icon?: null | string;
	id: number;
	path: string;
	permissionId: number;
	pid: number;
	title: string;

}

interface Role {
	createdAt: string;
	id: number;
	Pid: number;
	Title: string;
	updatedAt: string;
}

interface Menu {
	children?: Menu[]
}