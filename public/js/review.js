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
  {
    name: "rating",
    rules: {
      min: 1,
      max: 5,
      required: { message: "Rating is required" },
    }
  },
];

export async function saveReview(event) {
  event.preventDefault();
  const review = document.getElementById("reviewForm");
  const postData = {}
  validationRules.map(x => {
    const field = review.querySelector(`#${x.name}`);
    formError = validate(x.name, field.value, x.rules, review);
    postData[x.name] = field.value
  });

  if (formError && Object.keys(formError).length > 0) {
    return;
  }
  // const url = config.v1.apiUrl + "/review";
  const url = "/review";
  document.getElementById("saveReviewBtn").disabled = true;
  document.getElementById("saveReviewBtn").value = "Please Wait ...";
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
      document.getElementById('reviewForm').reset();
      $("#openSubmitReviewBtnContainer").show();
      $("#openReviewSubmit").hide();
      $('#rating').val("");
      $('.ratingstar').removeClass('checked');
    }
  } catch (error) {
    console.log("error", error);
    showErrorToast(error.message);
  }
  document.getElementById("saveReviewBtn").disabled = false;
  document.getElementById("saveReviewBtn").value = "Save Feedback";

}

async function getBestReviews() {
  // const url = config.v1.apiUrl + "/review/best";
  const url = "/review/best";
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
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
      if (data && Array.isArray(data) && data.length > 0) {
        $("#review-owl-data").empty();
        let newItems = '';
        data.map(x => {
          const newReview = $(`<div>
              <div class="block-testimony-1 text-center">
                <blockquote class="mb-4">
                  <p>&ldquo;${x.message}&rdquo;</p>
                </blockquote>
                <h3 class="font-size-20 text-black">${x.name}</h3>
              </div>
            </div>
            `);
          $("#review-owl-data").append(newReview);
        })
        // $('#review-owl-data').trigger('replace.owl.carousel', [newItems]);
        // $('#review-owl-data').trigger('refresh.owl.carousel');
        // $('.owl-carousel').trigger('destroy.owl.carousel');
        $('#review-owl-data').owlCarousel({
          center: false,
          items: 1,
          loop: true,
          stagePadding: 0,
          margin: 0,
          autoplay: true,
          pauseOnHover: false,
          nav: true,
          smartSpeed: 1000,
          navText: ['<span class="icon-keyboard_arrow_left">', '<span class="icon-keyboard_arrow_right">']
        });
        $("#no-review-feedbacks").hide();
      } else {
        $("#no-review-feedbacks").show();
      }

    }
  } catch (error) {
    console.log("error", error);
    showErrorToast(error.message);
  }
}

async function getReviews() {
  // const url = new URL(config.v1.apiUrl + "/review");
  let url = "/review";
  const isLoggedin = !!localStorage.getItem("classIsLoggedIn");
  if (isLoggedin) {
    url += "?isLogin=" + isLoggedin;
  }
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
    } else {
      if (data && Array.isArray(data) && data.length > 0) {
        $("#feedbacks").empty();
        let newItems = '';
        data.map((x) => {
          const newReview = $(`<div class="col-md-4 mb-3">
              <div class="card text-center bg-primary p-2 text-white">
                <div class="d-flex flex-wrap justify-content-between mb-2">
                  <h6 class="font-size-20">${x.name}</h6>
                  <h6 class="font-size-20">${moment(x.created_at).format("LLL")}</h6>
                </div>
                <p style="font-size: 14px;">&ldquo;${x.message}&rdquo;</p>
                <div>
                  <span class="ratingstar fa fa-star ${1 <= x.rating ? ' checked' : ''}"></span>
                  <span class="ratingstar fa fa-star ${2 <= x.rating ? ' checked' : ''}"></span>
                  <span class="ratingstar fa fa-star ${3 <= x.rating ? ' checked' : ''}"></span>
                  <span class="ratingstar fa fa-star ${4 <= x.rating ? ' checked' : ''}"></span>
                  <span class="ratingstar fa fa-star ${5 <= x.rating ? ' checked' : ''}"></span>
                </div>
                ${isLoggedin ? `
                    <div class="mt-2"><button id="reviewBtn${x.id}" onclick="changeReviewStatus(${x.id})" style="font-size: 12px; font-weight: 600; color: white; padding: 5px 15px;" class="btn ${x.is_active ? 'btn-danger' : 'btn-success'}">${x.is_active ? 'Deactivate' : 'Activate'}</button></div>
                  ` : ''}
              </div>
            </div>
            `);
          $("#feedbacks").append(newReview);
        })
      }

    }
  } catch (error) {
    console.log("error", error);
    showErrorToast(error.message);
  }
}

async function changeReviewStatus(id) {
  $.ajax({
    // url: config.v1.apiUrl + "/review/status/" + id,
    url: "/review/status/" + id,
    method: 'PUT',
    success: function (response) {
      showSuccessToast(response.message);
      $('#reviewBtn' + id).text(response.status ? 'Deactivate' : 'Activate');
      if (response.status) {
        $('#reviewBtn' + id).removeClass('btn-success').addClass('btn-danger');
      } else {
        $('#reviewBtn' + id).removeClass('btn-danger').addClass('btn-success');
      }
    },
    error: function (response) {
      showErrorToast(response.responseJSON.message);
    }
  });
}

window.getBestReviews = getBestReviews;
window.saveReview = saveReview;
window.getReviews = getReviews;
window.changeReviewStatus = changeReviewStatus;