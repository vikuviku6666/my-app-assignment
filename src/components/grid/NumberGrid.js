import React from "react";
import {
  Grid,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import faker from "faker";
import clsx from "clsx";
import styles from '../../mystyle.module.css';

export default function NumberGrid() {
  const cache = React.useRef(
    new CellMeasurerCache({
      minWidth: 100,
      defaultHeight: 100,
    })
  );
  const [address, setAddress] = React.useState([]);

  React.useEffect(() => {
    setAddress(
      [...Array(1000000).keys()].map((key) => {
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
// converting array of objects to array to array
  let list = address.map(function (obj) {
    return Object.keys(obj).map(function (key) {
      return obj[key];
    });
  });
  // row color
   function getRowClassName(row) {
    return row % 2 === 0 ? styles.evenRow : styles.oddRow;
  }
  function cellRenderer({ columnIndex, key, rowIndex, style, parent }) {
    const rowClass = getRowClassName(rowIndex);
     const classNames = clsx(rowClass, styles.cell, styles.centeredCell);
    if (list.length > 0) {
      return (
        <CellMeasurer
          key={key}
          cache={cache.current}
          parent={parent}
          columnIndex={columnIndex}
          rowCount={rowIndex}
        >
          <div className={classNames} style={style}>{list[rowIndex][columnIndex]}</div>
        </CellMeasurer>
      );
    }
  }
 

  return (
    <div style={{ width: "90%", height: "100vh", margin: "50px 50px 0px 100px" }}>
      <AutoSizer>
        {({ width, height }) => (
          <Grid
            cellRenderer={cellRenderer}
            className={styles.BodyGrid}
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
