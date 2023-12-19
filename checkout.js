document.addEventListener("DOMContentLoaded", function () {
  // const customerName = "Joris Hens";
  // const email = "joris@hens.be";
  // const price = 175.00;

  // retrieve order data from local storage
  const orderDataString = localStorage.getItem("orderData");
  const orderData = JSON.parse(orderDataString);

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateRandomStreetName() {
    const streetNames = [
      "Main Street",
      "Maple Avenue",
      "Oak Street",
      "Park Road",
      "Chestnut Street",
    ];
    const randomIndex = getRandomInt(0, streetNames.length - 1);
    return streetNames[randomIndex];
  }

  function generateRandomPostalCode() {
    return `1${getRandomInt(1000, 9999)}`;
  }

  function generateRandomBelgianAddress() {
    const streetName = generateRandomStreetName();
    const streetNumber = getRandomInt(1, 100);
    const postalCode = generateRandomPostalCode();
    return `${streetNumber} ${streetName}, Belgium ${postalCode}`;
  }

  const userDetailString = localStorage.getItem("userDetails");
  const userDetails = JSON.parse(userDetailString);

  if (orderData) {
    // Check if the element with ID "snapshotImage" exists
    const snapshotImageElement = document.getElementById("snapshotImage");
    if (snapshotImageElement) {
      snapshotImageElement.src = orderData.image;
    } else {
      console.error(
        "Element with ID 'snapshotImage' not found in the document."
      );
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

    const customerNameElement = document.getElementById("customerName");
    if (customerNameElement) {
      customerNameElement.textContent =
        userDetails.firstName + " " + userDetails.lastName;
    } else {
      console.error(
        "Element with ID 'customerName' not found in the document."
      );
    }

    const emailElement = document.getElementById("email");
    if (emailElement) {
      emailElement.textContent = userDetails.email;
    } else {
      console.error("Element with ID 'email' not found in the document.");
    }

    const orderNumberElement = document.getElementById("orderNumber");
    if (orderNumberElement) {
      // generate a random order number
      orderData.orderNumber = Math.floor(Math.random() * 1000000000);
      orderNumberElement.textContent = orderData.orderNumber;
    } else {
      console.error("Element with ID 'orderNumber' not found in the document.");
    }

    const customerIdElement = document.getElementById("customerId");
    // generate a random customer ID, not only numbers but also letters
    if (customerIdElement) {
      orderData.customerId = Math.random().toString(36).substr(2, 9);
      customerIdElement.textContent = orderData.customerId;
    } else {
      console.error("Element with ID 'customerId' not found in the document.");
    }

    const deliveryAddressElement = document.getElementById("deliveryAddress");
    if (deliveryAddressElement) {
      // generate a random Belgian-style delivery address
      orderData.deliveryAddress = generateRandomBelgianAddress();
      deliveryAddressElement.textContent =
        userDetails.streetName +
        " " +
        userDetails.streetNumber +
        ", " +
        userDetails.postalCode +
        " " +
        userDetails.city +
        ", " +
        userDetails.country;
    } else {
      console.error(
        "Element with ID 'deliveryAddress' not found in the document."
      );
    }

    const orderDateElement = document.getElementById("orderDate");
    if (orderDateElement) {
      // generate a random order date
      orderData.orderDate = new Date().toLocaleDateString();
      orderDateElement.textContent = orderData.orderDate;
    } else {
      console.error("Element with ID 'orderDate' not found in the document.");
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
      console.error(
        "Element with ID 'orderOverview' not found in the document."
      );
    }
  } else {
    console.error("Order data not found in local storage.");
  }

  const streetName = generateRandomStreetName();
  const streetNumber = getRandomInt(1, 100);
  const postalCode = generateRandomPostalCode();

  const requestBody = {
    customerId: orderData.customerId,
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    deliveryAdress: {
      fullAdress: `${userDetails.streetNumber} ${userDetails.streetName}, ${userDetails.city} ${userDetails.postalCode}, ${userDetails.country}`,
      streetName: userDetails.streetName,
      streetNumber: userDetails.streetNumber,
      postalCode: userDetails.postalCode,
      shippingTo: userDetails.country,
      shippingFrom: "London",
    },
    email: userDetails.email,
    orderNumber: orderData.orderNumber,
    orderDate: orderData.orderDate,
    shoeSize: orderData.shoeSize,
    price: orderData.price,
    image: orderData.image,
    quantity: orderData.quantity,
    status: "Pending",
  };

  const socket = new WebSocket("ws://localhost:3000/primus"); // Replace with your WebSocket server URL

  // add event listener for the "BUY NOW" button
  document.getElementById("buyBtn").addEventListener("click", function () {
    orderData.orderDate = new Date();

    console.log("Order data:", requestBody);

    // Send order data to the WebSocket server
    const websocketPayload = {
      action: "newOrder",
      data: requestBody,
    };

    socket.send(JSON.stringify(websocketPayload));

    // send order data to the server
    fetch("http://localhost:3000/api/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log("Order placed successfully:", data);

        window.location.href = "./thank-you.html";
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  });
});
