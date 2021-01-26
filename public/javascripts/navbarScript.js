// navbar sticky script
window.addEventListener("scroll", function(){
    const navbar = document.querySelector(".navbar");
    navbar.classList.toggle("sticky", window.scrollY > 20);
})

// navbar menu button script
const menubtn = document.querySelector('.menu-btn i');
const navbarMenu = document.querySelector(".navbar .menu");
menubtn.addEventListener('click', function(){
    menubtn.classList.toggle("active");
    navbarMenu.classList.toggle("active");
});

