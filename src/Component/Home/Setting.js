import React from 'react';
import * as util from '../../utils/utils';

const settingList = {
    width:{dataChangeType:'width',type:'number',max:100,min:0,addonAfter:"%",title:'控件宽度'},
    labelWidth:{dataChangeType:'labelWidth',type:'number',max:12,min:1,addonAfter:"x/12",title:'标签占比'},
    labelAlign:{dataChangeType:'labelAlign',type:'select',title:'标签对齐方式',options:[{label:'左对齐',value:'left'},{label:'居中',value:'center'},{label:'右对齐',value:'right'}]},
    placeholder:{dataChangeType:'placeholder',type:'text',title:'占位内容'},
    isProhibit:{dataChangeType:'isProhibit',type:'checkbox',title:'是否禁用'},
    isShow:{dataChangeType:'isShow',type:'checkbox',title:'是否显示'},
    isMustEdit:{dataChangeType:'isMustEdit',type:'checkbox',title:'是否必填'},
    labelPaddingLeft:{dataChangeType:'labelPaddingLeft',type:'number',min:0,title:'标签左边距'},
    optionLayout:{dataChangeType:'optionLayout',type:'number',min:1,max:8,title:'选项布局'},
    formLayout:{dataChangeType:'optionLayout',type:'number',min:1,max:8,title:'选项布局'}
}
const canUse = {
    max:'',
    min:'',
    title:'',
    type:'',
    options:'',
}
export default class Setting extends React.Component{
	constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    onChange(item,changeType){
        let data = this.props.data;
        let itemData = util.resultObjData(data,{id:item.id},true);
        for(let i in changeType){
            itemData[i] = changeType[i];
        }
        this.props.onChange(data,true);
    }

    componentProps(TypeCom,type){
        let settingData = {};
        for(let i in canUse){
            if(type[i]){
                settingData[i] = type[i]
            }
        }
        return settingData;
    }

    settingEdit(type,item,index,onChange){
        let Antd = window.Antd;
        if(type.type === 'text'){
            return (<div key={`text${item.id}${index}`} style={{display:'flex',"margin": "2px 5px 5px 5px"}}>
                <div style={{'padding': '0 5px',"whiteSpace": "nowrap","alignSelf": "center",flex:'1'}}>{type.title}</div>
                <div style={{flex:'1'}}>
                    <Antd.Input 
                        value={item[type.dataChangeType]} 
                        {...this.componentProps(Antd.Input,type)} 
                        onChange={e => {
                            let change = {};
                            change[type.dataChangeType] = e.target.value;
                            onChange(item,change);
                        }
                    }/>
                </div>
            </div>)
        }else if(type.type === 'number'){
            return (<div key={`number${item.id}${index}`} style={{display:'flex',"margin": "2px 5px 5px 5px"}}>
                <div style={{'padding': '0 5px',"whiteSpace": "nowrap","alignSelf": "center",flex:'1'}}>{type.title}</div>
                <Antd.InputNumber 
                    style={{flex:'1'}} 
                    value={item[type.dataChangeType]} 
                    {...this.componentProps(Antd.InputNumber,type)} 
                    onChange={e => {
                        let change = {};
                        change[type.dataChangeType] = e;
                        onChange(item,change);
                    }
                }/>
            </div>)
        }else if(type.type === 'checkbox'){
            return (<div key={`checkbox${item.id}${index}`} style={{display:'flex',"margin": "2px 5px 5px 5px"}}>
                <Antd.Checkbox.Group 
                    value={[item[type.dataChangeType]]} 
                    options={[{label:type.title,value:true}]} 
                    {...this.componentProps(Antd.Checkbox.Group,type)} 
                    onChange={e => {
                        let change = {};
                        if(e[0]){
                            change[type.dataChangeType] = true;
                        }else{
                            change[type.dataChangeType] = false;
                        }
                        onChange(item,change);
                    }
                }/>
            </div>)
        }else if(type.type === 'select'){
            return (<div key={`select${item.id}${index}`} style={{display:'flex',"margin": "2px 5px 5px 5px"}}>
                <div style={{'padding': '0 5px',"whiteSpace": "nowrap","alignSelf": "center",flex:'1'}}>{type.title}</div>
                <Antd.Select 
                    style={{flex:'1'}} 
                    value={item[type.dataChangeType]} 
                    {...this.componentProps(Antd.Select,type)} 
                    onChange={e => {
                        let change = {};
                        change[type.dataChangeType] = e;
                        onChange(item,change);
                    }
                }>
                    {type.options?type.options.map((item,index) => {
                        return <Antd.Select.Option key={`option${item.value}+${index}`} value={item.value}>{item.label}</Antd.Select.Option>
                    }):''}
                </Antd.Select>
            </div>)
        }else{
            return (<div key={`random${item.id}${index}`} style={{display:'flex',"margin": "2px 5px 5px 5px"}}>
                <div style={{'padding': '0 5px',"whiteSpace": "nowrap","alignSelf": "center",flex:'1'}}>{type.title}</div>
                <Antd.Input 
                    style={{flex:'1'}} 
                    value={item[type.dataChangeType]} 
                    {...this.componentProps(Antd.Input,type)} 
                    onChange={e => {
                        let change = {};
                        change[type.dataChangeType] = e.target.value;
                        onChange(item,change);
                    }
                }/>
            </div>)
        }
    }

    settingType(item){
        if(item.type === 'text'||item.type === 'textarea'){
            let result = [];
            let data = ['width','labelWidth','labelAlign','labelPaddingLeft','placeholder','isProhibit','isShow','isMustEdit'];
            for(let i in data){
                result.push(this.settingEdit(settingList[data[i]],item,i,this.onChange.bind(this)))
            }
            return result;
        }else if(item.type === 'radio'||item.type === 'checkbox'){
            let result = [];
            let data = ['width','optionLayout','labelWidth','labelAlign','labelPaddingLeft','isProhibit','isShow','isMustEdit'];
            for(let i in data){
                result.push(this.settingEdit(settingList[data[i]],item,i,this.onChange.bind(this)))
            }
            return result;
        }else{
            let result = [];
            let data = ['width','labelWidth','labelAlign','labelPaddingLeft','placeholder','isProhibit','isShow','isMustEdit'];
            for(let i in data){
                result.push(this.settingEdit(settingList[data[i]],item,i,this.onChange.bind(this)))
            }
            return result;
        }
    }

    knowlegeSetting(){
        let chooseItem = util.resultObjData(this.props.data,{id:this.props.data.chooseItem},true);
        let isChooseItem = !!(chooseItem?(chooseItem.id||''):'');
        if(isChooseItem){
            return (<div style={{'display': 'flex','flexDirection': 'column'}}>
                    {this.settingType(chooseItem)}
                </div>);
        }else{
            return '';
        }
    }

    allKnowlegeSetting(){
        let item = util.resultObjData(this.props.data,{id:this.props.data.chooseSection},true)
        if(item['id'] === this.props.data.chooseSection){
            let allknowlegeForm = [];
            let data = ['labelWidth','labelPaddingLeft','labelAlign'];
            for(let i in data){
                allknowlegeForm.push(this.settingEdit(settingList[data[i]],item,i,(item,changeType) => {
                    let data = this.props.data;
                    let sectionData = util.resultObjData(data,{id:item.id},true);
                    for(let i in changeType){
                        sectionData[i] = changeType[i];
                        sectionData.sectionForm.map((form,num) => {
                            if(sectionData.sectionForm[num]){
                                sectionData.sectionForm[num][i] = changeType[i];
                            }
                            return '';
                        })
                    }
                    this.props.onChange(data,true);
                }));
            }
            return allknowlegeForm;
        }else{
            return [];
        }
    }

    render() {
        const {Tabs} = window.Antd;
        const {TabPane} = Tabs;
        return (<div className={"root_setting card-container"}>
            <Tabs defaultActiveKey="1" style={{height:'100%'}} onChange={e => {}}>
                <TabPane tab="知识项配置" key="1">
                    {this.knowlegeSetting()}
                </TabPane>
                <TabPane tab="表单配置" key="2">
                    {this.allKnowlegeSetting()}
                </TabPane>
            </Tabs>
        </div>)
    }
}