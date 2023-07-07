function signup() {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    email: 'a@c.com',
    password: 'Qwerty123@',
    phoneNumber: '3470000000',
    fullName: {
      firstName: 'Luigi',
      lastName: 'Verdi',
    },
    birthDate: '1980-02-08',
    address: {
      streetAddress: 'Via Roma 9',
      zip: 12345,
      town: 'BZ',
      country: 'IT',
    },
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch('http://localhost:3000/auth/signup', requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error));
}
