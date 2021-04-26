export const render = (vnode, container) => {
	console.log(vnode);
	// vnode->node
	const node = createNode(vnode);
	// node->container
	container.appendChild(node);
};

function createNode(vnode) {
	let node;
	const { type } = vnode;
	if (typeof type === "string") {
		node = updateHostComponent(vnode);
	} else if (typeof type === "function") {
		console.log(type);
		node = type.prototype?.isReactComponent
			? updateClassComponent(vnode)
			: updateFunctionComponent(vnode);
	} else {
		node = updateTextComponent(vnode);
	}
	return node;
}

function updateClassComponent(vnode) {
	const { type, props } = vnode;
	const instance = new type(props);
	// console.log(instance);
	const vvnode = instance.render();
	const node = createNode(vvnode);
	return node;
}

function updateFunctionComponent(vnode) {
	const { type, props } = vnode;
	const vvnode = type(props);
	const node = createNode(vvnode);
	return node;
}

function updateHostComponent(vnode) {
	const { type, props } = vnode;
	const node = document.createElement(type);
	updateNode(node, props);
	reconcileChildren(node, props.children);
	return node;
}

function updateNode(node, props) {
	Object.keys(props)
		.filter((attr) => attr !== "children")
		.forEach((atr) => (node[atr] = props[atr]));
}

function updateTextComponent(vnode) {
	const node = document.createTextNode(vnode);
	return node;
}

function reconcileChildren(node, children) {
	if (Array.isArray(children)) {
		children.forEach((child) => render(child, node));
	} else {
		render(children, node);
	}
}
