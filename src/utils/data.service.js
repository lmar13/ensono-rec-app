class DataService {
    
    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
    
    
        return fetch(`http://localhost:3001${url}`, {
          headers,
          ...options,
        })
          .then(this._checkStatus)
          .then(response => response.json())
      }
    
      _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) {
          // Success status lies between 200 to 300
          return response
        } else {
          var error = new Error(response.statusText)
          error.response = response
          throw error
        }
      }
}

export default DataService