document.addEventListener("DOMContentLoaded", function () {
    // retrieve order data from local storage
    const orderDataString = localStorage.getItem("orderData");
    const orderData = JSON.parse(orderDataString);

    if (orderData) {
        // Check if the element with ID "snapshotImage" exists
        const snapshotImageElement = document.getElementById("snapshotImage");
        if (snapshotImageElement) {
            snapshotImageElement.src = orderData.image;
        } else {
            console.error("Element with ID 'snapshotImage' not found in the document.");
        }

        // Check if the element with ID "shoeSize" exists
        const shoeSizeElement = document.getElementById("shoeSize");
        if (shoeSizeElement) {
            shoeSizeElement.textContent = orderData.shoeSize;
        } else {
            console.error("Element with ID 'shoeSize' not found in the document.");
        }

        // Check if the element with ID "quantity" exists
        const quantityElement = document.getElementById("quantity");
        if (quantityElement) {
            quantityElement.textContent = orderData.quantity;
        } else {
            console.error("Element with ID 'quantity' not found in the document.");
        }

        // Check if the element with ID "price" exists
        const priceElement = document.getElementById("price");
        if (priceElement) {
            priceElement.textContent = `$${orderData.price.toFixed(2)}`;
        } else {
            console.error("Element with ID 'price' not found in the document.");
        }

        // display order details in the DOM
        const orderOverview = document.getElementById("snapshotImage");
        if (orderOverview) {
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
        } else {
            console.error("Element with ID 'orderOverview' not found in the document.");
        }
    } else {
        console.error("Order data not found in local storage.");
    }

    // add event listener for the "BUY NOW" button
    // document.getElementById("buyBtn").addEventListener("click", function () {
    //     // send order data to the server
    //   fetch("your-api-endpoint", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(orderData),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       // Handle the response from the server
    //       console.log("Order placed successfully:", data);
    //     })
    //     .catch((error) => {
    //       console.error("Error placing order:", error);
    //     });
    // });
  });

  const colorLog = JSON.parse(localStorage.getItem("colorLog"));

  // Log colors on the checkout page
  console.log("Colors of selected objects (checkout):");
  Object.entries(colorLog).forEach(([objectName, colorHex]) => {
      console.log(`${objectName}: ${colorHex}`);
  });