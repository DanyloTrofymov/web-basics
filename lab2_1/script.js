

function validateAndStyleInput(inputElement, regexPattern) {
    const isValid = regexPattern.test(inputElement.value);
    inputElement.style.backgroundColor = isValid ? 'white' : 'red';
    return isValid;
}


// Регулярні вирази для перевірки валідності
var pibPattern = /^[А-ЩЬЮЯҐІЇЄґ][а-щьюяґіїєҐІЇЄґ']+ [А-ЩЬЮЯҐІЇЄґ][а-щьюяґіїєҐІЇЄґ']+ [А-ЩЬЮЯҐІЇЄґ][а-щьюяґіїєҐІЇЄґ']+$/;
var groupPattern = /^[А-ЯҐЄІ]+-[0-9]{2}$/;
var phonePattern = /^\+(?:\d{1,3})?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,9}[-.\s]?\d{1,9}[-.\s]?\d{1,9}$/;
var idCardPattern = /^\d{9}$/;
var facultyPattern = /^[А-ЯҐЄІ]+$/;

document.getElementById('myForm').addEventListener('submit', function (e) {
    e.preventDefault();

    var pib = document.getElementById('pib');
    var group = document.getElementById('group');
    var phone = document.getElementById('phone');
    var idCard = document.getElementById('idCard');
    var faculty = document.getElementById('faculty');


    const isPibValid = validateAndStyleInput(pib, pibPattern);
    const isGroupValid = validateAndStyleInput(group, groupPattern);
    const isPhoneValid = validateAndStyleInput(phone, phonePattern);
    const isIdCardValid = validateAndStyleInput(idCard, idCardPattern);
    const isFacultyValid = validateAndStyleInput(faculty, facultyPattern);

    const isValid = isPibValid && isGroupValid && isPhoneValid && isIdCardValid && isFacultyValid;


    if (isValid) {
        var result = 'ПІБ: ' + pib.value + '<br>' +
            'Група: ' + group.value + '<br>' +
            'Телефон: ' + phone.value + '<br>' +
            'ID-card: ' + idCard.value + '<br>' +
            'Факультет: ' + faculty.value;

        document.getElementById('result').innerHTML = result;
    } else {
        document.getElementById('result').innerHTML = '';
    }
});
