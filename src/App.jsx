import { useEffect,useState } from "react"
import CartPage from "./Components/CartPage"
import './CSS/style.css'
import { saveAllProducts,quantityChange,updateSubTotal,updateTotal,removeFromCart } from "./Redux/Reducers/Cart"
import { useDispatch, useSelector } from "react-redux"


function App() {
  const dispatcher = useDispatch();
  const { items = [],
    subTotal = 0,
    total = 0, } = useSelector((store)=>store.Cart)
    const [shipping] = useState(0);
  useEffect(()=>{
    fetch('https://reactcartpage8task.netlify.app/products.json')
    .then((res)=>res.json())
    .then(result=>dispatcher(saveAllProducts(result.products)))
    .catch(err=>console.log(err))
  },[])

  useEffect(() => {
    if (items.length > 0) {
      let subTotal = 0;
      items.forEach((element) => {
        subTotal += element.price * element.quantity;
        dispatcher(updateSubTotal(subTotal));
      });
      
      if (shipping > 0) {
        subTotal += shipping;
      }
      dispatcher(updateTotal(subTotal));
    }
  }, [items]);
  
  return (
    <div className="main">
    <h1>Cart Page</h1>
    <br />
      <div className='container appcon'>
        <div className="cart-items-container py-4 divider">
        {items.map((item, index) => (
          <CartPage
            key={`${item.title}-${index}`}
            data={item}
            dispatcher = {dispatcher}
            quantityChange = {quantityChange}
            removeFromCart = {removeFromCart}
            
          />
        ))}
        </div>
        <div className=" result py-4 divider">
          <div className="row mb-3">
            <div className="col-6">SUB TOTAL</div>
            <div className="col-6 d-flex justify-content-end"><b>${subTotal}</b></div>
          </div>
          <div className="row">
            <div className="col-6">SHIPPING</div>
            <div className="col-6 d-flex justify-content-end">
            <b>{shipping > 0 ? `$${shipping}` : "FREE"}</b>
            </div>
          </div>
        </div>
        <div className=" result py-4 divider">
          <div className="row">
            <div className="col-6">TOTAL</div>
            <div className="col-6 d-flex justify-content-end"><b>${total}</b></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
