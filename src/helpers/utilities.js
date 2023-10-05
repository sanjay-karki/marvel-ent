export const createDisplayData = (fetchedData, offset) => {
  const displayData = fetchedData.map((item, index) => ({
    no: index + offset + 1,
    id: item.id,
    name: item.name,
    description: item.description || "No character description available.",
    thumbnail: (item.thumbnail.path + ".").concat(item.thumbnail.extension),
  }));
  return displayData;
};

export const createDataForChart = (fetchedData) => {
  const displayData = fetchedData.map((item, index) => ({
    name: item.name,
    comics: item.comics.available,
  }));
  return displayData;
};

export const getRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const alpha = 0.95;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const generateRandomColors = (count) => {
  const backgroundColors = [];
  const borderColors = [];

  for (let i = 0; i < count; i++) {
    backgroundColors.push(getRandomColor());
    borderColors.push(getRandomColor());
  }

  return { backgroundColors, borderColors };
};
