import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const DataTable = ({ data = [], sortable = [] }) => {
  const [list, setList] = useState(data);
  const [sortBy, setSortBy] = useState("");
  const [sortDir, setSortDir] = useState("desc");

  useEffect(() => {
    setList(data);
  }, [data]);

  useEffect(() => {
    if (sortBy.length) {
      let temp = [...list].sort((a, b) => {
        if (
          isNaN(parseFloat(a[sortBy])) ||
          isNaN(parseFloat(b[sortBy]))
        ) {
          if (
            moment(a[sortBy]).isValid() &&
            moment(b[sortBy]).isValid()
          ) {
            return moment(a[sortBy]) - moment(b[sortBy]);
          } else {
            let x = a[sortBy].toLowerCase();
            let y = b[sortBy].toLowerCase();
            if (x < y) {
              return -1;
            }
            if (x > y) {
              return 1;
            }
            return 0;
          }
        } else {
          return a[sortBy] - b[sortBy];
        }
      });

      setList(sortDir === "desc" ? temp.reverse() : temp);
    }
  }, [list, sortBy, sortDir]);

  const handleSort = (title) => {
    if (title === sortBy) {
      setSortDir(sortDir === "desc" ? "asc" : "desc");
    } else {
      setSortBy(title);
      setSortDir("desc");
    }
  };

  return (
    <TableContainer component={Paper} className="staffs-data-table">
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(list[0]).map((title, i) => (
              <TableCell
                key={i}
                className={sortable.includes(title) ? "sortable" : ""}
                onClick={() => sortable.includes(title) && handleSort(title)}
              >
                {title}
                {sortBy === title && (
                  <span>
                    {sortDir === "desc" ? (
                      <KeyboardArrowDown />
                    ) : (
                      <KeyboardArrowUp />
                    )}
                  </span>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
