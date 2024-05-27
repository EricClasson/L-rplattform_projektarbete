import Loading from "./loading";
import React from "react";
function withLoading(Component) {
    return function WithLoadingComponent({ isLoading, ...props }) {
        if (isLoading) {
            return <Loading />;
          } else {
            return <Component {...props} />;
          } // Fix: Use the 'loading' component as a JSX element
    };
}
export default withLoading;