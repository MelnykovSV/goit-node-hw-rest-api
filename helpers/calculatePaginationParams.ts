const calculatePaginationParams = (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  return { skip, limit };
};

module.exports = calculatePaginationParams;
