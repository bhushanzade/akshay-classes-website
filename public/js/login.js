import { config } from "./config.js";
import { showSuccessToast } from "./toast.js";
import { showErrorToast } from "./toast.js";
import { showErrors, validate } from "./validation.js";

let formError = {};

const validationRules = [
  {
    name: "username",
    rules: {
      required: { message: "Username is required" },
    }
  },
  {
    name: "password",
    rules: {
      required: { message: "Password is required" },
    }
  },
];

export async function loginAccount(event) {
  event.preventDefault();
  const login = document.getElementById("loginForm");
  const postData = {}
  validationRules.map(x => {
    const field = login.querySelector(`#${x.name}`);
    formError = validate(x.name, field.value, x.rules);
    postData[x.name] = field.value
  });

  if (formError && Object.keys(formError).length > 0) {
    return;
  }
  const url = config.v1.apiUrl + "/login";
  document.getElementById("loginbtn").disabled = true;
  document.getElementById("loginbtn").textContent = "Please Wait ...";
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...postData })
    });
    const data = await res.json();
    if (!res.ok) {
      if (data.errors && Object.keys(data.errors).length > 0) {
        for (const key in data.errors) {
          if (Object.hasOwnProperty.call(data.errors, key)) {
            const messages = data.errors[key];
            showErrors(messages, key);
          }
        }
      }
      showErrorToast(data.message);
    } else {
      showSuccessToast(data.message);
      localStorage.setItem("classIsLoggedIn", true);
      window.location.href = "/index.html";
    }
  } catch (error) {
    console.log("error", error);
    showErrorToast(error.message);
  }
  document.getElementById("loginbtn").disabled = false;
  document.getElementById("loginbtn").textContent = "Login";
}

window.loginAccount = loginAccount;