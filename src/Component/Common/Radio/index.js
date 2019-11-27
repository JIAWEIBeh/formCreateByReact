import React from 'react';
import {SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fa from '@fortawesome/free-solid-svg-icons'
import arrayMove from 'array-move';
import * as util from '../../../utils/utils';
import AddModel from './AddMoreOption';

const DragHandle = SortableHandle(() => {
    let Antd = window.Antd;
    return (<Antd.Tooltip title="移动选项排序">
        <div className={"oprationcobu"}>
            <FontAwesomeIcon icon={fa.faBars} />
        </div>
    </Antd.Tooltip>)
});

const Item = SortableElement(({item,content,index}) => {
    let Antd = window.Antd;
    return (<div style={{
    "width": "calc(100% - 20px)",
    "lineHeight": "24px",
    "fontSize": "16px",
    "padding": "0px",
    "margin": "5px 5px 0 10px",
    "color": "rgb(0, 0, 0)",
    "borderRadius": "4px",
    "background": "rgb(255, 255, 255)"}}>
        <div style={{display:'flex'}}>
            <DragHandle />
            <Antd.Input size="small" placeholder="请输入展示值" value={item.optionText||''} onChange={e => {
                let itemData = content.state.item;
                let options = util.resultObjData(itemData,{optionId:item.optionId},true);
                options.optionText = e.target.value;
                content.props.onChange(itemData,'changeConfig')
            }} />
            <Antd.Input style={{marginLeft:'5px'}} placeholder="请输入真实值" size="small" value={item.optionValue||''} onChange={e => {
                let itemData = content.state.item;
                let options = util.resultObjData(itemData,{optionId:item.optionId},true);
                options.optionValue = e.target.value;
                content.props.onChange(itemData,'changeConfig')
            }} />
            <Antd.Popconfirm title={"是否删除此选项?"} onConfirm={e => {
                let itemData = content.state.item;
                let delIndex = itemData.optionData.findIndex(finds => {return finds.optionId === item.optionId});
                if(delIndex>-1){
                    itemData.optionData.splice(delIndex,1);
                }
                content.props.onChange(itemData,'changeConfig')
            }} okText="是" cancelText="否">
                <div className={"oprationcobu"}>
                    <FontAwesomeIcon icon={fa.faTrashAlt} />
                </div>
            </Antd.Popconfirm>
        </div>
    </div>)
});

const Form = SortableContainer(({items,content}) => {
    return (
        <div style={{userSelect:'none',display:'grid',gridTemplateColumns: 'repeat(1, calc(100% / 1))'}}>
            {items.optionData.map((item, index) => (
                <Item key={`control-${item.id}${index}`} content={content} index={index} item={item}/>
            ))}
        </div>
    );
});

class Radio extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            item:props.item?props.item:{},
            optionModelVis:false,
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
    createOption(){
        let option = [];
        let Antd = window.Antd;
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        this.state.item.optionData.map(item => {
            option.push(<Antd.Radio style={radioStyle} key={item.optionId} value={item.optionValue}>{item.optionText}</Antd.Radio>);
            return '';
        })
        return option;
    }

    onSortEnd = ({oldIndex, newIndex},e) => {
        let item = this.state.item;
        item.optionData = arrayMove(item.optionData, oldIndex, newIndex);
        this.props.onChange(item,'changeConfig');
    };

    render() {
        let Antd = window.Antd;
        let { isProhibit } = this.state;
        let lineNumStyle = (num) => ({
            "display": "grid",
            "gridTemplateColumns": `repeat(${num?num:1},calc(100% / ${num?num:1}))`,
            "pointerEvents": isProhibit?"none":"block"
        });
        if(this.props.status === 'config'){
            return (<div>
                <Form 
                items={this.state.item} 
                useDragHandle 
                content={this} 
                axis="y" 
                pressDelay={0} 
                onSortEnd={this.onSortEnd} />
                <Antd.Button style={{margin:'5px 5px 0 20px'}} size="small" type="primary" onClick={e => {
                    let itemData = this.state.item;
                    itemData.optionData.push({optionId:util.getRandomId()})
                    this.props.onChange(itemData,'changeConfig')
                }}><FontAwesomeIcon icon={fa.faPlus} />添加选项</Antd.Button>
                <Antd.Button style={{margin:'5px 5px 0 5px'}} size="small" type="primary" onClick={e => {
                    this.setState({
                        optionModelVis:true
                    })
                    /*let itemData = this.state.item;
                    itemData.optionData.push({optionId:util.getRandomId()})
                    this.props.onChange(itemData,'changeConfig')*/
                }}><FontAwesomeIcon icon={fa.faPlus} />批量添加选项</Antd.Button>
                <AddModel onChange={e => {
                    let option = e.split(',');
                    option = option.map(item => {
                        item = {optionId:util.getRandomId(),optionText:item,optionValue:item};
                        return item;
                    })
                    let itemData = this.state.item;
                    itemData.optionData = itemData.optionData.concat(option)
                    this.props.onChange(itemData,'changeConfig')
                    this.setState({
                        optionModelVis:false
                    })
                }} onClose={e => {
                    this.setState({
                        optionModelVis:false
                    })
                }} isvis={this.state.optionModelVis} />
            </div>)
        }else if(this.props.status === 'edit'){
            return (<Antd.Radio.Group style={lineNumStyle(2)} size="small" value={this.state.item.value||''} onChange={e => {
                this.props.onChange(e.target.value,e);
            }}>
                {this.createOption()}
            </Antd.Radio.Group>)
        }else if(this.props.status === 'show'){
            return (<div>{this.state.item.value||''}</div>)
        }else{
            return (<Antd.Radio.Group style={lineNumStyle(2)} size="small" value={this.state.item.value||''} onChange={e => {
                this.props.onChange(e.target.value,e);
            }}>
                {this.createOption()}
            </Antd.Radio.Group>)
        }
    }
}
export default Radio;