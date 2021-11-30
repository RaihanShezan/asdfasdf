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
const savedPool = pieces.map(p => {
	const size = p.length <= p.width ? p.length : p.width;
	return new LW(p, size);
});
savedPool.sort((a, b) => (a.size >= b.size ? -1 : 1));

/**************************************************************************/
const placeNewBatch = (lwPool, tempMotherCoils) => {
	while (lwPool.length > 0) {
		const currentLW = lwPool.shift();
		let i = 0;
		while (!currentLW.piece.positioned && i < tempMotherCoils.length) {
			const currentMotherCoil = tempMotherCoils[i];
			if (currentMotherCoil.residue > currentLW.size) {
				currentMotherCoil.springCoils.push(currentLW.piece);
				currentMotherCoil.residue -= currentLW.size;
				currentLW.piece.positioned = true;
				const currentSpringCoilWeight =
					currentMotherCoil.weight * (currentLW.size / currentMotherCoil.width);
				const additionalPieces = Math.floor(currentSpringCoilWeight / currentLW.piece.weight);
				currentLW.piece.target -= additionalPieces;
			} else {
				i++;
			}
		}
	}
};

/**************************************************************************/
/*
place & cut a batch, doing this will cut 1 batch of all pieces parallely, not focussing on crossing a single piece's target
1. in the end all positioned becomes true, so convert all to false & run again
2. at this stage, filter motherCoils array, if residue is below the lowest LW size, reject it
3. Run this whole cycle
*/

const runIteration = iterationPool => {
	let lwPool = iterationPool.slice(0);
	let tempMotherCoils = motherCoils.slice(0);
	while (tempMotherCoils.length > 0) {
		placeNewBatch(lwPool, tempMotherCoils);
		lwPool = iterationPool.filter(l => l.piece.target > 0);
		lwPool.forEach(l => (l.piece.positioned = false));
		const minSize = Math.min(...lwPool.map(l => l.size));
		tempMotherCoils = motherCoils.filter(mc => mc.residue >= minSize);
	}
};
const resetSetup = () => {
	motherCoils.forEach(m => {
		m.springCoils = [];
		m.residue = m.width;
	});
	savedPool.forEach(l => (l.piece.target = l.piece.initialTarget));
};
/*
surute sobaire 0 priority set korte hobe, sob piece re
tarpor uporer kaj 1 bar run korbe
jodi dekhe positive target er kichu ache, segula re priority 1 banaia dia, reset dibe pura setup
*/

const mainFunction = () => {
	let solved = false;
	while (!solved) {
		let topPriority = Math.max(...savedPool.map(l => l.piece.priority));
		console.log('Max Top priority - ', topPriority);
		while (topPriority >= 0) {
			const iterationPool = savedPool.filter(l => l.piece.priority === topPriority);
			console.log('iter pool leng - ', iterationPool.length);
			if (iterationPool.length > 0) runIteration(iterationPool);
			topPriority--;
		}
		const unsolvedPool = savedPool.filter(l => l.piece.target > 0);
		console.log('Unsolved - ', unsolvedPool.length);
		if (unsolvedPool.length > 0) {
			solved = false;
			unsolvedPool.forEach(l => l.piece.priority++);
		} else {
			solved = true;
		}
	}
};
/**************************************************************************/
mainFunction();
console.log(
	'Targets - ',
	savedPool.map(l => `${l.size} - ${l.piece.target}`),
);
console.log(motherCoils.map(m => m.residue));
