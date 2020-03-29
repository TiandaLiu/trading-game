import React, { Component }from 'react';

class Card extends Component {
    constructor(props) {
        super(props)
        this.state = {
            symbol: '',
            shares: 0
        }
    }

    handleSymbolChange= (e) => {
        console.log(e.target.value)
        this.setState({
            symbol: e.target.value
        })
    }
    
    hancleSharesChange = (e) => {
        console.log(e.target.value)
        this.setState({
            shares: e.target.value
        })
    }

    handleBuy = () => {
        this.props.handleBuy(this.state.symbol, this.state.shares, 1)
    }

    handleSell = () => {
        this.props.handleBuy(this.state.symbol, this.state.shares, -1)
    }

    render() {
        return (
            // <div class="ml-4 mt-3 bg-light rounded" style={{height:"400px", "box-shadow":"0 10px 20px 0 rgba(0, 0, 0, 0.2)"}}>
            //     <form class="ml-2 mr-2 pt-2">
            //         <div class="form-group">
            //             <label for="InputSymbol">Symbol</label>
            //             <input onChange={this.handleSymbolChange} value={this.state.symbol} class="form-control" id="InputSymbol" aria-describedby="emailHelp"/>
            //             <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            //         </div>
            //         <div class="form-group">
            //             <label for="InputShares">Shares</label>
            //             <input onChange={this.hancleSharesChange} value={this.state.shares} class="form-control" id="InputShares"/>
            //         </div>
            //         <button class="btn btn-outline-danger my-2 my-sm-0 pl-4 pr-4" onClick={this.handleSell}>Sell</button>
            //         <button class="btn btn-outline-success my-2 my-sm-0 pl-4 pr-4 float-right" onClick={this.handleBuy}>Buy</button>
            //     </form>

            // </div>
            <div class="ml-4 mt-3 bg-light rounded" style={{height:"400px", "box-shadow":"0 10px 20px 0 rgba(0, 0, 0, 0.2)"}}>
                  <form class="ml-2 mr-2 pt-2">
                    <div class="form-group">
                        <label for="InputSymbol">Symbol</label>
                        <input onChange={this.handleSymbolChange} value={this.state.symbol} class="form-control" id="InputSymbol" aria-describedby="emailHelp"/>
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="InputShares">Shares</label>
                        <input onChange={this.hancleSharesChange} value={this.state.shares} class="form-control" id="InputShares"/>
                    </div>
                    <button class="btn btn-outline-danger my-2 my-sm-0 pl-4 pr-4" onClick={this.handleSell}>Sell</button>
                    <button class="btn btn-outline-success my-2 my-sm-0 pl-4 pr-4 float-right" onClick={this.handleBuy}>Buy</button>
                  </form>
            </div>
        )
    }
}

export default Card;