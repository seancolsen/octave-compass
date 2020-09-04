import App from './App.svelte';

const app = new App({
	target: document.body,
});

export default app;

// Disable default drag-related behaviors
document.body.ondrag = () => false;
document.body.ondragstart = () => false;
document.body.ondrop = () => false;
document.body.ondblclick = () => false;
