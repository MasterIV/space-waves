var rooms = [
	{
		img: 'img/room/commando_room.png',
		anim: 'img/room/commando_animation.png',
		animOffset: { x: 67, y: 24 },
		offset: { x: 223, y: 353 },
		name: 'Command Central',
		energy: 50,
		costs: 0,
		enabled: true,
		buildable: false,
		shape: [
			[1, 1, 1, 1, 1],
			[1, 2, 2, 2, 1],
			[1, 2, 2, 2, 1],
			[1, 2, 2, 2, 1],
			[1, 1, 1, 1, 1]
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
		img: 'img/room/Living_Quarters.png',
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
		img: 'img/room/weapon_room.png',
		icon: 'img/build menu/build_weapon_icon.png',
		offset: { x: 223, y: 353 },
		name: 'Turret',
		energy: -40,
		costs: 120,
		enabled: true,
		buildable: true,
		shape: [
			[1, 1, 1],
			[1, 2, 1],
			[1, 1, 1]
		]
	},
	{
		img: 'img/room/lab_room.png',
		icon: 'img/build menu/build_lab_icon.png',
		animOffset: { x: 67, y: 24 },
		offset: { x: 223, y: 353 },
		name: 'Med Bay',
		energy: -25,
		costs: 110,
		enabled: true,
		buildable: true,
		shape: [
			[2, 1, 1],
			[1, 1, 1],
			[1, 1, 0]
		]
	}
];
