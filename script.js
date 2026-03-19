$(document).ready(function () {

  // ================= STICKY HEADER =================
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }

    updateActiveSection();
  });

  // ================= NAVIGATION SCROLL =================
  $(".header ul li a").click(function (e) {
    e.preventDefault();

    var target = $(this).attr("href");

    if ($(target).hasClass("active-section")) return;

    if (target === "#home") {
      $("html, body").animate({ scrollTop: 0 }, 500);
    } else {
      var offset = $(target).offset().top - 40;
      $("html, body").animate({ scrollTop: offset }, 500);
    }

    $(".header ul li a").removeClass("active");
    $(this).addClass("active");
  });

  // ================= SCROLL REVEAL =================
  ScrollReveal({
    distance: "100px",
    duration: 2000,
    delay: 200
  });

  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
    origin: "left"
  });

  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
    origin: "right"
  });

  ScrollReveal().reveal(".project-title, .contact-title", {
    origin: "top"
  });

  ScrollReveal().reveal(".projects, .contact", {
    origin: "bottom"
  });

  // ================= CONTACT FORM (FORM SPREE) =================
  const form = document.getElementById("contact-form"); // ✅ FIXED
  const msg = document.getElementById("msg");
  const btn = document.querySelector("#contact-form button[type='submit']"); // ✅ SAFE SELECTOR

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      if (btn) {
        btn.disabled = true;
        btn.innerText = "Sending...";
      }

      const data = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: data,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          msg.innerHTML = "Message sent successfully ✅";
          msg.style.color = "#fed700";
          form.reset();
        } else {
          msg.innerHTML = "Oops! Something went wrong ❌";
        }

      } catch (error) {
        msg.innerHTML = "Network error ❌";
      }

      setTimeout(() => {
        msg.innerHTML = "";
        if (btn) {
          btn.disabled = false;
          btn.innerText = "Send Message";
        }
      }, 3000);
    });
  }

});


// ================= ACTIVE SECTION =================
function updateActiveSection() {
  var scrollPosition = $(window).scrollTop();

  if (scrollPosition === 0) {
    $(".header ul li a").removeClass("active");
    $(".header ul li a[href='#home']").addClass("active");
    return;
  }

  $("section").each(function () {
    var target = $(this).attr("id");
    var offset = $(this).offset().top;
    var height = $(this).outerHeight();

    if (
      scrollPosition >= offset - 40 &&
      scrollPosition < offset + height - 40
    ) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#" + target + "']").addClass("active");
    }
  });
}