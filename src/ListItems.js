import React, { useState } from 'react';
import './ListItems.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FlipMove from 'react-flip-move';
import { ReactSortable } from "react-sortablejs";


function ListItems(props) {
    const items = props.items;
    console.log(items)
    const [state, setState] = useState(items);

    return <div>
        <FlipMove duration={300} easing="ease-in-out">
            <ReactSortable id="task-list" list={state} setList={setState}>
                {items.map(item => (
                    <div className="list" key={item.key}>
                        <p>
                            {/* <input type="text" id={item.key} value={item.text} onChange={(e) => {
                                props.setUpdate(e.target.value, item.key)
                            }} /> */}
                            {item.text}
                            <span>
                                <FontAwesomeIcon className="faicons" onClick={() => {
                                    props.deleteItem(item.key)
                                }} icon="trash" />
                            </span>
                        </p>
                    </div>
                ))}
            </ReactSortable>
        </FlipMove>

    </div>
}

export default ListItems;