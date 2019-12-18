import React from 'react';

export default class AddMoreOption extends React.Component{
	constructor(props) {
        super(props);
        this.state = {
            isVisible:props.isvis?props.isvis:false,
            textValue:''
        };
    }
    UNSAFE_componentWillReceiveProps(changeProps){
        if(this.props.isvis!==changeProps.isvis){
            this.setState({
                isVisible:changeProps.isvis?changeProps.isvis:false,
                textValue:''
            });
        }
    }
    handleOk(){
    	this.props.onChange(this.state.textValue)
    }
    handleCancel(){
    	this.props.onClose();
    }
	render(){
		let Antd = window.Antd;
		return (<Antd.Modal
          title="批量添加选项"
          visible={this.state.isVisible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        >
            <Antd.Input.TextArea rows={4} value={this.state.textValue} onChange={e => {
            	this.setState({
            		textValue:e.target.value
            	})
            }}/>
        </Antd.Modal>)
	}
}