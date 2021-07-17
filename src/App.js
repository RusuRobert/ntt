import React from 'react';
import './App.css';




class Car extends React.Component {
  render() {
    return <h2>Hi, I am a Car!</h2>;
  }
}



class App extends React.Component {
  constructor(props){
  super(props);
  this.state = {
    info: [],
    infoCrypto: [],
    isLoaded: false,
    infoLoaded: false,
  }
}

componentDidMount(){
  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=10&page=1&sparkline=false')
    .then(res => res.json())
    .then(json => {
        this.setState({
          isLoaded: true,
          info: json,
        })
    })  
}

apicallfunction (){
  fetch('https://api.coingecko.com/api/v3/coins/ethereum?localization=false')
  .then(res => res.json())
  .then(json => {
    this.setState({
      infoLoaded: true,
      infoCrypto: json,
    })
  
  })
}
  
  render () {
    
    var {info, isLoaded, infoCrypto, infoLoaded,} = this.state;
    
    
    if(!isLoaded){
      return <div>Nu s-au incarcat fisierele</div>
    }
    else{
      console.log(infoCrypto)

  return (
    <div className="App">
        
        <table id="tabelinfo">
          <tr>
            <th  className="thprincipal">Crypto Name</th>
            
              
              {info.map(info => (
                <th>
                <div className="container">
                  <button onClick= {this.apicallfunction.bind(this)}
                          className="button is-small" 
                          key={info.id}>
                            {info.name.forEach(e, i => {
                              e = i+1;
                            })}
                            
                              
                            
                            
                  </button>
                  
                  <div>{info.id}</div>
                
                </div>
              </th>
                  ))}
              
            
          </tr>
          <tr>
              <th className="thprincipal">
                  Crypto Image
              </th>


              {info.map(info =>(
                  <th>
                    <div className="container">
                      <img key={info.image} src={info.image}/>
                    </div> 
                  </th>
                ))}
          </tr>

          <tr>
              <th className="thprincipal">
              
                  Crypto Symbol
               
              </th>


              {info.map(info =>(
                  <th>
                    <div className="container">
                      {info.symbol}
                    </div> 
                  </th>
                ))}
          </tr>

          <tr>
              <th className="thprincipal">
                  Current Price
              </th>


              {info.map(info =>(
                  <th>
                    <div className="container">
                      {info.current_price}
                    </div> 
                  </th>
                ))}
          </tr>

          <tr>
              <th className="thprincipal">
                  High 24 Hour Price
              </th>


              {info.map(info =>(
                  <th>
                    <div className="container">
                      {info.high_24h}
                    </div> 
                  </th>
                ))}
          </tr>

          <tr>
              <th className="thprincipal">
                  Low 24 Hour Price
              </th>


              {info.map(info =>(
                  <th>
                    <div className="container">
                      {info.low_24h}
                    </div> 
                  </th>
                ))}
          </tr>
        
        </table>
      
    </div>
  );
    }
  }

}

export default App;
