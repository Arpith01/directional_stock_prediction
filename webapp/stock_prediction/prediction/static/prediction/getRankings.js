// var rankings = JSON.parse(rankings)

let selectElement = document.getElementById("model_type");
let rankingsDiv = document.getElementById("rankings");
let rankingsTable = document.getElementById("rankings_table");

displayData();
selectElement.onchange = () => displayData();

function displayData() {
  fetch("/static/prediction/rankings.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // tableData = data;
      fillTable(data);
    });
}

function fillTable(data) {
  selectedModel = selectElement.value;
  //   console.log(selectedModel)

  tableData = null;
  rankingsTable.innerHTML = null;

  if (selectedModel.toLowerCase().includes("bert")) {
    tableData = data.rankings.BERT;
  } else if (selectedModel.toLowerCase().includes("svm")) {
    tableData = data.rankings.SVM;
  } else if (selectedModel.toLowerCase().includes("logistic")) {
    tableData = data.rankings.LR;
  } else if (selectedModel.toLowerCase().includes("bayes")) {
    tableData = data.rankings.NB;
  } else if (selectedModel.toLowerCase().includes("bi")) {
    tableData = data.rankings.BiLSTM;
  } else if (selectedModel.toLowerCase().includes("lstm")) {
    tableData = data.rankings.LSTM;
  }

  if (tableData?.length == 0) {
    rankingsTable.innerHTML = "No Data to display";
    return;
  }
  //   console.log(tableData)

  rankingsDiv.style.display = "inherit";

  var body = document.createElement("tbody");
  rankingsTable.appendChild(body);

  for (var i = 0; i < tableData.length; i++) {
    var row = rankingsTable.insertRow(i);
    var index = row.insertCell(0);
    var site = row.insertCell(1);
    var accuracy = row.insertCell(2);
    var support = row.insertCell(3);

    index.innerHTML = i + 1;
    site.innerHTML = tableData[i].site;
    accuracy.innerHTML = tableData[i].accuracy;
    support.innerHTML = tableData[i].support;
  }

  var head = rankingsTable.createTHead();
  head.classList.add("thead-dark");

  var headerRow = head.insertRow(0);
  var index = document.createElement("th");
  var site = document.createElement("th");
  var accuracy = document.createElement("th");
  var support = document.createElement("th");

  index.innerHTML = "Rank#";
  site.innerHTML = "News Source";
  accuracy.innerHTML = "Accuracy";
  support.innerHTML = "Support";

  headerRow.appendChild(index);
  headerRow.appendChild(site);
  headerRow.appendChild(accuracy);
  headerRow.appendChild(support);
}
