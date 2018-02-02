# rn-slider-switch
Multi slider switch component in React Native (iOs & android)



## Installation:

Install the component through npm using:

```
npm install rn-slider-switch --save
```

![alt text](https://raw.githubusercontent.com/victorkvarghese/rn-slider-switch/master/one.png)
![alt text](https://raw.githubusercontent.com/victorkvarghese/rn-slider-switch/master/last.png)

[YOUTUBE : See slider in action](https://www.youtube.com/watch?v=d7oeRdoRyFk&feature=youtu.be)



## Example:
```
import MultiSwitch from 'rn-slider-switch';
<MultiSwitch
                    currentStatus={'Open'}
                    disableScroll={value => {
                        console.log('scrollEnabled', value);
                        // this.scrollView.setNativeProps({
                        //     scrollEnabled: value
                        // });
                    }}
                    isParentScrollEnabled={false}
                    onStatusChanged={text => {
                        console.log('Change Status ', text);
                    }}
```

## Props:
* Pending
