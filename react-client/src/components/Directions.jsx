import React from 'react';
import { List } from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';

const Directions = ({directions}) => (
    <div>

    <div id="direction-headers">
        <div>
          <span id="direction-distance">{`Distance: ${directions.legs[0].distance.text}`} </span> 
        </div>

        <div>
          <span id="direction-duration">{`ETA: ${directions.legs[0].duration.text}`} </span> 
        </div>
    </div>

      <div>
        <span id="direction-title">Directions: </span> 
      </div>
    <List>
    {directions.legs[0].steps.map((step) => {
      return (
        <List.Item>
        <List.Icon name='marker' />
        <List.Content>
          <List.Header as='a'>{`Distance: ${step.distance.text}, duration: ${step.duration.text}`}</List.Header>
          <List.Description>
            <ReactMarkdown 
            source={step.html_instructions}
            escapeHtml={false} />
          </List.Description>
        </List.Content>
      </List.Item>
        )
    })}



  </List>
    </div>
);

export default Directions;

