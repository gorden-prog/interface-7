const header = document.querySelector(".header");
const burger = document.querySelector(".burger");
const navigation = document.querySelector("#navigation");
const mobile = window.matchMedia("(max-width: 768px)");

function setMenu(open) {
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
  document.body.classList.toggle("menu-open", open);
}

burger.addEventListener("click", () => {
  setMenu(burger.getAttribute("aria-expanded") !== "true");
});
navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    setMenu(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && burger.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    burger.focus();
  }
});
mobile.addEventListener("change", () => setMenu(false));

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 50);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const quotes = [
  "Люблю начинать день с капучино и нескольких минут тишины.",
  "Выбираю эспрессо, когда хочется крепкого кофе с насыщенным вкусом.",
  "В дождливый день всегда заказываю пряный чай латте."
];
const quote = document.querySelector("#quote");
let currentQuote = 0;

function changeQuote(step) {
  currentQuote = (currentQuote + step + quotes.length) % quotes.length;
  quote.textContent = quotes[currentQuote];
}
document.querySelector(".previous").addEventListener("click", () => changeQuote(-1));
document.querySelector(".next").addEventListener("click", () => changeQuote(1));

document.querySelector("#subscription").addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("#status").textContent = "Уведомления о новинках будут поступать вам на почту.";
  event.currentTarget.reset();
});

const actionDialog = document.querySelector("#action-dialog");
const actionTitle = document.querySelector("#action-title");

document.querySelectorAll("[data-action-title]").forEach((button) => {
  button.addEventListener("click", () => {
    const drink = button.closest(".drink")?.querySelector("h3");
    actionTitle.textContent = drink ? `Заказ: ${drink.textContent}` : button.dataset.actionTitle;
    actionDialog.showModal();
  });
});
