import React from 'react';
import './Offers.css'; 


const offers = [
    {
        id: 1,
        title: 'Golf Course Package',
        description: 'Enjoy a complimentary round of golf at our nearby premium golf course with every 3-night stay. Perfect for golf enthusiasts!',
        image: 'src\assets\images\Luxury Golf Resort in Palm Beach, FL _ PGA National Resort.jfif' 
    },
    {
        id: 2,
        title: 'Casino Experience',
        description: 'Get a R200 casino voucher for our exclusive casino partner. Try your luck and have a thrilling night out!',
        image: 'src\assets\images\Master the Elegance of Baccarat Deluxe_ A Classic Reimagined.jfif' 
    },
    {
        id: 3,
        title: 'LEGO Fun for Kids',
        description: 'Our special family package includes a LEGO play area for children. Let them unleash their creativity while you relax.',
        image: 'src\assets\images\LEGO Replay lets you donate your used bricks to kids in need_ Easily_.jfif' 
    }
];

const Offers = () => (
    <div className="offer-container">
        <h1 className="offer-title">Exclusive Hotel Offers</h1>
        {offers.map((offer) => (
            <div key={offer.id} className="offer-item">
                <img src={offer.image} alt={offer.title} className="offer-image" />
                <div className="offer-content">
                    <h3 className="offer-title">{offer.title}</h3>
                    <p className="offer-description">{offer.description}</p>
                </div>
            </div>
        ))}
    </div>
);

export default Offers;
