document.addEventListener("DOMContentLoaded", function () {
    // Retrieve order data from local storage
    const orderDataString = localStorage.getItem("orderData");
    const orderData = JSON.parse(orderDataString);

    document.getElementById("snapshotImage").src = orderData.image;
    document.getElementById("shoeSize").textContent = orderData.shoeSize;
    document.getElementById("quantity").textContent = orderData.quantity;
    document.getElementById("price").textContent = `$${orderData.price.toFixed(2)}`;
    document.getElementById("color").textContent = `#${orderData.color}`;

    // Display order details in the DOM
    const orderOverview = document.getElementById("orderOverview");
    const orderImage = new Image();
    orderImage.src = orderData.image;
    orderImage.alt = "Customized Shoe";
    orderOverview.appendChild(orderImage);

    const orderDetails = document.createElement("div");
    orderDetails.innerHTML = `
      <p>Size: ${orderData.shoeSize}</p>
      <p>Quantity: ${orderData.quantity}</p>
      <p>Price: $${orderData.price.toFixed(2)}</p>
    `;
    orderOverview.appendChild(orderDetails);

    // Add event listener for the "BUY NOW" button
    document.getElementById("buyBtn").addEventListener("click", function () {
      // Implement the logic to send data to your API
      // Use fetch or another method to send orderData to your server
      // Example:
      fetch("your-api-endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the server
          console.log("Order placed successfully:", data);
        })
        .catch((error) => {
          console.error("Error placing order:", error);
        });
    });
  });

  const colorLog = JSON.parse(localStorage.getItem("colorLog"));

// Log colors on the checkout page
console.log("Colors of selected objects (checkout):");
Object.entries(colorLog).forEach(([objectName, colorHex]) => {
  console.log(`${objectName}: ${colorHex}`);
});