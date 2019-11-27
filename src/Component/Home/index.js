import React from 'react';
import Control from './Control';
import Content from './Content';
import Setting from './Setting';
import * as util from '../../utils/utils';

export default class Home extends React.Component{
	constructor(props) {
        super(props);
        this.state = {
            ContentData:{
                chooseSection:'section1',
            	dataJSON:{
                    section:[{id:'section1',sectionForm:[]}]
                }
            }
        };
    }

    onChange(data,flag = false){
    	if(typeof data === 'function'){
			return this.setState(data);
		}else{
			this.setState(state => {
	    		state.ContentData = data;
	    		if(flag){
	    			return state;
	    		}
	    	})
		}
    }

    render() {
    	util.md5(util.getRandomId())
        return (<div className={"root_root"}>
        	<Control {...{data:this.state.ContentData,onChange:this.onChange.bind(this)}}/>
        	<Content {...{data:this.state.ContentData,onChange:this.onChange.bind(this)}}/>
        	<Setting {...{data:this.state.ContentData,onChange:this.onChange.bind(this)}}/>
            <div style={{position:'fixed',bottom:'0',right:'0'}} onClick={e => {
                console.log(this.state)
            }}>getData</div>
        </div>)
    }
}