import React from 'react';
import * as util from '../../utils/utils';
import {AutoSizer,List} from 'react-virtualized';
import Radio from '../Common/Radio';

let createControl = (item,type,content) => {
    let Control = Radio;
    return (<Control key={type.index} onLoad={e => {console.log(e)}} onChange={(e,event) => {
        content.onChange(item,{value:e})
    }} {...Object.assign(type,{item:item})} />)
}
let list = [];
for(let i = 0;i<10000;i++){
    list.push({id:'fsa'+i,value:'',optionData:[{optionId:'dsa',optionValue:'0',optionText:'fsad'+i},{optionId:'dsaw',optionValue:'1',optionText:'greh'}]})
}
export default class Preview extends React.Component{
	constructor(props) {
        super(props);
        this.state = {
        	previewShow:props.previewShow?props.previewShow:false,
        	dataJSON:props.data.dataJSON?props.data.dataJSON:{}
        };
    }

    UNSAFE_componentWillReceiveProps(changeProps){
        if(this.props.previewShow!==changeProps.previewShow){
            this.setState({
        		previewShow:changeProps.previewShow?changeProps.previewShow:false,
        		dataJSON:changeProps.data.dataJSON?changeProps.data.dataJSON:{}
            });
        }
    }
    onChange(item,value){
        let findData = util.findList(list,'',function(items){return items.id === item.id},true)
        if(findData){
            findData.value = value.value;
        }
        this.setState({})
    }
    rowRenderer({
      key, // Unique key within array of rows
      index, // Index of row within collection
      isScrolling, // The List is currently being scrolled
      isVisible, // This row is visible within the List (eg it is not an overscanned row)
      style, // Style object to be applied to row (to position it)
    }) {
        return (
            <div key={key} style={style}>
                {createControl(list[index],{status:'edit',index:index},this)}
            </div>
        );
    }
    render() {
    	//let { Button } = window.Antd;
    	return (<div style={{
    		"display": (this.state.previewShow?"block":"none"),
    		"position": "fixed",
		    "top": "40px",
		    "left": "0",
		    "width": "100vw",
		    "height": "calc(100vh - 40px)",
		    "background": "#fff",
		    "overflow": "auto",
		    "zIndex": "1000"
    	}}>
        <List
            style={{width:'100%',height:'100%',outline:'none'}}
            width={2000}
            height={2000}
            rowCount={list.length}
            rowHeight={40}
            rowRenderer={this.rowRenderer.bind(this)}
        />
    	</div>)
    }
}