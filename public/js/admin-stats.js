import { config } from "./config.js";
import { showSuccessToast } from "./toast.js";
import { showErrorToast } from "./toast.js";
import { showErrors, validate } from "./validation.js";

let formError = {};

const validationRules = [
  {
    name: "years",
    rules: {
      required: { message: "Years number is required" },
    }
  },
  {
    name: "students",
    rules: {
      required: { message: "Students number is required" },
    }
  },
  {
    name: "batches",
    rules: {
      required: { message: "Batches number is required" },
    }
  },
  {
    name: "student_placed",
    rules: {
      required: { message: "Student placed number is required" },
    }
  },
];

async function getStats(isHomeStat) {
  // const url = new URL(config.v1.apiUrl + "/adminhomestats");
  const url = "/adminhomestats";
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
      if (isHomeStat) {
        $('#yearsstat').attr('data-number', data.years);
        $('#studentstat').attr('data-number', data.students);
        $('#batchesstat').attr('data-number', data.batches);
        $('#studentplacestat').attr('data-number', data.student_placed);
        $('#number1').jQuerySimpleCounter({ end: data.years, duration: 3000 });
        $('#number2').jQuerySimpleCounter({ end: data.students, duration: 3000 });
        $('#number3').jQuerySimpleCounter({ end: data.batches, duration: 2000 });
        $('#number4').jQuerySimpleCounter({ end: data.student_placed, duration: 2500 });
      } else {
        validationRules.map(x => {
          $('#' + x.name).val(data[x.name]);
        });
      }
    }
  } catch (error) {
    console.log("error", error);
    showErrorToast(error.message);
  }
}

async function updateStats() {
  const statsForm = document.getElementById("statsForm");
  const postData = {}
  validationRules.map(x => {
    const field = statsForm.querySelector(`#${x.name}`);
    formError = validate(x.name, field.value, x.rules);
    postData[x.name] = field.value
  });

  if (formError && Object.keys(formError).length > 0) {
    return;
  }
  document.getElementById("updateStatBtn").disabled = true;
  document.getElementById("updateStatBtn").value = "Please Wait ...";
  try {
    // const url = config.v1.apiUrl + "/adminhomestats/update";
    const url = "/adminhomestats/update";
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
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
      showSuccessToast(data.message)
    }
  } catch (error) {
    console.log("error", error);
    showErrorToast(error.message);
  }
  document.getElementById("updateStatBtn").disabled = false;
  document.getElementById("updateStatBtn").value = "Update Stats";
}

$.fn.jQuerySimpleCounter = function (options) {
  var settings = $.extend({
    start: 0,
    end: 100,
    easing: 'swing',
    duration: 400,
    complete: ''
  }, options);

  var thisElement = $(this);

  $({ count: settings.start }).animate({ count: settings.end }, {
    duration: settings.duration,
    easing: settings.easing,
    step: function () {
      var mathCount = Math.ceil(this.count);
      thisElement.text(mathCount);
    },
    complete: settings.complete
  });
};

window.getStats = getStats;
window.updateStats = updateStats;