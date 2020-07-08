const requireField = (field, fieldName) => {
    if (!field) return { status: false, error: fieldName + ' is required' }
    return { status: true };
}

module.exports = {
    requireField
}