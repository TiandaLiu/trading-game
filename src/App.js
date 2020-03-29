import React, { Component } from 'react';
import Card from './Card'
import Table from './Table'
import Info from './Info'
import './App.css';
// import { render } from '@testing-library/react';

class App extends Component {
  constructor(props) {
    super(props)
    var loadedData = []
    if (localStorage.getItem('listOfStocks')) {
      loadedData = JSON.parse(localStorage.getItem('listOfStocks'))
    }
    this.state = {
      listOfStocks: loadedData,
      accountInfo: null,
      symbol: '',
      shares: null,
      toggle: 1
    }
  }

  componentDidMount() {
    this.updateAccount()
  }

  updateAccount = () => {
    var value = 0
    const listOfStock = JSON.parse(localStorage.getItem('listOfStocks'))
    for (let i = 0; i < listOfStock.length; i++) {
      value += Number(listOfStock[i].shares) * Number(listOfStock[i].price)
    }
    var account = {totalValue:value}
    this.setState({accountInfo: account})
  }

  // handleSymbolChange= (e) => {
  //   this.setState({
  //       symbol: e.target.value
  //   })
  // }

  // hancleSharesChange = (e) => {
  //     this.setState({
  //         shares: e.target.value
  //     })
  // }

  handleChange = (e) => {
    if (e.target.id == "symbol") {
      this.setState({ symbol: e.target.value.toUpperCase() })
    } else {
      this.setState({ shares: e.target.value })
    }
  }

  searchSymbol = (symbol, shares) => {
    var searchUrl =`https://sandbox.iexapis.com/stable/search/${symbol}?token=Tsk_cac092f4184d4cc0a02c7e6ff3b4851f`
    fetch(searchUrl).then((response) => response.json()).then((results) => {
      var flag = false
      for (let i = 0; i < results.length; i++) {
        if (results[i].symbol == symbol) {
          flag = true
          this.buyStock(symbol, shares)
          break
        }
      }
      if (flag == false) {
        console.log("Nothing")
      }
    })
  }

  buyStock = (symbol, num) => {
    var url = `https://sandbox.iexapis.com/stable/stock/${symbol}/batch?types=quote,news,chart&range=1m&last=10&token=Tsk_cac092f4184d4cc0a02c7e6ff3b4851f`
    fetch(url).then((response) => response.json()).then((data) => data.quote).then((result) => {
      var temp = JSON.parse(localStorage.getItem('listOfStocks'))
      var stock = {name:result.companyName, symbol:result.symbol, price:result.latestPrice, today:result.change, shares:num, value:num*result.latestPrice}
      temp.push(stock)
      localStorage.setItem('listOfStocks', JSON.stringify(temp))
      this.setState({ listOfStocks: temp })
    })
  }
  // symbol, shares, state
  handleClick = (e) => {
    console.log(e.target.id)
    var symbol = this.state.symbol
    var shares = this.state.shares
    if (e.target.id == "buy") {
      var state = 1
    } else {
      var state = -1
    }
    console.log(symbol)
    var flag = 0
    for (let i = 0; i < this.state.listOfStocks.length; i++) {
      if (this.state.listOfStocks[i].symbol == symbol) {
        console.log(this.state.listOfStocks[i].symbol)
        var temp = JSON.parse(localStorage.getItem('listOfStocks'))
        if (state == -1) {
          temp[i].shares = Math.max(Number(temp[i].shares) + Number(shares) * Number(state), 0)
          if (temp[i].shares == 0) {
            temp.splice(i, 1)
          }
        } else {
          temp[i].shares = Number(temp[i].shares) + Number(shares) * Number(state)
        }
        localStorage.setItem('listOfStocks', JSON.stringify(temp))
        this.setState({ listOfStocks: temp })
        flag = 1
        break
      }
    }
    if (flag == 0 && state == 1) {
      console.log("Hello")
      this.searchSymbol(symbol, shares)
    }

    setTimeout(() => {
      this.updateAccount()
    }, 500);

  }

  clearStorage = (e) => {
    localStorage.setItem('listOfStocks', JSON.stringify([]))
    this.setState({ listOfStocks: JSON.parse(localStorage.getItem('listOfStocks')) })
    setTimeout(() => {
      this.updateAccount()
    }, 500);
  }

  handleSort = (attribute) => {

    var temp = JSON.parse(localStorage.getItem('listOfStocks'))
    var toggle = this.state.toggle
    if (toggle == 1) {
      if (attribute == 'symbol') {
        temp.sort((a, b) => (a.symbol < b.symbol) ? -1 : a)
      } else if (attribute == 'name') {
        temp.sort((a, b) => (a.name < b.name) ? 1 : -1)
      } else if (attribute == 'price') {
        temp.sort((a, b) => (a.price < b.price) ? 1 : -1)
      } else if (attribute == 'shares') {
        temp.sort((a, b) => (a.shares < b.shares) ? 1 : -1)
      } else {
        temp.sort((a, b) => (a.value < b.value) ? 1 : -1)
      }
    } else {
      if (attribute == 'symbol') {
        temp.sort((a, b) => (a.symbol > b.symbol) ? -1 : a)
      } else if (attribute == 'name') {
        temp.sort((a, b) => (a.name > b.name) ? 1 : -1)
      } else if (attribute == 'price') {
        temp.sort((a, b) => (a.price > b.price) ? 1 : -1)
      } else if (attribute == 'shares') {
        temp.sort((a, b) => (a.shares > b.shares) ? 1 : -1)
      } else {
        temp.sort((a, b) => (a.value > b.value) ? 1 : -1)
      }
    }
    localStorage.setItem('listOfStocks', JSON.stringify(temp))
    this.setState({ listOfStocks: temp, toggle: -toggle})
  }

  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="logo" href="#">
                <img src="https://cdn0.iconfinder.com/data/icons/gambling-23/50/35-512.png" width="50" height="50" class="img-fluid ml-4" alt="Responsive image"></img>
            </a>
            <p class="h2 ml-4">Trading Game</p>
            {/* <form class="form-inline my-2 my-lg-0 ml-4" onSubmit={this.handleBuy}>
              <input class="form-control mr-sm-2" type="search" placeholder="Search by name or symbol" aria-label="Search"></input>
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Add to List</button>
            </form> */}
        </nav>
        <div class="container mt-2">
          <div class="row col" style={{display:"bolck"}}>
            <div class="col-sm-8" id="left">
              <Info accountInfo={this.state.accountInfo}/>
              <div><p class="h3">Portfolio</p></div>
              <Table listOfStocks={this.state.listOfStocks} handleSort={this.handleSort}/>
            </div>
            <div class="col-sm-4" id="right">

              <div class="ml-4 mt-3 bg-light rounded" style={{"box-shadow":"0 10px 20px 0 rgba(0, 0, 0, 0.2)"}}>
                  {/* <form class="ml-2 mr-2 pt-2"> */}
                  <div class="ml-2 mr-2 pt-4 pb-4">
                    <div><p class="h3">Trading Panel</p></div>
                    <div class="form-group">
                        <label for="InputSymbol">Symbol</label>
                        <input id="symbol" onChange={this.handleChange} value={this.state.symbol} class="form-control" aria-describedby="emailHelp"/>
                        <small id="emailHelp" class="form-text text-muted">Please input the symbol of stock.</small>
                    </div>
                    <div class="form-group">
                        <label for="InputShares">Shares</label>
                        <input id="shares" onChange={this.handleChange} type="number" min="0" value={this.state.shares} class="form-control"/>
                    </div>
                    <button id="sell" class="btn btn-outline-danger my-2 my-sm-0 pl-4 pr-4" onClick={this.handleClick}>Sell</button>
                    <button id="buy" class="btn btn-outline-success my-2 my-sm-0 pl-4 pr-4 float-right" onClick={this.handleClick}>Buy</button>
                  </div>
                  {/* </form> */}
              </div>

              {/* <button onClick={this.clearStorage}>Clear</button> */}

            </div>
          </div>
        </div>
      </div>
    )
  }
}
// https://sandbox.iexapis.com/stable/search/apple?token=Tsk_cac092f4184d4cc0a02c7e6ff3b4851f
export default App;
