import React,{useState} from 'react';

import {Typography, Button, Form, message, Input, Icon} from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios'

const {Title}=Typography;
const {TextArea} = Input;



const Continents=[
    {key:1,value:'Africa'},
    {key:2,value:'Europe'},
    {key:3,value:'Asia'},
    {key:4,value:'North America'},
    {key:5,value:'South America'},
    {key:6,value:'Australia'},
    {key:7,value:'Antartica'}
]

function UploadProductPage(props) {
    
    const [titleValue,setTitleValue]=useState("");

    const onTitleChange=(event)=>{
        setTitleValue(event.currentTarget.value);
    }

    const [descValue,setDescValue]=useState("");

    const onDescChange=(event)=>{
        setDescValue(event.currentTarget.value);
    }

    const [priceValue,setPriceValue]=useState(0);

    const onPriceChange=(event)=>{
        setPriceValue(event.currentTarget.value);
    }

    const [continentValue,setcontinentValue]=useState(1);

    const oncontinentValue=(event)=>{
        setcontinentValue(event.currentTarget.value);
    }

    const [Images, setImages] = useState([])
    const updateImages=(newImages)=>{
        setImages(newImages)
    }

    const onSubmit=(event)=>{
        event.preventDefault();

        if (!titleValue || !descValue || !priceValue ||
            !continentValue || !Images) {
            return alert('fill all the fields first!')
        }

        const variables = {
            writer: props.user.userData._id,
            title: titleValue,
            description: descValue,
            price: priceValue,
            images: Images,
            continents: continentValue,
        }

        Axios.post('/api/product/uploadProduct', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Product Successfully Uploaded')
                    props.history.push('/')
                } else {
                    alert('Failed to upload Product')
                }
            })
    }

    return (
        <div style={{maxWidth:'700px',margin:'2rem auto'}}>
            <div style={{textAlign:'center',marginBottom:'2rem'}}>
                <Title level={2}>Upload Travel Product</Title>
            </div>
            
            <FileUpload refreshFunction={updateImages}/>

            <Form onSubmit={onSubmit}>

                <label>Title</label>
                <Input onChange={onTitleChange} value={titleValue}/>
                <br/>
                <br/>

                <label>Description</label>
                <TextArea onChange={onDescChange} value={descValue}/>
                <br/>
                <br/>

                <label>Price </label>
                <Input onChange={onPriceChange} value={priceValue} type="number"/>

                <br/>
                <br/>
                <select onChange={oncontinentValue}>
                    {Continents.map(item=>{
                        return(
                    <option key={item.key} value={item.key}>
                        {item.value}
                    </option>)
                    })}
                </select>

                <br />
                <br />
                <Button onClick={onSubmit}>Submit</Button>

            </Form>
        </div>
    )
}

export default UploadProductPage
