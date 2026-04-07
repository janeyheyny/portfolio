const disableMobileScroll = () => {
  const timelineContainer = document.querySelector(".timeline") as HTMLElement;
  if (!timelineContainer) return;

  timelineContainer.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
    },
    { passive: false }
  );

  timelineContainer.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault();
    },
    { passive: false }
  );
};

const initTimeline = () => {
  const toggleButtons = document.querySelectorAll("[data-timeline-toggle]");

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const isExpanded = button.getAttribute("aria-expanded") === "true";

      // Toggle the state
      button.setAttribute("aria-expanded", (!isExpanded).toString());

      const timelineItem = button.closest("[data-timeline-item]");
      const details = timelineItem?.querySelector(".timeline__details");
      details?.classList.toggle("timeline__details--expanded");

      // Update button text
      const textSpan = button.querySelector(".timeline__toggle-text");
      if (textSpan) {
        textSpan.textContent = isExpanded ? "See more" : "See less";
      }
    });
  });
};

const updateVerticalLineHeight = () => {
  const timelineContainer = document.querySelector(".timeline") as HTMLElement;
  const verticalLine = document.querySelector(".timeline__vertical-line") as HTMLElement;

  if (!timelineContainer || !verticalLine) return;

  const height = timelineContainer.scrollHeight;
  verticalLine.style.height = `${height}px`;
};

const initScrollButton = () => {
  const scrollDownBtn = document.querySelector("[data-timeline-scroll-down]") as HTMLElement;
  const scrollUpBtn = document.querySelector("[data-timeline-scroll-up]") as HTMLElement;
  const timelineContainer = document.querySelector(".timeline") as HTMLElement;

  if (!scrollDownBtn || !scrollUpBtn || !timelineContainer) return;

  const checkScrollPosition = () => {
    const isAtBottom =
      timelineContainer.scrollHeight - timelineContainer.scrollTop - timelineContainer.clientHeight < 10;
    const isAtTop = timelineContainer.scrollTop < 10;

    scrollDownBtn.style.display = isAtBottom ? "none" : "flex";
    scrollUpBtn.style.display = isAtTop ? "none" : "flex";
  };

  scrollDownBtn.addEventListener("click", () => {
    timelineContainer.scrollBy({
      top: 400,
      behavior: "smooth",
    });
  });

  scrollUpBtn.addEventListener("click", () => {
    timelineContainer.scrollBy({
      top: -400,
      behavior: "smooth",
    });
  });

  timelineContainer.addEventListener("scroll", checkScrollPosition);
  checkScrollPosition();
};

document.addEventListener("DOMContentLoaded", () => {
  disableMobileScroll();
  initTimeline();
  updateVerticalLineHeight();
  initScrollButton();

  window.addEventListener("resize", updateVerticalLineHeight);
});
