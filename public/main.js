document.getElementById("title").addEventListener("click", function(e) {
  e.preventDefault();
  fetchValue();
});

function fetchValue() {
  fetch("/search?q=")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {


    })
    .catch(function(error) {
      console.log(error);
    });
}
