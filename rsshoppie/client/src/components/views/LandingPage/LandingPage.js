import React,{useEffect,useState} from 'react'
import Axios from 'axios';
import {Icon,Row,Button, Col, Card} from 'antd';
import Meta from 'antd/lib/card/Meta';

function LandingPage() {

    const [Products,setProducts]=useState([])


    useEffect(() => {
        Axios.post('/api/product/getProducts')
        .then(response=>{
            if(response.data.success){
                setProducts(response.data.products);

                console.log(response.data.products)
            }
            else{
                alert('Failed to fetch product data')
            }
        })
    },[])


    const rendercards = Products.map((product,index)=>{
            return <Col lg={6} md={8} xs={24}>
                <Card hoverable={true} cover>
                    <Meta title={product.title} description={`$${product.price}`}>
                    </Meta>
                </Card>
            </Col>
    })
    return (
       <div style={{width:'75%',margin:'3rem auto'}}>
           <div style={{textAlign:'center'}}>
                <h2> Let's travel Anywhere <Icon type="rocket"/></h2>
           </div>

           {/* Fileter */}

           {/* Search */}

           {Products.length === 0 ?
                <div style={{display:'flex',height:'300px',justifyContent:'center',alignItems:'center'}}>
                        <h2> No Posts to Display yet....</h2>
                </div>:

                <div>
                        <Row gutter={[16,16]}>
                            {rendercards}
                        </Row>
                </div>
           }
           <br/><br/>

           <div style={{display:'flex',justifyContent:'center'}}>
                <Button>Load More</Button>
           </div>

       </div>
    )
}

export default LandingPage
