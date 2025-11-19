export const ViewWidth = (px) => `${(px / 1920) * 100}vw`;
export const ViewHeight = (px) => `${(px / 1080) * 100}vh`;

export const StatusBadge = ({ status }) => {
  const colors = {
    active: "statusActive",
    Inactive: "statusInactive",
    Pending: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}
    >
      {status}
    </span>
  );
};

export const ActionButtons = ({ onEdit, onDelete, onView }) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={onView}
        className="p-1 hover:bg-gray-100 rounded"
        title="View"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.3876 8.00001C10.3876 9.32001 9.32093 10.3867 8.00092 10.3867C6.68092 10.3867 5.61426 9.32001 5.61426 8.00001C5.61426 6.68001 6.68092 5.61334 8.00092 5.61334C9.32093 5.61334 10.3876 6.68001 10.3876 8.00001Z"
            stroke="#4E525F"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.9999 13.5133C10.3532 13.5133 12.5466 12.1266 14.0732 9.72659C14.6732 8.78659 14.6732 7.20659 14.0732 6.26659C12.5466 3.86659 10.3532 2.47992 7.9999 2.47992C5.64656 2.47992 3.45323 3.86659 1.92656 6.26659C1.32656 7.20659 1.32656 8.78659 1.92656 9.72659C3.45323 12.1266 5.64656 13.5133 7.9999 13.5133Z"
            stroke="#4E525F"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <button
        onClick={onEdit}
        className="p-1 hover:bg-gray-100 rounded"
        title="Edit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M10.6583 5.44909C10.3818 5.44909 10.1567 5.67402 10.1567 5.95068V9.30317C10.1567 9.97834 9.60756 10.5275 8.93249 10.5275H2.22739C1.55233 10.5275 1.00314 9.97834 1.00314 9.30317V2.59815C1.00314 1.92318 1.55233 1.37401 2.22739 1.37401H5.5799C5.85644 1.37401 6.08147 1.14907 6.08147 0.872441C6.08147 0.595808 5.85644 0.37085 5.5799 0.37085H2.22739C0.999224 0.37085 0 1.37011 0 2.59815V9.30317C0 10.5314 0.999222 11.5307 2.22739 11.5307H8.93249C10.1607 11.5307 11.1599 10.5314 11.1599 9.30317V5.95068C11.1599 5.67402 10.9349 5.44909 10.6583 5.44909Z"
            fill="#4E525F"
          />
          <path
            d="M11.3672 0.841111L10.6911 0.16702C10.4704 -0.0556735 10.0852 -0.0556735 9.8645 0.16702L5.42658 4.60493C5.24199 4.78751 5.10356 5.01623 5.02332 5.26301L4.56187 6.71957C4.53779 6.78977 4.55786 6.86804 4.61003 6.92221C4.64814 6.96031 4.70031 6.98039 4.75246 6.98039C4.77253 6.98039 4.79259 6.97637 4.81266 6.97034L6.26921 6.50891C6.516 6.42868 6.7447 6.29021 6.92728 6.10562L11.3672 1.66772C11.4776 1.5574 11.5377 1.41091 11.5377 1.25443C11.5377 1.09794 11.4776 0.951478 11.3672 0.841111Z"
            fill="#4E525F"
          />
        </svg>
      </button>
      <button
        onClick={onDelete}
        className="p-1 hover:bg-gray-100 rounded"
        title="Delete"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
        >
          <path
            d="M11.375 3.23916C9.57125 3.06041 7.75667 2.96832 5.9475 2.96832C4.875 2.96832 3.8025 3.02249 2.73 3.13082L1.625 3.23916"
            stroke="#ED1F62"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4.60449 2.69206L4.72366 1.98248C4.81033 1.4679 4.87533 1.08331 5.79074 1.08331H7.20991C8.12533 1.08331 8.19574 1.48956 8.27699 1.9879L8.39616 2.69206"
            stroke="#ED1F62"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.2109 4.95081L9.85879 10.4054C9.79921 11.2558 9.75046 11.9166 8.23921 11.9166H4.76171C3.25046 11.9166 3.20171 11.2558 3.14212 10.4054L2.79004 4.95081"
            stroke="#ED1F62"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5.5957 8.9375H7.39945"
            stroke="#ED1F62"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5.14551 6.77081H7.85384"
            stroke="#ED1F62"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export function exportToCsv(filename, jsonData) {
  const items = jsonData;
  if (!items || !items.length) return;

  const separator = ",";
  const keys = Object.keys(items[0]);

  const csvContent =
    keys.join(separator) +
    "\n" +
    items
      .map((row) =>
        keys
          .map((fieldName) =>
            JSON.stringify(row[fieldName], (_, value) => value ?? "")
          )
          .join(separator)
      )
      .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
