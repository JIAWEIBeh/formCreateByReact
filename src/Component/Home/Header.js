import React from 'react';
import * as util from '../../utils/utils';
import Preview from '../Preview';
import ListTest from '../DraggerTest/ListTest';

export default class Header extends React.Component{
	constructor(props) {
        super(props);
        this.state = {
        	showDataJSON:false
        };
    }
    render(){
    	let { Modal , Button } = window.Antd;
    	return (<div className={"root_header"}>
    		<div style={{flex:'1'}}></div>
    		<div style={{display:'flex'}}>
    			<Button type="link" style={{marginTop:'4px',color: '#fff',display:window.saveApi?'block':'none'}} onClick={e => {
    				if(window.saveApi){
    					window.saveApi()
    				}
	            }}>{'保存'}</Button>
    			<Button type="link" style={{marginTop:'4px',color: '#fff'}} onClick={e => {
    				if(!this.state.previewShow){
                        this.setState({
                            previewShow:true
                        })
                    }else{
                        this.setState({
                            previewShow:false
                        })
                    }
	            }}>{this.state.previewShow?'返回':'预览'}</Button>
	            <Button type="link" style={{marginTop:'4px',color: '#fff'}} onClick={e => {
    				if(!this.state.showTest){
                        this.setState({
                            showTest:true
                        })
                    }else{
                        this.setState({
                            showTest:false
                        })
                    }
	            }}>{this.state.showTest?'返回':'查看'}</Button>
	            
	    		<Button type="link" style={{marginTop:'4px',color: '#fff'}} onClick={e => {
	                console.log(this.props.data)
	                this.setState({
	            		showDataJSON:true
	            	})
	            }}>生成JSON</Button>
    		</div>
    		<Preview previewShow={this.state.previewShow?this.state.previewShow:false} {...{data:util.cloneObj(this.props.data)}}/>
    		<Modal
	            title="FORM JSON"
	            style={{ top: 20 }}
	            width={'60%'}
	            visible={this.state.showDataJSON}
	            onCancel={e => {
	            	this.setState({
	            		showDataJSON:false
	            	})
	            }}
	        >
	            <pre style={{
	            	height:'calc(100vh - 48px - 54px - 53px - 45px)',
	            	overflow:'auto',
	            	margin:0
	            }}>
	            	{JSON.stringify(this.props.data.dataJSON,'',4)}
	            </pre>
        	</Modal>
        	<ListTest previewShow={this.state.showTest?this.state.showTest:false} {...{data:util.cloneObj(this.props.data)}}/>
    	</div>)
    }
}
