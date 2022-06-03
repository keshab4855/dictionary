const resultDiv = document.querySelector(".result");
const wordEle = document.querySelector("#word");

const phonetics = document.querySelector(".phonetics");
const audio = document.querySelector("audio");
const wordMeaning = document.querySelector(".word-definition");
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const pills = document.querySelector(".pills");

const handle = async (e) => {
  let synonymsData = "";

  if (e.keyCode == 13) {
    const word = e.target.value;

    //  making request to api
    const result = await fetch(url + word);
    const data = await result.json();
    resultDiv.style.display = "block";
    if (result.ok) {
      audio.style.display = "block";
      wordEle.innerHTML = data.title;
      phonetics.style.display = "inline-block";
      document.querySelectorAll(".wordmeaning")[0].style.display = "block";
      document.querySelectorAll(".wordmeaning")[1].style.display = "block";
      // pills.style.display = "block";
      wordEle.innerHTML = data[0].word;
      phonetics.innerHTML = data[0].phonetic;
      audio.src = data[0].phonetics[0].audio;

      wordMeaning.innerHTML = data[0].meanings[0].definitions[0].definition;
      // console.log();
      const synonymsArr = data[0].meanings[0].synonyms;
      if (synonymsArr.length) {
        // let synonymsData = "";
        for (let i = 0; i < synonymsArr.length; i++) {
          synonymsData += `<p class= "pills">${synonymsArr[i]}</p> `;
        }
      } else {
        synonymsData = `<p class ="pills" style ="background-color:red ;color:white">No synonyms available</p>`;
      }
      document.querySelector(".synonyms").innerHTML = synonymsData;
    } else {
      audio.style.display = "none";
      wordEle.innerHTML = data.title;
      phonetics.style.display = "none";
      document.querySelectorAll(".wordmeaning")[0].style.display = "none";
      document.querySelectorAll(".wordmeaning")[1].style.display = "none";
      pills.style.display = "none";
      wordMeaning.innerHTML = data.message;
    }
  }
};
