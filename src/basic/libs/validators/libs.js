// "required" core, used in almost every validator to allow empty values
export const req = (val) => {
  if (Array.isArray(val)) return !!val.length
  if (val === undefined || val === null || val === false) {
    return false
  }

  if (val instanceof Date) {
    // invalid date won't pass
    return !isNaN(val.getTime())
  }

  if (typeof val === 'object') {
    for (let _ in val) return true
    return false
  }

  return !!String(val).length
}

// get length in type-agnostic way
export const len = (val) => {
  if (Array.isArray(val)) return val.length
  if (typeof val === 'object') {
    return Object.keys(val).length
  }
  return String(val).length
}

// regex based validator template
export const regex = (val, expr) => !req(val) || expr.test(val)
