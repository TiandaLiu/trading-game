import React, { Component }from 'react';

class Info extends Component {
    render() {
        var value
        if (!this.props.accountInfo) {
            value = <p class="h4"> $0.00 </p>
        } else {
            value = <p class="h4">${this.props.accountInfo.totalValue.toFixed(2)}</p>
        }
        return (
            <div class="rounded row mb-4">
                <p class="h4">Total Value:</p>
                {value}
            </div>
        )
    }
}

export default Info;