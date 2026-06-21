const headerSearchToggle = document.getElementById("header-search-toggle");
const headerSearchForm = document.getElementById("header-search-form");
const headerSearchInput = document.getElementById("header-search-input");

if (headerSearchToggle && headerSearchForm && headerSearchInput) {
  headerSearchToggle.addEventListener("click", () => {
    headerSearchForm.classList.toggle("active");

    if (headerSearchForm.classList.contains("active")) {
      setTimeout(() => {
        headerSearchInput.focus();
      }, 180);
    }
  });

  headerSearchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const query = headerSearchInput.value.trim();

    if (!query) {
      headerSearchForm.classList.remove("active");
      return;
    }

    window.location.href = `./busca.html?query=${encodeURIComponent(query)}`;
  });
}