import React, { Component }from 'react';

class Table extends Component {
    handleClick = (e) => {
        const attribute = e.target.id
        console.log(attribute)
        this.props.handleSort(attribute)
    }
    render() {
        var banner = ''
        if (!this.props.listOfStocks || this.props.listOfStocks.length == 0) {
            banner = <p class="text-center"></p>
        }

        const cells = this.props.listOfStocks.map((stock) => {
            var change
            if (Number(stock.today) < 0) {
                change = <td class="text-danger">{stock.today}</td>
            } else {
                change = <td class="text-success">+{stock.today}</td>
            }
            return (<tr>
                        <th scope="row">{stock.name}</th>
                        <td>{stock.symbol}</td>
                        {/* <td><img src="./logo192.png" class="" style={{height:"30px", width:"40px"}}></img></td> */}
                        <td>{stock.price}</td>
                        {/* <td class="text-success">{stock.today}</td> */}
                        {change}
                        <td>{stock.shares}</td>
                        <td>{(Number(stock.value)).toFixed(2)}</td>
                    </tr>
            )
        })

        
        return (
            <div class="row">
                <table class="table table-hover table-striped" style={{width:"100%", overflow:"scroll"}}>
                    <caption>This is your stock portfolio</caption>
                    <thead>
                    <tr>
                        <th scope="col" onClick={this.handleClick} id="name">Name</th>
                        <th scope="col" onClick={this.handleClick} id="symbol">Symbol</th>
                        <th scope="col" onClick={this.handleClick} id="price">Price</th>
                        <th scope="col">Today</th>
                        <th scope="col" onClick={this.handleClick} id="shares">Shares</th>
                        <th scope="col" onClick={this.handleClick} id="value">Value</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cells}
                    </tbody>
                </table>
                {banner}
          </div>
        )
    }
}

export default Table;