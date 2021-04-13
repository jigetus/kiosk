let current_q = true; //true - ход креста, false - ход нуля
let hodov = 0;
let game_over = false;

const cells = Array.from(document.getElementsByClassName("cell"));

document.getElementById("reset_btn").addEventListener("click", () => {
	cells.forEach((el) => {
		el.innerHTML = "";
		el.style.background = "transparent";
	});
	current_q = true; //true - ход креста, false - ход нуля
	hodov = 0;
	game_over = false;
	const box = document.getElementById("message");
	box.style.display = "none";
});
cells.forEach((el) => {
	el.addEventListener("click", (ev) => {
		Set(el.id);
	});
});
function touchHandler(event) {
	if (event.touches.length > 1) {
		//the event is multi-touch
		//you can then prevent the behavior
		event.preventDefault();
	}
}
window.addEventListener("touchstart", touchHandler, false);
function Set(id) {
	if (game_over) return false;
	const el = document.getElementById(id);
	if (el.innerHTML === "") {
		el.innerHTML = current_q ? Draw("x") : Draw("o");
		hodov++;
		if (hodov == 9) {
			if (Status()) {
				return Message(Status(), "good");
			}
			game_over = true;
			return Message("Ничья!", "good");
		}
		if (Status()) {
			Message(Status(), "good");
		} else {
			current_q = !current_q;
		}
	} else return false;
}

function Status() {
	const combs = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let comb of combs) {
		if (
			document.getElementById(comb[0]).innerHTML ==
				document.getElementById(comb[1]).innerHTML &&
			document.getElementById(comb[1]).innerHTML ==
				document.getElementById(comb[2]).innerHTML &&
			document.getElementById(comb[0]).innerHTML != ""
		) {
			game_over = true;
			document.getElementById(comb[0]).style.background = "lightyellow";
			document.getElementById(comb[1]).style.background = "lightyellow";
			document.getElementById(comb[2]).style.background = "lightyellow";
			return `Победили ${
				document.getElementById(comb[0]).innerHTML === Draw("o")
					? "нолики"
					: "крестики"
			}`;
		}
	}

	return false;
}

function Message(text, type) {
	const box = document.getElementById("message");
	if (type === "good") {
		box.style.background = "lightgreen";
		box.innerHTML = text;
		box.style.display = "block";
	}
	if (type === "bad") {
		box.style.background = "lightgred";
		box.style.display = "block";
	}
	return false;
}

function Draw(param) {
	if (param == "o") {
		return `<i class="far fa-circle"></i>`;
	}
	if (param == "x") {
		return `<i class="fas fa-times"></i>`;
	}
	return false;
}
