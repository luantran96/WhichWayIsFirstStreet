import React from 'react';
import { Rating, Card } from 'semantic-ui-react';

const DishInfo = ({ dish }) => {
  return (
    <Card>
      <Card.Content header={dish.dishName} />
      <Card.Content description={dish.dishNotes} />
      <Card.Content extra>
        <Rating icon="heart" defaultRating={dish.dishRatings} />
      </Card.Content>
    </Card>
  );
};

export default DishInfo;
