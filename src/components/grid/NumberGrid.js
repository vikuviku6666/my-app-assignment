import React from 'react';
import {Grid} from 'react-virtualized';
import faker from "faker";
import './NumberGrid.css';

export default function NumberGrid(){
  const [address, setAddress] = React.useState([]);

  React.useEffect(() => {
  setAddress(
    [...Array(1000000).keys()].map((key) => {
      return {
        id: key,
        firstName: `${faker.name.firstName()}` ,
        lastName: `${faker.name.lastName()}`,
        account: `${faker.finance.account()}`,
        accountName: `${faker.finance.accountName()}`,
       companyName: `${faker.company.companyName()}`,
        zipCode: `${faker.address.zipCode()}`,
        city: `${faker.address.city()}`,
        streetName: `${faker.address.streetName()}`,
        streetAddress: `${faker.address.streetAddress()}`,
        county: `${faker.address.county()}`,
        country: `${faker.address.country()}`,
        countryCode: `${faker.address.countryCode()}`,
        state: `${faker.address.state()}`,
        direction: `${faker.address.direction()}`,
        timeZone: `${faker.address.timeZone()}`,
      }
    })
  );
  }, [])

let list = address.map(function (obj) {
  return Object.keys(obj).map(function (key) {
    return obj[key];
  });
});
  function cellRenderer({ columnIndex, key, rowIndex, style }) {
    if (list.length > 0) { 
    return (
      <div key={key} style={style}>
        { list[rowIndex][columnIndex]}
      </div>
    );
  }
  }
  console.log(list);
 
  return (
    <Grid
      cellRenderer={cellRenderer}
      columnCount={list.length > 0 && list[0].length}
      columnWidth={100}
      height={800}
      rowCount={list.length > 0 && list.length}
      rowHeight={100}
      width={1000}
    />
  );
  }
             
            