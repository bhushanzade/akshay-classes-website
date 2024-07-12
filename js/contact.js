import { config } from "./config.js";
import { showSuccessToast } from "./toast.js";
import { showErrorToast } from "./toast.js";
import { showErrors, validate } from "./validation.js";

let formError = {};

const validationRules = [
  {
    name: "name",
    rules: {
      required: { message: "Name is required" },
    }
  },
  {
    name: "email",
    rules: {
      required: { message: "Email id is required" },
      email: { message: "Email must be valid email address" }
    }
  },
  {
    name: "mobile",
    rules: {
      required: { message: "Mobile number is required" },
      pattern: {
        value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
        message: "Mobile number is invalid"
      }
    }
  },
  {
    name: "message",
    rules: {
      required: { message: "Message is required" },
    }
  },
];

export async function createContactMessage(event) {
  event.preventDefault();
  const postData = {}
  const contact = document.getElementById("contactForm");
  validationRules.map(x => {
    const field = contact.querySelector(`#${x.name}`);
    formError = validate(x.name, field.value, x.rules);
    postData[x.name] = field.value
  });
  if (formError && Object.keys(formError).length > 0) {
    return;
  }
  const url = config.v1.apiUrl + "/contact";
  document.getElementById("createContactMessageBtn").disabled = true;
  document.getElementById("createContactMessageBtn").value = "Please Wait ...";
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
      document.getElementById('contactForm').reset();
    }
  } catch (error) {
    console.log("error", error);
    showErrorToast(error.message);
  }
  document.getElementById("createContactMessageBtn").disabled = false;
  document.getElementById("createContactMessageBtn").value = "Send Message";
}

async function contactMessages() {
  const url = new URL(config.v1.apiUrl + "/contacts");
  const isLoggedin = !!localStorage.getItem("classIsLoggedIn");
  if (isLoggedin) url.searchParams.append("isLogin", isLoggedin);
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
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
      if (res.status == 404) {
        window.location.href = "/";
      }
    } else {
      if (data && Array.isArray(data) && data.length > 0) {
        $("#contacts").empty();
        let newItems = '';
        data.map((x) => {
          const newReview = $(`<div class="col-md-4 mb-3">
              <div class="card text-center bg-primary p-2 text-white">
                <div class="d-flex flex-wrap justify-content-between mb-2">
                  <h6 class="font-size-20">${x.name}</h6>
                  <h6 class="font-size-20">${moment(x.created_at).format("LLL")}</h6>
                </div>
                <p style="font-size: 14px;">&ldquo;${x.message}&rdquo;</p>
              </div>
            </div>
            `);
          $("#contacts").append(newReview);
        })
      }

    }
  } catch (error) {
    console.log("error", error);
    showErrorToast(error.message);
  }
}

window.createContactMessage = createContactMessage;
window.contactMessages = contactMessages;