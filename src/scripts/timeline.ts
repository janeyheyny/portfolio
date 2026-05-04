const initTimelineDetailsToggles = () => {
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

const syncTimelineVerticalLineHeight = () => {
  const timelineContainer = document.querySelector(".timeline") as HTMLElement;
  const verticalLine = document.querySelector(".timeline__vertical-line") as HTMLElement;

  if (!timelineContainer || !verticalLine) return;

  const height = timelineContainer.scrollHeight;
  verticalLine.style.height = `${height}px`;
};

const initTimelineScrollButtons = () => {
  const scrollDownButton = document.querySelector("[data-timeline-scroll-down]") as HTMLElement;
  const scrollUpButton = document.querySelector("[data-timeline-scroll-up]") as HTMLElement;
  const timelineContainer = document.querySelector(".timeline") as HTMLElement;

  if (!scrollDownButton || !scrollUpButton || !timelineContainer) return;

  const updateScrollButtonVisibility = () => {
    const isAtBottom =
      timelineContainer.scrollHeight - timelineContainer.scrollTop - timelineContainer.clientHeight < 10;
    const isAtTop = timelineContainer.scrollTop < 10;

    scrollDownButton.style.display = isAtBottom ? "none" : "flex";
    scrollUpButton.style.display = isAtTop ? "none" : "flex";
  };

  scrollDownButton.addEventListener("click", () => {
    timelineContainer.scrollBy({
      top: 400,
      behavior: "smooth",
    });
  });

  scrollUpButton.addEventListener("click", () => {
    timelineContainer.scrollBy({
      top: -400,
      behavior: "smooth",
    });
  });

  timelineContainer.addEventListener("scroll", updateScrollButtonVisibility);
  updateScrollButtonVisibility();
};

document.addEventListener("DOMContentLoaded", () => {
  initTimelineDetailsToggles();
  syncTimelineVerticalLineHeight();
  initTimelineScrollButtons();

  window.addEventListener("resize", syncTimelineVerticalLineHeight);
});
