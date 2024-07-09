const names = {
    fantasyBoy: ["Aragorn", "Eldarion", "Thranduil", "Boromir", "Legolas"],
    fantasyGirl: ["Arwen", "Eowyn", "Galadriel", "Tauriel", "Luthien"],
    elf: ["Faelwen", "Elrond", "Elaria", "Celeborn", "Aerendyl"],
    dwarf: ["Gimli", "Thorin", "Balin", "Dwalin", "Bombur"],
    orc: ["Gorbag", "Azog", "Ugluk", "Lurtz", "Grishnakh"]
};

document.getElementById('generateBtn').addEventListener('click', () => {
    const category = document.getElementById('category').value;
    const randomName = names[category][Math.floor(Math.random() * names[category].length)];
    document.getElementById('nameOutput').textContent = randomName;
});
