"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { ActionButtons, exportToCsv, StatusBadge } from "@/lib/constants";
import DataTable from "@/components/DataTable";
import {
  getUserPermissions,
  getUsers,
} from "@/lib/api/driverManagementService";

export default function Home() {
  const { user, setLoading } = useUser();
  const [permissionsData, setPermissionsData] = useState([]);
  const [permissionsLoading, setPermissionsLoading] = useState(false);
  const [permissionsPagination, setPermissionsPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  // Users State
  const [usersData, setUsersData] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersPagination, setUsersPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const fetchPermissions = async (page = 1) => {
    setPermissionsLoading(true);
    try {
      const response = await getUserPermissions(
        user?.tenants[0]?.tenantId,
        10,
        page
      );
      setPermissionsData(response);
      setPermissionsPagination({
        currentPage: page,
        totalPages: Math.ceil(response.count / 10),
      });
    } catch (error) {
      console.error("Error fetching permissions:", error);
    } finally {
      setPermissionsLoading(false);
    }
  };

  const fetchUsers = async (page = 1) => {
    setUsersLoading(true);
    try {
      const response = await getUsers(user?.tenants[0]?.tenantId, 10, page);
      setUsersData(response);
      setUsersPagination({
        currentPage: page,
        totalPages: Math.ceil(response.count / 10),
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    if (user?.tenants[0]?.tenantId) {
      fetchPermissions();

      fetchUsers();
    }
  }, [user]);
  const permissionsColumns = [
    { header: "User ID", accessor: "userId.email" },
    { header: "Asset Id", accessor: "assetId.name" },
    { header: "Device Id", accessor: "assetId.device.name" },
    {
      header: "Status",
      accessor: "status",
      render: (value) => <StatusBadge status={value} />,
    },
    {
      header: "Actions",
      accessor: "actions",
      render: (_, row) => (
        <ActionButtons
          onView={() => console.log("View", row)}
          onEdit={() => console.log("Edit", row)}
          onDelete={() => console.log("Delete", row)}
        />
      ),
    },
  ];

  const usersColumns = [
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "roles" },
    {
      header: "Status",
      accessor: "status",
      render: (value) => <StatusBadge status={value} />,
    },
    {
      header: "Actions",
      accessor: "actions",
      render: (_, row) => (
        <ActionButtons
          onView={() => console.log("View", row)}
          onEdit={() => console.log("Edit", row)}
          onDelete={() => console.log("Delete", row)}
        />
      ),
    },
  ];
  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="col-span-2">
          <DataTable
            title="User Permissions"
            columns={permissionsColumns}
            data={permissionsData?.rows ?? []}
            loading={permissionsLoading}
            pagination={permissionsPagination}
            onPageChange={fetchPermissions}
            totalItems={permissionsData?.count}
            onFilter={() => {
              exportToCsv("user-permissions", permissionsData?.rows);
            }}
            filterOptions={[
              // { label: 'Filter', value: 'filter' },
              {
                label: "Export Data",
                value: "export",
              },
            ]}
          />
        </div>

        <DataTable
          title="Users"
          columns={usersColumns}
          data={usersData?.rows ?? []}
          loading={usersLoading}
          pagination={usersPagination}
          onPageChange={fetchUsers}
          totalItems={usersData?.count}
          onFilter={() => {
            exportToCsv("users", usersData?.rows);
          }}
          filterOptions={[
            {
              label: "Export Data",
              value: "export",
            },
          ]}
        />
      </div>
    </div>
  );
}
