Access authentication tokens, Axios interceptors, Response intereceptors:
---
After 5 minutes, the user is unauthenticated. There's a workaround to keep the access token and refresh token for longer.
The api component has axiosReq and axiosRes.
The currentUserContext component can listen to 401 errors response and act in a way that will refresh the token.
useMemo() is used to achieve this.