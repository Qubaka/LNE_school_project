import axios from 'axios';


function Users(props) {
    const ban= async()=>{
        const ID = props.id;
        console.log(ID)
        await axios.post(`http://localhost:3000/ban/${ID}`);
        console.log("banned")
        window.location.reload(false);
        props.onChangeUsers()
      }
    
      const notBan = async()=>{
        const ID = props.id;
        console.log(ID)
        await axios.get(`http://localhost:3000/adminPerrmision/${ID}`);
        console.log("notbanned")
        window.location.reload(false);
        props.onChangeUsers()
      }
      const Deop = async()=>{
        const ID = props.id;
        console.log(ID)
        await axios.get(`http://localhost:3000/adminPerrmision/${ID}`);
        console.log("changed permision")
        window.location.reload(false);
        props.onChangeUsers()
      }
  return (
        <div>
            <h3>{props.email}</h3>
            <h5>role: {props.role}</h5>
            <button onClick={ban}>Ban</button>
            <button onClick={notBan}>Unban</button>
            <button onClick={Deop}>Give Permision</button>
        </div>
  );
}

export default Users;