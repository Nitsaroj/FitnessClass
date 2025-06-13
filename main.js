const btn = document.getElementById("menu-btn");
      const menu = document.getElementById("mobile-menu");
      btn.addEventListener("click", () => {
        menu.classList.toggle("hidden");
      });

      const slides = document.querySelectorAll(".slide");
      let current = 0;

      function showSlide(index) {
        slides.forEach((slide, i) => {
          slide.style.opacity = i === index ? "1" : "0";
        });
      }

      document.getElementById("prev").addEventListener("click", () => {
        current = (current - 1 + slides.length) % slides.length;
        showSlide(current);
      });

      document.getElementById("next").addEventListener("click", () => {
        current = (current + 1) % slides.length;
        showSlide(current);
      });

      // Auto slide
      setInterval(() => {
        current = (current + 1) % slides.length;
        showSlide(current);
      }, 6000);

      showSlide(current);

      function animateCounters() {
        const counters = document.querySelectorAll(".counter");

        counters.forEach((counter) => {
          const target = +counter.getAttribute("data-target");
          let count = 0;
          const duration = 2000;
          const increment = target / (duration / 30);

          const update = () => {
            count += increment;
            if (count < target) {
              counter.textContent = Math.ceil(count);
              requestAnimationFrame(update);
            } else {
              counter.textContent = target;
            }
          };

          update();
        });
      }

      const statsSection = document.getElementById("stats");
      let hasAnimated = false;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !hasAnimated) {
            animateCounters();
            hasAnimated = true;
            observer.unobserve(statsSection);
          }
        },
        {
          threshold: 0.3, // Start animation when 30% of section is visible
        }
      );

      observer.observe(statsSection);