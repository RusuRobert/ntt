import React from 'react';
import './App.css';
import Modal from 'react-modal';
import ReactModal from 'react-modal';
Modal.setAppElement('#root');

///Styles for modal
const customStyles = {
  content: {
    top: "50%",
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  }
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      info: [],
      isLoaded: false,
      idCrypto: [],
      modalIsOn: false,
      
    }
    this.handleCloseModal = this.handleCloseModal.bind(this); 
  }




  
    ///API call for separate info about crypto and changing state for modal opening 
    handleClick = (id) => {
    console.log(`you clicked on ${id}`)
    fetch(`https://api.coingecko.com/api/v3/coins//${id}?localization=true&per_page=10`)
    .then(res=>res.json())
    .then(json =>{
      this.setState({
        idCrypto: json,
        modalIsOn : true,
      })
    });
    }
    
    ///Closing modal 
    handleCloseModal() {
      this.setState({
        modalIsOn: false,
      })
      
    };

  

  

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
      
      render () {
        var {info, idCrypto } = this.state;
        return (
                  <div className="App">
                    {/*Table*/}
                    <table className="table is-bordered is-fullwidth">
                      <tr>
                        <th  scope="col" className="">Crypto Name</th>
                        {/*Map Function for rendering info */}
                            {info.map(elem => (
                                <th scope="col" className="container">
                                  <div className="container has-text-centered">
                                
                                    <h1>
                                      {elem.name}
                                    </h1>
                                
                                  
                                    
                                  
                                    <div className="has-text-centered container">
                                      {/*Opening Modal Button*/}
                                      <button
                                        className="button is-primary is-light is-small" 
                                        onClick = {() => {this.handleClick(elem.id)}}>More Info</button>
                                          <div id="modal" className="modal">

                                            {/*Modal Component*/}
                                              <ReactModal
                                              isOpen={this.state.modalIsOn}
                                              contentLabel="Minimal Modal Example"
                                              style={customStyles}>
                                                <div className="modal-content has-text-centered">
                                              
                                                  <h1 className="subtitle is-6">Name:{idCrypto.name}</h1><br/>
                                                  <h1 className="subtitle is-6">Symbol:{idCrypto.symbol}</h1><br/>
                                                  <h1 className="subtitle is-6">Hashing algorithm:{idCrypto.hashing_algorithm}</h1><br/>
                                                  <h1 className="subtitle is-6">Description:{idCrypto.description?.en}</h1><br/>
                                                  <h1 className="subtitle is-6">Market cap in euro:{idCrypto.market_cap_change_24h_in_currency?.eur}</h1><br/>
                                                  <h1 className="subtitle is-6">Homepage:{idCrypto.links?.homepage}</h1><br/>
                                                  <h1 className="subtitle is-6">Genesis Date:{idCrypto.genesis_date}</h1><br/>
                                                    <br/>
                                                    {/*Closing Modal Button*/}
                                                    <button className="button is-primary is-light is-small"
                                                    onClick = {() => {this.handleCloseModal()}}>Close Info</button>
                                                </div>
                                                </ReactModal>
                                            </div>

                                  
                        
                                
                                    </div>
                                  </div>
                            
                                    
                                </th>
                                    
                                    ))}
                                    
                                      
                          
                        
                        
                      </tr>
                      {/*Tr for Crypto Images*/}
                      <tr>
                          <th className="">
                              Crypto Image
                          </th>


                          {info.map(elem =>(
                              <th>
                                <div className="container">
                                  <img key={elem.image} src={elem.image}/>
                                </div> 
                              </th>
                            ))}
                      </tr>
                      {/*Tr for Crypto Symbol*/}
                      <tr>
                          <th className="">
                          
                              Crypto Symbol
                          
                          </th>


                          {info.map(elem =>(
                              <th>
                                <div className="container">
                                  {elem.symbol}
                                </div> 
                              </th>
                            ))}
                      </tr>
                      {/*Tr For Crypto current prices*/}
                      <tr>
                          <th className="">
                              Current Price
                          </th>


                          {info.map(elem =>(
                              <th>
                                <div className="container">
                                  {elem.current_price}
                                </div> 
                              </th>
                            ))}
                      </tr>
                      {/*Tr for Highes Price in the last 24h*/}
                      <tr>
                          <th className="">
                              High 24 Hour Price
                          </th>


                          {info.map(elem =>(
                              <th>
                                <div className="container">
                                  {elem.high_24h}
                                </div> 
                              </th>
                            ))}
                      </tr>
                      {/*Tr for Lowest Price in the last 24h*/}
                      <tr>
                          <th className="">
                              Low 24 Hour Price
                          </th>


                          {info.map(elem =>(
                              <th>
                                <div className="container">
                                  {elem.low_24h}
                                </div> 
                              </th>
                            ))}
                      </tr>
                    
                    </table>
                
              </div>
            );
              }
  }

export default App;
