import React from 'react';
import Control from './Control';
import Content from './Content';
import Setting from './Setting';
import Header from './Header';
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
    	util.md5(util.getRandomId());
        let propsData = {
            data:this.state.ContentData,
            onChange:this.onChange.bind(this)
        }
        return (<div>
            <Header {...propsData}/>
            <div className={"root_root"}>
                <Control {...propsData}/>
                <Content {...propsData}/>
                <Setting {...propsData}/>
            </div>
            <div className={"root_foot"}></div>
        </div>)
    }
}