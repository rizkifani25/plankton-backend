exports.convertToBase64 = (imageURL, callback) => {
  let xhr = new XMLHttpRequest();
  xhr.onload = () => {
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open("GET", imageURL);
  xhr.responseType = "blob";
  xhr.send;
};
