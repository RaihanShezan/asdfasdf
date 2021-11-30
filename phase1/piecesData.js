// Pieces Data by model - [name, length, width, target]
const piecesData = {
	model_12: [
		['Handle', 160, 150, 24000],
		['Electrical Board', 348, 138, 3000],
		['Left side panel', 531, 278, 3000],
		['Right panel', 537, 377, 3000],
		['Partition', 550, 360, 3000],
		['Front Panel', 915, 615, 3300],
	],
	model_190: [
		['Electrical board', 345, 105, 14000],
		['Right panel', 575, 365, 14000],
		['Partition', 580, 428, 14000],
		['Front panel', 980, 752, 14000],
	],
	model_210: [
		['Right side of the board 2', 666, 74, 7000],
		['Support plate', 116, 107, 7000],
		['Partition', 695, 340, 7000],
		['Electric control board', 547, 374, 7000],
		['Diamond front panel', 1020, 800, 7000],
	],
	model_60: [
		['Electrical Board', 330, 118, 3000],
		['Electrical Box', 341, 320, 3000],
		['Condenser Holder', 247, 79, 3000],
	],
};

class Piece {
	constructor(model, name, length, width, target) {
		this.model = model;
		this.name = name;
		this.length = length;
		this.width = width;
		this.target = target;
		this.placed = false;
	}
}

const pieces = [];
Object.keys(piecesData).forEach(model => {
	piecesData[model].forEach(piece => {
		const newPiece = new Piece(model, ...piece);
		pieces.push(newPiece);
	});
});

module.exports = pieces;
