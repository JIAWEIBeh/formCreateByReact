import React from 'react';
import * as util from '../../utils/utils';
import Input from '../Common/Input';
import Radio from '../Common/Radio';

let findControl = (item) => {
    let data = {
        text:Input,
        radio:Radio
    }
    if(data[item.type]){
        return data[item.type];
    }else{
        return Input;
    }
}
let createControl = (item,type,content) => {
    let Control = findControl(item);
    return (<Control key={type.index} onChange={(e,event) => {
        content.onChange(item,{value:e})
    }} {...Object.assign(type,{item:item})} />)
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

    onChange(item,changeType){
    	let data = this.state.dataJSON;
        let itemData = util.resultObjData(data,{id:item.id},true);
        for(let i in changeType){
            itemData[i] = changeType[i];
        }
        this.setState({
        	dataJSON:data
        })
    }

    createItem(item,index){
    	return createControl(item,{status:'edit',index:index},this)
    }

    sectionList({key,index,style}){
        return 
    }
    formatSectionForm(){
    	let result = [];
    	let sectionData = this.state.dataJSON.section;
        result.push(<List
            style={{width:'100%',height:'100%',outline:'none'}}
            width={2000}
            height={2000}
            rowCount={sectionData.length}
            rowHeight={40}
            rowRenderer={this.sectionList.bind(this)}
        />);
    	/*sectionData.map((section,index) => {
    		result.push(<div key={'sitem'+index} className={'section-content'}>
				<div className={'section-title'}>
					{section.title}
				</div>
				<div className={'section-control'}>
					{this.formatItem(section,index)}
				</div>
			</div>);
			return '';
    	})*/
    	return result;
    }

    formatItem(section,index){
    	let result = [];
		section.sectionForm.map((formItem,formIndex) => {
			result.push(<div key={'fitem'+formIndex} className={'item-content'}>
				<div className={'item-title'}>
					<label>{formItem.title}</label>
				</div>
				<div className={'item-control'}>
					{this.createItem(formItem,index+''+formIndex)}
				</div>
			</div>);
			return '';
		})
		return result;
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
    		<div className={'form-content'}>
    			{this.formatSectionForm()}
    		</div>
    	</div>)
    }
}