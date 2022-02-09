const getInnerText = (cells) => cells.map((cell) => cell.innerText);
const getNumbers = (numbers) => numbers.map((number) => parseFloat(number));

export { getInnerText, getNumbers };
