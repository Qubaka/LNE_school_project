import './AddInfoForm.css';
import { useState } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function AddInfoForm(props) {

  //funkcje Updatujące informacje o zmianie 
  //Przesyłane są wyżej do AddItemsPage
  const [Title, setTitle] = useState("");
  const UpdateTitle = (event)=>{setTitle(event.target.value); props.SendUp({title: Title, price: Price, tag:Tag, description: Description})};

  const [Price,setPrice] = useState(0);
  const UpdatePrice = (event)=>{setPrice(event.target.value); props.SendUp({title: Title, price: Price, tag:Tag, description: Description})} ;

  const [Tag, setTag] = useState("matma");
  const UpdateTag = (event)=>{setTag(event.target.value); props.SendUp({title: Title, price: Price, tag:Tag, description: Description})};

  const [Description, setDescription] = useState("");
  const UpdateDesc = (event)=>{setDescription(draftToHtml(convertToRaw(event.getCurrentContent()))); console.log(draftToHtml(convertToRaw(event.getCurrentContent()))); props.SendUp({title: Title, price: Price, tag:Tag, description: Description})};


  return (
    <div id="AddInfoForm">
      <form>
        <div className='alignment'>
          <label>Tytuł</label>
          <input onChange={UpdateTitle} onBlur={UpdateTitle} type="text" name="title"></input> <br></br>
          <label>Cena</label>
          <input onChange={UpdatePrice} onBlur={UpdatePrice} type="number" name="price"></input> <br></br>
          <label>Kategoria</label>
          <select onChange={UpdateTag} onBlur={UpdateTag}  name="category"> 
            <option value="matma">matematyka</option>
            <option value="jp">język polski</option>
            <option value="ja">język angielski</option>
            <option value="jn">język niemiecki</option>
            <option value="jh">język hiszpański</option>
            <option value="wos">WOS</option>
            <option value="hist">historia</option>
            <option value="bio">biologia</option>
            <option value="geo">geografia</option>
            <option value="chem">chemia</option>
            <option value="fiz">fizyka</option>
          </select> <br></br>
        </div>
        <label className='desclabel'>Opis</label> <br></br>
        <div className='wysiwyg'>
          <Editor className="editor"
            name="desc"
            onEditorStateChange={UpdateDesc}
          />
        </div>
        {/* <textarea onChange={UpdateDesc} onBlur={UpdateDesc} maxLength="255" rows="4" cols="20" name="desc"></textarea> */}
      </form>
    </div>
  );
}

export default AddInfoForm;