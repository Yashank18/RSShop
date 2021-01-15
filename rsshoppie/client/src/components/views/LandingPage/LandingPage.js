import React,{useEffect,useState} from 'react'
import Axios from 'axios';
import {Icon,Row,Button, Col, Card} from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider'

function LandingPage() {

    const [Products,setProducts]=useState([])
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(8);
    const [PostSize, setPostSize] = useState(0)

    useEffect(() => {
        getProduct();
    },[])

        const getProduct = (variables)=>{
            Axios.post('/api/product/getProducts',variables)
            .then(response=>{
                if(response.data.success){
                    setProducts(...Products,response.data.products);
                    setPostSize(response.data.postSize)
                    console.log(response.data.products)
                }
                else{
                    alert('Failed to fetch product data')
                }
            })
        }

    const onLoadMore = ()=>{
        let skip =Skip+Limit;

        const variables={
            skip:Skip,
            limit:Limit,

        }
        getProduct()
        
    }


    const rendercards = Products.map((product,index)=>{
            return <Col lg={6} md={8} xs={24}>
                <Card hoverable={true} cover={<ImageSlider images={product.images}/>}>
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
           {
               PostSize >=Limit &&
           
                <div style={{display:'flex',justifyContent:'center'}}>
                        <Button onClick={onLoadMore}>Load More</Button>
                </div>
            }  

       </div>
    )
}

export default LandingPage
