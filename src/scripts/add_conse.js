function Cons_tab(id) {
	if (!$("#constab_" + id).hasClass("cons_tab_active")) {
		$(".cons_tab").removeClass("cons_tab_active");
		$("#constab_" + id).addClass("cons_tab_active");
		$(".images_cons").css("display", "none");
		$("#cons_image_" + id).css("display", "block");
		animateCSS("cons_image_" + id, "fadeIn", () => {});
	}
}

$(document).ready(() => {
	$(".images_cons").css("display", "none");
});
