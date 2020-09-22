more parameterized, hence customizable multiswitch!

It is orginally forked from https://github.com/victorkvarghese/rn-slider-switch


## Agenda
- I want to set a ratio such as 1:4 (width:height with min default values), so that multiswithc cannot have the values like 20 width and 100 height.
- In my case, I have a swipeable card and it has a multiswitch on it. When I use MultiSwitch on another component which has swipe ability, something goes wrong about the switch. To solve that, I disabled the onPanResponderMove. It only works when you touch the buttons. It gives me the idea that, this can be done with a simple parameter, i.e swipeable={true}.
- MultiSwitch can be vertical as well. It means animation axis should be converted from x to y.
