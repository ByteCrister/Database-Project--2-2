document.addEventListener("DOMContentLoaded", function () {
    const togglePasswordVisibility = () => {
        const passwordInput = document.getElementById("adminPassword");
        const showPasswordCheckbox = document.getElementById("show-password-checkbox");

        passwordInput.type = showPasswordCheckbox.checked ? "text" : "password";
    };

    const togglePasswordButton = document.querySelector("#show-password-checkbox");
    togglePasswordButton.addEventListener("click", togglePasswordVisibility);
});
