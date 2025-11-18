import { JSX, ReactNode } from "react";

export type Column<T> = {
  header: string;
  accessor?: keyof T;
  renderProps?: (row: T) => JSX.Element;
};

type TableProps<T> = {
  title: string;
  description: string;
  col: Column<T>[];
  data: T[];
};

export const Table = <T,>({ title, description, col, data }: TableProps<T>) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {col.map((c, colIndex) => (
                  <th
                    className="text-left py-3 px-4 font-medium text-gray-600"
                    key={String(c.accessor) || colIndex}
                  >
                    {c.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data && data.length > 0 ? (
                data.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-50">
                    {col.map((column, colIndex) => (
                      <td className="py-4 px-4" key={colIndex}>
                        {column.renderProps
                          ? column.renderProps(row)
                          : column.accessor
                          ? (row[column.accessor] as ReactNode) 
                          : null}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={col.length}
                    className="text-center py-6 text-gray-500"
                  >
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
