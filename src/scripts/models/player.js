class CityRecord {
  constructor(highScore = 0, isLocked = true) {
    this.highScore = highScore;
    this.isLocked = isLocked;
  }
}

class Player {
  constructor(username, fullName, exp = 0, candy = 0, cityRecords = {}) {
    this.username = username;
    this.fullName = fullName;
    this.exp = exp;
    this.candy = candy;
    this.playerCityRecords = cityRecords;
  }

  getCityRecord(cityName) {
    return this.playerCityRecords[cityName] || null;
  }
}

export { CityRecord, Player };