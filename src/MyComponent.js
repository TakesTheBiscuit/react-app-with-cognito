import React from 'react';

import Amplify, { Auth, Hub, API } from 'aws-amplify'
import awsconfig from './.aws-config/awsconfig'
import awsauth from './.aws-config/awsauth'


class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {

    Amplify.configure(awsconfig)
    Auth.configure({ oauth: awsauth })
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          console.log('sign in', event, data)
          // this.setState({ user: data})
          break
        case 'signOut':
          console.log('sign out')
          // this.setState({ user: null })
          break
      }
    })

    
    fetch("https://api.fda.gov/food/enforcement.json?limit=10")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.results
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  whoAmI() {
    Auth.currentAuthenticatedUser().then(user => {
        console.log('currentAuthenticatedUser', user)
        this.setState({ user})
        
        alert(user.attributes.email);
      }).catch(() => {
          console.log('Not signed in');
          alert('Please sign in first..');
    })
  }

  async queryApi() {
    const { user } = this.state;

    const apiName = 'demo'
    const path = '/'
    const token = user.signInUserSession.idToken.jwtToken;


    const request = {
        body: {
            attr: "value"
        },
        headers: {
            Authorization: token
        }
    };

    var response = await API.post(apiName, path, request)
      .catch(error => {
          console.log(error);
      });
    
      return response;


  }

  render() {
    const { error, isLoaded, items, user } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {

      return (
          
        <><button onClick={() => Auth.federatedSignIn()}>Open Hosted UI</button>
        
        <button onClick={() => this.whoAmI()}>Who am i</button>

        <button onClick={() => this.queryApi()}>Query api</button>


        <ul>

              {items.map(item => (
                  <li key={item.event_id}>
                      {item.product_description} {item.reason_for_recall}
                  </li>
              ))}
          </ul></>
      );
    }

  }
}

export default MyComponent;
