const getFormattedName = (fullName = '') => {
  if (!fullName.length) return 'Not available';
  const fn = fullName.split(' ');
  const newFn = fn.map((n) => `${n[0].toUpperCase()}${n.slice(1)}`);
  return newFn.join(' ');
};

export default getFormattedName;
