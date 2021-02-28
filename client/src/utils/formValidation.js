/* eslint-disable no-debugger */
export function minLengthValidation(inputData, minLength) {
  const { value, id } = inputData;

  removeClassErrorSuccess(inputData);

  if (value.length >= minLength) {
    document.getElementById(id).parentElement.classList.add("success");
    inputData.classList.add("success");
    return true;
  } else {
    document.getElementById(id).parentElement.classList.add("error");
    inputData.classList.add("error");
    return false;
  }
}

export function emailValidation(inputData) {
  const emailValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const { value, id } = inputData;

  removeClassErrorSuccess(inputData);

  const resultValidation = emailValid.test(value);
  if (resultValidation) {
    document.getElementById(id).parentElement.classList.add("success");
    inputData.classList.add("success");
    return true;
  } else {
    document.getElementById(id).parentElement.classList.add("error");
    inputData.classList.add("error");
    return false;
  }
}

function removeClassErrorSuccess(inputData) {
  const { id } = inputData;
  document.getElementById(id).parentElement.classList.remove("success");
  document.getElementById(id).parentElement.classList.remove("error");
  inputData.classList.remove("success");
  inputData.classList.remove("error");
}
