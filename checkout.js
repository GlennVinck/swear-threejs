document.addEventListener("DOMContentLoaded", function () {

    const customerName = "Joris Hens";
    const email = "joris@hens.be";
    const price = 175.00;

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

        const customerNameElement = document.getElementById("customerName");
        if (customerNameElement) {
            customerNameElement.textContent = customerName;
        } else {
            console.error("Element with ID 'customerName' not found in the document.");
        }

        const emailElement = document.getElementById("email");
        if (emailElement) {
            emailElement.textContent = email;
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

        const deliveryAddressElement = document.getElementById("deliveryAddress");
        if (deliveryAddressElement) {
            // generate a random delivery address
            orderData.deliveryAddress = `${Math.floor(Math.random() * 1000)} Main Street`;
            deliveryAddressElement.textContent = orderData.deliveryAddress;
        } else {
            console.error("Element with ID 'deliveryAddress' not found in the document.");
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
            console.error("Element with ID 'orderOverview' not found in the document.");
        }
    } else {
        console.error("Order data not found in local storage.");
    }

    

    const requestBody = {
        customerName: customerName,
        deliveryAdress: orderData.deliveryAddress,
        email: email,
        orderNumber: orderData.orderNumber,
        orderDate: orderData.orderDate,
        shoeSize: orderData.shoeSize,
        price: orderData.price,
        image: orderData.image,
        quantity: orderData.quantity,
        status: "pending"
    };

    // add event listener for the "BUY NOW" button
    document.getElementById("buyBtn").addEventListener("click", function () {

        orderData.orderDate = new Date();

        console.log("Order data:", requestBody);
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
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    });
  });