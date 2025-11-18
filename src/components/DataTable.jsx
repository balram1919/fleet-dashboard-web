import React, { useState, useEffect } from 'react';
const getValue = (obj, accessor) => {
    if (!accessor) return obj;

    const value = accessor.split('.').reduce((acc, key) => acc?.[key], obj);

    if (Array.isArray(value)) return value.join(', ');

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
    totalItems
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
        if (selectedRows.includes(idx)) {
            setSelectedRows(selectedRows.filter(i => i !== idx));
        } else {
            setSelectedRows([...selectedRows, idx]);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                <div className="flex gap-2">
                    {filterOptions?.map((filter, idx) => (
                        <button
                            key={idx}
                            onClick={() => onFilter?.(filter.value)}
                            className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            {filter.label}
                        </button>
                    ))}
                    <button className="p-1.5 border border-gray-300 rounded-md hover:bg-gray-50">
                        {/* <MoreVertical size={18} /> */}
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="w-12 px-4 py-3 text-left">
                                <input
                                    type="checkbox"
                                    checked={selectedRows.length === data.length && data.length > 0}
                                    onChange={toggleSelectAll}
                                    className="rounded border-gray-300"
                                />
                            </th>
                            {columns.map((col, idx) => (
                                <th key={idx} className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-gray-500">
                                    Loading...
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-gray-500">
                                    No data available
                                </td>
                            </tr>
                        ) : (
                            data.map((row, rowIdx) => (
                                <tr key={rowIdx} className="hover:bg-gray-50">
                                    <td className="px-4 py-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(rowIdx)}
                                            onChange={() => toggleSelectRow(rowIdx)}
                                            className="rounded border-gray-300"
                                        />
                                    </td>
                                    {columns.map((col, colIdx) => (
                                        <td key={colIdx} className="px-4 py-3 text-sm text-gray-700">
                                            {col.render
                                                ? col.render(getValue(row, col.accessor), row)
                                                : getValue(row, col.accessor)
                                            }

                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                    Total items: <span className="font-medium">{totalItems}</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onPageChange(pagination.currentPage - 1)}
                        disabled={pagination.currentPage === 1}
                        className="p-1.5 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {/* <ChevronLeft size={18} /> */}
                    </button>
                    {/* {[...Array(pagination.totalPages)].map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => onPageChange(idx + 1)}
                            className={`px-3 py-1.5 text-sm rounded-md ${pagination.currentPage === idx + 1
                                ? 'bg-blue-500 text-white'
                                : 'border border-gray-300 hover:bg-gray-50'
                                }`}
                        >
                            {idx + 1}
                        </button>
                    ))} */}
                    {getPageNumbers(pagination.currentPage, pagination.totalPages).map((page, idx) => (
                        <button
                            key={idx}
                            onClick={() => page !== "..." && onPageChange(page)}
                            disabled={page === "..."}
                            className={`px-3 py-1.5 text-sm rounded-md ${pagination.currentPage === page
                                ? "bg-blue-500 text-white"
                                : "border border-gray-300 hover:bg-gray-50"
                                } ${page === "..." ? "cursor-default opacity-50" : ""}`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => onPageChange(pagination.currentPage + 1)}
                        disabled={pagination.currentPage === pagination.totalPages}
                        className="p-1.5 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {/* <ChevronRight size={18} /> */}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataTable;