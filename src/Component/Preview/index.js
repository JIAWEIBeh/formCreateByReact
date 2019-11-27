import React from 'react';

export default class Preview extends React.Component{
	constructor(props) {
        super(props);
        this.state = {
        	previewShow:props.previewShow?props.previewShow:false
        };
    }

    componentWillReceiveProps(changeProps){
        if(this.props.previewShow!==changeProps.previewShow){
            this.setState({
        		previewShow:changeProps.previewShow?changeProps.previewShow:false
            });
        }
    }

    render() {
    	let { Button } = window.Antd;
    	return (<div style={{
    		"display": (this.state.previewShow?"block":"none"),
    		"position": "fixed",
		    "top": "0",
		    "left": "0",
		    "width": "100vw",
		    "height": "100vh",
		    "background": "#fff",
		    "zIndex": "1000"
    	}}>
    		<Button type="primary"
    		style={{
                    "position": "fixed",
                    "bottom": "0",
                    "right": "calc(100% / 7)"}}
            onClick={e => {
    			this.props.onChange("state",false);
    		}}>返回</Button>
    	</div>)
    }
}