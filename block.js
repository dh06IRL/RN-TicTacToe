import React, { Component } from 'react';
import {StyleSheet, Text, TouchableHighlight, View } from 'react-native';

export default class Ticitac extends Component {
    state: {
        cellId: 0,
        color: "",
        rVal: 0,
        cVal: 0,
        mVal: ""
      };

    constructor(props){
        super(props);
        this.state = {
            cellId: this.props.cellId,
            color: this.props.color,
            rVal : this.props.rVal,
            cVal: this.props.cVal,
            mVal: this.props.mVal
        };
    }

    render (){
    return (
        <View >
            <TouchableHighlight style={{width: 100, height: 100, backgroundColor: this.state.color}} 
             onPress={this.props.onUserMove.bind(this, this.state.cellId, 
             this.state.cVal, this.state.rVal)} underlayColor="white" >
                <View style={styles.container} >
                    <Text style={styles.cellLocationText}> {this.state.rVal} : {this.state.cVal} </Text>
                    <Text style={styles.cellMoveValueText}>{this.props.mVal}</Text>
                </View>
            </TouchableHighlight>
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cellLocationText: {
        fontSize: 12,
        color:"#ee4540",
    },
    cellMoveValueText: {
        fontSize: 40,
        color:"#e3d8e3",
        alignItems: 'center',
        justifyContent: 'center',
    }
})