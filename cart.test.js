const cart = require('./cart');
const cars = require('./data/cars');

describe( 'Cart Properties:', () => {

    test( 'Cart should be an array by default', () => {
        expect( Array.isArray( cart.cart ) ).toEqual( true );
    });
    test( 'Cart should default to empty', () => {
        expect( cart.cart.length ).toEqual( 0 );
    });
    test( 'Total should start at 0', () => {
        expect( cart.total ).toEqual( 0 );
    });

});

describe( 'Cart Methods:', () => {

    afterEach( () => {
        cart.cart = [];
        cart.total = 0;
    });
    test( 'Add to cart is working properly', () => {
        cart.addToCart( cars[0] );
        cart.addToCart( cars[1] );

        expect( cart.cart.length ).toEqual( 2 );
        expect( cart.cart[0] ).toEqual( cars[0] );
        expect( cart.cart[1] ).toEqual( cars[1] );
    });
    test( 'Total is incrementing properly when adding to cart', () => {
        cart.addToCart( cars[0] );
        cart.addToCart( cars[1] );

        expect( cart.total ).toEqual( cars[0].price + cars[1].price );
    });
    test( 'Remove car from cart is working properly', () => {
        cart.addToCart( cars[0] );
        cart.addToCart( cars[1] );
        cart.addToCart( cars[2] );

        cart.removeFromCart( 1, cars[1].price );

        expect( cart.cart.length ).toEqual( 2 );
        expect( cart.cart[0] ).toEqual( cars[0] );
        expect( cart.cart[1] ).toEqual( cars[2] );
    });
    test( 'Remove from cart is updating the total price properly', () => {
        cart.addToCart( cars[0] );
        cart.addToCart( cars[1] );
        cart.addToCart( cars[2] );

        cart.removeFromCart( 1, cars[1].price );
        cart.removeFromCart( 1, cars[2].price );

        expect( cart.total ).toEqual( cars[0].price );
    });
    test( 'Checkout is working properly', () => {
        cart.addToCart( cars[0] );
        cart.addToCart( cars[1] );

        cart.checkout();

        expect( cart.cart.length ).toEqual( 0 );
        expect( cart.total ).toEqual( 0 );
    });

});