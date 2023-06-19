
export interface NavBarOptions {
	icon?: string;
	title?: string;
	link?: string;
	children?: NavBarOptions[]
}

const data: NavBarOptions[] = [
	{
		icon: 'i-tabler-3d-cube-sphere',
		title: '仪表盘',
		link: '#yibiapan',
	},
	{
		icon: 'i-tabler-users',
		title: '用户中心',
		link: '/admin',
		children: [
			{
				icon: 'i-tabler-user-cog',
				title: '用户管理',
				link: 'user'
			}
		]
	}
]

export default data