import axios from 'axios';

function Report(props) {
  const ban= async()=>{
    const userID = props.IdOfReportedUser;
    console.log(userID)
    const ID = props.id;
    console.log(ID)
    await axios.post(`http://localhost:3000/ban/${userID}`,{ID});
    console.log("banned")
    props.onChangedReports()
    window.location.reload(false);
  }

  const notBan=async()=>{
    const ID = props.id;
    console.log(ID)
    await axios.post(`http://localhost:3000/notban`,{ID});
    console.log("notbanned")
    props.onChangedReports()
    window.location.reload(false);
  }
  return (
        <div>
            <h3>{props.title}</h3>
            <h5>Report description:</h5>
            <h5>{props.description}</h5>
            <button onClick={ban}>Ban</button>
            <button onClick={notBan}>Don't Ban</button>
        </div>
  );
}

export default Report;