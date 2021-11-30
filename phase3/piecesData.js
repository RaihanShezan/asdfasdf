// Pieces Data by model - [name, length, width, weight per piece, target]
const piecesData = {
	model_12: [
		['Handle', 160, 150, 0.117, 24000],
		['Electrical Board', 348, 138, 0.234, 3000],
		['Left side panel', 531, 278, 0.722, 3000],
		['Right panel', 537, 377, 0.99, 3000],
		['Partition', 550, 360, 0.968, 3000],
		['Front Panel', 915, 615, 2.753, 3300],
	],
	model_190: [
		['Electrical board', 345, 105, 0.175, 14000],
		['Right panel', 575, 365, 1, 14000],
		['Partition', 580, 428, 1.175, 14000],
		['Front panel', 980, 752, 3.46, 14000],
	],
	model_210: [
		['Right side of the board 2', 666, 74, 0.12, 7000],
		['Support plate', 116, 107, 0.06, 7000],
		['Partition', 695, 340, 1.31, 7000],
		['Electric control board', 547, 374, 0.975, 7000],
		['Diamond front panel', 1020, 800, 4.08, 7000],
	],
	model_60: [
		['Electrical Board', 330, 118, 0.19, 3000],
		['Electrical Box', 341, 320, 0.533, 3000],
		['Condenser Holder', 247, 79, 0.031, 3000],
	],
};

class Piece {
	constructor(model, name, length, width, weight, target) {
		this.model = model;
		this.name = name;
		this.length = length;
		this.width = width;
		this.weight = weight;
		this.target = target;
		this.positioned = false;
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
