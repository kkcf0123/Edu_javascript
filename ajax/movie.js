// // datetime yesterday
// const init = () => {
//   const date = new Date();
//   console.log(date);
//   let year = date.getFullYear();
//   let month = date.getMonth() + 1;
//   let day = date.getDate();
//   let yesterday = date.getDate() - 1;

//   txtYear.value = year;
//   //   if (month < 10) {
//   //     month = "0" + month;
//   //   }
//   //   if (yesterday < 10) {
//   //     yesterday = "0" + yesterday;
//   //   }
//   //   selMon.value = month;
//   //   selDay.value = yesterday;

//   selMon.value = month < 10 ? "0" + month : month;
//   selDay.value = yesterday < 10 ? "0" + yesterday : yesterday;
// };

// init();

// let url = "https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=";
// url += txtYear.value + selMon.value + selDay.value;
// console.log(url);
// document.querySelector("button").addEventListener("click", () => {
//   fetch(url)
//     .then((response) => {
//       if (!response.ok) throw new Error();
//       return response.json();
//     })
//     .then((data) => {
//       let boxofficeList = data.boxOfficeResult.dailyBoxOfficeList;
//       let result = "";

//       console.log(boxofficeList);
//       boxofficeList.forEach((movie) => {
//         let rankInten = movie.rankInten;
//         result += `${movie.rank}위 `;

//         if (rankInten > 0) {
//           result += `(▲${movie.rankInten})`;
//         } else if (rankInten < 0) {
//           result += `(▼${movie.rankInten})`;
//         }

//         // result += `${movie.rankInten}) : `;
//         result += `: ${movie.movieNm} <br>`;
//       });
//       document.querySelector("#msg").innerHTML = result;
//     })
//     .catch(() => console.log("hi"));
// });

// datetime yesterday
const init = () => {
  const date = new Date();
  console.log(date);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let yesterday = date.getDate() - 1;

  txtYear.value = year;
  selMon.value = month < 10 ? "0" + month : month;
  selDay.value = yesterday < 10 ? "0" + yesterday : yesterday;
};

init();

function show(movieCd) {
  let url2 = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=f5eef3421c602c6cb7ea224104795888&movieCd=";
  url2 += movieCd;
  fetch(url2)
    .then((response) => {
      if (!response.ok) throw new Error();
      return response.json();
    })
    .then((data) => {
      let movieDetail = data.movieInfoResult.movieInfo;
      let movieNm = movieDetail.movieNm;
      let movieNmOg = movieDetail.movieNmOg;
      let showTm = movieDetail.showTm;
      let directors = "";
      let actors = "";
      let result2 = "";

      movieDetail.directors.forEach((director) => {
        directors += `${director.peopleNm}, `;
      });
      movieDetail.actors.forEach((actor) => {
        actors += `${actor.peopleNm}, `;
      });

      result2 += `<ul>`;
      result2 += `<li> korean title : ${movieNm} </li>`;
      result2 += `<li> original title : ${movieNmOg} </li>`;
      result2 += `<li> showTime : ${showTm} </li>`;
      result2 += `<li> directors : ${directors} </li>`;
      result2 += `<li> actors : ${actors} </li>`;
      result2 += `</ul>`;

      // movieDetail.forEach((details) => {
      // });
      document.querySelector(".box2").innerHTML = result2;
    })
    .catch();
}

let url = "https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=";
url += txtYear.value + selMon.value + selDay.value;

document.querySelector("button").addEventListener("click", () => {
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error();
      return response.json();
    })
    .then((data) => {
      let boxofficeList = data.boxOfficeResult.dailyBoxOfficeList;
      let result = "";

      console.log(boxofficeList);

      boxofficeList.forEach((movie) => {
        let rankInten = movie.rankInten;
        result += `${movie.rank}위 `;

        if (rankInten > 0) {
          result += `(▲${movie.rankInten})`;
        } else if (rankInten < 0) {
          result += `(▼${movie.rankInten})`;
        }

        result += `: <a href = "#" onclick='javascript:show(${movie.movieCd})' > ${movie.movieNm}</a><br>`;
      });
      document.querySelector("#msg").innerHTML = result;
    })
    .catch(() => console.log("hi"));
});
