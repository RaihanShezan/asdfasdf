const pieces = require('./piecesData');
const motherCoils = require('./motherCoilData');

// Take the minimum of length/width of each piece & save as size of LW object for each piece
class LW {
	constructor(piece, size) {
		this.piece = piece;
		this.size = size;
	}
}
// Create a lwPool & sort from largest size to smallest
let lwPool = pieces.map(p => {
	const size = p.length <= p.width ? p.length : p.width;
	return new LW(p, size);
});
lwPool.sort((a, b) => (a.size >= b.size ? -1 : 1));

/**************************************************************************/
// sanitize removes pieces which are already positioned in a motherCoil
// (later add sanitize&sortPool for master case solve)
const sanitizePool = pool => {
	return pool.filter(lw => !lw.piece.positioned);
};
// until all pieces of lwPool gets positioned, run process
while (lwPool.length > 0) {
	const currentLW = lwPool[0];
	let i = 0;
	while (!currentLW.piece.positioned) {
		if (motherCoils[i].residue > currentLW.size) {
			// then bucket is large enough, place it
			motherCoils[i].springCoils.push(currentLW.piece);
			motherCoils[i].residue -= currentLW.size;
			currentLW.piece.positioned = true;
		} else {
			// move to next iteration
			i++;
		}
		if (i > motherCoils.length) {
			console.log('Ran out of mother coils');
			process.exit(1);
		}
	}

	lwPool = sanitizePool(lwPool);
}

console.log(motherCoils.slice(0, 6));
