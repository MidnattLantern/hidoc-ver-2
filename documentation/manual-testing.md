SignUp Authentication:
- Navigating to /signup link, the SignUp button is "disabled", until the forms have some content.
- Writing different nonsensical text to the username and password fields and clicking the button will result in error messages, and resize the container to fit the messages.
- If the fields reach accepted criterias, the new authentication is created on the API, and the user is redirected to the signin page

SignIn Authentication:
- Navigating to /signin link, the SignIn is "disabled", until the forms have some content.
- Writing invalid data to the forms and clicking the SignIn button, nothing happen.
- Writing valid data to the forms and clicking the SignIn button, the user is redirected to the home page and is authenticated for 24 hours.
- Refreshing the page should keep the user authenticated, depending on the DRF-API settings, this could fail. To learn more about this detail, refer to the DRF-API repository documentation.

SignOut Authenetication:
- When the user is authenticated, the NavBar will have a "Sign out" button. Clicking the button redirects the user to a sign out page.
- There's a "Sign out" button in a container, clicking the button unauthenticate the user and redirects the user to the home page. The NavBar is changed with unauthenticated options.