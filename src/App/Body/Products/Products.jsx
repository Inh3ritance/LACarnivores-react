import Nepenthes_Glabrata_300X200 from '../Images/Nepenthes Glabrata/nepenthes_glabrata_300X200.jpg';
import Nepenthes_Glabrata_600X400 from '../Images/Nepenthes Glabrata/nepenthes_glabrata_600X400.jpg';

import Venus_FlyTrap_300X200 from '../Images/Venus Flytrap/venus_flytrap_300X200.jpg';
import Venus_FlyTrap_600X400 from '../Images/Venus Flytrap/venus_flytrap_600X400.jpg';

import Scarlette_Belle_300X200 from '../Images/Sarracenia Scarlette Belle/scarlette_belle_300X200.jpg';
import Scarlette_Belle_600X400 from '../Images/Sarracenia Scarlette Belle/scarlette_belle_600X400.jpg';

import Drosera_Capensis_300X200 from '../Images/Drosera Capensis/capensis_300X200.jpg';
import Drosera_Capensis_600X400 from '../Images/Drosera Capensis/capensis_600X400.jpg';

const products = [
	{
		id:1,
        quantity: 0, /*from actual store*/
        visible: true,
/*
[0]		name:"Venus Flytrap",
[1]     label: "Big, Bad, and Green.",
[2]     description: "Lorem Ipsum Dolorem.",
[3]     type: "Hardy",
[4]     recieve: "You will recieve this plant in a 3-5 inch pot, potted with 50/50 sphagnum peat moss and perlite.",
[5]     zones: "7-9",
[6]     water: "Distilled,Reverse Osmosis, Rain, and Purified water only.",
[7]     soil: "Nutrient-less soil is the medium required for this plant.",
[8]     sunlight: "Full sun to partial shade",
[9]		price:14.99,
[10]    img: [Nepenthes_Glabrata_300X200, Nepenthes_Glabrata_600X400],
*/
        plant_info: [
            "Nepenthes Glabrata",
            "Small cute pitchers",
            "One of our favorite nepenthes for its adorably small pitchers and vine like leaves. A wonderful plant for any terrarium or growing space.",
            "Nepenthes",
            "You will recieve this plant in a 3-5 inch pot, potted with 50/50 sphagnum peat moss and perlite.",
            "7-9",
            "Distilled,Reverse Osmosis, Rain, and Purified water only.",
            "Nutrient-less soil is the medium required for this plant.",
            "Full sun to partial shade",
            24.99,
            [Nepenthes_Glabrata_300X200, Nepenthes_Glabrata_600X400]
        ]
    },

    {
        id: 2,
        quantity: 1, /*from actual store*/
        visible: true,

        plant_info: [
            "Scarlette Belle",
            "Big, Bad, and Green.",
            "Lorem Ipsum Dolorem.",
            "Hardy",
            "You will recieve this plant in a 3-5 inch pot, potted with 50/50 sphagnum peat moss and perlite.",
            "7-9",
            "Distilled,Reverse Osmosis, Rain, and Purified water only.",
            "Nutrient-less soil is the medium required for this plant.",
            "Full sun to partial shade",
            14.99,
            [Scarlette_Belle_300X200, Scarlette_Belle_600X400]
        ]
    },

    {
        id: 3,
        quantity: 0, /*from actual store*/
        visible: true,

        plant_info: [
            "Sarracenia scarlet belle (Sarracenia leucophylla x psittacina)",
            "Big, Bad, and Green.",
            "Lorem Ipsum Dolorem.",
            "Hardy",
            "You will recieve this plant in a 3-5 inch pot, potted with 50/50 sphagnum peat moss and perlite.",
            "7-9",
            "It is important to keep the plant moist but not too wet. Use distilled or rain water",
            "Nutrient-less soil is the medium required for this plant.",
            "Full sun is important for this kind of plant and it is essential to replicate it indoors.",
            14.99,
            [Nepenthes_Glabrata_300X200, Nepenthes_Glabrata_600X400]
        ]
    },

    {
        id: 4,
        quantity: 0, /*from actual store*/
        visible: true,

        plant_info: [
            "Red Dragon Flytrap",
            "Deep red Flytraps",
            "This Flytrap requires strong sunlight in order to thrive and retain its strong red color, if less than adequate light is given it will revert to a greenish color. Flytraps should go through a winter dormency in order thrive in the future.",
            "Hardy",
            "You will recieve this plant in a 3-5 inch pot, potted with 50/50 sphagnum peat moss and perlite.",
            "7-9",
            "It is important to keep the plant moist but not too wet. Use distilled or rain water",
            "Nutrient-less soil is the medium required for this plant.",
            "Full sun or strong indoor lighting.",
            14.99,
            [Nepenthes_Glabrata_300X200, Nepenthes_Glabrata_600X400]
        ]
    },

    {
        id: 5,
        quantity: 0, /*from actual store*/
        visible: true,

        plant_info: [
            "Nepenthes Izumaie",
            "Elegant dark pitchers",
            "Nepenthes Izumaie is a very slow grower, but its patience is rewarding with stunning pichers. The plant is a highland nepenthes which reccomends cooler nights to thrive.",
            "Nepenthes",
            "You will recieve this plant in a 3-5 inch pot, potted with 50/50 sphagnum peat moss and perlite.",
            "7-9",
            "Distilled,Reverse Osmosis, Rain, and Purified water only.",
            "Nutrient-less soil is the medium required for this plant.",
            "Partial sun or a good indoor light is reccomended.",
            14.99,
            [Nepenthes_Glabrata_300X200, Nepenthes_Glabrata_600X400]
        ]
    },

    {
        id: 6,
        quantity: 1, /*from actual store*/
        visible: true,

        plant_info: [
            "Venus flytrap (Dionaea muscipula)",
            "Perfect carnivorous plant for starters!",
            "The Venus Flytrap is one of the easiest carnivorous plants to grow. It is a small plant belonging to the family Droseraceae. Depending on the time of year, its stems can reach a maximum size of about three to ten centimeters. Regardless of the propagation method used, the plant will live for 20 to 30 years if cultivated in the right conditions.",
            "Hardy",
            "You will recieve this plant in a 3-5 inch pot, potted with 50/50 sphagnum peat moss and perlite.",
            "7-9",
            "Wet roots, high humidity are essential. Distilled water or rainwater is recommended for a longer life.",
            "Recommended soil mixture is one that contains sphagnum moss and sand. Do not use fertilizer.",
            "Full sun light to partial sun",
            14.99,
            [Venus_FlyTrap_300X200, Venus_FlyTrap_600X400]
        ]
    },

    {
        id: 7,
        quantity: 1, /*from actual store*/
        visible: true,

        plant_info: [
            "Drosera capensis albino",
            "Easy to grow robust sundew",
            "Very popular and easy to grow sundew, this plant does an amazing job at catching houseflys and gnats. Ideal for windowsills or terrarium to thrive.",
            "Tropical",
            "You will recieve this plant in a 3-5 inch pot, potted with 50/50 sphagnum peat moss and perlite.",
            "7-9",
            "Distilled,Reverse Osmosis, Rain, and Purified water only.",
            "Nutrient-less soil is the medium required for this plant.",
            "Partial sun or a good indoor light is reccomended.",
            14.99,
            [Drosera_Capensis_300X200, Drosera_Capensis_600X400]
        ]
    },

    {
        id: 8,
        quantity: 0, /*from actual store*/
        visible: true,

        plant_info: [
            "Pinguicula Gigantae X Lauena",
            "A succulent with teeth",
            "",
            "Tropical",
            "You will recieve this plant in a 3-5 inch pot, potted with 50/50 sphagnum peat moss and perlite.",
            "7-9",
            "Distilled,Reverse Osmosis, Rain, and Purified water only.",
            "",
            "Partial sun or a good indoor light is reccomended.",
            14.99,
            [Nepenthes_Glabrata_300X200, Nepenthes_Glabrata_600X400]
        ]
    },

    {
        id: 9,
        quantity: 0, /*from actual store*/
        visible: true,

        plant_info: [
            "byblis linfora",
            "Rainbow plant",
            "Avoid too much sun or it ill get burnt",
            "Tropical",
            "You will recieve this plant in a 3-5 inch pot, potted with 50/50 sphagnum peat moss and perlite.",
            "7-9",
            "Distilled,Reverse Osmosis, Rain, and Purified water only.",
            "",
            "Partial sun or a good indoor light is reccomended.",
            14.99,
            [Nepenthes_Glabrata_300X200, Nepenthes_Glabrata_600X400]
        ]
    },

];

export default products;