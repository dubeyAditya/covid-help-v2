import React from 'react';
import { Transfer, Table } from 'antd';
import difference from 'lodash/difference';
// Customize Table Transfer
const TableTransfer = ({ leftColumns, rightColumns,...restProps }) => (
  <Transfer {...restProps} showSelectAll={false}>
    {({
      direction,
      filteredItems,
      onItemSelect,
      selectedKeys,
      onItemSelectAll
    }) => {
      const columns = direction === 'left' ? leftColumns : rightColumns;

      const rowSelection = {
        getCheckboxProps: item => ({ disabled: !item.enabled }),
        onSelect({ key }, selected) {
          onItemSelect(key, selected);
        },
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter(item => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, selectedKeys)
            : difference(selectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys, selected);
        },
        selectedRowKeys: selectedKeys,
      };

      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          pagination={{ pageSize: 5 }}
        />
      );
    }}
  </Transfer>
);

export default TableTransfer;
