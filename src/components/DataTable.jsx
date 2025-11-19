import React, { useState } from "react";
import styles from "./DataTable.module.css";

const getValue = (obj, accessor) => {
  if (!accessor) return obj;

  const value = accessor.split(".").reduce((acc, key) => acc?.[key], obj);

  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object" && value !== null) return JSON.stringify(value);

  return value ?? "";
};

const getPageNumbers = (current, total) => {
  const pages = [];

  if (total <= 5) {
    for (let i = 1; i <= total; i++) pages.push(i);
    return pages;
  }

  pages.push(1);

  if (current > 3) pages.push("...");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push("...");

  pages.push(total);

  return pages;
};

const DataTable = ({
  columns,
  data,
  loading,
  pagination,
  onPageChange,
  onFilter,
  filterOptions,
  title,
  totalItems,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const toggleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((_, idx) => idx));
    }
  };

  const toggleSelectRow = (idx) => {
    setSelectedRows((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const allSelected = selectedRows.length === data.length && data.length > 0;

  return (
    <div className={styles.tableContainer}>
      {/* Header */}
      <div className={styles.tableHeader}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.filterButtons}>
          {filterOptions?.map((filter, idx) => (
            <button
              key={idx}
              onClick={() => {
                debugger;
                onFilter?.(filter.value);
              }}
              className={styles.filterButton}
            >
              {filter.label}
            </button>
          ))}
          <button className={styles.filterButton}>Export Data</button>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={(styles.table, "border w-full")}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.checkboxCell}>
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  className={styles.checkbox}
                />
              </th>
              {columns.map((col, idx) => (
                <th key={idx} className={styles.th}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + 1} className={styles.emptyRow}>
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className={styles.emptyRow}>
                  No data available
                </td>
              </tr>
            ) : (
              data.map((row, rowIdx) => (
                <tr key={rowIdx}>
                  <td className={styles.checkboxCell}>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(rowIdx)}
                      onChange={() => toggleSelectRow(rowIdx)}
                      className={styles.checkbox}
                    />
                  </td>
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className={styles.td}>
                      {col.render
                        ? col.render(getValue(row, col.accessor), row)
                        : getValue(row, col.accessor)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className={styles.tableFooter}>
        <div className={styles.totalText}>
          Total items: <span className={styles.totalCount}>{totalItems}</span>
        </div>
        <div className={styles.paginationControls}>
          <button
            onClick={() => onPageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className={`${styles.navButton} ${
              pagination.currentPage === 1 ? styles.pageButtonDisabled : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              style={{ transform: "rotateY(180deg)" }}
            >
              <path
                d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
                stroke="#797D8C"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.375 9H10.875"
                stroke="#797D8C"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.375 11.25L11.625 9L9.375 6.75"
                stroke="#797D8C"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          {getPageNumbers(pagination.currentPage, pagination.totalPages).map(
            (page, idx) => (
              <button
                key={idx}
                onClick={() => page !== "..." && onPageChange(page)}
                disabled={page === "..."}
                className={`
                ${styles.pageButton}
                ${
                  pagination.currentPage === page ? styles.pageButtonActive : ""
                }
                ${page === "..." ? styles.ellipsis : ""}
              `}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => onPageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
            className={`${styles.navButton} ${
              pagination.currentPage === pagination.totalPages
                ? styles.pageButtonDisabled
                : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
                stroke="#797D8C"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.375 9H10.875"
                stroke="#797D8C"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.375 11.25L11.625 9L9.375 6.75"
                stroke="#797D8C"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
