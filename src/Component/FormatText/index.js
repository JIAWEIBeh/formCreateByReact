import React from 'react';

export default class FormatText extends React.Component{
	constructor(props) {
        super(props);
        this.state = {
        	editCss:'',
            HandleCss:''
        };
    }
    formatCss(){
        let Antd = window.Antd;
    	return (<div>
    		<Antd.Input.TextArea rows={8} onChange={e => {
    			let value = e.target.value;
    			this.setState(state => {
    				state.editCss = value;
    				return state;
    			});
    		}} />
    		<Antd.Button type="primary" htmlType="submit" className="login-form-button" onClick={e => {
    			let result = {};
                if(!this.state.editCss){
                    return '';
                }
    			let cssList = this.state.editCss.split(/[\n]/g);
    			for(let i = 0;i<cssList.length;i++){
    				let keyList = cssList[i].split(': ')[0].split(/[ ]{4}/g);
    				keyList.map((t,y) => {
    					if(!t){
    						keyList.splice(y,1);
    					}
                        return '';
    				});
    				let value = cssList[i].split(': ')[1].replace(';','');
                    let key = keyList[0].split('-').map((item,index) => {
                        if(index !== 0){
                            return (item.substr(0,1).toLocaleUpperCase()+item.substr(1))
                        }else{
                            return item;
                        }
                    }).join('');
    				result[key] = value;
    			}
    			this.setState(state => {
    				state.HandleCss = JSON.stringify(result,'',4);
    				return state;
    			});
    		}}>format</Antd.Button>
    		<pre style={{"padding": "5px 10px"}}>
    			{this.state.HandleCss}
    		</pre>
    	</div>)
    }
    render() {
        return (<div>
			{this.formatCss()}
        </div>)
    }
}