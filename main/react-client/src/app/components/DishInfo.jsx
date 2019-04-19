import React from 'react';
import { Rating } from 'semantic-ui-react';

const DishInfo = ({ dish }) => {
  return (
    <div className="row dishList-item">
      <div className="col s12 m6">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">{dish.dishName}</span>
            <p>{dish.dishNotes}</p>
          </div>
          <div className="card-action">
            <a href="#">{dish.dishRatings}</a>
          </div>
        </div>
      </div>
    </div>

    // <div className="dishList-item">
    //   <div> {dish.dishName} </div>
    //   <div> {dish.dishNotes} </div>
    //   <div>
    //     <Rating icon="heart" defaultRating={dish.dishRatings} />
    //   </div>
    // </div>
  );
};

export default DishInfo;
