document.addEventListener("DOMContentLoaded", function () {
    const togglePasswordVisibility = () => {
        const passwordInput = document.getElementById("adminPassword");
        const showPasswordCheckbox = document.getElementById("show-password-checkbox");

        passwordInput.type = showPasswordCheckbox.checked ? "text" : "password";
    };

    const generateStrongPassword = () => {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
        let password = "";
        for (let i = 0; i < 35; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@gmail\.com$/;
        return regex.test(email);
    };

    const logIn = () => {
        console.log("logIn function called");

        const email = $("#adminEmail").val();
        const passwordInvalidText = document.getElementById("p-for-incorrect-information");
        const emailInvalidText = document.getElementById("email-invalid-text");

        if (!validateEmail(email)) {
            emailInvalidText.style.visibility = "visible";
            passwordInvalidText.style.visibility = "hidden";
            return;
        } else {
            emailInvalidText.style.visibility = "hidden";
        }

        $.ajax({
            url: "/admin/jhvvytcsxersrewqawquygtoiuhiohhgiuguygfuyf",
            method: "post",
            contentType: "application/json",
            data: JSON.stringify({
                adminName: $("#adminName").val(),
                adminEmail: email,
                adminPassword: $("#adminPassword").val(),
            }),
            success: (data) => {
                console.log("Server response:", data); // Log the server response
                if (data.success) {
                    window.location.href = "/"; // Redirect to / on success
                } else {
                    passwordInvalidText.style.visibility = 'visible';
                }
            },
            error: (error) => {
                console.error("Error:", error);
            },
        });
    };

    const generatedPassword = generateStrongPassword();
    document.getElementById("adminPassword").value = generatedPassword;

    const togglePasswordButton = document.querySelector("#show-password-checkbox");
    togglePasswordButton.addEventListener("click", togglePasswordVisibility);
});
