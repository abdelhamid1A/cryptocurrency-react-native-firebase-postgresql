import axios from "axios";
// var currency
async function getInfoAboutCurrenct(cur,setCurr){
    await  axios.get('https://api-currency-name-code-symbole.herokuapp.com/'+cur)
  .then(response=>{
      setCurr(response.data);
  })
  .catch(err=>console.log(err))
  
  }


export default getInfoAboutCurrenct