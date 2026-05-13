const feedbackBody = document.getElementById("feedback-body");

function getFeedbackData() {
  return JSON.parse(localStorage.getItem("userData")) || [];
}

function showFeedback(data = getFeedbackData()) {
  const feedbackData = data;

  //   console.log(feedbackData);

  feedbackBody.innerHTML = "";

  if (feedbackData.length === 0) {
    feedbackBody.innerHTML = `
            <tr> 
                <td colspan="6"> No Feedback found</td>
            </tr>
        `;
    return;
  }

  feedbackData.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td> ${item.name}</td>
        <td>${item.email}</td>
        <td>${item.phone}</td>
        <td>${item.feedback}</td>
        <td>${item.message}</td>
        <td> 
            <button onclick="deleteFeedback(${index})">Delete</button>
        </td>

      `;
    feedbackBody.appendChild(row);
  });
}

//! Delete feedback on particular index
function deleteFeedback(index) {
  let feedbackData = getFeedbackData();

  feedbackData = feedbackData.filter((_test, i) => i !== index); // if match exclude 
  //   feedbackData.splice(index, 1); // using splice also remove

  localStorage.setItem("userData", JSON.stringify(feedbackData));

  location.reload();

  //   console.log("delete");
}


// Filtering based on its feeback type
function filterType() {
  const selectedType = document.getElementById("filter-type").value;
  const feedbackData = getFeedbackData();

  if (selectedType === "all") {
    showFeedback(feedbackData);
    return;
  }

  const filteredData = feedbackData.filter(
    (item) => item.feedback === selectedType,
  );

  showFeedback(filteredData);
}

showFeedback();

document.getElementById("filter-btn").addEventListener("click", filterType);
