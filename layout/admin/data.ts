
export interface NavBarOptions {
	id: number;
	icon?: string;
	title?: string;
	link?: string;
	children?: NavBarOptions[]
}

const data: NavBarOptions[] = [
	{
		id: 1,
		icon: 'i-tabler-3d-cube-sphere',
		title: '仪表盘',
		link: '#yibiapan',
	},
	{
		id: 2,
		icon: 'i-tabler-users',
		title: '用户中心',
		link: '/admin',
		children: [
			{
				id: 3,
				icon: 'i-tabler-user-cog',
				title: '用户管理',
				link: 'user'
			}
		]
	}
]

export default data