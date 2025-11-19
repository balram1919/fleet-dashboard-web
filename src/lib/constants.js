export const ViewWidth = (px) => `${(px / 1920) * 100}vw`;
export const ViewHeight = (px) => `${(px / 1080) * 100}vh`;


export const StatusBadge = ({ status }) => {
  const colors = {
    Active: 'bg-green-100 text-green-700',
    Inactive: 'bg-yellow-100 text-yellow-700',
    Pending: 'bg-yellow-100 text-yellow-700'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-700'}`}>
      {status}
    </span>
  );
};

export const ActionButtons = ({ onEdit, onDelete, onView }) => {
  return (
    <div className="flex gap-2">
      <button onClick={onView} className="p-1 hover:bg-gray-100 rounded" title="View">
        {/* <Eye size={16} className="text-gray-600" /> */}
      </button>
      <button onClick={onEdit} className="p-1 hover:bg-gray-100 rounded" title="Edit">
        {/* <Edit size={16} className="text-gray-600" /> */}
      </button>
      <button onClick={onDelete} className="p-1 hover:bg-gray-100 rounded" title="Delete">
        {/* <Trash2 size={16} className="text-red-600" /> */}
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
      .map(row =>
        keys
          .map(fieldName =>
            JSON.stringify(row[fieldName], (_, value) => value ?? ""
            ))
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
