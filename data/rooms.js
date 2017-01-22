var rooms = [
	{
		img: 'img/room/commando_room.png',
		anim: 'img/room/commando_animation.png',
		animOffset: { x: 67, y: 24 },
		offset: { x: 223, y: 353 },
		name: 'Command Central',
		energy: 0,
		costs: 0,
		enabled: true,
		buildable: false,
		shape: [
			[2, 2, 2],
			[2, 2, 2],
			[2, 2, 2]
		]
	},
	{
		img: 'img/room/Generator_Room.png',
		offset: { x: 162, y: 349 },
		icon: 'img/build menu/build_energy_icon.png',
		name: 'Generator Room',
		energy: 100,
		costs: 60,
		enabled: true,
		buildable: true,
		shape: [
			[2, 1, 1, 1, 1],
			[1, 1, 1, 1, 1]
		]
	},
	{
		img: 'img/room/medbay.png',
		icon: 'img/build menu/build_med_icon.png',
		animOffset: { x: 67, y: 24 },
		offset: { x: 223, y: 353 },
		name: 'Med Bay',
		energy: -20,
		costs: 80,
		enabled: true,
		buildable: true,
		shape: [
			[2, 1, 1],
			[2, 1, 1],
			[1, 1, 0]
		]
	},
	{
		img: 'img/room/room6_grau.png',
		icon: 'img/build menu/build_quarters_icon.png',
		enabled: true,
		buildable: true,
		offset: { x: 223, y: 353 },
		name: 'Living Quarters',
		energy: -10,
		costs: 50,
		shape: [
			[1, 1, 1],
			[1, 1, 1],
			[1, 1, 0],
			[1, 1, 0]
		]
	},
	{
		img: 'img/room/firness_room.png',
		icon: 'img/build menu/build_training_icon.png',
		enabled: true,
		buildable: true,
		name: 'Training Room',
		energy: -5,
		costs: 100,
		shape: [
			[1, 1, 1],
			[1, 1, 0],
			[1, 1, 0],
			[1, 1, 0]
		]
	},
	{
		img: 'img/room/room3_grau.png',
		shape: [
			[1, 0, 0],
			[1, 1, 1],
			[1, 1, 1],
			[1, 0, 0]
		]
	},
	{
		img: 'img/room/room4_grau.png',
		shape: [
			[1, 0, 0, 1],
			[1, 1, 1, 1],
			[1, 1, 1, 1],
			[1, 0, 0, 1]
		]
	},
	{
		img: 'img/room/room7_grau.png',
		shape: [
			[1, 1, 1, 1],
			[1, 1, 1, 1],
			[1, 1, 0, 0]
		]
	},
	{
		img: 'img/room/room8_grau.png',
		shape: [
			[1, 1, 1, 1],
			[1, 1, 1, 1],
			[0, 1, 1, 0]
		]
	},
	{
		img: 'img/room/room9_grau.png',
		shape: [
			[1, 1, 0],
			[1, 1, 1],
			[1, 1, 1],
			[1, 1, 0]
		]
	},
	{
		img: 'img/room/room10_grau.png',
		shape: [
			[0, 1, 1],
			[1, 1, 1],
			[1, 1, 1],
			[1, 1, 0]
		]
	},
	{
		img: 'img/room/room11_grau.png',
		shape: [
			[1, 1, 0],
			[1, 1, 1],
			[1, 1, 1],
			[0, 1, 1]
		]
	}
];
