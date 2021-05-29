# react-lapadi-subscribe

React subscribe form for lapadi App.

Working demo : https://lapadi.github.io/react-lapadi-subscribe/

## Usage

Create a list on lapadi, add a form and get its "action" attribute from the lapadi UI

The `LapadiSubscribe` gives you a render prop with a `subscribe` method that you can call with your data.

In your app :

```jsx
import LapadiSubscribe from "react-lapadi-subscribe"

const url = "//lapadi.com/api/v1/subscribe/post?app={app_id}&id={form_id}";

// simplest form (only email)
const SimpleForm = () => <LapadiSubscribe url={url}/>

// use the render prop and your custom form
const CustomForm = () => (
  <LapadiSubscribe
    url={url}
    render={({ subscribe, status, message }) => (
      <div>
        <CustomForm onSubmitted={formData => subscribe(formData)} />
        {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
        {status === "error" && <div style={{ color: "red" }} dangerouslySetInnerHTML={{__html: message}}/>}
        {status === "success" && <div style={{ color: "green" }}>Subscribed !</div>}
      </div>
    )}
  />
)
```
see examples in [./demo/src](./demo/src)