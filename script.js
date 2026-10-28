const WHATSAPP_NUMBER = "918459151065";
const inputs = Array.from(document.querySelectorAll(".stepper input"));
const countEl = document.getElementById("item-count");
const hintEl = document.getElementById("cart-hint");
const totalEl = document.getElementById("cart-total");
const orderButton = document.getElementById("order-button");
const customerNameInput = document.getElementById("customer-name");
document.getElementById("year").textContent = new Date().getFullYear();

function clampQuantity(input) {
  let value = Number.parseInt(input.value, 10);
  if (!Number.isFinite(value)) value = 0;
  value = Math.max(0, Math.min(99, value));
  input.value = value;
  return value;
}
function selectedItems() {
  return inputs.map(input => ({
    name: input.dataset.name,
    price: Number(input.dataset.price),
    quantity: clampQuantity(input)
  })).filter(item => item.quantity > 0);
}
function rupees(value) {
  return "₹" + value.toLocaleString("en-IN");
}
function updateCart() {
  const items = selectedItems();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  countEl.textContent = `${count} ${count === 1 ? "item" : "items"} selected`;
  hintEl.textContent = count ? "Your order summary will be prepared for WhatsApp." : "Choose products above to begin your order.";
  totalEl.textContent = rupees(total);
  orderButton.disabled = count === 0;
}
document.querySelectorAll(".stepper button").forEach(button => {
  button.addEventListener("click", () => {
    const input = document.getElementById(button.dataset.for);
    input.value = Math.max(0, Math.min(99, clampQuantity(input) + Number(button.dataset.step)));
    updateCart();
  });
});
inputs.forEach(input => input.addEventListener("input", updateCart));

function sendWhatsAppOrder() {
  const items = selectedItems();
  if (!items.length) {
    alert("Please select at least one product and quantity first.");
    return;
  }
  const customerName = customerNameInput.value.trim();
  if (!customerName) {
    customerNameInput.focus();
    alert("Please enter your name before placing the order.");
    return;
  }
  const lines = items.map(item => `• ${item.name} × ${item.quantity} = ${rupees(item.price * item.quantity)}`);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const message = [
    "Hello Nirmal Ayurveda! 🌿",
    "",
    `Customer name: ${customerName}`,
    "",
    "I'd like to place an order:",
    ...lines,
    "",
    `Estimated product total: ${rupees(total)}`,
    "",
    "Please confirm availability, delivery charges and the final amount.",
    "",
    "Delivery address:",
    "Payment preference:"
  ].join("\n");
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
orderButton.addEventListener("click", sendWhatsAppOrder);
document.getElementById("bottom-order-button").addEventListener("click", () => {
  if (selectedItems().length) {
    sendWhatsAppOrder();
  } else {
    document.getElementById("products").scrollIntoView({ behavior: "smooth" });
    document.querySelector(".stepper input")?.focus({ preventScroll: true });
  }
});
updateCart();
