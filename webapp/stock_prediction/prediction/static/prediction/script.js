let form = document.getElementById("test_data");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let resultDiv = document.getElementById("prediction_result");
    resultDiv.innerHTML = '<div class="spinner-border"></div>';

    let article_text = form.elements["news_article"].value;
    let model_api_endpoint = form.elements["model_type"].value;

    if (model_api_endpoint.search("http://") == -1) {
      model_api_endpoint = "http://" + model_api_endpoint;
    }

    if (model_api_endpoint.search("predict") == -1) {
      model_api_endpoint = model_api_endpoint + "predict";
    }

    request = {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        news_article: article_text,
      }),
    };

    // var response_prediction = 0;
    var amazon_prediction = 0;
    var apple_prediction = 0;
    // console.log(model_api_endpoint, request);
    fetch(model_api_endpoint, request)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        // console.log(json.prediction);
        // response_prediction = json.prediction;
        amazon_prediction = json.prediction_amazon;
        amazon_confidence = json.confidence_amazon;
        apple_prediction = json.prediction_apple;
        apple_confidence = json.confidence_apple;
        resultDiv.innerHTML = null
        if (amazon_prediction == -1 && apple_prediction == -1) {
          resultDiv.innerHTML =
            "Result: Not enough data to make a prediction. Find relevant articles please!";
        } else {
          if (amazon_prediction != -1) {
          let result = amazon_prediction == 1 ? "increase" : "decrease";
          resultDiv.innerHTML += "<p>Amazon (AMZN): "+"Stock price might " + result +". (Confidence = "+amazon_confidence+")</p>";
          } 
        if (apple_prediction != -1) {
          let result = apple_prediction == 1 ? "increase" : "decrease";
          resultDiv.innerHTML += "<p>Apple (AAPL): "+"Stock price might " + result +". (Confidence = "+apple_confidence+")</p>";
        }
      }
      })
      .catch((error) => console.log(error));
  });


  form.addEventListener("reset", (event)=>{
    let resultDiv = document.getElementById("prediction_result");
    resultDiv.innerHTML = null;
  })
}
