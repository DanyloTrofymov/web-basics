document.getElementById('myForm').addEventListener('submit', function (e) {
    e.preventDefault();

    var pib = document.getElementById('pib').value;
    var group = document.getElementById('group').value;
    var phone = document.getElementById('phone').value;
    var idCard = document.getElementById('idCard').value;
    var faculty = document.getElementById('faculty').value;

    // Регулярні вирази для перевірки валідності
    var pibPattern = /^[А-ЩЬЮЯҐІЇЄґ][а-щьюяґіїєҐІЇЄґ']+ [А-ЩЬЮЯҐІЇЄґ][а-щьюяґіїєҐІЇЄґ']+ [А-ЩЬЮЯҐІЇЄґ][а-щьюяґіїєҐІЇЄґ']+$/;
    var groupPattern = /^[А-ЯҐЄІ]+-[0-9]{2}$/;
    var phonePattern = /^\+(?:\d{1,3})?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,9}[-.\s]?\d{1,9}[-.\s]?\d{1,9}$/;
    var idCardPattern = /^\d{9}$/;
    var facultyPattern = /^[А-ЯҐЄІ]+$/;

    var isValid = true;

    if (!pibPattern.test(pib)) {
        document.getElementById('pib').style.backgroundColor = 'red';
        isValid = false;
    } else {
        document.getElementById('pib').style.backgroundColor = 'white';
    }

    if (!groupPattern.test(group)) {
        document.getElementById('group').style.backgroundColor = 'red';
        isValid = false;
    } else {
        document.getElementById('group').style.backgroundColor = 'white';
    }

    if (!phonePattern.test(phone)) {
        document.getElementById('phone').style.backgroundColor = 'red';
        isValid = false;
    } else {
        document.getElementById('phone').style.backgroundColor = 'white';
    }

    if (!idCardPattern.test(idCard)) {
        document.getElementById('idCard').style.backgroundColor = 'red';
        isValid = false;
    } else {
        document.getElementById('idCard').style.backgroundColor = 'white';
    }

    if (!facultyPattern.test(faculty)) {
        document.getElementById('faculty').style.backgroundColor = 'red';
        isValid = false;
    } else {
        document.getElementById('faculty').style.backgroundColor = 'white';
    }

    if (isValid) {
        var result = 'ПІБ: ' + pib + '<br>' +
            'Група: ' + group + '<br>' +
            'Телефон: ' + phone + '<br>' +
            'ID-card: ' + idCard + '<br>' +
            'Факультет: ' + faculty;

        document.getElementById('result').innerHTML = result;
    } else {
        document.getElementById('result').innerHTML = '';
    }
});
