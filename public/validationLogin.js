$(document).ready(function() {
    $('#loginForm').validate({
      rules: {
        email: {
          required: true,
          email: true
        },
        password: {
          required: true,
          minlength: 8
        } 
      },
      messages: {
        email: {
          required: 'Email harus diisi',
          email: 'Email tidak valid'
        },
        password: {
          required: 'Password harus diisi',
          minlength: 'Password harus minimal 8 karakter'
        }
      },
    });
  });
  