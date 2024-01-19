const initialState = {
    product: [
        { id: 0, name: "Samsung", image: 'https://m.media-amazon.com/images/I/71o1csyQILL._AC_UF1000,1000_QL80_.jpg', price: '333.00', qty: 1 },
        { id: 1, name: "Realme", image: 'https://m.media-amazon.com/images/I/61s3xVKfUML._AC_UF1000,1000_QL80_.jpg', price: '12900.00', qty: 1 },
        { id: 2, name: "Poco", image: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/mobile/6/v/0/c51-mzb0dxkin-poco-original-imagzdpycgrcdc8z.jpeg?q=90&crop=false', price: '5700.00', qty: 1 },
        { id: 3, name: "Nokia", image: 'https://www.reliancedigital.in/medias/Nokia-Mobile-Phone-493837972-i-1-1200Wx1200H-300Wx300H?context=bWFzdGVyfGltYWdlc3wxMTI0NHxpbWFnZS9qcGVnfGltYWdlcy9oYWUvaDU1LzEwMDE2MTY5NjIzNTgyLmpwZ3xjNTEzNDgxNWJkMWFjYjMzODBhNmQ2ODJlYmI1N2Q2NzUwMWJlMGI1MjgzYWY5NDVkYmVkOWEzMTMyNmMxNTZh', price: '1400.00', qty: 1 },
    ],
    cart: [],
    count: 0,
    total: 0,
};

const reducer = (state = initialState, action) => {

    if (action.type === "AddToCart") {
    
        const itemExist = state.cart.some((item) => item.id === state.product[action.payload].id);
        if (!itemExist) {
            return {
                ...state, cart: [...state.cart, { ...state.product[action.payload] }],
                total: state.total + parseFloat(state.product[action.payload].price),
            };
        } else {
            return {
                ...state, cart: state.cart.map((item) => item.id === state.product[action.payload].id ? { ...item, qty: item.qty + 1 } : item),
                total: state.total + parseFloat(state.product[action.payload].price),
            };
        }
 
    }
    if (action.type === 'DeleteItem') {
        const deletedItem = state.cart[action.payload];
        return {
            ...state,
            cart: state.cart.filter((item, id) => id !== action.payload),
            total: state.total - parseFloat(deletedItem.price * deletedItem.qty),
        };
    }

    if (action.type === 'Count') {
        return { ...state, count: state.cart.length };
    }
    if (action.type === 'Increment') {
        var itemIndex = action.payload

        return {
            ...state, cart: state.cart.map((item, id) => id === itemIndex ? { ...item, qty: item.qty + 1 } : item),
            total: state.total + parseFloat(state.cart[itemIndex].price),
        };
    }
    if (action.type === 'Decrement') {
        var itemIndex = action.payload
        const deletedItem = state.cart[itemIndex];
        if (state.cart[itemIndex].qty > 1) {
            return {
                ...state, cart: state.cart.map((item, id) => id === itemIndex ? { ...item, qty: item.qty - 1 } : item),
                total: state.total - parseFloat(state.cart[itemIndex].price),
            };

        }
        return {
            ...state,
            cart: state.cart.filter((item, id) => id !== action.payload),
            total: state.total - parseFloat(deletedItem.price * deletedItem.qty),
        };
      
    }
    if (action.type === 'DeleteAll') {
        console.log({...state, cart: []})
        return { ...state, cart: [] , count: 0, total: 0};

    }
    return state;
}

export default reducer