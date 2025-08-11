document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }

    // Password visibility toggle
    const toggle = document.getElementById('show-pass');
    const senha = document.getElementById('senha');
    if (toggle && senha) {
        toggle.addEventListener('click', () => {
            const isPass = senha.type === 'password';
            senha.type = isPass ? 'text' : 'password';
            toggle.setAttribute('aria-label', isPass ? 'Ocultar senha' : 'Mostrar senha');

            // Recreate the icon
            toggle.innerHTML = '';
            const iconName = isPass ? 'eye-off' : 'eye';
            const i = document.createElement('i');
            i.setAttribute('data-lucide', iconName);
            toggle.appendChild(i);
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        });
    }

    // Login form submission
    const loginForm = document.querySelector('.login-form');
    const messageDiv = document.getElementById('message-feedback');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        messageDiv.textContent = ''; // Clear previous messages

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('senha').value.trim();
        const perfil = document.getElementById('perfil').value;

        if (!perfil) {
            messageDiv.style.color = 'red';
            messageDiv.textContent = 'Por favor, selecione um perfil de acesso.';
            return;
        }

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

            // Store the token
            localStorage.setItem('authToken', data.token);

            messageDiv.style.color = 'green';
            messageDiv.textContent = 'Login bem-sucedido!';

            // Here you would typically redirect to a dashboard
            alert('Login bem-sucedido! O token foi salvo. Em uma aplicação real, você seria redirecionado para o seu painel.');
            // Example redirection:
            // window.location.href = '/dashboard.html';

        } catch (error) {
            messageDiv.style.color = 'red';
            messageDiv.textContent = `Erro: ${error.message}`;
        }
    });
});
