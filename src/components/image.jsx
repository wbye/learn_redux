import React from 'react';
import classNames from 'classnames';

export class Image extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        let {src,className} = this.props;

        return (
            <img className={className} src={src} style={{width:'100%',height:'100%'}}/>
        );
    }
}


export class NormalImage extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        let {src,className,width,height} = this.props;

        return (
            <div className={className} style={{width:width,height:height,backgroundColor:'gray'}}>
                <Image src={src} />
            </div>
        );
    }
}

export class ReplaceImage extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            load:false
        };
    }
    componentDidMount(){
        let image = new window.Image();

        image.src= this.props.src;
        image.onload = ()=>{
            this.setState({
                load:true
            });
        }
    }
    render(){
        let {src,className,width,height} = this.props;
        let {load} = this.state;
        let imageClassName = classNames({hide:!load});

        return (
            <div className={className} style={{width:width,height:height,backgroundColor:'gray'}}>
                <Image src={src} class={imageClassName} />
            </div>
        );
    }
}