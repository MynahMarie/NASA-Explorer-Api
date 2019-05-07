// fetch 1 =>
fetch('/background')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // console.log('data=>', data);
    const apiData = data.split('&');
    console.log('this is my data:', apiData);
    var imageTitle = apiData[0];
    console.log('this is the imageTitle', imageTitle);
    var imageUrl = apiData[1].toString();
    console.log('this is the imageUrl', imageUrl);

  var h2 = document.getElementById('title');
  var text = document.createTextNode(imageTitle);
  console.log(text);
  h2.appendChild(text);

var body = document.getElementById('body');
  console.log(body);
 document.body.style.backgroundImage = 'url('+imageUrl+')';
 document.body.style.backgroundSize = 'cover';
 document.body.style.fontSize = '30px';
 document.body.style.color = 'aqua';

  })
    .catch((error) => {
      console.log(error);
    });

    // fetch 2 =>
  const submitButton = document.getElementById('button');
  submitButton.addEventListener('click', (event) => {
    event.preventDefault();
  const startDate = document.getElementById('startDate').value;
  console.log('the startDate:', startDate);
  const endDate = document.getElementById('endDate').value;
  console.log('the endDate:', endDate);

fetch('/startDate='+startDate+endDate)
.then((response) => {
  return response.json();
})
.then((data) => {
  console.log('data=>', data);
})
  .catch((error) => {
    console.log(error);
  })
})
