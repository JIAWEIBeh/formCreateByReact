import React from 'react';
import SortList from './list';

const Data = [];

for (let index = 0; index < 20; index++) {
  Data.push({ name: index + 1, o: index });
}
class DraggerSort extends React.Component{
	constructor(props) {
        super(props);
        this.state = {
            horzontal: false, 
            gap: 150
        };
    }
    render() {
        let Bootstrap = window.Bootstrap;
    	return (<div className={"changediv"}>
            <Bootstrap.Button
              onClick={() => {
                this.setState({
                  horzontal: !this.state.horzontal,
                  gap: this.state.horzontal ? 150 : 150
                });
              }}
            >
              换
            </Bootstrap.Button>
            <SortList
              horizontal={this.state.horzontal}
              data={Data}
              gap={this.state.gap}
              renderItem={(handle, data) => (
                <div className="props-draggers" {...handle()}>
                  {data.name}
                </div>
              )}
            />
          </div>)
    }
}
export default DraggerSort;