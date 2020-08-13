function animateCSS(node_id, animationName, callback) {
    const node = document.getElementById(node_id);
    node.classList.add("animated", animationName);

    function handleAnimationEnd() {
        node.classList.remove("animated", animationName);
        node.removeEventListener("animationend", handleAnimationEnd);

        if (typeof callback === "function") callback();
    }

    node.addEventListener("animationend", handleAnimationEnd);
}

class Router {
    constructor(background) {
        this.background = document.getElementById(background);
        this.currentState = "menu";
        this.prevState = null;
        this.path = "/menu"
    }

    HideBackground() {
        animateCSS(this.background.id, "fadeOut", () => {
            this.background.style.opacity = "0";
        });
    }
    ShowBackground() {
        this.background.style.opacity = "100";
        animateCSS(this.background.id, "fadeIn", () => { });
    }
    HideTab(tab_id) {
        const node = document.getElementById(tab_id);
        node.style.display = "none";
    }
    ShowTab(tab_id) {
        const node = document.getElementById(tab_id);
        node.style.display = "block";
    }
    GetPrevState() {
        const reg = new RegExp("(\/[a-z]*)", "g")
        let rez = this.path.match(reg);
        let back = rez[rez.length - 2];
        const current = rez[rez.length - 1];
        this.path = this.path.replace(current, "");
        back = back.replace("/", "");
        this.prevState = back;
    }
    GoTo(tab_id) {
        this.HideBackground();
        this.path += "/" + tab_id;
        animateCSS(this.currentState, "bounceOutLeft", () => {
            this.HideTab(this.currentState);
            this.ShowTab(tab_id);
            animateCSS(tab_id, "bounceInRight", () => {
                this.currentState = tab_id;
            });
        });
    }
    GoBack() {
        this.GetPrevState();
        if (this.prevState == "menu") {
            this.ShowBackground();
            animateCSS(this.currentState, "bounceOutRight", () => {
                this.HideTab(this.currentState);
                this.ShowTab(this.prevState);
                animateCSS(this.prevState, "bounceInLeft", () => {
                    this.currentState = this.prevState;
                    this.prevState = null;
                });
            });
        } else {
            animateCSS(this.currentState, "bounceOutRight", () => {
                this.HideTab(this.currentState);
                this.ShowTab(this.prevState);
                animateCSS(this.prevState, "bounceInLeft", () => {
                    this.currentState = this.prevState;
                    this.prevState = null;
                });
            });
        }
    }

}

//Универсальный бинд на клик с защитой от мультиклика
function SmartClick(targetSelector, action) {
    $(targetSelector).click((ev) => {
        ev.preventDefault();
        action();
        $(targetSelector).prop("disabled", true);
        setTimeout(() => {
            $(targetSelector).prop("disabled", false);
        }, 1000);
    })
}