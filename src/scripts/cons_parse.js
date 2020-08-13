function Cons_tab(id) {
	if(!$("#constab_" + id).hasClass("cons_tab_active")){
		$(".cons_tab").removeClass("cons_tab_active");
		$("#constab_" + id).addClass("cons_tab_active");
		$(".table_cons_container").css("display", "none");
		$("#constable_" + id).css("display", "block");
		animateCSS("constable_" + id, "fadeIn", () => {});
	}
}

$(document).ready(function () {
	fetch(window.location.href + "/data/cons.json")
		.then((response) => response.json())
		.then((array) => {
			//добавление табов
			// let tab_container = document.querySelector(".cons_tab_containter");
			let table_container = document.querySelector("#cons_container");
			array.forEach((element) => {
				const tab_container = document.querySelector(".cons_tab_containter");
				tab_container.innerHTML +=
					'<div class="cons_tab" id="constab_' +
					element.id +
					'" onclick="Cons_tab(' +
					element.id +
					')">' +
					element.fullname +
					"</div>";
				let tbody = "";
				let counter = 1;
				element.data.forEach((e) => {
					if (counter % 2 == 1) {
						tbody += `<tr>
                        <th>${e.FIO}</th>
                        <th>${e.class}</th>
                        <th>${e.time}</th>
                        <th>${e.kab}</th>
                    </tr>`;
					} else {
						tbody += `<tr class="tr2">
                        <th>${e.FIO}</th>
                        <th>${e.class}</th>
                        <th>${e.time}</th>
                        <th>${e.kab}</th>
                    </tr>`;
					}
					counter++;
				});
				table_container.innerHTML += `<div class="table_cons_container" id="constable_${element.id}">
                <table class="table">
                    <thead>
                        <tr>
                            <th>ФИО</th>
                            <th>Классы</th>
                            <th>Время</th>
                            <th>Кабинет</th>
                        </tr>
                    </thead>
                    <tbody>
                    ${tbody}
                </tbody>
            </table>
        </div>`;
				router.HideTab("constable_" + element.id);
			});
		});
});
