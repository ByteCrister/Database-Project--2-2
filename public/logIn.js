const togglePasswordVisibility = () => {
    const passwordInput = document.getElementById("password");
    const showPasswordCheckbox = document.getElementById("show-password-checkbox");

    passwordInput.type = showPasswordCheckbox.checked ? "text" : "password";
};

const logIn = () => {
    console.log("logIn function called");

    $.ajax({
        url: "/logIn",
        method: "post",
        contentType: "application/json",
        data: JSON.stringify({
            email: $("#email").val(),
            password: $("#password").val(),
        }),
        success: (data) => {
            console.log("Server response:", data); // showing the server response
            if (data.success) {
                window.location.href = "/"; // Redirect to / - home route
            } else {
                document.getElementById('p-for-incorrect-information').style.visibility='visible';
            }
        },
        error: (error) => {
            console.error("Error:", error);
        },
    });
};
