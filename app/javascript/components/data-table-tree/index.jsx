import React from 'react';
import PropTypes from 'prop-types';

const DataTableTree = ({ data }) => {
  const treeData = [
    { id: 1, name: 'Parent 1', parentId: null },
    { id: 2, name: 'Child of 1', parentId: 1 },
    { id: 3, name: 'Child of 2', parentId: 2 },
    { id: 4, name: 'Child of 2', parentId: 2 },
    { id: 5, name: 'child', parentId: null },
    { id: 6, name: 'Child of 3', parentId: 3 },
  ];

  const buildTree = (data, parentId = null) => {
    const nodes = data
      .filter((node) => node.parentId === parentId)
      .map((node) => (
        <TreeNode key={node.id} node={node}>
          {buildTree(data, node.id)}
        </TreeNode>
      ));
    return nodes;
  };

  const tree = buildTree(treeData, null);
  return (<div>{tree}</div>);
};

DataTableTree.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const TreeNode = ({ node, children }) => (
  <div>
    <div>{node.name}</div>
    {children}
  </div>
);

TreeNode.propTypes = {
  node: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default DataTableTree;
