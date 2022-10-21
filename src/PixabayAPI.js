export class PixabayAPI {
    getPhotos(inputQuery){
const url = `https://pixabay.com/api/?key=30729549-2bd6081b47c896583f9f8b2cd&q=${inputQuery}&image_type=photo&orientation=horizontal&safesearch=true`;
return fetch(url) .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
    }

}







// fetch("https://jsonplaceholder.typicode.com/users")
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   })
//   .then(data => {
//     // Data handling
//   })
//   .catch(error => {
//     // Error handling
//   });