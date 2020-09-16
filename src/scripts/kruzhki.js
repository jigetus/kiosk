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
			newtab.styl;
			newtab.innerHTML = `<div class="tabs noselect faster" id="kruzhok_${element.ID}">
			<div class="tab_title">
			  <button class="back_action">
				<img src="/images/close.svg" alt="" class="back_btn noselect" />
			  </button>
			  
			</div>
			<div class="class_containter scrollbar" id="zvonki_container">

			</div>
		  </div>`;
			document.getElementById("kruzhki_container").appendChild(newtab);

			router.HideTab(`kruzhok_${element.ID}`);
			ins.innerHTML += `<button class="card" id="card_btn_${element.ID}"> <h1>${
				element.TITLE
			}</h1><div class="topline" style="background: ${get_random_color()}"></div></button>`;

			SmartClick(`#card_btn_${element.ID}`, () => {
				router.GoTo(`kruzhok_${element.ID}`);
				console.log("gotowork");
			});
		});
		SmartClick(".back_action", () => router.GoBack());
	});
