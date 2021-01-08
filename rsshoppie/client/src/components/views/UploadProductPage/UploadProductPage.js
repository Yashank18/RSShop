import React,{useState} from 'react'

function UploadProductPage() {
    
    const [titleValue,setTitleValue]=useState("");

    const onTitleChange=(event)=>{
        setTitleValue(event.currentTarget.value);
    }

    const [descValue,setDescValue]=useState("");

    const onDescChange=(event)=>{
        setDescValue(event.currentTarget.value);
    }

    const [priceValue,setPriceValue]=useState("");

    const onPriceChange=(event)=>{
        setPriceValue(event.currentTarget.value);
    }

    return (
        <div style={{maxWidth:'700px',margin:'2rem auto'}}>
            <div style={{textAlign:'center',marginBottom:'2rem'}}>
                <h2>Upload Travel Product</h2>
            </div>
            

            <form onSubmit>

                <label>Title</label>
                <input onChange={onTitleChange} value={titleValue}/>
                <br/>
                <br/>

                <label>Description</label>
                <textarea onChange={onDescChange} value={descValue}/>
                <br/>
                <br/>

                <label>Price </label>
                <input onChange={onPriceChange} value={priceValue} type="number"/>

                <br/>
                <br/>
                <select>
                    <option key value>

                    </option>
                </select>

                <br />
                <br />
                <button onClick>Submit</button>

            </form>
        </div>
    )
}

export default UploadProductPage
