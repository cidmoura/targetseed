document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const messageDiv = document.getElementById('message');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        messageDiv.textContent = ''; // Clear previous messages

        const email = loginForm.email.value;
        const password = loginForm.password.value;

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }

            // Store the token and provide feedback
            localStorage.setItem('authToken', data.token);
            messageDiv.style.color = 'green';
            messageDiv.textContent = 'Login successful! Token stored.';

            // You can redirect to a dashboard page here, e.g.:
            // window.location.href = '/dashboard.html';

        } catch (error) {
            messageDiv.style.color = 'red';
            messageDiv.textContent = error.message;
        }
    });
});
