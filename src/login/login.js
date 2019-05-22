const form = document.getElementById('login-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const user = {
        email: formData.get('email'),
        password: formData.get('password'),
    };

    console.log(user);

    onSubmitLogin(user);
});

const onSubmitLogin = (user) => {
    event.preventDefault();
    fetch('http://localhost:3000/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: user.email,
            password: user.password
        })
    })
        .then(response => response.json())
        .then(data => {
            if(data.userId && data.success === 'true') {
                console.log(data);
                saveAuthToken(data.token);
            }
        });
};

const saveAuthToken = token => {
    window.sessionStorage.setItem('token', token);
};