interface PropsTableProps {
  data: {
    prop: string;
    type: string;
    default: string;
    description: string;
  }[];
}

const PropsTable = ({ data }: PropsTableProps) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-zinc-700 shadow-sm">
      <table className="w-full">
        <thead className="bg-gray-100 dark:bg-zinc-900">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">Prop</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">Type</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">Default</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-zinc-700">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50 dark:hover:bg-zinc-800/60 transition-colors">
              <td className="px-4 py-3 text-sm font-mono text-blue-600 dark:text-blue-400 font-medium">
                {row.prop}
              </td>
              <td className="px-4 py-3 text-sm font-mono text-gray-700 dark:text-gray-400">
                {row.type}
              </td>
              <td className="px-4 py-3 text-sm font-mono text-gray-600 dark:text-gray-500">
                {row.default}
              </td>
              <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300 leading-snug">
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropsTable;
