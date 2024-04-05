

function togglePassword() {
    var passwordInput = document.getElementById("adminPassword");
    var togglePassword = document.querySelector(".toggle-password");
    
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.textContent = "Hide Password";
    } else {
        passwordInput.type = "password";
        togglePassword.textContent = "Show Password";
    }
}

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
