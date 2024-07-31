Link Navigation
---
HiDoc cannot use `href` because the window will flash for a split second. Instead, HiDoc use `useHistory` and `onClick={}` which allow smoother UX when navigating across links.

The order of styling from App.js and NavBar.js is important:
- App.js decide how tall and wide the container can be, as well ass the margin
- NavBar.js apply the actual styling, the dimensions submit to the restrictions assigned by App.js