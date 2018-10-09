import React from 'react'
export function toElement(item: any) {
  if (!item || typeof item !== 'object') {
    return item
  }
  return React.createElement(
    item.type,
    item.props,
    ...item.children.map(toElement)
  )
}
