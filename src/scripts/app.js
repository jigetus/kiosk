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
router.HideTab("cons");
router.HideTab("zvonki");
router.HideTab("hanoi");
SmartClick("#goto_rasp", () => router.GoTo("rasp"));
SmartClick("#goto_kruzhki", () => router.GoTo("kruzhki"));
// SmartClick("#goto_events", () => router.GoTo("events"));
// SmartClick("#goto_play", () => router.GoTo("play"));
SmartClick("#goto_cons", () => router.GoTo("cons"));
SmartClick("#goto_zvonki", () => router.GoTo("zvonki"));
SmartClick("#goto_play", () => router.GoTo("hanoi"));

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

// добавление возврата на главную страницу через 5 мин простоя

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
