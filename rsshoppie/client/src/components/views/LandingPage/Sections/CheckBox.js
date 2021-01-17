import React,{useState} from 'react';
import { Checkbox, Collapse } from 'antd';

const { Panel } = Collapse

export default function CheckBox(props) {


    const continents = [
        {
            "_id": 1,
            "name": "Africa"
        },
        {
            "_id": 2,
            "name": "Europe"
        },
        {
            "_id": 3,
            "name": "Asia"
        },
        {
            "_id": 4,
            "name": "North America"
        },
        {
            "_id": 5,
            "name": "South America"
        },
        {
            "_id": 6,
            "name": "Australia"
        },
        {
            "_id": 7,
            "name": "Antarctica"
        }
    ]

    const [Checked, setChecked] = useState([])

    const handleToggle = (value) => {

        const currentIndex = Checked.indexOf(value);
        const newChecked = [...Checked];

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
        props.handleFilters(newChecked)
        //update this checked information into Parent Component 

    }
    
    const renderCheckboxLists=()=>continents.map((value,index)=>(
       
        <React.Fragment key={index}>
        <Checkbox
            onChange
            type="checkbox"
            checked={false}
        />&nbsp;&nbsp;
    <span>{value.name}</span>
    </React.Fragment>
))

    return (
        <div>
                       
            <Collapse defaultActiveKey={['0']} >
                <Panel header="Continents" key="1">
                    {renderCheckboxLists()}
                   
                </Panel>
            </Collapse>
        </div>
    )
}
