function getFirstChild(el) {
	var firstChild = el.firstChild;
	while (firstChild != null && firstChild.nodeType == 3) {
		// skip TextNodes
		firstChild = firstChild.nextSibling;
	}
	return firstChild;
}

function ShowError() {
	error.style.display = "block";
	setTimeout(() => {
		error.style.display = "none";
	}, 1000);
}
let posT1 = { x: 0, y: 0 };
let posT2 = { x: 0, y: 0 };
let posT3 = { x: 0, y: 0 };
let posT4 = { x: 0, y: 0 };
let posT5 = { x: 0, y: 0 };
var isFirstChild = false;
var counter = 0;
counts.innerHTML = counter;
interact("#t1").draggable({
	listeners: {
		start(event) {
			//проверка на верхнее кольцо
			const circle = event.target;
			const tower = circle.parentElement;
			const firstChild = getFirstChild(tower);
			if (circle.id !== firstChild.id) {
				isFirstChild = false;
			} else {
				isFirstChild = true;
			}
		},
		move(event) {
			posT1.x += event.dx;
			posT1.y += event.dy;
			event.target.style.transform = `translate(${posT1.x}px, ${posT1.y}px)`;
		},
		end(event) {
			posT1 = { x: 0, y: 0 };
			event.target.style.transform = "";
		},
	},
});
interact("#t2").draggable({
	listeners: {
		start(event) {
			//проверка на верхнее кольцо
			const circle = event.target;
			const tower = circle.parentElement;
			const firstChild = getFirstChild(tower);
			if (circle.id !== firstChild.id) {
				isFirstChild = false;
			} else {
				isFirstChild = true;
			}
		},
		move(event) {
			posT2.x += event.dx;
			posT2.y += event.dy;

			event.target.style.transform = `translate(${posT2.x}px, ${posT2.y}px)`;
		},
		end(event) {
			posT2 = { x: 0, y: 0 };
			event.target.style.transform = "";
		},
	},
});
interact("#t3").draggable({
	listeners: {
		start(event) {
			//проверка на верхнее кольцо
			const circle = event.target;
			const tower = circle.parentElement;
			const firstChild = getFirstChild(tower);
			if (circle.id !== firstChild.id) {
				isFirstChild = false;
			} else {
				isFirstChild = true;
			}
		},
		move(event) {
			posT3.x += event.dx;
			posT3.y += event.dy;

			event.target.style.transform = `translate(${posT3.x}px, ${posT3.y}px)`;
		},
		end(event) {
			posT3 = { x: 0, y: 0 };
			event.target.style.transform = "";
		},
	},
});
interact("#t4").draggable({
	listeners: {
		start(event) {
			//проверка на верхнее кольцо
			const circle = event.target;
			const tower = circle.parentElement;
			const firstChild = getFirstChild(tower);
			if (circle.id !== firstChild.id) {
				isFirstChild = false;
			} else {
				isFirstChild = true;
			}
		},
		move(event) {
			posT4.x += event.dx;
			posT4.y += event.dy;
			event.target.style.transform = `translate(${posT4.x}px, ${posT4.y}px)`;
		},
		end(event) {
			posT4 = { x: 0, y: 0 };
			event.target.style.transform = "";
		},
	},
});
interact("#t5").draggable({
	listeners: {
		start(event) {
			//проверка на верхнее кольцо
			const circle = event.target;
			const tower = circle.parentElement;
			const firstChild = getFirstChild(tower);
			if (circle.id !== firstChild.id) {
				isFirstChild = false;
			} else {
				isFirstChild = true;
			}
		},
		move(event) {
			posT5.x += event.dx;
			posT5.y += event.dy;
			event.target.style.transform = `translate(${posT5.x}px, ${posT5.y}px)`;
		},
		end(event) {
			posT5 = { x: 0, y: 0 };
			event.target.style.transform = "";
		},
	},
});

interact(".tower")
	.dropzone({
		ondrop: function (event) {
			if (!isFirstChild) {
				ShowError();
				console.log("not first child,");
				return false;
			}
			const circle = document.getElementById(event.relatedTarget.id);
			const tower = document.getElementById(event.target.id);
			//Перемещение в тот же стобец
			if (circle === getFirstChild(tower)) {
				return false;
			}
			//проверка на первый круг
			if (getFirstChild(tower) !== null) {
				if (getFirstChild(tower).id < circle.id) {
					counter++;
					tower.insertAdjacentElement("afterbegin", circle);
					counts.innerHTML = counter;
					CheckWin();
				} else {
					ShowError();
				}
			} else {
				counter++;
				tower.insertAdjacentElement("afterbegin", circle);
				counts.innerHTML = counter;
				CheckWin();
			}
		},
	})
	.on("dropactivate", function (event) {
		event.target.classList.add("drop-activated");
	});

restart.addEventListener("click", () => {
	counter = 0;
	win.style.display = "none";
	counts.innerHTML = counter;
	tower1.insertAdjacentElement("afterbegin", t1);
	tower1.insertAdjacentElement("afterbegin", t2);
	tower1.insertAdjacentElement("afterbegin", t3);
	tower1.insertAdjacentElement("afterbegin", t4);
	tower1.insertAdjacentElement("afterbegin", t5);
});

function CheckWin() {
	if (tower2.childNodes.length === 5) {
		win.style.display = "block";
	}
}
