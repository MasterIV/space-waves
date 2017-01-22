function calcHealth(level) {
	return 200+level*20;
}

function calcStat(level) {
	return 10+level*2;
}

function calcExp(level) {
	if(level < 2) return 0;
	return Math.round(Math.pow(1.2, level)*100*(level-1));
}

function clacHireCosts(level) {
	return 80+level*30;
}

var units = {
	engineer: {
		img: 'img/character_astronaut_green.png',
		enemy: false,
		health: 1,
		attack: 1,
		science: 1,
		engineering: 1.6
	},
	security: {
		img: 'img/character_astronaut_red.png',
		enemy: false,
		health: 1,
		attack: 1.8,
		science: .8,
		engineering: 1
	},
	science: {
		img: 'img/character_astronaut_blue.png',
		enemy: false,
		health: 1,
		attack: .8,
		science: 1.8,
		engineering: 1
	},
	alien: {
		img: 'img/ruru_alien.png',
		enemy: true,
		health: 1.2,
		attack: 1.4,
		science: 1,
		engineering: 1
	}
};