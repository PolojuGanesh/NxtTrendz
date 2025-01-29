import CartSummary from '../CartSummary'
import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const clickOnRemoveAllCartItems = () => {
        removeAllCartItems()
      }
      const showEmptyView = cartList.length === 0
      const onRenderRemoveAllButton = () => (
        <>
          {showEmptyView ? null : (
            <div className="remove-all-button-container">
              <button
                type="button"
                data-testid="remove"
                onClick={clickOnRemoveAllCartItems}
                className="remove-all-button"
              >
                Remove All
              </button>
            </div>
          )}
        </>
      )

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                {onRenderRemoveAllButton()}
                <CartListView />
                <CartSummary />
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
