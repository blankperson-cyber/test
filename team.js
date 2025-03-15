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

// change the infos dinamiclly depending on the team info in the index
document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ team.js loaded successfully!"); // Debugging log
    const pagetitle=document.getElementById('pagetitle');
    const teamTitle = document.querySelector(".mainsection p"); // Selects the main title
    const teamName = localStorage.getItem("teamName");
      
    if (teamTitle) {
        if (teamName) {
            teamTitle.textContent = teamName;
            pagetitle.textContent='LISI | Team ' + teamName;
            console.log("✅ Team name updated to:", teamName);
        } else {
            console.log("⚠️ No team name found in localStorage!");
        }
    } else {
        console.log("❌ Error: Cannot find '.mainsection p' in team.html!");
    }

    
});
