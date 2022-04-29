export const transformQuerytoObj = (query) => {
  if (!query) return {};
  const search = query.split("?")[1];
  const listQuery = search.split("&");
  let queryObj = {};
  listQuery.forEach((el) => {
    if (el.split("=")[1]) {
      const objKey = el.split("=")[0];
      const objValue = el.split("=")[1];
      queryObj[objKey] = objValue.replace("%20", " ");
    }
  });
  return queryObj;
};
