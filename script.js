document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };

    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('formMessage').innerText = 'Message sent successfully!';
            document.getElementById('formMessage').style.display = 'block';
            this.reset(); // Reset the form
        } else {
            throw new Error('Failed to send message');
        }
    })
    .catch(error => {
        document.getElementById('formMessage').innerText = 'Error: ' + error.message;
        document.getElementById('formMessage').style.display = 'block';
    });
});
