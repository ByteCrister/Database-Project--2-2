document.addEventListener('DOMContentLoaded', function() {
    const togglePasswordVisibility = () => {
        const passwordInput = document.getElementById("password");
        const showPasswordCheckbox = document.getElementById("show-password-checkbox");
    
        passwordInput.type = showPasswordCheckbox.checked ? "text" : "password";
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

    const togglePasswordButton = document.querySelector("#show-password-checkbox");
    togglePasswordButton.addEventListener('click', togglePasswordVisibility);
});
