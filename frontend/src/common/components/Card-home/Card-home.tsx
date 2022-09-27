import * as React from 'react';
import { CardHome, External } from './styled';
import Card from './Card';

export default function BoxComponent() {
  return (
    <External>
    <CardHome>
      <div>
        <Card titulo={"HOSPEDES"}/>
      </div>
      <div>
        <Card titulo={"ACOMODAÇÕES"}/>
      </div>
      <div>
        <Card titulo={"CHECK IN"}/>
      </div>
      <div>
        <Card titulo={"CHECK OUT"}/>
      </div>
    </CardHome>
    </External>
  );
}

