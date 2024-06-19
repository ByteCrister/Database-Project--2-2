document.addEventListener('DOMContentLoaded', function() {
    const togglePasswordVisibility = () => {
        const passwordInput = document.getElementById("password");
        const showPasswordCheckbox = document.getElementById("show-password-checkbox");
    
        passwordInput.type = showPasswordCheckbox.checked ? "text" : "password";
    };

    const generateStrongPassword = () => {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
        let password = "";
        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePassword = (password) => {
        const minLength = 6;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return password.length >= minLength && hasUpperCase && hasLowerCase && hasSpecialChar;
    };

    const signIn = () => {
        console.log("signIn function called");

        const email = $("#email").val();
        const password = $("#password").val();
        const passwordInvalidText = document.getElementById('p-for-invalid-password');
        const emailExistsText = document.getElementById('p-for-incorrect-information');
        const emailInvalidText = document.getElementById('email-invalid-text');

        if (!validateEmail(email)) {
            emailInvalidText.style.visibility = 'visible';
            passwordInvalidText.style.visibility = 'hidden';
            emailExistsText.style.visibility = 'hidden';
            return;
        } else {
            emailInvalidText.style.visibility = 'hidden';
        }


        if (!validatePassword(password)) {
            passwordInvalidText.style.visibility = 'visible';
            emailExistsText.style.visibility = 'hidden';
            return;
        } else {
            passwordInvalidText.style.visibility = 'hidden';
        }

        $.ajax({
            url: "/signIn",
            method: "post",
            contentType: "application/json",
            data: JSON.stringify({
                firstName: $("#firstName").val(),
                lastName: $("#lastName").val(),
                email: email,
                password: password,
            }),
            success: (data) => {
                console.log("Server response:", data);
                if (data.success) {
                    // window.location.href = "/"; // Redirect to home route
                    emailExistsText.style.visibility = 'visible';
                    emailExistsText.innerHTML = 'Confirmation send to your email';
                } else {
                    emailExistsText.style.visibility = 'visible';
                    emailExistsText.innerHTML = 'Email already exists or something problem on your email. Please try again';
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

    const generatedPassword = generateStrongPassword();
    document.getElementById("password").value = generatedPassword;
});
