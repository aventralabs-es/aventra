const filterButtons = document.querySelectorAll("[data-filter]");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const activeFilter = button.dataset.filter;

    filterButtons.forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    productCards.forEach((card) => {
      const shouldShow = activeFilter === "all" || card.dataset.category === activeFilter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});
