
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
		link: '#',
		children: [
			{
				icon: 'i-tabler-3d-cube-sphere',
				title: '控制台'
			}
		]
	},
	{
		icon: 'i-tabler-3d-cube-sphere',
		title: '用户中心',
		link: '#'
	}
]

export default data