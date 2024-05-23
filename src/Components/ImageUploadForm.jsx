// Your React component
import React, { useState } from 'react';
import axios from 'axios';

function ImageUploadForm() {
    const [image, setImage] = useState(null);
    const [Title, SetTitle] = useState('');
    const [Data, SetData] = useState([]);
    const token = localStorage.getItem("access-token");

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };
    const HandleFetch = () => {
        axios.get('http://localhost:8000/api/v1/blog/show/img/')
          .then((res) => SetData(res.data.data))
          .catch((err) => console.log(err))
    }

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('title' ,Title )
            await axios.post('http://localhost:8000/api/v1/blog/Upload/img/', formData 
              );  

            alert('successfully....')
            HandleFetch()
            
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='bg-primary'>
            <input type="file" onChange={handleImageChange} />
            <br />
            <br />
            <input type="text" onChange={(e) => {
                SetTitle(e.target.value)
            }} value={Title}/>
            <button onClick={handleUpload}>Upload Image</button>*
            
           
        </div>
    );
}

export default ImageUploadForm;
