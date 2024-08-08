calc in css
---
Using calc in css. The navbar is 150px wide, and the width of the page turner need to be 100% so that it's perfectly centered, but it cannot include the navbar, hence
```css
    width: calc(100% - 150px);
```
for the phone dimension, there is 100% with no subtraction.

The 100% width cause a problem however, adding a border reveal there's a box above the projects that may interupt an attempt in clicking a project, if it's located next to the page turner buttons. using pointer-events, set to none, for the entire page turner container and all for the actual buttons, the cake is both kept and eaten.