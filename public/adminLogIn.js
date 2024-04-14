const togglePasswordVisibility = () => {
    const passwordInput = document.getElementById("adminPassword");
    const showPasswordCheckbox = document.getElementById("show-password-checkbox");

    passwordInput.type = showPasswordCheckbox.checked ? "text" : "password";
};

const logIn = () => {
    console.log("logIn function called");

    $.ajax({
        url: "/adminLogIn",
        method: "post",
        contentType: "application/json",
        data: JSON.stringify({
            adminName: $("#adminName").val(),
            adminPassword: $("#adminPassword").val(),
        }),
        success: (data) => {
            console.log("Server response:", data); // Log the server response
            if (data.success) {
                window.location.href = "/"; // Redirect to / on success
            } else {
                document.getElementById('p-for-incorrect-information').style.visibility='visible';
            }
        },
        error: (error) => {
            console.error("Error:", error);
        },
    });
};
