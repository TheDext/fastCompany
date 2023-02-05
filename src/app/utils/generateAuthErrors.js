function generateAuthErrors(message) {
  console.log(message);
    switch (message) {
        case "EMAIL_NOT_FOUND":
            return "Проверьте правильность вашего Email";
        case "INVALID_PASSWORD":
            return "Неверный пароль";
        default:
            return "Слишком много попыток входа. Попробуйте позже";
    }
}
export default generateAuthErrors;
