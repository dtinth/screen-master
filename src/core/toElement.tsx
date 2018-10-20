import React from 'react'
export function toElement(item: any) {
  if (!item || typeof item !== 'object') {
    return item
  }
  return React.createElement(
    item.type,
    {
      ...item.props,
      ...(item.props['data-key'] ? { key: item.props['data-key'] } : {})
    },
    ...item.children.map(toElement)
  )
}
