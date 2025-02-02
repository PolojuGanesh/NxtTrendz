import {Component} from 'react'
import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'

import './index.css'

class CartSummary extends Component {
  state = {selectedPayment: '', orderPlaced: false}

  handlePaymentChange = event => {
    this.setState({selectedPayment: event.target.value})
  }

  handleConfirmOrder = () => {
    this.setState({orderPlaced: true})
  }

  render() {
    const {selectedPayment, orderPlaced} = this.state

    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          let total = 0
          cartList.forEach(eachCartItem => {
            total += eachCartItem.price * eachCartItem.quantity
          })

          return (
            <>
              <div className="cart-summary-container">
                <h1 className="order-total-value">
                  <span className="order-total-label">Order Total:</span> Rs
                  {total}
                  /-
                </h1>
                <p className="total-items">{cartList.length} Items in cart</p>
                <Popup
                  modal
                  trigger={
                    <button type="button" className="checkout-button d-sm-none">
                      Checkout
                    </button>
                  }
                >
                  {close => (
                    <div>
                      <h2 className="payment-option-heading">
                        Payment Options
                      </h2>
                      <div className="payment-option">
                        <input
                          className="radio-input"
                          type="radio"
                          id="netBanking"
                          name="payment"
                          value="Net Banking"
                          disabled
                        />
                        <label
                          className="payment-radio-label"
                          htmlFor="netBanking"
                        >
                          Net Banking
                        </label>
                      </div>
                      <div className="payment-option">
                        <input
                          className="radio-input"
                          type="radio"
                          id="cashOnDelivery"
                          name="payment"
                          value="Cash on Delivery"
                          onChange={this.handlePaymentChange}
                        />
                        <label
                          className="payment-radio-label"
                          htmlFor="cashOnDelivery"
                        >
                          Cash on Delivery
                        </label>
                      </div>
                      <div className="payment-option">
                        <input
                          className="radio-input"
                          type="radio"
                          id="card"
                          name="payment"
                          value="Card"
                          disabled
                        />
                        <label className="payment-radio-label" htmlFor="card">
                          Card
                        </label>
                      </div>
                      <div className="payment-option">
                        <input
                          className="radio-input"
                          type="radio"
                          id="upi"
                          name="payment"
                          value="UPI"
                          disabled
                        />
                        <label className="payment-radio-label" htmlFor="upi">
                          UPI
                        </label>
                      </div>
                      <div className="payment-option">
                        <input
                          className="radio-input"
                          type="radio"
                          id="wallet"
                          name="payment"
                          value="Wallet"
                          disabled
                        />
                        <label className="payment-radio-label" htmlFor="wallet">
                          Wallet
                        </label>
                      </div>
                      <h3 className="order-summary-heading">Order Summary</h3>
                      <p className="total-items-in-cart-para">
                        Total Items: {cartList.length}
                      </p>
                      <p className="total-items-in-cart-para">
                        Total Price: Rs {total}/-
                      </p>
                      <div className="cancel-and-confirm-button">
                        <button
                          className="cancel-button"
                          type="button"
                          onClick={() => close()}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="cancel-button"
                          onClick={this.handleConfirmOrder}
                          disabled={
                            selectedPayment !== 'Cash on Delivery' ||
                            orderPlaced
                          }
                        >
                          Confirm Order
                        </button>
                      </div>
                      {orderPlaced && (
                        <p className="success-message">
                          Your order has been placed successfully
                        </p>
                      )}
                    </div>
                  )}
                </Popup>
              </div>
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartSummary
