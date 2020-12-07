import React from "react";
import {
  Grid,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import faker from "faker";
import "./NumberGrid.css";

export default function NumberGrid() {
  const cache = React.useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    })
  );
  const [address, setAddress] = React.useState([]);

  React.useEffect(() => {
    setAddress(
      [...Array(10).keys()].map((key) => {
        return {
          id: key,
          firstName: `${faker.name.firstName()}`,
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
        };
      })
    );
  }, []);

  let list = address.map(function (obj) {
    return Object.keys(obj).map(function (key) {
      return obj[key];
    });
  });
  function cellRenderer({ columnIndex, key, rowIndex, style, parent }) {
    if (list.length > 0) {
      return (
        <CellMeasurer
          key={key}
          cache={cache.current}
          parent={parent}
          columnIndex={columnIndex}
          rowCount={rowIndex}
        >
          <div style={style}>{list[rowIndex][columnIndex]}</div>
        </CellMeasurer>
      );
    }
  }
  console.log(list);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <AutoSizer>
        {({ width, height }) => (
          <Grid
            cellRenderer={cellRenderer}
            columnCount={list.length > 0 && list[0].length}
            columnWidth={cache.current.columnWidth}
            height={height}
            rowCount={list.length > 0 && list.length}
            rowHeight={cache.current.rowHeight}
            width={width}
          />
        )}
      </AutoSizer>
    </div>
  );
}
