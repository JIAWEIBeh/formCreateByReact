import React from 'react';

class Input extends React.Component{
	constructor(props) {
        super(props);
        this.state = {
        	item:props.item?props.item:{},
            isProhibit:props.isProhibit?props.isProhibit:false
        };
    }
    componentWillReceiveProps(changeProps){
        if(JSON.stringify(this.props.item)!==JSON.stringify(changeProps.item)){
            this.setState({
            	item:changeProps.item?changeProps.item:this.props.item,
                isProhibit:changeProps.isProhibit?changeProps.isProhibit:false
            });
        }
    }
    render() {
    	let Antd = window.Antd;
        let { isProhibit } = this.state;
    	if(this.props.status === 'config'){
    		return (<Antd.Input size="small" style={{"pointerEvents": isProhibit?"none":"block"}} type="text" value={this.state.item.value||''} onChange={e => {
	    		this.props.onChange(e.target.value,e);
	    	}}/>)
    	}else if(this.props.status === 'edit'){
    		return (<Antd.Input size="small" style={{"pointerEvents": isProhibit?"none":"block"}} type="text" value={this.state.item.value||''} onChange={e => {
	    		this.props.onChange(e.target.value,e);
	    	}}/>)
    	}else if(this.props.status === 'show'){
			return (<div>{this.state.item.value||''}</div>)
    	}else{
    		return (<Antd.Input size="small" style={{"pointerEvents": isProhibit?"none":"block"}} type="text" value={this.state.item.value||''} onChange={e => {
	    		this.props.onChange(e.target.value,e);
	    	}}/>)
    	}
    }
}
export default Input;