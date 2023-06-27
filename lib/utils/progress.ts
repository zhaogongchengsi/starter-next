
import NProgress from 'NProgress'

var Settings = NProgress.settings = {
	minimum: 0.08,
	easing: 'linear',
	positionUsing: '',
	speed: 200,
	trickle: true,
	trickleSpeed: 200,
	showSpinner: true,
	barSelector: '[role="bar"]',
	spinnerSelector: '[role="spinner"]',
	parent: 'body',
	template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
};

export const createNprogress = () => {
	if (!process.browser) {
		return
	}
	return NProgress.configure(Settings);
}