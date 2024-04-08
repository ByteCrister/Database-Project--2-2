document.addEventListener('DOMContentLoaded', function() {
    const togglePassword = () => {
        var passwordInput = document.getElementById("password");
        var togglePassword = document.querySelector(".toggle-password");

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePassword.textContent = "Hide Password";
        } else {
            passwordInput.type = "password";
            togglePassword.textContent = "Show Password";
        }
    };

    const signIn = () => {
        console.log("signIn function called");

        $.ajax({
            url: "/signIn",
            method: "post",
            contentType: "application/json",
            data: JSON.stringify({
                firstName: $("#firstName").val(),
                lastName: $("#lastName").val(),
                email: $("#email").val(),
                password: $("#password").val(), // Change id to 'password'
            }),
            success: (data) => {
                console.log("Server response:", data); // showing the server response
                if (data.success) {
                    window.location.href = "/"; // Redirect to / - home route
                } else {
                    document.getElementById('p-for-incorrect-information').style.visibility = 'visible';
                }
            },
            error: (error) => {
                console.error("Error:", error);
            },
        });
    };

    const signInButton = document.getElementById('signInButton');
    signInButton.addEventListener('click', signIn);

    const togglePasswordButton = document.querySelector(".toggle-password");
    togglePasswordButton.addEventListener('click', togglePassword);
});
