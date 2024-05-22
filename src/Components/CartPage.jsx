import { Button } from "reactstrap";
import Accordian from "./Accordian";
import PropTypes from 'prop-types'






export default function CartPage({
    data = {},
    quantityChange=()=>{},
    dispatcher=()=>{},
    removeFromCart = ()=>{}
}){
    
    
    return (<>
    <div className="row">
        <div className="col-6 myClass">
            <div className="row">
                <div className="col-3">
                    <img src={data.images} alt="book" />
                </div>
                <div className="col-9">
                    <h4 className="mb-4">{data.title}</h4>
                    <Accordian options={[
                        {title : 'details & care',desc : data.description},
                        {title : 'sustainability', desc : `Brand - ${data.brand} & Rating - ${data.rating}`}
                        ]}/>
                </div>
            </div>
        </div>
        <div className="col-6 myClass">
            <div className="row">
                <div className="col-6"></div>
                <div className="col-6 ">
                    <div className="row">
                        <div className="col-6">
                            <select 
                            defaultValue={data.quantity} 
                            className="quantity-changer"
                            onChange={(e) =>
                                dispatcher(
                                  quantityChange({ id: data.id, value: e.target.value })
                                )}
                            >
                                <option value={0}>0</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                 
                            </select>
                        </div>
                        <div className="col-6">
                            <h5 className="d-flex justify-content-center">{data.price*data.quantity}</h5>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="row"></div>
                        <div className="row">
                            <Button className="d-flex justify-content-center" type="submit" color="link" onClick={()=>dispatcher(removeFromCart(data))}>REMOVE</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    
    
    </>)
}

CartPage.propTypes = {
    data: PropTypes.shape({
      id: PropTypes.string.isRequired,
      images: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired
    }).isRequired,
    dispatcher: PropTypes.func.isRequired,
    quantityChange: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
  };

