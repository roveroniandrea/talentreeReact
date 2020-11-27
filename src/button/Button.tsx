import React from "react";
import styles from './Button.module.css';

interface ButtonProps {
    onClick: Function
    text: string
}

export class Button extends React.Component<ButtonProps> {

    render() {
        return (
                <button className={styles.button} onClick={() => this.props.onClick()}>{this.props.text}</button>
        );
    }
}