import React from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';

const Xyitem = SortableElement(({value}) => <div style={{
    float:'left',
    width:'calc(100% - 20px)',
    height:'100px',
    lineHeight:'100px',
    textAlign:'center',
    margin:'10px',
    color:'#fff',
    background:'rgba(0, 149, 255, 0.82)'}}>{value}</div>);
const Xy = SortableContainer(({items}) => {
    return (
        <div style={{flex:'1',userSelect:'none',display:'grid',gridTemplateColumns: 'repeat(5, calc(100% / 5))'}}>
            {items.map((value, index) => (
                <Xyitem key={`item-${value}`} index={index} value={value} />
            ))}
        </div>
    );
});

const Xitem = SortableElement(({value}) => <div style={{
    float:'left',
    width:'calc(100% - 20px)',
    height:'100px',
    lineHeight:'100px',
    textAlign:'center',
    margin:'10px',
    color:'#fff',
    flex:'1',
    background:'rgba(0, 149, 255, 0.82)'}}>{value}</div>);
const X = SortableContainer(({items}) => {
    return (
        <div style={{flex:'1',userSelect:'none',display:'flex',gridTemplateColumns: 'repeat(5, calc(100% / 5))'}}>
            {items.map((value, index) => (
                <Xitem key={`item-${value}`} index={index} value={value} />
            ))}
        </div>
    );
});

const Yitem = SortableElement(({value}) => <div style={{
    float:'left',
    width:'calc(100% - 20px)',
    height:'50px',
    lineHeight:'50px',
    textAlign:'center',
    margin:'5px 10px',
    color:'#fff',
    background:'rgba(0, 149, 255, 0.82)'}}>{value}</div>);
const Y = SortableContainer(({items}) => {
    return (
        <div style={{flex:'1',userSelect:'none',display:'grid',gridTemplateColumns: 'repeat(1, calc(100% / 1))'}}>
            {items.map((value, index) => (
                <Yitem key={`item-${value}`} index={index} value={value} />
            ))}
        </div>
    );
});

export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10']
        }
    }
    onSortEnd = ({oldIndex, newIndex},e) => {
        this.setState(({items}) => ({
            items: arrayMove(items, oldIndex, newIndex),
        }));
    };
    render() {
        return (
            <div>
                <div style={{display:'flex'}}>
                    <div style={{
                        fontWeight: '800',
                        fontSize: '20px',
                        padding: '10px 0 0 10px'
                    }}>{"自由排序"}</div>
                    <Xy items={this.state.items} axis="xy" pressDelay={0} onSortEnd={this.onSortEnd} />
                </div>
                <div style={{display:'flex'}}>
                    <div style={{
                        fontWeight: '800',
                        fontSize: '20px',
                        padding: '10px 0 0 10px'
                    }}>{"横向排序"}</div>
                    <X items={this.state.items} axis="x" pressDelay={0} onSortEnd={this.onSortEnd} />
                </div>
                <div style={{display:'flex'}}>
                    <div style={{
                        fontWeight: '800',
                        fontSize: '20px',
                        padding: '10px 0 0 10px'
                    }}>{"纵向排序"}</div>
                    <Y items={this.state.items} axis="y" pressDelay={0} onSortEnd={this.onSortEnd} />
                </div>
            </div>
        )
    }
}
