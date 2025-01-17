class Api {
    constructor(config){
        this._url = config.url;
    }

    _checkResponse(res) {return res.ok ? res.json() : Promise.reject(res.status)}

    getInfo(token) {
        return fetch(`${this._url}/users/me`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(this._checkResponse)
    }

    getCards(token) {
        return fetch(`${this._url}/cards`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(this._checkResponse)
    }

    setUserInfo(data, token) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name: data.name,
                about: data.job
            })
        })
        .then(this._checkResponse)
    }

    setNewAvatar(data, token) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                avatar: data.inputAvatar
            })
        })
        .then(this._checkResponse)
    }

    addCard(data, token) {
        return fetch(`${this._url}/cards`,{
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name: data.inputPlace,
                link: data.inputImage
            })
        })
        .then(this._checkResponse)
    }

    putLike(cardId, token){
        return fetch(`${this._url}/cards/${cardId}/likes`,{
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(this._checkResponse)
    }

    removeLike(cardId, token){
        return fetch(`${this._url}/cards/${cardId}/likes`,{
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(this._checkResponse)
    }

    deleteCard(cardId, token){
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(this._checkResponse)
    }
}

const configApi = {
    url: 'http://localhost:3000',
}

const api = new Api(configApi);

export default api
