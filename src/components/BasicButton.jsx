import React from 'react';

// 使い回し用ボタンコンポーネント
export const BasicButton = (props) => {
    return (
        <button onClick={() => props.onClick()}>
            {props.label}
        </button>
    )
}