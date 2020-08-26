particlesJS.load(
	"particles-js",
	"configs/particlesjs-config.json",
	function () {
		console.log("particles.js loaded - callback");
	}
);

const router = new Router("particles-js");
router.HideTab("rasp");
router.HideTab("kruzhki");
router.HideTab("events");
router.HideTab("play");
router.HideTab("cons");

SmartClick("#goto_rasp", () => router.GoTo("rasp"));
SmartClick("#goto_kruzhki", () => router.GoTo("kruzhki"));
SmartClick("#goto_events", () => router.GoTo("events"));
SmartClick("#goto_play", () => router.GoTo("play"));
SmartClick("#goto_cons", () => router.GoTo("cons"));

// Расписание таб
function Rasp_tab(id) {
	if (!$("#" + id).hasClass("class_tab_active")) {
		console.log("click");
		$(".class_tab").removeClass("class_tab_active");
		$("#" + id).addClass("class_tab_active");
		$(".rasp_img").css("display", "none");
		$("#rasp_img_" + id).css("display", "block");
		animateCSS("rasp_img_" + id, "fadeIn", () => {});
	}
}

function AddKruzhok(id, name, img, author, desc, age, time, price) {
	const container_block = document.querySelector(".kruzhki_containter");
	const block_to_insert = document.createElement("div");
	block_to_insert.innerHTML =
		'<div class="kruzhok_card" id="' +
		id +
		'">  <img src="/images/kruzhki/' +
		img +
		'" alt="" />  <h4>' +
		name +
		"</h4>  <span>" +
		author +
		"</span></div>";
	container_block.appendChild(block_to_insert);
	const tab = document.createElement("div");
	tab.innerHTML =
		'<div class="tabs noselect faster kruzhki_info" id="tab' +
		id +
		'">    <div class="tab_title">  <button class="back_action">      <img src="/images/close.svg" alt="" class="back_btn noselect" /> </button>        <div>        </div>    </div>    <div class="kruzhki_info_container">        <img src="/images/kruzhki/' +
		img +
		'"></img>        <h1>' +
		name +
		"</h1>        <span>" +
		desc +
		'</span>        <span class="age">' +
		age +
		'</span>        <span class="time">' +
		time +
		'</span>        <span class="price">' +
		price +
		'</span>        <span class="teacher">Преподаватель: ' +
		author +
		'</span>        <img src="/images/kruzhki/qr.jpg" alt="" class="qr">    </div></div>';
	document.body.appendChild(tab);
	router.HideTab("tab" + id);
	$("#" + id).click(() => {
		if (!event.detail || event.detail == 1) {
			//activate on first click only to avoid hiding again on multiple clicks
			router.GoTo("tab" + id);
		}
	});
}

// Добавление кружков автомат
$(document).ready(function () {
	fetch(window.location.href + "/data/kruzhki.json")
		.then((response) => response.json())
		.then((array) => {
			array.forEach((element) => {
				AddKruzhok(
					element.id,
					element.name,
					element.img,
					element.author,
					element.desc,
					element.age,
					element.time,
					element.price
				);
			});
			//add scrollbars
			new SimpleBar(document.querySelector(".kruzhki_containter"), {
				autoHide: false,
			});
			SmartClick(".back_action", () => router.GoBack());
		});
});

var no_active_delay = 299; // Количество секунд простоя мыши, при котором пользователь считается неактивным
var now_no_active = 0; // Текущее количество секунд простоя мыши
setInterval("now_no_active++;", 1000); // Каждую секунду увеличиваем количество секунд простоя мыши
setInterval("updateChat()", 1000); // Запускаем функцию updateChat() через определённый интервал
document.body.onclick = activeUser; // Ставим обработчик на клик мыши
function activeUser() {
	now_no_active = 0; // Обнуляем счётчик простоя секунд
}
function updateChat() {
	if (now_no_active >= no_active_delay) {
		// Проверяем не превышен ли "предел активности" пользователя
		router.GoToMenu();
		now_no_active = 0;
		return;
	}
}
