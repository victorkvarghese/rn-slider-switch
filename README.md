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

## Properties

| Prop                                                    | Description                                                                                                    |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **`currentStatus`**                                     | Initial Status of the slider . Defaults to 'Open'. Other values include 'In Progress', 'Complete'                   |
| **`onStatusChanged`**                                    | Called when status changes in Slider                                                                         |
| **`isParentScrollDisabled`**                                    | Whether scroll is disabled in Parent.(Optional)                                                                 |
| **`disableScroll`**                                | Used to disable scroll in parent .. Works as callback function if u want to disable scroll in parent.(Optional)                                  |
| **`disableSwitch`**                                | Used to disable switch (Click & scroll will not work) .. (Optional)                                 |




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
                    }}/>
```

