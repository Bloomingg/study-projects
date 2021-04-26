let wipRoot;
export const render = (vnode, container) => {
	wipRoot = {
		type: "div",
		props: {
			children: { ...vnode },
		},
		stateNode: container,
	};
	nextUnitOfWork = wipRoot;
};

function createNode(workInProgress) {
	let node;
	const { type, props } = workInProgress;
	// console.log(type);
	node = document.createElement(type);
	updateNode(node, props);
	return node;
}

function updateClassComponent(workInProgress) {
	const { type, props } = workInProgress;
	const instance = new type(props);
	const children = instance.render();
	console.log(children);
	reconcileChildren(workInProgress, children);
}

function updateFunctionComponent(workInProgress) {
	const { type, props } = workInProgress;
	const children = type(props);
	reconcileChildren(workInProgress, children);
}

function updateHostComponent(workInProgress) {
	const { props, stateNode } = workInProgress;
	// console.log(stateNode);
	if (!stateNode) {
		workInProgress.stateNode = createNode(workInProgress);
	}
	reconcileChildren(workInProgress, props.children);
}

function updateNode(node, props) {
	console.log(props);
	Object.keys(props)
		// .filter((attr) => attr !== "children")
		.forEach((atr) => {
			if (atr === "children") {
				if (typeof props[atr] === "string") {
					node.textContent = props[atr];
				}
			} else {
				node[atr] = props[atr];
			}
		});
}

function reconcileChildren(workInProgress, children) {
	if (typeof children === "string" || typeof children === "number") return;
	let previousFiber = null;
	const newChildren = Array.isArray(children) ? children : [children];
	// console.log(newChildren);
	// newChildren.forEach((child, index) => {
	for (let i = 0; i < newChildren.length; i++) {
		const child = newChildren[i];
		let newFiber = {
			type: child.type,
			props: { ...child.props },
			stateNode: null,
			child: null,
			sibling: null,
			return: workInProgress,
		};
		if (i === 0) {
			workInProgress.child = newFiber;
			// console.log(workInProgress);
		} else {
			// console.log(workInProgress);
			previousFiber.sibling = newFiber;
		}

		previousFiber = newFiber;
		// console.log(previousFiber);
	}
	// });
}

let nextUnitOfWork = null;

// fiber
// child 第一个子节点
// sibling 下一个兄弟节点
// return 父节点

function performUnitOfWork(workInProgress) {
	// 1执行任务
	const { type } = workInProgress;
	if (typeof type === "string") {
		updateHostComponent(workInProgress);
	} else if (typeof type === "function") {
		if (type.prototype && type.prototype.isReactComponent) {
			updateClassComponent(workInProgress);
		} else {
			updateFunctionComponent(workInProgress);
		}
	}
	// 2返回下一个任务
	if (workInProgress.child) {
		// console.log(workInProgress.child);
		return workInProgress.child;
	}
	let nextFiber = workInProgress;
	while (nextFiber) {
		if (nextFiber.sibling) {
			return nextFiber.sibling;
		}
		nextFiber = nextFiber.return;
	}
}

function workLoop(IdleDeadline) {
	while (nextUnitOfWork) {
		if (nextUnitOfWork && IdleDeadline.timeRemaining() > 0) {
			nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
		}
	}

	if (!nextUnitOfWork && wipRoot) commitRoot();
}

function commitRoot() {
	commitWork(wipRoot.child);
	wipRoot = null;
}

function commitWork(workInProgress) {
	if (!workInProgress) return;

	let parentNodeFiber = workInProgress.return;
	while (!parentNodeFiber.stateNode) {
		parentNodeFiber = parentNodeFiber.return;
	}
	let parentNode = parentNodeFiber.stateNode;
	if (workInProgress.stateNode) {
		parentNode.appendChild(workInProgress.stateNode);
	}
	commitWork(workInProgress.child);
	commitWork(workInProgress.sibling);
}

requestIdleCallback(workLoop);
