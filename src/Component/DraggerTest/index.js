import React from 'react';
import Dragger from '../Common/Dragger';

class DraggerTest extends React.Component{
	constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    render() {
        let Bootstrap = window.Bootstrap;
    	return (<div>
            <Dragger>
                {({ style, handle }) => (
                    <div className={"content_box_item"} style={{ ...style }} {...handle()}>
                        <Bootstrap.Form.Control />
                    </div>
                )}
            </Dragger>
            <Dragger>
                {({ style, handle }) => (
                    <div className={"content_box_item"} style={{ ...style }} {...handle()}>
                        <Bootstrap.Form.Control />
                    </div>
                )}
            </Dragger>
            <Dragger grid={[25, 25]}>
                {({ style, handle }) => (
                    <div className={"content_box_item"} style={style} {...handle()}>
                    网格移动,每次移动25px
                    </div>
                )}
            </Dragger>
            <Dragger bounds={{}}>
            {({ style, handle, bound }) => (
                <div
                ref={bound.instance}
                className={"content_box"}
                style={{
                    ...bound.style
                }}
                >
                <div
                    className={"content_box_item"}
                    style={{ ...style, border: "1px solid rgba(120,120,120,0.3)" }}
                    {...handle()}
                >
                    不能离开框框的范围
                </div>
                </div>
            )}
            </Dragger>
        </div>)
    }
}
export default DraggerTest;