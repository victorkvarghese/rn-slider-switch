import React, { Component } from 'react';
import {
    Animated,
    Dimensions,
    PanResponder,
    View,
    Platform
} from 'react-native';
import Button from './Button';
import styles from './styles';
const { width } = Dimensions.get('window');
import PropTypes from 'prop-types';

export default class MultiSwitch extends Component {

    constructor(props){
        super(props);
        this.state = {
            isComponentReady: true,
            position: new Animated.Value(0),
            posValue: 0,
            selectedPosition: props.defaultActiveIndex,
            duration: 100,
            mainWidth: props.width,
            switcherWidth: props.width / 3,
            thresholdDistance: props.width - 8 - props.width / 2.4
        };
        this.isParentScrollDisabled = false;
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => true,
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,

            onPanResponderGrant: () => {
                // disable parent scroll if slider is inside a scrollview
                if (!this.isParentScrollDisabled) {
                    //this.props.disableScroll(false); // todo
                    this.isParentScrollDisabled = true;
                }
            },

            onPanResponderMove: (evt, gestureState) => false,
            /**{
                if (!this.props.disableSwitch) {
                    let finalValue = gestureState.dx + this.state.posValue;
                    if (finalValue >= 0 && finalValue <= this.state.thresholdDistance)
                        this.state.position.setValue(this.state.posValue + gestureState.dx);
                }
            },*/

            onPanResponderTerminationRequest: () => true,

            onPanResponderRelease: (evt, gestureState) => {
                if (!this.props.disableSwitch) {
                    let finalValue = gestureState.dx + this.state.posValue;
                    this.isParentScrollDisabled = false;
                    //this.props.disableScroll(true);
                    if (gestureState.dx > 0) {
                        if (finalValue >= 0 && finalValue <= 30) {
                            this.onLeftState();
                        } else if (finalValue >= 30 && finalValue <= 121) {
                            this.onMiddleState();
                        } else if (finalValue >= 121 && finalValue <= 280) {
                            if (gestureState.dx > 0) {
                                this.onRightState();
                            } else {
                                this.onMiddleState();
                            }
                        }
                    } else {
                        if (finalValue >= 30 && finalValue <= 175) {
                            this.onMiddleState();
                        } else if (finalValue >= -100 && finalValue <= 30) {
                            this.onLeftState();
                        } else {
                            this.onRightState();
                        }
                    }
                }
            },

            onPanResponderTerminate: () => {},
            onShouldBlockNativeResponder: () => {
                // Returns whether this component should block native components from becoming the JS
                // responder. Returns true by default. Is currently only supported on android.
                return true;
            }
        });
        this.moveInitialState();
    }

    onLeftState = () => {
        //if (this.props.disableSwitch) return;
        Animated.timing(this.state.position, {
            toValue: Platform.OS === 'ios' ? -2 : 0,
            duration: this.state.duration
        }).start();
        setTimeout(() => {
            this.setState({
                posValue: Platform.OS === 'ios' ? -2 : 0,
                selectedPosition: 0
            });
        }, 100);
        this.props.onLeftState();
    };

    onMiddleState = () => {
        //if (this.props.disableSwitch) return;
        Animated.timing(this.state.position, {
            toValue: this.state.mainWidth / 2 - this.state.switcherWidth / 2,
            duration: this.state.duration
        }).start();
        setTimeout(() => {
            this.setState({
                posValue: this.state.mainWidth / 2 - this.state.switcherWidth / 2,
                selectedPosition: 1
            });
        }, 100);
        this.props.onMiddleState();
    };

    onRightState = () => {
        //if (this.props.disableSwitch) return;
        Animated.timing(this.state.position, {
            toValue:
                Platform.OS === 'ios'
                    ? this.state.mainWidth - this.state.switcherWidth
                    : this.state.mainWidth - this.state.switcherWidth - 2,
            duration: this.state.duration
        }).start();
        setTimeout(() => {
            this.setState({
                posValue:
                    Platform.OS === 'ios'
                        ? this.state.mainWidth - this.state.switcherWidth
                        : this.state.mainWidth - this.state.switcherWidth - 2,
                selectedPosition: 2
            });
        }, 100);
        this.props.onRightState();
    };

    getStatus = () => {
        switch (this.state.selectedPosition) {
        case 0:
            return this.props.leftStateIconName;
        case 1:
            return this.props.middleStateIconName;
        case 2:
            return this.props.rightStateIconName;
        }
    };

    moveInitialState = () => {
        switch (this.state.selectedPosition) {
        case 0:
            this.onLeftState();
            break;
        case 1:
            this.onMiddleState();
            break;
        case 2:
            this.onRightState();
            break;
        }
    };

    setPosition(pos){
        if(this.state.selectedPosition !== pos){
            this.setState({selectedPosition: pos}, () => {
                this.moveInitialState();
            });
        }

    }

    getStyleBySelectedIndex = () => {
        switch (this.state.selectedPosition) {
        case 0:
            return this.props.leftStateStyle;
        case 1:
            return this.props.middleStateStyle;
        case 2:
            return this.props.rightStateStyle;
        }
    };

    render(){
        const {width, height, iconSize, leftStateStyle, rightStateStyle, middleStateStyle, backgroundColor} = this.props;

        return (
            <View style={[styles.container, {width: width, height: height, borderRadius: height / 2, backgroundColor: backgroundColor, borderColor: backgroundColor}]}>
                <Button
                    onPress={() => this.props.disableSwitch ? null : this.setPosition(0)}
                    style={{width: width / 3}}
                    type={this.props.leftStateIconName}
                    iconSize={iconSize ? iconSize : (height * 3 / 4)}
                    iconStyle={leftStateStyle}
                />

                <Button
                    onPress={() => this.props.disableSwitch ? null : this.setPosition(1)}
                    style={{width: width / 3}}
                    type={this.props.middleStateIconName}
                    iconSize={iconSize ? iconSize : (height * 3 / 4)}
                    iconStyle={middleStateStyle}/>

                <Button
                    onPress={() => this.props.disableSwitch ? null : this.setPosition(2)}
                    style={{width: width / 3}}
                    type={this.props.rightStateIconName}
                    iconSize={iconSize ? iconSize : (height * 3 / 4)}
                    iconStyle={[rightStateStyle]}/>

                <Animated.View
                    {...this._panResponder.panHandlers}
                    style={[
                        styles.switcher,
                        {width: width / 3, height: height - 2, borderRadius: height / 2},
                        {
                            transform: [{ translateX: this.state.position }]
                        }
                    ]}
                >
                    <Button type={this.getStatus()} style={{borderRadius: height / 2}} iconStyle={[this.getStyleBySelectedIndex(),{opacity: this.props.disableSwitch && this.props.disableSwitch == true ? 0.3 : 1 }]} active={true} iconSize={iconSize ? iconSize : (height * 3 / 4)}/>
                </Animated.View>
            </View>
        );
    }

}

MultiSwitch.defaultProps = {
    disableSwitch: false,
    height: 40,
    width: 200,
    defaultActiveIndex: 1,
    leftStateColor: 'red',
    rightStateColor: 'green',
    middleStateColor: 'grey',
    backgroundColor: '#E0E0E0'

};

MultiSwitch.propTypes = {
    defaultActiveIndex: PropTypes.number,
    leftStateIconName: PropTypes.string,
    middleStateIconName: PropTypes.string,
    rightStateIconName: PropTypes.string,
    onLeftState: PropTypes.func,
    onMiddleState: PropTypes.func,
    onRightState: PropTypes.func,
    width: PropTypes.number,
    height: PropTypes.number,
    disableScroll: PropTypes.func,
    iconSize: PropTypes.number,
    leftStateStyle: PropTypes.object,
    rightStateStyle: PropTypes.object,
    middleStateStyle: PropTypes.object,
    backgroundColor: PropTypes.string
};
