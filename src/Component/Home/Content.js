import React from 'react';
import {SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
import arrayMove from 'array-move';
import * as util from '../../utils/utils';
import Input from '../Common/Input';
import Radio from '../Common/Radio';


const DragHandle = SortableHandle(() => {
    let Antd = window.Antd;
    return (<Antd.Tooltip title="移动排序知识项">
        <div className={"oprationcobu"}>
            <FontAwesomeIcon icon={fa.faBars} />
        </div>
    </Antd.Tooltip>)
});

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
    return (<Control onChange={(e,event) => {
        if(event === 'changeConfig'){
            content.onChange(item,e)
        }else{
            content.onChange(item,{value:e})
        }
    }} {...Object.assign(type,{item:item})} />)
}

const Item = SortableElement(({item,content,indexs}) => {
    let Antd = window.Antd;
    let isChoose = (item.id === content.props.data.chooseItem);
    return (<div onClick={e => {
        e.stopPropagation();
        content.onChangeLasting({chooseItem:item.id});
    }} style={{
    "width": "calc(100% - 20px)",
    "lineHeight": "24px",
    "fontSize": "16px",
    "padding": "5px",
    "margin": "10px 10px 0 10px",
    "color": "rgb(0, 0, 0)",
    "borderRadius": "4px",
    "border": isChoose?"2px solid rgb(0, 184, 255)":"",
    "background": "rgb(255, 255, 255)"}}>
        <div style={{"display": "flex","marginBottom": "5px"}}>
            {/*<div style={{margin: '0 8px'}}>{indexs+1}</div>*/}
            <div style={{"flex": "1"}}>
                <Antd.Input size="small" value={item.title||''} onChange={e => {
                    content.onChange(item,{title:e.target.value});
                }} />
            </div>
            <div style={{"display": "flex","marginLeft": "10px"}}>
                <DragHandle />
                <Antd.Popconfirm title={"是否删除此知识项?"} onConfirm={e => {
                    content.onDelete(item);
                }} okText="是" cancelText="否">
                    <div className={"oprationcobu"}>
                        <FontAwesomeIcon icon={fa.faTrashAlt} />
                    </div>
                </Antd.Popconfirm>
            </div>
        </div>
        {createControl(item,{
            status:(isChoose?'config':'edit'),
            isProhibit:(isChoose?false:true)
        },content)}
    </div>)
});
const Form = SortableContainer(({items,content}) => {
    return (
        <div style={{userSelect:'none',display:'grid',gridTemplateColumns: 'repeat(1, calc(100% / 1))'}}>
            {items.sectionForm.map((item, index) => (
                <Item key={`control-${item.id}${index}`} {...{
                    content:content,
                    index:index,
                    item:item,
                    indexs:index
                }}/>
            ))}
        </div>
    );
});

export default class Content extends React.Component{
	constructor(props) {
        super(props);
        this.state = {

        };
    }

    onSortEnd = ({oldIndex, newIndex},e) => {
        let newPropsData = this.props.data;
        let chooseSection = util.resultObjData(newPropsData,{id:this.props.data.chooseSection},true);
        chooseSection.sectionForm = arrayMove(chooseSection.sectionForm, oldIndex, newIndex);
        this.props.onChange(state => {
            state.ContentData = newPropsData;
            return state;
        })
    };

    onDelete(item){
        let data = this.props.data;
        let thisItemParentData = util.getItemTypeBeforeData(data,util.findItem(data,{id:item.id}),true);
        let ind = thisItemParentData.findIndex(findindex => findindex.id===item.id)
        thisItemParentData.splice(ind,1);
        this.props.onChange(data,true);
    }

    onChange(item,changeType){
        let data = this.props.data;
        let itemData = util.resultObjData(data,{id:item.id},true);
        for(let i in changeType){
            itemData[i] = changeType[i];
        }
        this.props.onChange(data,true);
    }

    onChangeLasting(changeType){
        let data = this.props.data;
        for(let i in changeType){
            data[i] = changeType[i];
        }
        this.props.onChange(data,true);
    }

    render() {
        //let Antd = window.Antd;
        let chooseSection = util.resultObjData(this.props.data,{id:this.props.data.chooseSection},true);
        return (<div className={"root_content"} onClick={e => {
                this.onChangeLasting({chooseItem:''});
            }}>
                <Form 
                    items={chooseSection} 
                    useDragHandle 
                    content={this} 
                    axis="xy" 
                    pressDelay={0} 
                    onSortEnd={this.onSortEnd} />
        </div>)
    }
}