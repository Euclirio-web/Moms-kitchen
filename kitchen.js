
/* ==========================================
   MOM'S KITCHEN - ORDER SYSTEM
========================================== */


/* ==========================================
   1. FOOD CATEGORIES
========================================== */

const foodCategories = {

    // Frozen Food - Custom food list

    "Frozen Food": [],


    // Pudding and Watalappan

    "Pudding & Watalappan": [
        "Pudding",
        "Watalappan"
    ],


    // Traditional Awurudu Sweets

    "Awurudu Kema": [
        "Kewum",
        "Kokis",
        "Aluwa",
        "Mung Kevum",
        "Asmi",
        "Dodol",
        "Kiriya"
    ],


    // Rolls and Pastries

    "Rolls & Pastries": [
        "Cutlets",
        "Rolls",
        "Pastries"
    ]

};


/* ==========================================
   2. GLOBAL VARIABLES
========================================== */

let selectedCategory = "";


/* ==========================================
   3. SELECT PRIMARY CATEGORY
========================================== */

function selectCategory(category) {

    // Check category exists

    if (!(category in foodCategories)) {
        return;
    }

    selectedCategory = category;


    // Get HTML elements

    const orderSection =
        document.getElementById("orderSection");

    const primary =
        document.getElementById("primaryCategory");

    const secondary =
        document.getElementById("secondaryCategory");

    const secondaryGroup =
        document.getElementById("secondaryGroup");

    const customGroup =
        document.getElementById("customGroup");

    const customFood =
        document.getElementById("customFood");

    const quantityGroup =
        document.getElementById("quantityGroup");

    const quantity =
        document.getElementById("quantity");


    /* ======================================
       4. SHOW ORDER FORM
    ====================================== */

    orderSection.hidden = false;


    /* ======================================
       5. LOCK PRIMARY CATEGORY
    ====================================== */

    primary.innerHTML = "";

    const primaryOption =
        document.createElement("option");

    primaryOption.value = category;
    primaryOption.textContent = category;

    primary.appendChild(primaryOption);

    primary.value = category;

    primary.disabled = true;


    /* ======================================
       6. RESET PREVIOUS SELECTIONS
    ====================================== */

    secondary.innerHTML =
        '<option value="">Select a food item</option>';

    customFood.value = "";

    quantity.value = 1;


    /* ======================================
       7. FROZEN FOOD - CUSTOM LIST
    ====================================== */

    if (category === "Frozen Food") {

        // Hide secondary dropdown

        secondaryGroup.hidden = true;

        // Show custom food list

        customGroup.hidden = false;

        // Hide quantity field because customer
        // can enter quantities in the custom list

        quantityGroup.hidden = true;

        // Form validation

        customFood.required = true;
        secondary.required = false;

    }


    /* ======================================
       8. OTHER CATEGORIES - DROPDOWN
    ====================================== */

    else {

        // Show secondary dropdown

        secondaryGroup.hidden = false;

        // Hide custom list

        customGroup.hidden = true;

        // Show quantity

        quantityGroup.hidden = false;

        // Form validation

        customFood.required = false;
        secondary.required = true;


        /* Add secondary options */

        foodCategories[category].forEach(item => {

            const option =
                document.createElement("option");

            option.value = item;

            option.textContent = item;

            secondary.appendChild(option);

        });

    }


    /* ======================================
       9. SCROLL TO ORDER FORM
    ====================================== */

    orderSection.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}


/* ==========================================
   10. ORDER FORM SUBMISSION
========================================== */

document.getElementById("foodOrderForm")
    .addEventListener("submit", function(event) {

        // Prevent normal form submission

        event.preventDefault();


        /* ==================================
           11. COLLECT CUSTOMER DETAILS
        ================================== */

        const name =
            document.getElementById("customerName")
                .value.trim();

        const phone =
            document.getElementById("customerPhone")
                .value.trim();


        /* ==================================
           12. COLLECT FOOD DETAILS
        ================================== */

        const secondary =
            document.getElementById("secondaryCategory")
                .value;

        const customFood =
            document.getElementById("customFood")
                .value.trim();

        const quantity =
            document.getElementById("quantity")
                .value;


        /* ==================================
           13. PREPARE ORDER DETAILS
        ================================== */

        let orderDetails = "";


        // Frozen Food uses custom list

        if (selectedCategory === "Frozen Food") {

            if (customFood === "") {

                alert("Please enter your frozen food list.");

                return;
            }

            orderDetails = customFood;

        }


        // All other categories use dropdown

        else {

            if (secondary === "") {

                alert("Please select a food item.");

                return;
            }

            if (Number(quantity) < 1) {

                alert("Please enter a valid quantity.");

                return;
            }

            orderDetails =
                secondary +
                " - Quantity: " +
                quantity;

        }


        /* ==================================
           14. VALIDATE CUSTOMER DETAILS
        ================================== */

        if (name === "" || phone === "") {

            alert("Please enter your name and phone number.");

            return;
        }


        /* ==================================
           15. CREATE WHATSAPP MESSAGE
        ================================== */

        const message =

            "Hello Mom's Kitchen!\n\n" +

            "I would like to place an order.\n\n" +

            "Customer Name: " + name + "\n" +

            "Phone Number: " + phone + "\n\n" +

            "Food Category: " +
            selectedCategory + "\n\n" +

            "Order Details:\n" +
            orderDetails + "\n\n" +

            "Please confirm availability and price. Thank you!";


        /* ==================================
           16. BUSINESS WHATSAPP NUMBER
        ================================== */

        // Replace with your mom's WhatsApp number.
        // Format: country code + number
        // Example: 947XXXXXXXX

        const whatsappNumber = "947XXXXXXXX";


        /* ==================================
           17. GENERATE WHATSAPP LINK
        ================================== */

        const whatsappURL =

            "https://wa.me/" +

            whatsappNumber +

            "?text=" +

            encodeURIComponent(message);


        /* ==================================
           18. OPEN WHATSAPP
        ================================== */

        window.open(

            whatsappURL,

            "_blank",

            "noopener,noreferrer"

        );

    });
