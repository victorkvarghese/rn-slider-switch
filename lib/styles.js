import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    buttonStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    switcher: {
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOpacity: 0.31,
        shadowRadius: 10,
        shadowColor: 'grey'
});

export default styles;
