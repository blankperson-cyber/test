
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".signup-link").addEventListener("click", function (e) {
        e.preventDefault();
        document.body.classList.add("page-exit");
        setTimeout(() => {
            window.location.href = "signup.html";
        }, 500); // Match the animation duration
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".loginlink").addEventListener("click", function (e) {
        e.preventDefault();
        document.body.classList.add("page-exit");
        setTimeout(() => {
            window.location.href = "login.html";
        }, 500); // Match the animation duration
    });
});
