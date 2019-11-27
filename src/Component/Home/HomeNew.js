import React from 'react';
import * as util from '../../utils/utils';
var getRandomId = () => {
    return Math.random().toString(36).substring(2);
}
class HomeNew extends React.Component{
	constructor(props) {
        super(props);
        this.state = {
            data:[]
        };
    }
    createValue(item){
    	let Bootstrap = window.Bootstrap;
    	if(item.event === "hide"){
    		return [];//(<Bootstrap.Form.Control size="sm" />)
    	}else if(item.event === "setvalue"){
    		return (<Bootstrap.Form.Control size="sm" value={item.newValue?item.newValue:''} onChange={e => {
				let data = this.state.data;
				let changeData = util.resultObjData(data,{id:item.id},true)
		    	changeData.newValue = e.target.value;
		    	this.setState({
		    		data:data
		    	})
    		}}/>)
    	}else if(item.event === "changetitle"){
    		return (<Bootstrap.Form.Control size="sm" value={item.newValue?item.newValue:''} onChange={e => {
    			let data = this.state.data;
		    	let changeData = util.resultObjData(data,{id:item.id},true)
		    	changeData.newValue = e.target.value;
		    	this.setState({
		    		data:data
		    	})
    		}}/>)
    	}else if(item.event === "changeoption"){
    		return (<CreateOptionEdit optionData={item.newOptions} onChange={optionData => {
    			let data = this.state.data;
		    	let changeData = util.resultObjData(data,{id:item.id},true)
		    	changeData.newOptions = optionData;
		    	this.setState({
		    		data:data
		    	})
    		}}/>)
    	}else{
    		return [];
    	}
    }
    render() {
    	let Bootstrap = window.Bootstrap;
    	let flexStyle = {lineHeight: '31px',padding: '0 5px 0 10px'}
    	return (<div style={{height: '100vh',display: 'grid',gridTemplateRows: 'min-content'}}>
			<div>
				<Bootstrap.Button style={{margin:'0 5px 0 10px'}} size="sm" onClick={e => {
					this.setState(state => {
						state.data.push({
							id:getRandomId(),
							conditionList:[],
							resultList:[],
							relative:'and'
						});
						return state;
					})
				}}>新增逻辑</Bootstrap.Button>
				<Bootstrap.Button size="sm" onClick={e => {
					console.log(this.state.data)
				}}>
					getData
				</Bootstrap.Button>
				<div style={{clear:'both'}}></div>
			</div>
			<div style={{overflow:'auto'}}>
				{this.state.data.map((item,index) => {
					return (<div key={item.id} style={{padding: '5px 20px',borderBottom:'1px #ccc solid'}}>
						<div style={{display:'flex'}}>
							<Bootstrap.Button size="sm" style={{height:'24px',paddingTop:'0px',margin:'0 5px 0 0px'}} onClick={e => {
								let data = this.state.data;
								data[index].conditionList.push({id:getRandomId()});
								this.setState({
									data:data
								})
							}}>
								响应条件
							</Bootstrap.Button>
							<Bootstrap.Button size="sm" style={{height:'24px',paddingTop:'0px',margin:'0 5px 0 0px'}} onClick={e => {
								let data = this.state.data;
								data[index].resultList.push({id:getRandomId()});
								this.setState({
									data:data
								})
							}}>
								作用内容
							</Bootstrap.Button>
							<Bootstrap.Button size="sm" style={{height:'24px',paddingTop:'0px',margin:'0 5px 0 0px'}} onClick={e => {
								let data = this.state.data;
								data.splice(index,1);
								this.setState({
									data:data
								})
							}}>
								删除逻辑
							</Bootstrap.Button>
							<Bootstrap.Form.Control size="sm" as="select" style={{height:'24px',width:'fit-content',paddingTop:'0px',margin:'0 5px 0 0px'}} onChange={e => {
								let data = this.state.data;
								data[index].relative = e.target.value;
								this.setState({
									data:data
								})
							}}>
								<option value="and">并且</option>
								<option value="or">或者</option>
							</Bootstrap.Form.Control>
						</div>

						<div style={{display:'flex'}}>
							<button className="opration" style={{flex:'1'}}>
								{item.conditionList.map((conditionList,itemIndex) => {
									return (<div key={conditionList.id} style={{display:'flex',marginTop:'3px'}}>
										<div style={flexStyle}>当</div>
							    		<div className={"flex_1"} style={flexStyle}>
								    		<Bootstrap.Form.Control size="sm" as="select" value={conditionList.itemId} onChange={e => {
								    			let data = this.state.data;
								    			data[index].conditionList[itemIndex].itemId = e.target.value;
								    			this.setState({
								    				data:data
								    			})
								    		}}>
								    			<option value="">请选择</option>
								    			<option value="dsaf1">控件一</option>
								    			<option value="dsaf2">控件二</option>
								    			<option value="dsaf3">控件三</option>
								    			<option value="dsaf4">控件四</option>
								    		</Bootstrap.Form.Control>
							    		</div>
							    		<div style={flexStyle}>为</div>
							    		<div className={"flex_1"} style={flexStyle}>
							    			<Bootstrap.Form.Control size="sm" value={conditionList.listenerValue} onChange={e => {
							    				let data = this.state.data;
								    			data[index].conditionList[itemIndex].listenerValue = e.target.value;
								    			this.setState({
								    				data:data
								    			})
							    			}}/>
							    		</div>
									</div>)
								})}
							</button>
							<button className="opration" style={{display:(item.conditionList.length>0||item.resultList.length>0)?'block':'none'}}>
								{"时,本控件"}
							</button>
							<button className="opration" style={{flex:'1'}}>
								{item.resultList.map((resultList,resultIndex) => {
									return (<div key={resultList.id} style={{display:'flex',marginTop:'3px'}}>
										<div className={"flex_1"} style={flexStyle}>
								    		<Bootstrap.Form.Control size="sm" as="select" value={item.event} onChange={e => {
								    			let data = this.state.data;
								    			data[index].resultList[resultIndex].event = e.target.value;
								    			this.setState({
								    				data:data
								    			})
								    		}}>
								    			<option value="">请选择</option>
								    			<option value="hide">显示</option>
								    			<option value="setvalue">赋值为</option>
								    			<option value="changetitle">修改标题为</option>
								    			<option value="changeoption">修改值域为</option>
								    		</Bootstrap.Form.Control>
							    		</div>
							    		<div className={"flex_1"} style={flexStyle}>
							    			{this.createValue(resultList)}
							    		</div>
									</div>)
								})}
							</button>
						</div>
					</div>)
					})}
				</div>
		</div>);
    }
}


class CreateOptionEdit extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isShow:false,
			optionData:props.optionData?props.optionData:[]
		}
	}
	componentWillMount(){
        var that = this;
        document.addEventListener('click',this.clickCallback.bind(that))
    }
    componentWillUnmount(){
        document.removeEventListener('click',this.clickCallback)
    }
    clickCallback(e){
		if(this.refs.inpu&&this.refs.box){

    	}else{
    		return;
    	}
    	if(e.pageX > (this.refs.inpu.offsetWidth + this.refs.inpu.offsetLeft) || e.pageY < this.refs.inpu.offsetTop || e.pageX < this.refs.inpu.offsetLeft + this.refs.box.offsetLeft){
    		this.setState({isShow:false})
    	}
    	if(e.pageX > (this.refs.box.offsetWidth + this.refs.box.offsetLeft + this.refs.inpu.offsetLeft) || e.pageY > (this.refs.box.offsetTop + this.refs.box.offsetHeight + this.refs.inpu.offsetTop) || e.pageX < this.refs.box.offsetLeft){
    		this.setState({isShow:false})
    	}
    }
	componentWillReceiveProps(changeProps){
        if(JSON.stringify(this.props) !== JSON.stringify(changeProps)){
            this.setState({
                optionData:changeProps.optionData?changeProps.optionData:[]
            })
        }
    }
	render(){
		let Bootstrap = window.Bootstrap;
		return (<div ref="inpu" style={{position:'relative'}}>
			<Bootstrap.Button size="sm" style={{marginTop:'-5px',width:'100%'}} onClick={e => {
    			this.setState({
    				isShow:!this.state.isShow
    			})
    		}}>{"修改值域"}</Bootstrap.Button>
    		<div ref="box" style={{display:this.state.isShow?'block':'none',
	    		position: 'absolute',
	    		height: '200px',
	    		padding:'2px',
	    		border: '1px #ccc solid',
	    		background: '#fafafa',
	    		borderRadius:'3px',
	    		width: '200%',
	    		left:'-100%',
	    		zIndex:'1'}}>
    			<div className={"grid"}>
	    			<div style={{textAlign: 'left'}}>
	    				<Bootstrap.Button size="sm" style={{marginTop:'-5px'}} onClick={e => {
	    					let data = this.state.optionData;
	    					if(data){
	    						data.push({});
	    					}else{
	    						data = [{}];
	    					}
	    					this.props.onChange(data);
	    				}}>新增值域</Bootstrap.Button>
	    			</div>
	    			<div style={{overflow: 'auto'}}>
	    				{this.state.optionData?this.state.optionData.map((option,opindex) => {
	    					return (<div key={"option"+opindex} className={"flex"} style={{marginTop:'3px'}}>
	    						<Bootstrap.Form.Control size="sm" placeholder="请输入展示值" value={option.optionText} onChange={e => {
	    							let data = this.state.optionData;
	    							data[opindex].optionText = e.target.value;
	    							this.props.onChange(data);
	    						}}/> 
	    						<Bootstrap.Form.Control size="sm" style={{marginLeft:'5px'}} placeholder="请输入真实值" value={option.optionValue} onChange={e => {
									let data = this.state.optionData;
	    							data[opindex].optionValue = e.target.value;
	    							this.props.onChange(data);
	    						}}/>
	    					</div>)
	    				}):''}
	    			</div>
	    		</div>
    		</div>
		</div>)
	}
}
export default HomeNew;