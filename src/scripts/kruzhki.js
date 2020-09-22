function rand(min, max) {
	return min + Math.random() * (max - min);
}

function get_random_color() {
	var h = rand(1, 360);
	return "hsl(" + h + "," + "59%," + "61%)";
}

const ins = document.getElementById("kruzhki_containter");

fetch(
	"https://sheet.best/api/sheets/df9f0dd6-418d-49f6-b8c4-1c79b1baad2e/tabs/kruzhki"
)
	.then((answ) => answ.json())
	.then((res) => {
		res.forEach((element) => {
			//Создание вкладки для каждого кружка
			const newtab = document.createElement("div");
			newtab.classList = "tabs noselect faster kruzhok_info";
			newtab.id = `kruzhok${element.ID}`;
			let raspisanie = "";
			if (element.Понедельник != "") {
				raspisanie += "Понедельник: " + element.Понедельник + "<br>";
			}
			if (element.Вторник != "") {
				raspisanie += "Вторник: " + element.Вторник + "<br>";
			}
			if (element.Среда != "") {
				raspisanie += "Среда: " + element.Среда + "<br>";
			}
			if (element.Четверг != "") {
				raspisanie += "Четверг: " + element.Четверг + "<br>";
			}
			if (element.Пятница != "") {
				raspisanie += "Пятница: " + element.Пятница + "<br>";
			}
			if (element.Суббота != "") {
				raspisanie += "Суббота: " + element.Суббота + "<br>";
			}

			newtab.innerHTML = `
			<div class="tab_title">
			  <button class="back_action">
				<img src="/images/close.svg" alt="" class="back_btn noselect" />
			  </button>
			</div>
			<div class="class_containter kruzhok_info_container" id="kruzhok_container_${element.ID}">
				<h1>${element.TITLE}</h1>
				<h4>${element.CLASS} класс</h4>
				<span>${element.DESC}</span>
				<h2>Преподаватель: <br>${element.FIO}</h2>
				<h3>Аудитория: ${element.KAB}</h3>
				<h5>${raspisanie}</h5>
			</div>
		  `;
			document.body.appendChild(newtab);

			router.HideTab(`kruzhok${element.ID}`);
			let isDistant = false;
			if (element.KAB == "дистанционно") {
				isDistant = true;
			}

			ins.innerHTML += `<button class="card" id="card_btn_${
				element.ID
			}" onClick="goToKruzhok(${element.ID})"> <h1>${element.TITLE}</h1>
				<span><b>${element.CLASS}</b> <br> класс</span>
				${isDistant ? `<div class="lenta">Дистанционно</div>` : ""}
				
				<div class="topline" style="background: ${get_random_color()}"></div></button>`;
		});
		SmartClick(".back_action", () => router.GoBack());
	});

const goToKruzhok = (id) => {
	if (!router.isBusy) {
		router.GoTo(`kruzhok${id}`);
	} else {
		return false;
	}
};
