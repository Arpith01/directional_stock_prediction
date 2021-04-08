let form = document.getElementById("test_data");
let resultDiv = document.getElementById("prediction_result");
let spinnerDiv = document.getElementById("spinner");

function createAndGetDiv(resultJSON, error=false) {
  let div = document.createElement("div");
  let title = resultJSON.model_name;
  innerHTML = "<h5>" + title + "</h5>";
  let down_arrow = "<i class='fas fa-arrow-down' style='font-size:32px;color:red'></i>"
  let up_arrow = "<i class='fas fa-arrow-up' style='font-size:32px;color:green'></i>"

  if(error){
    innerHTML += "<p>Connection error...</p>"
    div.innerHTML = innerHTML;

    div.style.color = "Red";

    return div;
  }

  amazon_prediction = resultJSON.prediction_amazon;
  amazon_confidence = resultJSON.confidence_amazon;
  apple_prediction = resultJSON.prediction_apple;
  apple_confidence = resultJSON.confidence_apple;

  if (amazon_prediction == -1 && apple_prediction == -1) {
    innerHTML +=
      "<p>Error: Not enough data to make a prediction. Find relevant articles please!</p>";
  } else {
    if (amazon_prediction != -1) {
      let result = amazon_prediction == 1 ? "increase" : "decrease";
      let arrow = amazon_prediction == 1 ? up_arrow : down_arrow;

      innerHTML +=
        "<p>Amazon (AMZN): " +
        "Stock price might " +
        result + arrow + 
        ". (Confidence = " +
        amazon_confidence +
        ")</p>";
    }
    if (apple_prediction != -1) {
      let result = apple_prediction == 1 ? "increase" : "decrease";
      let arrow = apple_prediction == 1 ? up_arrow : down_arrow;

      innerHTML +=
        "<p>Apple (AAPL): " +
        "Stock price might " +
        result + arrow +
        ". (Confidence = " +
        apple_confidence +
        ")</p>";
    }
  }

  div.innerHTML = innerHTML;

  return div;
}

function getInference(api_endpoint, request, model_name) {
  let response = null;

  if (api_endpoint.search("http://") == -1) {
    api_endpoint = "http://" + api_endpoint;
  }

  if (api_endpoint.search("predict") == -1) {
    api_endpoint = api_endpoint + "predict";
  }

  fetch(api_endpoint, request)
    .then(function (response) {
      return response.json();
    })
    .then((json) => {
      response = json;
      response.model_name = model_name;
      let modelResultDiv = createAndGetDiv(response);
      spinnerDiv.style.display = "none";
      resultDiv.appendChild(modelResultDiv);
    })
    .catch((error) => {
      console.log(error);
      response = {}
      response.model_name = model_name;
      let modelResultDiv = createAndGetDiv(response, true);
      spinnerDiv.style.display = "none";
      resultDiv.appendChild(modelResultDiv);
    });
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    spinnerDiv.style.display = "inherit";
    resultDiv.innerHTML = null;

    let article_text = form.elements["news_article"].value;
    let model_api_endpoint = form.elements["model_type"].value;
    let model_name =
      form.elements["model_type"].options[
        form.elements["model_type"].selectedIndex
      ].text;

    let request = {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        news_article: article_text,
      }),
    };

    if (model_api_endpoint.toLowerCase() == "all") {
      for (var i = 0; i < form.elements["model_type"].length; i++) {
        model_api_endpoint = form.elements["model_type"].options[i].value;
        model_name = form.elements["model_type"].options[i].text;
        if (model_api_endpoint == "all") {
          continue;
        } else {
          getInference(model_api_endpoint, request, model_name);
        }
      }
    } else {
      getInference(model_api_endpoint, request, model_name);
    }
  });

  form.addEventListener("reset", (event) => {
    resultDiv.innerHTML = null;
    spinnerDiv.style.display = "none";
  });
}
