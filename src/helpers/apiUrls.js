export const mainApiUrl = (page=0) => {
    const offset = page * 20;
    return `https://gateway.marvel.com/v1/public/characters?limit=20&offset=${offset}&ts=1&apikey=1972d8f5982c303a596ab277fbd1b19a&hash=5a1ba2757f84ac1f14c6793eec230924`
}

export const searchCharacterApiUrl = (searchText) => {
    return `https://gateway.marvel.com/v1/public/characters?limit=20&name=${searchText}&ts=1&apikey=1972d8f5982c303a596ab277fbd1b19a&hash=5a1ba2757f84ac1f14c6793eec230924`
}
