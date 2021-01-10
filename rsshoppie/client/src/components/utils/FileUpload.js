import { Icon, message } from 'antd';
import React,{useState} from 'react';
import Dropzone from 'react-dropzone';
import Axios from 'axios'

function FileUpload(props) {


    const [Images, setImages] = useState([])

    const OnDrop=(files)=>{
        let formData=new FormData();
        const config={
             header:{'content-type':'multipart/form-data'}
        }
        formData.append("file",files[0]);


        // Saving Image inside the Node Server
        Axios.post('/api/product/uploadImage',formData,config)
        .then(response=>{
            if(response.data.success){
                setImages([...Images,response.data.image])
                props.refreshFunction([...Images,response.data.image])
            }
            else{
                alert("Failed to Save Image");
            }
        })

    }

    const onDelete=(image)=>{
        let currentIndex=Images.indexOf(image);

        let removedImages=[...Images]
        removedImages.splice(currentIndex,1)
        setImages(removedImages);
        props.refreshFunction(removedImages);
    }


    return (
        <div style={{display:'flex',justifyContent:'space-between'}}>
            <Dropzone
            onDrop={OnDrop} 
            multiple={false}
            maxSize={80000000000}
            >

                {({getRootProps,getInputProps})=>(
                    <div style={{
                        width:'300px',height:'240px',border:'1px solid lightgray',display:'flex',alignItems:'center',justifyContent:'center'}}
                        {...getRootProps()}>
                       <input {...getInputProps()} />
                       <Icon type="plus" style={{fontSize:'3rem'}} />
                    </div>
                )}

            </Dropzone>

            <div style={{display:'flex',width:'350px',height:'240px',overflowX:'scroll'}}>

                {Images.map((image,index)=>(
                    <div onClick={()=>onDelete(image)}>
                        <img style={{minWidth:'300px',width:'300px',height:'200px'}} src={`http://localhost:5000/${image}`} alt={`${index}`}/>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default FileUpload
