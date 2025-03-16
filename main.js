window.addEventListener('load', function () {
  let loadingScreen = document.getElementById('loading-screen');
  let siteContent = document.querySelector('.site-content');

  setTimeout(() => {
      loadingScreen.classList.add('fade-out');
      setTimeout(() => {
          loadingScreen.style.display = 'none';
          if (siteContent) {
              siteContent.style.display = 'block';
              siteContent.classList.add('fade-in');
          }
      }, 1000);
  }, 500);
});

// ✅ LOGIN PAGE TRANSITION
document.addEventListener("DOMContentLoaded", function () {
  let loginLink = document.querySelector(".loginlink");
  if (loginLink) {
      loginLink.addEventListener("click", function (e) {
          e.preventDefault();
          document.body.classList.add("page-exit");
          setTimeout(() => {
              window.location.href = "login.html";
          }, 500);
      });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  let btn_menu = document.getElementById('menuicon');
  let btn_closemenu = document.getElementById('xicon');
  let menu = document.getElementById('menu');
  let mobileNav = document.querySelector('.mobile-nav');

  // Ensure the menu is hidden but still allows animation
  menu.style.visibility = "hidden"; 
  menu.style.opacity = "0";
  menu.style.transform = "translateX(100%)"; // Start off-screen to the right

  // Open menu with animation
  btn_menu.addEventListener('click', () => {
      mobileNav.classList.add("menu-active");

      menu.style.visibility = "visible"; // Make sure it's visible before animation
      setTimeout(() => {
          menu.style.opacity = "1";
          menu.style.transform = "translateX(0)"; // Slide in from right
      }, 10);

      btn_menu.style.opacity = "0"; // Hide menu icon
      setTimeout(() => {
          btn_menu.style.display = "none"; 
          btn_closemenu.style.display = "block"; 
          setTimeout(() => {
              btn_closemenu.style.opacity = "1"; 
          }, 10);
      }, 300);
  });

  // Close menu with animation
  btn_closemenu.addEventListener('click', () => {
      menu.style.opacity = "0";
      menu.style.transform = "translateX(100%)"; // Slide back to the right
      btn_closemenu.style.opacity = "0"; 

      setTimeout(() => {
          menu.style.visibility = "hidden"; 
          mobileNav.classList.remove("menu-active");
          btn_closemenu.style.display = "none"; 
          btn_menu.style.display = "block"; 
          setTimeout(() => {
              btn_menu.style.opacity = "1"; 
          }, 10);
      }, 300); 
  });
});

// ✅ SMOOTH SCROLL FUNCTIONALITY
document.addEventListener("DOMContentLoaded", function () {
  let explorBtn = document.querySelector(".explor");
  if (explorBtn) {
      explorBtn.addEventListener("click", () => {
          const bottom = document.body.scrollHeight;

          // Scroll to the bottom
          window.scrollTo({ top: bottom, behavior: "smooth" });

          // Scroll back up after a delay
          setTimeout(() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
          }, 1500);
      });
  }
});

// ✅ NAVIGATION ANIMATION ON SCROLL
let lastScrollTop = 0; // ✅ Keep only this one

window.addEventListener("scroll", function () {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        document.documentElement.style.setProperty('--appear-state', 'running'); // Scrolling Down
    } else {
        document.documentElement.style.setProperty('--appear-state', 'paused'); // Scrolling Up
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// ✅ NAVIGATION ANIMATION ON SCROLL on all devices
gsap.registerPlugin(ScrollTrigger);
document.querySelectorAll("section, .news-section, .labs-section, .labs-item, .teams-list").forEach((section) => {
    gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: section,
            start: "top 80%", 
            end: "top 40%",   
            toggleActions: "play none none reverse",
        }
    });
});

// ✅ NEWS SLIDER FUNCTIONALITY
window.addEventListener("load", () => {
    const slider = document.querySelector(".news-slider");
    const newsItems = document.querySelectorAll(".news-item");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
  
    if (!slider || !newsItems.length || !prevBtn || !nextBtn) return;
  
    let currentIndex = 0;
    const gap = 20;
    const itemWidth = newsItems[0].offsetWidth + gap;
    let startX = 0;
    let endX = 0;
    let isDragging = false;
    const threshold = 50; // Minimum swipe/drag distance
  
    function updateSlider(initial = false) {
      const offset = -currentIndex * itemWidth;
  
      if (initial) {
        slider.style.transition = "none";
      } else {
        slider.style.transition = "transform 0.5s ease-in-out";
      }
  
      slider.style.transform = `translateX(${offset}px)`;
  
      newsItems.forEach((item, index) => {
        item.classList.remove("active", "no-hover");
        if (index === currentIndex) {
          item.classList.add("active", "no-hover");
        }
      });
  
      if (initial) {
        setTimeout(() => {
          slider.style.transition = "transform 0.5s ease-in-out";
        }, 500);
      }
    }
  
    function nextSlide() {
      currentIndex = (currentIndex < newsItems.length - 1) ? currentIndex + 1 : 0;
      updateSlider();
    }
  
    function prevSlide() {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : newsItems.length - 1;
      updateSlider();
    }
  
    function handleSwipe() {
      const diff = startX - endX;
      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          nextSlide(); // Swipe left or drag left
        } else {
          prevSlide(); // Swipe right or drag right
        }
      }
    }
  
    // Mobile swipe events
    slider.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });
  
    slider.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      handleSwipe();
    });
  
    // PC mouse drag events
    slider.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.clientX;
      slider.style.cursor = "grabbing";
    });
  
    slider.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      endX = e.clientX;
    });
  
    slider.addEventListener("mouseup", () => {
      if (isDragging) {
        handleSwipe();
      }
      isDragging = false;
      slider.style.cursor = "grab";
    });
  
    slider.addEventListener("mouseleave", () => {
      isDragging = false;
      slider.style.cursor = "grab";
    });
  
    prevBtn.addEventListener("click", prevSlide);
    nextBtn.addEventListener("click", nextSlide);
    window.addEventListener("resize", () => updateSlider(true));
  
    setTimeout(() => {
      updateSlider(true);
    }, 10);
  });
  

// ✅ TEAM SELECTION AND NAVIGATION TO team.html
document.addEventListener("DOMContentLoaded", () => {
  let selectedTeam = null;
  const confirmBtn = document.getElementById("confirm-btn");

  document.querySelectorAll(".team-item").forEach(item => {
      item.addEventListener("click", function () {
          document.querySelectorAll(".team-item").forEach(team => team.classList.remove("selected"));
          this.classList.add("selected");

          selectedTeam = this.querySelector("input");
          confirmBtn.disabled = false;
      });
  });

  window.showTeamInfo = function () {
      if (!selectedTeam) {
          console.log("No team selected!");
          return;
      }

      // Store team details in localStorage for retrieval in team.html
      localStorage.setItem("teamName", selectedTeam.dataset.name);
      localStorage.setItem("teamDate", selectedTeam.dataset.date);
      localStorage.setItem("teamDescription", selectedTeam.dataset.description);
      localStorage.setItem("teamImage", selectedTeam.closest(".team-item").querySelector("img").src);

      // Redirect to team.html
      window.location.href = "team.html";
  };
});



console.log(document.querySelectorAll('.labs-content'));
