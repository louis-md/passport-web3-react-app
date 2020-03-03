import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const protectedRoute  = ({component: Component, user, graph, getGraph, ...rest}) => {
    return (
      <Route
        {...rest}
        render={ props  => {
            if(user){
              return <Component {...props} loggedInUser={user} graph={graph} getGraph={getGraph}/>
            } else {
              return <Redirect to={{pathname: '/', state: {from: props.location}}} />
            }
          }
        }
      />
    )
}
export default protectedRoute;